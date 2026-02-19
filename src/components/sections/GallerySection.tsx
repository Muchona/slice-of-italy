import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { galleryImages } from '../../data/gallery';
import Carousel3D from '../ui/Carousel3D';

const GallerySection = ({ onViewGallery }: { onViewGallery: () => void }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        // Debounce logic
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 100);
        };

        checkMobile();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section className="pt-24 pb-0 md:py-24 bg-espresso relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-espresso via-black/20 to-espresso pointer-events-none z-10" />

            {/* Header Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-20 mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div className="max-w-2xl text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-terracotta font-body tracking-widest text-sm uppercase font-bold mb-4 block"
                        >
                            Atmosphere
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl text-alabaster"
                        >
                            A Visual Feast
                        </motion.h2>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onClick={onViewGallery}
                        className="group flex items-center gap-2 text-alabaster hover:text-terracotta transition-colors self-start md:self-auto"
                    >
                        <span className="uppercase tracking-widest text-sm font-bold">View Full Gallery</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>

            {/* 3D Carousel */}
            <div className="relative z-20 w-full flex justify-center overflow-hidden">
                <div className="scale-75 md:scale-100 origin-center transition-transform duration-500">
                    <Carousel3D
                        images={galleryImages.slice(0, 8)}
                        radius={isMobile ? 210 : 500}
                        duration={60}
                        cardWidth={isMobile ? 120 : 200}
                        cardHeight={isMobile ? 180 : 280}
                    />
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
