import { motion, MotionValue, useTransform } from "framer-motion";

interface FloatingTextProps {
  leftText: React.ReactNode;
  rightText: React.ReactNode;
  alignLeft?: boolean;
  progress: MotionValue<number>;
  start: number;
  end: number;
  isLast?: boolean;
  reverse?: boolean;
}

export default function FloatingText({ 
  leftText, 
  rightText, 
  alignLeft = false, 
  progress, 
  start, 
  end, 
  isLast = false,
  reverse = false
}: FloatingTextProps) {
  const range = end - start;
  const fadeInEnd = start + range * 0.25;
  const fadeOutStart = end - range * 0.25;
  const fadeOutEnd = end;

  // Opacity fade in/out
  const opacity = useTransform(
    progress,
    [start - 0.05, fadeInEnd, isLast ? 1 : fadeOutStart, isLast ? 1 : fadeOutEnd + 0.05],
    [0, 1, 1, isLast ? 1 : 0]
  );
  
  // Left element animation (Heading)
  const leftX = useTransform(
    progress,
    [start - 0.05, fadeInEnd, isLast ? 1 : fadeOutStart, isLast ? 1 : fadeOutEnd + 0.05],
    [reverse ? 50 : -50, 0, 0, isLast ? 0 : (reverse ? 50 : -50)]
  );
  
  // Right element animation (Box)
  const rightX = useTransform(
    progress,
    [start - 0.05, fadeInEnd, isLast ? 1 : fadeOutStart, isLast ? 1 : fadeOutEnd + 0.05],
    [reverse ? -50 : 50, 0, 0, isLast ? 0 : (reverse ? -50 : 50)]
  );

  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10 pointer-events-auto">
        {/* On mobile, stack normally. On md+, apply grid and handle reverse. */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${reverse ? "md:max-h-screen" : ""}`}>
          
          {/* Heading Element */}
          <motion.div 
            style={{ x: leftX }}
            className={`flex flex-col relative ${reverse ? "md:order-2" : "md:order-1"} ${alignLeft ? 'items-start text-left' : 'items-center text-center md:items-start md:text-left'}`}
          >
            {/* Subtle glow behind text to ensure readability on any frame without hiding the background */}
            <div className="absolute inset-0 bg-gradient-radial from-dark-black/60 to-transparent blur-2xl -z-10 scale-150 pointer-events-none" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-sans tracking-tight text-white leading-[1.1] mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              {leftText}
            </h2>
          </motion.div>

          {/* Description Box Element */}
          <motion.div 
            style={{ x: rightX }}
            className={`flex flex-col justify-center ${reverse ? "md:order-1" : "md:order-2"}`}
          >
            {/* The professional Glass UI container */}
            <div className="glass-ui relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,255,255,0.15)] transition-all duration-700 hover:-translate-y-1">
              {/* Subtle neural grid background pattern inside the glass card */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMCwyMjksMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-30 group-hover:opacity-70 transition-opacity duration-700 mix-blend-screen" />
              
              <div className="relative z-10">
                <div className="text-lg sm:text-xl md:text-2xl font-light text-cyan-50/90 leading-relaxed font-heading">
                  {rightText}
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
}
