import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Carousel3D = ({
    images,
    radius = 550,
    duration = 60,
    cardWidth = 250,
    cardHeight = 350
}: {
    images: string[];
    radius?: number;
    duration?: number;
    cardWidth?: number;
    cardHeight?: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const count = images.length;
    const rotation = useMotionValue(0);
    const angle = 360 / count;

    // Use a ref to hold the animation controls so we can stop/start it
    const animationRef = useRef<any>(null);

    useEffect(() => {
        // Continuous rotation animation
        const control = animate(rotation, -360, {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            onPlay: () => {
                // This ensures smooth continuation logic if we were using keyframes, 
                // but with raw value animation from 0 to -360, it handles wrapping automatically?
                // Actually, to loop seamlessly, we need to reset modulo 360.
                // But simpler is to let it rotate indefinitely?
                // No, standard 'animate' with repeat works well.
            }
        });

        animationRef.current = control;

        return () => control.stop();
    }, [duration, rotation]);

    useEffect(() => {
        if (animationRef.current) {
            if (isHovered) {
                animationRef.current.pause();
            } else {
                animationRef.current.play();
            }
        }
    }, [isHovered]);

    // Handle manual interaction
    const handleCardClick = (index: number) => {
        if (animationRef.current) {
            animationRef.current.stop();
        }

        // Calculate target rotation to bring this card to front (0deg)
        const currentRotation = rotation.get();
        const targetMod = (-index * angle) % 360;
        const currentMod = currentRotation % 360;
        let diff = targetMod - currentMod;

        // Shortest path logic
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        const adjustedTarget = currentRotation + diff;

        animate(rotation, adjustedTarget, {
            type: "spring",
            stiffness: 50,
            damping: 20
        });
    };

    const transform = useTransform(rotation, (value) => `rotateY(${value}deg)`);

    return (
        <div className="relative flex justify-center items-center h-[400px] md:h-[500px] w-full perspective-[1200px] py-10">

            {/* 3D Container */}
            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
                <motion.div
                    style={{
                        transform,
                        transformStyle: "preserve-3d",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute flex items-center justify-center [transform-style:preserve-3d]"
                >
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className="absolute flex items-center justify-center [backface-visibility:visible] origin-center"
                            style={{
                                width: `${cardWidth}px`,
                                height: `${cardHeight}px`,
                                transform: `rotateY(${angle * i}deg) translateZ(${radius}px)`,
                            }}
                            onClick={() => handleCardClick(i)}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, y: -20, filter: "brightness(1.1)" }}
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-espresso/90 backdrop-blur-sm cursor-pointer"
                            >
                                {/* Image */}
                                <img
                                    src={src}
                                    alt={`Gallery ${i}`}
                                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                                />

                                {/* Reflection/Gloss */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Vignette Overlay Left */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-espresso to-transparent z-10 pointer-events-none" />
            {/* Vignette Overlay Right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-espresso to-transparent z-10 pointer-events-none" />
        </div>
    );
};

export default Carousel3D;
