import { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HeroSequenceProps {
  totalFrames?: number;
  progress: MotionValue<number>;
}

export default function HeroSequence({ totalFrames = 60, progress }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = (1000 + (i * 2)).toString();
      img.src = `/algoimg/web0${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        
        // Initial render trigger
        if (i === 0 && canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          if (context) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let renderWidth = canvasWidth;
            let renderHeight = canvasHeight;
            let renderX = 0;
            let renderY = 0;

            if (canvasRatio > imgRatio) {
              renderHeight = canvasWidth / imgRatio;
              renderY = (canvasHeight - renderHeight) / 2;
            } else {
              renderWidth = canvasHeight * imgRatio;
              renderX = (canvasWidth - renderWidth) / 2;
            }

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(img, renderX, renderY, renderWidth, renderHeight);
          }
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, [totalFrames]);

  // Handle Canvas Drawing based on Framer Motion's smooth progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;

    // Helper to draw image mimicking 'object-fit: cover'
    const drawFrame = (img: HTMLImageElement) => {
      if (!img.complete) return;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let renderWidth = canvasWidth;
      let renderHeight = canvasHeight;
      let renderX = 0;
      let renderY = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = canvasWidth / imgRatio;
        renderY = (canvasHeight - renderHeight) / 2;
      } else {
        renderWidth = canvasHeight * imgRatio;
        renderX = (canvasWidth - renderWidth) / 2;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, renderX, renderY, renderWidth, renderHeight);
    };

    let animationFrameId: number;

    const renderLatestFrame = (latest: number) => {
      const images = imagesRef.current;
      // Calculate which frame to draw
      const targetIndex = Math.min(totalFrames, Math.floor(latest * totalFrames));

      // SEAMLESS FALLBACK: If the exact target frame isn't loaded yet,
      // rapidly scan backwards and draw the closest loaded frame instead of flashing blank space.
      let bestIndex = targetIndex;
      while (bestIndex >= 0 && (!images[bestIndex] || !images[bestIndex].complete)) {
        bestIndex--;
      }

      if (bestIndex >= 0) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(() => {
          drawFrame(images[bestIndex]);
        });
      }
    };

    // Subscribe to framer-motion progress
    const unsubscribe = progress.on("change", (latest) => {
      renderLatestFrame(latest);
    });

    // Resize canvas to window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderLatestFrame(progress.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [totalFrames, progress, loaded]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-dark-black z-0">
      {/* SEAMLESS LOADER: Thin top loading bar instead of full-screen blocker */}
      {loaded < totalFrames + 1 && (
        <div className="absolute top-0 left-0 h-1 bg-electric-blue z-50 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.8)]" style={{ width: `${(loaded / (totalFrames + 1)) * 100}%` }} />
      )}
      
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      {/* Dark gradient overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-black/60 via-transparent to-dark-black/80 pointer-events-none" />
    </div>
  );
}
