import { useRef, useState, useEffect, useMemo } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { getAssetPath } from '../../utils/paths';

const FrameSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const totalFrames = 40;
    const startFrame = 1;
    // const frameCount = totalFrames - startFrame + 1; // Removed unused variable

    // Use useScroll on the container to track when it's in view
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // Track from start of container to end of container
    });

    // Generate valid frame numbers, handling the skip logic once
    const frames = useMemo(() => {
        const validFrames: number[] = [];
        for (let i = startFrame; i <= totalFrames; i++) {
            if (i === 11 || i === 12) continue; // Skip missing frames
            validFrames.push(i);
        }
        return validFrames;
    }, []);

    // Preload images (optional but good practice to ensure they are in cache)
    useEffect(() => {
        frames.forEach(frame => {
            const img = new Image();
            img.src = getAssetPath(`assets/Pizza_animation/ezgif-frame-${frame.toString().padStart(3, '0')} 1.png`);
        });
    }, [frames]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const rawIndex = Math.floor(latest * (frames.length - 1));
        const safeIndex = Math.max(0, Math.min(rawIndex, frames.length - 1));
        const actualFrame = frames[safeIndex];

        // Only update state if frame changed to avoid unnecessary renders
        if (actualFrame !== currentFrame) {
            setCurrentFrame(actualFrame);
        }
    });

    return (
        // 1. Scroll Track (Height determines animation duration)
        <div ref={containerRef} className="relative w-full h-[150vh] md:h-[300vh] bg-espresso">
            {/* 2. Sticky Container (Pins the pizza to the screen) */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

                {/* 3. Pizza Container (Increased Size) */}
                <div className="relative w-[90vw] md:w-[800px] aspect-square flex items-center justify-center">
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-terracotta/20 blur-3xl rounded-full -z-10 scale-90" />

                    {/* Pre-rendered Image Stack */}
                    {frames.map((frame) => (
                        <img
                            key={frame}
                            src={getAssetPath(`assets/Pizza_animation/ezgif-frame-${frame.toString().padStart(3, '0')} 1.png`)}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl will-change-transform"
                            style={{
                                display: currentFrame === frame ? 'block' : 'none',
                            }}
                            loading="eager"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrameSequence;
