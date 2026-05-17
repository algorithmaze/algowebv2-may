import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

interface Application {
  id: string;
  type?: 'course' | 'internship';
  name: string;
  email: string;
  phone: string;
  
  // Course
  course?: string;
  dob?: string;
  studying?: string;
  leadDetails?: string;

  // Internship
  educationLevel?: string;
  department?: string;
  internshipDomain?: string;
  duration?: string;
  projectType?: string;

  status: string;
  paymentStatus?: string;
  paymentId?: string;
  paymentMode?: string;
  amountPaid?: number;
  amountDue?: number;
  date: string;
  refNo?: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'course' | 'internship' | 'messages' | 'manage-courses' | 'manage-internships'>('course');
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/amaiadmin');
      return;
    }
    
    // Fetch Applications
    fetch(`${API_BASE_URL}/api/applications`)
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error(err));

    // Fetch Messages
    fetch(`${API_BASE_URL}/api/contact`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));

    // Fetch Courses
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => { if (data.success) setCourses(data.courses || []) })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleDelete = async (id: string, tab: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    const endpoint = tab === 'messages' ? 'contact' : 'applications';
    try {
      const res = await fetch(`${API_BASE_URL}/api/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (tab === 'messages') {
          setMessages(messages.filter(m => m.id !== id));
        } else {
          setApps(apps.filter(a => a.id !== id));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (activeTab === 'manage-courses' || activeTab === 'manage-internships') {
      try {
        const isNew = !updatedData.slug;
        const method = isNew ? 'POST' : 'PUT';
        const url = isNew ? `${API_BASE_URL}/api/courses` : `${API_BASE_URL}/api/courses/${updatedData.slug}`;
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        if (res.ok) {
          const data = await res.json();
          if (isNew) {
            setCourses([...courses, data.course].sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99)));
            alert('🚀 Course launched successfully!');
          } else {
            setCourses(courses.map(c => c.slug === updatedData.slug ? data.course : c).sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99)));
            alert('✅ Changes saved successfully!');
          }
          setEditingRecord(null);
        } else {
          const errorData = await res.json();
          alert('❌ Failed to save: ' + (errorData.message || 'Server error'));
        }
      } catch (err) { 
        console.error(err); 
        alert('❌ Error connecting to server. Is the backend running?');
      }
      return;
    }

    const isMessage = activeTab === 'messages';
    const endpoint = isMessage ? 'contact' : 'applications';
    try {
      const res = await fetch(`${API_BASE_URL}/api/${endpoint}/${updatedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        if (isMessage) {
          setMessages(messages.map(m => m.id === updatedData.id ? updatedData : m));
        } else {
          setApps(apps.map(a => a.id === updatedData.id ? updatedData : a));
        }
        setEditingRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setApps(apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const filteredApps = apps.filter(app => {
    if (activeTab === 'course') return app.type === 'course' || !app.type; // fallback for old data
    if (activeTab === 'internship') return app.type === 'internship';
    return false;
  });

  return (
    <div className="min-h-screen bg-dark-black text-white font-sans relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 relative z-10 max-w-[1400px]">
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-teal-green rounded-xl flex items-center justify-center text-dark-black font-black text-xl shadow-[0_0_20px_rgba(0,229,255,0.3)]">A</div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Admin <span className="text-electric-blue">ERP</span></h1>
            </div>
            <p className="text-white/40 font-medium tracking-wide">Command center for AlgorithmazeAI Platform</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('adminToken'); navigate('/amaiadmin'); }}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all active:scale-95"
          >
            Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('course')}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${activeTab === 'course' ? 'bg-electric-blue text-dark-black shadow-[0_15px_30px_rgba(0,229,255,0.25)] -translate-y-1' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}`}
          >
            <span>🚀</span> Course Apps
          </button>
          <button 
            onClick={() => setActiveTab('internship')}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${activeTab === 'internship' ? 'bg-teal-green text-dark-black shadow-[0_15px_30px_rgba(0,255,198,0.25)] -translate-y-1' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}`}
          >
            <span>💼</span> Internship Apps
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${activeTab === 'messages' ? 'bg-white text-dark-black shadow-[0_15px_30px_rgba(255,255,255,0.2)] -translate-y-1' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}`}
          >
            <span>📩</span> Inquiries
          </button>
          {localStorage.getItem('adminRole') === 'admin' && (
            <>
              <button 
                onClick={() => setActiveTab('manage-courses')}
                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${activeTab === 'manage-courses' ? 'bg-orange-500 text-white shadow-[0_15px_30px_rgba(249,115,22,0.25)] -translate-y-1' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}`}
              >
                <span>⚙️</span> Courses
              </button>
              <button 
                onClick={() => setActiveTab('manage-internships')}
                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${activeTab === 'manage-internships' ? 'bg-purple-500 text-white shadow-[0_15px_30px_rgba(168,85,247,0.25)] -translate-y-1' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}`}
              >
                <span>🎛️</span> Internships
              </button>
            </>
          )}
        </div>
        {(activeTab === 'manage-courses' || activeTab === 'manage-internships') && (
          <div className="mb-4 flex justify-end">
             <button onClick={() => setEditingRecord({ type: activeTab === 'manage-internships' ? 'internship' : 'course', price: 0, displayOrder: 99 })} className={`px-6 py-2 ${activeTab === 'manage-internships' ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-gradient-to-r from-orange-500 to-yellow-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]'} text-white font-bold rounded-full hover:scale-105 transition-transform`}>
               + Add {activeTab === 'manage-internships' ? 'Internship' : 'Course'}
             </button>
          </div>
        )}

        <div className="glass-ui !p-0 overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead>
                {activeTab === 'course' && (
                  <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-electric-blue">
                    <th className="p-8 font-black whitespace-nowrap">Timestamp</th>
                    <th className="p-8 font-black whitespace-nowrap">Reference</th>
                    <th className="p-8 font-black whitespace-nowrap">Student</th>
                    <th className="p-8 font-black whitespace-nowrap">Contact Info</th>
                    <th className="p-8 font-black whitespace-nowrap">Institue/Level</th>
                    <th className="p-8 font-black whitespace-nowrap">Program</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Payment Status</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Payment Mode</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Stage</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Manage</th>
                  </tr>
                )}
                {activeTab === 'internship' && (
                  <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-teal-green">
                    <th className="p-8 font-black whitespace-nowrap">Timestamp</th>
                    <th className="p-8 font-black whitespace-nowrap">Reference</th>
                    <th className="p-8 font-black whitespace-nowrap">Applicant</th>
                    <th className="p-8 font-black whitespace-nowrap">Contact Info</th>
                    <th className="p-8 font-black whitespace-nowrap">Edu Details</th>
                    <th className="p-8 font-black whitespace-nowrap">Internship Details</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Payment</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Payment Mode</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Stage</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Manage</th>
                  </tr>
                )}
                {activeTab === 'messages' && (
                  <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-white/40">
                    <th className="p-8 font-black whitespace-nowrap">Timestamp</th>
                    <th className="p-8 font-black whitespace-nowrap">Sender Name</th>
                    <th className="p-8 font-black whitespace-nowrap">Contact Info</th>
                    <th className="p-8 font-black whitespace-nowrap">Message Snippet</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Manage</th>
                  </tr>
                )}
                {(activeTab === 'manage-courses' || activeTab === 'manage-internships') && (
                  <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-orange-400">
                    <th className="p-8 font-black whitespace-nowrap">Rank</th>
                    <th className="p-8 font-black whitespace-nowrap">Program Identity</th>
                    <th className="p-8 font-black whitespace-nowrap">Classification</th>
                    <th className="p-8 font-black whitespace-nowrap">Investment (₹)</th>
                    <th className="p-8 font-black text-center whitespace-nowrap">Manage</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === 'manage-courses' || activeTab === 'manage-internships') ? (courses || []).filter(c => c && (activeTab === 'manage-internships' ? c.type === 'internship' : c.type !== 'internship')).map(course => (
                  <tr key={course.slug} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-sm whitespace-nowrap">
                      {course.displayOrder || 99}
                    </td>
                    <td className="p-6 text-sm font-bold text-orange-400 whitespace-nowrap">
                      {course.title || course.name || course.slug || 'Unnamed'}
                    </td>
                    <td className="p-6 text-sm text-cyan-50/80 font-mono whitespace-nowrap">
                      {course.type || 'course'}
                    </td>
                    <td className="p-6 text-sm whitespace-nowrap">
                      {course.price === 0 ? 'Free' : `₹${course.price}`}
                    </td>
                    <td className="p-6 text-center whitespace-nowrap">
                      <button onClick={() => setEditingRecord(course)} className="text-blue-400 hover:text-blue-300 font-bold text-sm mr-4">Edit</button>
                      <button onClick={async () => {
                        if (!window.confirm('Delete this course?')) return;
                        const res = await fetch(`${API_BASE_URL}/api/courses/${course.slug}`, { method: 'DELETE' });
                        if (res.ok) setCourses(courses.filter(c => c.slug !== course.slug));
                      }} className="text-red-500 hover:text-red-400 font-bold text-sm">Delete</button>
                    </td>
                  </tr>
                )) : activeTab === 'messages' ? messages.map(msg => (
                  <tr key={msg.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-8 text-sm text-white/40 whitespace-nowrap">
                      {new Date(msg.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-8 whitespace-nowrap">
                      <div className="font-black text-white">{msg.name}</div>
                      <div className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">{msg.email}</div>
                    </td>
                    <td className="p-8 text-sm text-cyan-50/70 whitespace-nowrap font-mono">
                      {msg.phone}
                    </td>
                    <td className="p-8 text-sm text-white/50 max-w-sm truncate">
                      {msg.message}
                    </td>
                    <td className="p-8 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => setEditingRecord(msg)} className="text-blue-400 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest bg-blue-400/10 px-4 py-2 rounded-xl">View</button>
                        <button onClick={() => handleDelete(msg.id, 'messages')} className="text-red-400 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest bg-red-400/10 px-4 py-2 rounded-xl">Trash</button>
                      </div>
                    </td>
                  </tr>
                )) : filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-8 text-sm text-white/40 whitespace-nowrap">
                       {new Date(app.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="p-8 text-[10px] font-black text-electric-blue whitespace-nowrap tracking-widest">
                      #{app.refNo?.toUpperCase() || 'AMAI-NEW'}
                    </td>
                    <td className="p-8 whitespace-nowrap">
                      <div className="font-black text-white">{app.name}</div>
                      <div className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">{app.email}</div>
                    </td>
                    
                    {activeTab === 'course' ? (
                      <>
                        <td className="p-8 text-sm text-cyan-50/70 whitespace-nowrap">
                          <div className="font-mono text-xs">{app.phone}</div>
                          <div className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">{app.dob ? `DOB: ${app.dob}` : 'NO DOB'}</div>
                        </td>
                        <td className="p-8 text-xs font-bold text-white/60 whitespace-nowrap uppercase tracking-tighter">
                          {app.studying || 'N/A'}
                        </td>
                        <td className="p-8 text-sm font-black text-electric-blue whitespace-nowrap">
                          {app.course}
                        </td>
                        <td className="p-8 text-[10px] text-white/30 max-w-xs truncate italic" title={app.leadDetails}>
                          <div className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${app.paymentStatus === 'Paid' ? 'bg-teal-green/20 text-teal-green border border-teal-green/30' : app.paymentStatus === 'Pay on Day' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-white/5 text-white/30'}`}>
                            {app.paymentStatus || 'Applied'}
                          </div>
                          {app.paymentId && <div className="text-[8px] text-white/20 mt-1 font-mono">{app.paymentId}</div>}
                          {app.amountPaid !== undefined && <div className="text-[10px] text-white/60 mt-1 font-bold">₹{app.amountPaid} Paid</div>}
                        </td>
                        <td className="p-8 text-center whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${app.paymentMode === 'Online' ? 'bg-blue-500/20 text-blue-400' : app.paymentMode === 'Cash' ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-white/30'}`}>{app.paymentMode || 'N/A'}</span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-8 text-sm text-cyan-50/70 whitespace-nowrap">
                           <div className="font-mono text-xs">{app.phone}</div>
                        </td>
                        <td className="p-8 text-xs whitespace-nowrap">
                          <span className="font-black text-dark-black bg-white/80 px-2 py-1 rounded-lg text-[9px] uppercase mr-2">{app.educationLevel}</span>
                          <span className="text-white/40 uppercase tracking-widest text-[9px]">{app.department}</span>
                        </td>
                        <td className="p-8 text-sm whitespace-nowrap">
                          <div className="text-xs font-black text-teal-green uppercase tracking-widest">{app.internshipDomain}</div>
                          <div className="text-[10px] text-white/20 mt-1 font-bold">{app.duration || 'Flexible'} • {app.projectType || 'Standard'}</div>
                        </td>
                        <td className="p-8 text-center whitespace-nowrap">
                           <div className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${app.paymentStatus === 'Paid' ? 'bg-teal-green/20 text-teal-green border border-teal-green/30' : 'bg-white/5 text-white/30'}`}>
                            {app.paymentStatus || 'N/A'}
                          </div>
                        </td>
                        <td className="p-8 text-center whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${app.paymentMode === 'Online' ? 'bg-blue-500/20 text-blue-400' : app.paymentMode === 'Cash' ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-white/30'}`}>{app.paymentMode || 'N/A'}</span>
                        </td>
                      </>
                    )}

                    <td className="p-8 text-center whitespace-nowrap">
                      <select 
                        value={app.status || 'Applied'}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`bg-[#0a0a0a] border rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] cursor-pointer outline-none transition-all hover:scale-105
                          ${app.status === 'Applied' ? 'border-orange-500/20 text-orange-400 bg-orange-500/5' : ''}
                          ${app.status === 'Paid' || app.status === 'Paid/Free' ? 'border-blue-500/20 text-blue-400 bg-blue-500/5' : ''}
                          ${app.status === 'Joined' ? 'border-teal-green/20 text-teal-green bg-teal-green/5' : ''}
                          ${app.status === 'Canceled' ? 'border-red-500/20 text-red-400 bg-red-500/5' : ''}
                          ${!['Applied', 'Paid', 'Paid/Free', 'Joined', 'Canceled'].includes(app.status || 'Applied') ? 'border-white/10 text-white/40' : ''}
                        `}
                      >
                        <option value="Applied">Applied</option>
                        {activeTab === 'course' ? (
                          <option value="Paid">Verified</option>
                        ) : (
                          <option value="Paid/Free">Verified</option>
                        )}
                        <option value="Joined">Enrolled</option>
                        <option value="Canceled">Void</option>
                      </select>
                    </td>
                    <td className="p-8 text-center whitespace-nowrap">
                       <div className="flex justify-center gap-4">
                        <button onClick={() => setEditingRecord(app)} className="text-white/40 hover:text-white transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button onClick={() => handleDelete(app.id, activeTab)} className="text-white/20 hover:text-red-500 transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {((activeTab === 'course' || activeTab === 'internship') && filteredApps.length === 0) && (
                  <tr>
                    <td colSpan={10} className="p-12 text-center text-white/50">No applications found.</td>
                  </tr>
                )}
                {(activeTab === 'messages' && messages.length === 0) && (
                  <tr>
                    <td colSpan={10} className="p-12 text-center text-white/50">No messages found.</td>
                  </tr>
                )}
                {(activeTab === 'manage-courses' && courses.filter(c => c.type !== 'internship').length === 0) && (
                  <tr>
                    <td colSpan={10} className="p-12 text-center text-white/50">No courses found.</td>
                  </tr>
                )}
                {(activeTab === 'manage-internships' && courses.filter(c => c.type === 'internship').length === 0) && (
                  <tr>
                    <td colSpan={10} className="p-12 text-center text-white/50">No internships found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {editingRecord && (
        <EditModal 
          record={editingRecord} 
          onClose={() => setEditingRecord(null)} 
          onSave={handleSaveEdit} 
          isCourse={activeTab === 'manage-courses' || activeTab === 'manage-internships'}
          isInternship={activeTab === 'manage-internships'}
        />
      )}
    </div>
  );
}

function EditModal({ record, onClose, onSave, isCourse, isInternship }: { record: any, onClose: () => void, onSave: (data: any) => void, isCourse?: boolean, isInternship?: boolean }) {
  const [formData, setFormData] = useState(() => {
    const data = { ...record };
    if (data && data.duration && !data.durationValue) {
      const parts = data.duration.toString().split(' ');
      data.durationValue = parts[0] || '';
      data.durationType = parts.slice(1).join(' ') || 'Days';
    }
    if (!data.durationType) data.durationType = 'Days';
    return data;
  });
  const [activeCourseTab, setActiveCourseTab] = useState<'add' | 'category'>('add');
  
  if (isCourse) {
    if (activeCourseTab === 'add') {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-5xl shadow-[0_0_50px_rgba(0,229,255,0.15)] my-8 text-white transform animate-in zoom-in-95">
            
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 text-center py-6 rounded-t-2xl relative">
              <h2 className="text-2xl font-extrabold flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-teal-green">
                <span className="text-white">{isInternship ? '💼' : '🚀'}</span> {formData.slug ? `Edit ${isInternship ? 'Internship' : 'Course'}` : `Add New ${isInternship ? 'Internship' : 'Course'}`}
              </h2>
              <p className="text-white/50 text-sm mt-2 font-medium">Configure program details, pricing, schedule, and availability</p>
              <button onClick={onClose} className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors text-2xl">✕</button>
            </div>

            {/* Form Content */}
            <div className="p-8 pt-6">
              
              {/* Tabs */}
              <div className="flex border-b border-white/10 mb-8 pb-4 gap-4 overflow-x-auto scrollbar-hide">
                 <button onClick={() => setActiveCourseTab('add')} className="px-6 py-2.5 bg-electric-blue/10 border-electric-blue/30 text-electric-blue shadow-[0_0_15px_rgba(0,229,255,0.2)] font-bold rounded-xl whitespace-nowrap flex items-center gap-2 transition-all">
                   <span className="text-xl leading-none">+</span> {formData.slug ? 'Edit Program' : 'Add Program'}
                 </button>
                 <button onClick={() => setActiveCourseTab('category')} className="px-6 py-2.5 bg-white/5 border-white/10 text-white/70 font-bold rounded-xl hover:bg-white/10 whitespace-nowrap flex items-center gap-2 transition-colors">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg> Edit Categories
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
                
                {/* Basic Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-4">Basic Details</h3>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">{isInternship ? 'Internship Domain Name *' : 'Program Name *'}</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-all"
                      value={formData.title || formData.name || ''}
                      onChange={e => setFormData({...formData, title: e.target.value, name: e.target.value})}
                      placeholder={isInternship ? "e.g. AI & Fullstack" : "e.g. Summer AI Bootcamp '26"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Description *</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-all resize-none h-[120px]"
                      value={formData.desc || formData.description || formData.details || ''}
                      onChange={e => setFormData({...formData, desc: e.target.value, description: e.target.value})}
                      placeholder="A short, catchy description..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Key Features / Topics (Comma separated)</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-all resize-none h-[100px]"
                      value={Array.isArray(formData.features) ? formData.features.join(', ') : (formData.features || '')}
                      onChange={e => setFormData({...formData, features: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                      placeholder="e.g. Build Robots, Learn Python, Certificate Included..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Cover Image URL</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-all"
                      value={formData.imageUrl || ''}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                </div>

                {/* Logistics & Pricing */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-4">Logistics & Configuration</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Program Type</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue appearance-none cursor-pointer"
                        value={formData.type || (isInternship ? 'internship' : 'course')}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="course" className="bg-[#111]">Course</option>
                        <option value="workshop" className="bg-[#111]">Workshop</option>
                        <option value="bootcamp" className="bg-[#111]">Bootcamp</option>
                        <option value="internship" className="bg-[#111]">Internship</option>
                        <option value="webinar" className="bg-[#111]">Webinar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Category</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue appearance-none cursor-pointer"
                        value={formData.category || ''}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="" disabled className="bg-[#111]">Select Category</option>
                        <option value="Robotics & IoT" className="bg-[#111]">Robotics & IoT</option>
                        <option value="AI & ML" className="bg-[#111]">AI & ML</option>
                        <option value="Software Dev" className="bg-[#111]">Software Dev</option>
                        <option value="Hardware" className="bg-[#111]">Hardware</option>
                        <option value="Summer Camps" className="bg-[#111]">Summer Camps</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Mode</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue appearance-none cursor-pointer"
                        value={formData.mode || 'Offline'}
                        onChange={e => setFormData({...formData, mode: e.target.value, isOnline: e.target.value === 'Online'})}
                      >
                        <option value="Offline" className="bg-[#111]">🏢 Offline (In-Person)</option>
                        <option value="Online" className="bg-[#111]">💻 Online (Live)</option>
                        <option value="Hybrid" className="bg-[#111]">🔄 Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Duration</label>
                      <div className="flex bg-[#111] border border-white/10 rounded-xl overflow-hidden focus-within:border-electric-blue transition-all h-[46px]">
                        <input 
                          type="number"
                          className="w-full bg-transparent px-4 py-2 text-white focus:outline-none"
                          value={formData.durationValue || ''}
                          onChange={e => setFormData({...formData, durationValue: e.target.value, duration: `${e.target.value} ${formData.durationType || 'Days'}`})}
                          placeholder="e.g. 10"
                        />
                        <div className="flex border-l border-white/10">
                          <button 
                            type="button"
                            className={`px-3 py-2 text-xs font-bold transition-colors ${formData.durationType === 'Days' ? 'bg-electric-blue/20 text-electric-blue' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                            onClick={() => setFormData({...formData, durationType: 'Days', duration: `${formData.durationValue || ''} Days`})}
                          >
                            Days
                          </button>
                          <button 
                            type="button"
                            className={`px-3 py-2 text-xs font-bold transition-colors border-l border-white/10 ${formData.durationType === 'Hours' ? 'bg-electric-blue/20 text-electric-blue' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                            onClick={() => setFormData({...formData, durationType: 'Hours', duration: `${formData.durationValue || ''} Hours`})}
                          >
                            Hours
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Available Slots/Seats</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                        value={formData.seats || ''}
                        onChange={e => setFormData({...formData, seats: e.target.value})}
                        placeholder="e.g. 50"
                        type="number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Syllabus PDF URL</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                        value={formData.syllabusUrl || ''}
                        onChange={e => setFormData({...formData, syllabusUrl: e.target.value})}
                        placeholder="Link to syllabus..."
                      />
                    </div>
                  </div>

                  {!isInternship && (
                    <div className="grid grid-cols-3 gap-4 border border-white/5 bg-white/5 p-4 rounded-xl mt-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-teal-green mb-2">Course Fee (₹)</label>
                        <input 
                          className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-green"
                          value={formData.price || ''}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                          placeholder="Base Fee"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Reg. Fee (₹) Fixed</label>
                        <input 
                          className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-400"
                          value={formData.registerFeeFixed || ''}
                          onChange={e => setFormData({...formData, registerFeeFixed: e.target.value})}
                          placeholder="Advance"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Reg. Fee (%)</label>
                        <input 
                          className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-400"
                          value={formData.registerFeePercent || ''}
                          onChange={e => setFormData({...formData, registerFeePercent: e.target.value})}
                          placeholder="Percentage"
                          type="number"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-6 pt-4">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${formData.isPreview ? 'bg-electric-blue border-electric-blue' : 'bg-[#111] border-white/20 group-hover:border-electric-blue/50'}`}>
                        {formData.isPreview && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </div>
                      <input type="checkbox" className="hidden" 
                        checked={formData.isPreview || false}
                        onChange={e => setFormData({...formData, isPreview: e.target.checked})}
                      />
                      <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Show as Preview/Upcoming</span>
                    </label>
                  </div>

                </div>
              </div>

              {/* Footer Buttons */}
              <div className="mt-10 flex justify-end gap-4 border-t border-white/10 pt-6">
                <button 
                  onClick={onClose} 
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white/70 font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onSave(formData)} 
                  className={`px-10 py-4 bg-gradient-to-r ${isInternship ? 'from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'from-electric-blue to-teal-green shadow-[0_0_20px_rgba(0,229,255,0.4)]'} text-dark-black font-extrabold rounded-xl hover:scale-105 transition-transform flex items-center gap-2`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  {formData.slug ? 'Save Changes' : (isInternship ? 'Add Internship' : 'Launch Course')}
                </button>
              </div>

            </div>
          </div>
        </div>
      );
    } else {
      // Category Tab
      const categories = [
        { id: 1, name: 'Robotics & IoT', order: 1 },
        { id: 2, name: 'AI & ML', order: 2 },
        { id: 3, name: 'Software Dev', order: 3 },
        { id: 4, name: 'Hardware', order: 4 },
        { id: 5, name: 'Summer Camps', order: 5 }
      ];

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl shadow-[0_0_50px_rgba(0,229,255,0.15)] my-8 text-white transform animate-in zoom-in-95 overflow-hidden">
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-teal-green">Manage Categories</h2>
                  <p className="text-white/50 text-sm mt-1">Organize and order how categories appear on the website</p>
                </div>
                <div className="flex gap-3">
                   <button onClick={() => setActiveCourseTab('add')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 rounded-xl font-bold hover:bg-white/10 transition-colors">Back to Course</button>
                   <button onClick={onClose} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 rounded-xl font-bold hover:bg-white/10 transition-colors">Close</button>
                </div>
              </div>

              <div className="mb-6">
                <button className="px-6 py-3 border border-dashed border-electric-blue/50 text-electric-blue bg-electric-blue/5 font-bold rounded-xl hover:bg-electric-blue/10 transition-colors flex items-center gap-2">
                  <span className="text-xl leading-none">+</span> ADD NEW CATEGORY
                </button>
              </div>

              <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-5 font-bold text-white/50 uppercase tracking-widest text-xs">Current Order</th>
                      <th className="p-5 font-bold text-white/50 uppercase tracking-widest text-xs">Category Name</th>
                      <th className="p-5 font-bold text-white/50 uppercase tracking-widest text-xs">New Order</th>
                      <th className="p-5 font-bold text-white/50 uppercase tracking-widest text-xs">Move</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-5 text-white/70 font-mono">{cat.order}</td>
                        <td className="p-5 text-white font-bold">{cat.name}</td>
                        <td className="p-5">
                          <input type="text" defaultValue={cat.order} className="w-16 p-2 bg-[#111] border border-white/20 rounded-lg text-center text-white focus:outline-none focus:border-electric-blue" />
                        </td>
                        <td className="p-5">
                          <div className="flex gap-4 text-white/40">
                            <button className="hover:text-electric-blue transition-colors">↑</button>
                            <button className="hover:text-electric-blue transition-colors">↓</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="px-8 py-3 bg-electric-blue text-dark-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 transition-transform">
                  SAVE ORDER
                </button>
              </div>

            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative transform animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-8 right-10 text-white/20 hover:text-white transition-colors text-2xl">✕</button>
        
        <div className="mb-10">
          <div className="inline-block px-4 py-1.5 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-electric-blue mb-4">
            System Overwrite
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Edit <span className="text-electric-blue">Record</span></h2>
          <p className="text-white/30 text-xs mt-2 uppercase tracking-widest font-bold">Modifying Database Entry: {record.refNo || record.id}</p>
        </div>

        <div className="space-y-8 max-h-[55vh] overflow-y-auto pr-4 scrollbar-hide" data-lenis-prevent="true">
           {Object.keys(formData).map(key => {
             if (key === 'id' || key === 'date' || key === 'type' || key === 'slug' || key === 'price' || key === 'refNo' || key === 'status') return null;
             
             const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
             
             return (
               <div key={key}>
                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-3 ml-1">{label}</label>
                 {key === 'message' || key === 'leadDetails' || key === 'desc' || key === 'details' ? (
                   <textarea 
                     className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-electric-blue transition-all resize-none font-medium leading-relaxed"
                     rows={4}
                     value={formData[key] || ''}
                     onChange={e => setFormData({...formData, [key]: e.target.value})}
                   />
                 ) : (
                   <input 
                     className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-electric-blue transition-all font-bold"
                     value={formData[key] || ''}
                     onChange={e => setFormData({...formData, [key]: e.target.value})}
                   />
                 )}
               </div>
             )
           })}
        </div>

        <div className="flex justify-end gap-5 mt-12 pt-8 border-t border-white/5">
          <button onClick={onClose} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-white/40 font-black text-xs uppercase tracking-widest transition-all">Discard</button>
          <button onClick={() => onSave(formData)} className="px-10 py-4 bg-gradient-to-r from-electric-blue to-teal-green text-dark-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:scale-105 transition-transform">Commit Changes</button>
        </div>
      </div>
    </div>
  );
}
