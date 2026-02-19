import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import { getAssetPath } from '../../utils/paths'

const HeroSection = ({ onOpenOrder }: { onOpenOrder: () => void }) => {
    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-espresso">
            {/* Background Image / Curtain */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-espresso/40 z-10" />
                <img
                    src={getAssetPath("assets/hero_image.jpg")}
                    alt="Slice of Italy"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* 3D Sparkles Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <Sparkles
                        count={200}
                        scale={12}
                        size={4}
                        speed={0.4}
                        opacity={0.4}
                        color="#E31B23" // Terracotta Red
                    />
                </Canvas>
            </div>

            {/* Hero Content */}
            <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <h1 className="font-display font-black text-4xl md:text-8xl text-alabaster tracking-tight">
                        SLICE OF <span className="text-terracotta italic">ITALY</span>
                    </h1>
                    <p className="mt-6 font-body text-lg md:text-xl text-alabaster/80 max-w-lg mx-auto">
                        Modern Luxury meets Neapolitan Heritage.
                    </p>

                    <motion.button
                        onClick={onOpenOrder}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-10 px-8 py-3 bg-terracotta text-alabaster font-medium rounded-sm shadow-[0_0_20px_rgba(227,27,35,0.4)] hover:shadow-[0_0_30px_rgba(227,27,35,0.6)] transition-all"
                    >
                        Order Now
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-alabaster/50 text-sm flex flex-col items-center gap-2"
            >
                <span>Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-alabaster/50 to-transparent" />
            </motion.div>
        </section>
    )
}

export default HeroSection
