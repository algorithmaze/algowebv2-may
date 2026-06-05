import { useEffect, useState, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let particles: Particle[] = [];
    const colors = ['#00E5FF', '#00FFC6', '#ffffff'];

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);

      // Position inner dot instantly (offset centered for 16px wide logo)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 8}px, 0)`;
      }

      // Add a particle when mouse moves
      if (Math.random() < 0.4) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5, // drift upwards slightly
          size: Math.random() * 3 + 1,
          alpha: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    // Dynamic hover detection with custom cursor text support
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, select, input, textarea, .cursor-pointer, [role="button"]');
      
      if (interactiveEl) {
        setIsHovered(true);
        // Look for custom text on the interactive element or its parent
        const text = interactiveEl.getAttribute('data-cursor') || interactiveEl.parentElement?.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation Loop for Ring, Trail, and Particle System
    const animate = () => {
      // 1. Smoothly interpolate ring position (lag effect)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      }

      // 2. Render Particle System on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw and update particles
          particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02; // fade rate

            if (p.alpha <= 0) {
              particles.splice(index, 1);
            } else {
              ctx.save();
              ctx.globalAlpha = p.alpha;
              ctx.shadowBlur = 8;
              ctx.shadowColor = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.fill();
              ctx.restore();
            }
          });
        }
      }

      requestAnimationFrame(animate);
    };

    const animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* 2D Canvas for Particle Trails */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />
      
      {/* Inner Neon Dot / Logo */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center ${
          isClicked ? 'scale-75' : ''
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <img 
          src="/images/amlogo.png" 
          alt="Logo Cursor" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,229,255,0.9)] animate-pulse"
        />
      </div>
      
      {/* Outer Glowing Ring with Floating Label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9998] transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'scale-150 border-dashed border-2 border-[#00FFC6] bg-[#00FFC6]/8 shadow-[0_0_25px_rgba(0,255,198,0.4)] animate-[spin_6s_linear_infinite]'
            : isClicked
            ? 'scale-75 border-2 border-[#00E5FF] bg-[#00E5FF]/20 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
            : 'border-dashed border-2 border-[#00E5FF]/45 bg-[#00E5FF]/4 shadow-[0_0_12px_rgba(0,229,255,0.08)]'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {/* Floating action text bubble displayed adjacent to the cursor */}
        {cursorText && (
          <div className="absolute left-8 px-2.5 py-1 bg-[#06080D]/95 border border-[#00FFC6]/40 text-[#00FFC6] text-[8px] font-black tracking-[0.2em] uppercase rounded-md shadow-[0_6px_16px_rgba(0,0,0,0.6)] pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-75 slide-in-from-left-2 duration-150">
            {cursorText}
          </div>
        )}
      </div>
    </>
  );
}
