export interface InternshipTrack {
  slug: string;
  title: string;
  icon: string;
  desc?: string;
}

export const internshipTracks: InternshipTrack[] = [
  { 
    slug: "ai-chatbot-development", 
    title: "AI & Chatbot Development", 
    icon: "🤖",
    desc: "Learn to build intelligent conversational agents using modern AI models and frameworks."
  },
  { 
    slug: "full-stack-web-development", 
    title: "Full Stack Web Development", 
    icon: "🌐",
    desc: "Master both frontend and backend technologies to build complete, scalable web applications."
  },
  { 
    slug: "mobile-app-development", 
    title: "Mobile App Development", 
    icon: "📱",
    desc: "Create cross-platform mobile applications for iOS and Android using modern frameworks."
  },
  { 
    slug: "iot-smart-devices", 
    title: "IoT & Smart Devices", 
    icon: "🛰️",
    desc: "Connect physical devices to the internet and build smart systems for automation."
  },
  { 
    slug: "robotics-automation", 
    title: "Robotics & Automation", 
    icon: "🤖",
    desc: "Design and build autonomous robots and automation systems for various industries."
  },
  { 
    slug: "ui-ux-design", 
    title: "UI/UX Design", 
    icon: "🎨",
    desc: "Learn the principles of user-centered design and create beautiful, functional interfaces."
  },
  { 
    slug: "api-integration-automation", 
    title: "API Integration & Automation", 
    icon: "⚙️",
    desc: "Connect different software systems and automate workflows using powerful APIs."
  },
  { 
    slug: "portfolio-resume-building", 
    title: "Portfolio + Resume Building", 
    icon: "💼",
    desc: "Create a professional portfolio and resume that stands out to recruiters in the tech industry."
  },
];
