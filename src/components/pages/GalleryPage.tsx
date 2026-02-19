import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../../data/gallery';

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openLightbox = (image: string) => setSelectedImage(image);
    const closeLightbox = () => setSelectedImage(null);

    const navigateLightbox = (direction: 'next' | 'prev') => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.indexOf(selectedImage);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % galleryImages.length;
        } else {
            newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        }
        setSelectedImage(galleryImages[newIndex]);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-espresso">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-alabaster"
                    >
                        Our Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-alabaster/60 font-body text-lg max-w-2xl mx-auto"
                    >
                        A glimpse into the heart of our kitchen and the soul of our restaurant.
                    </motion.p>
                </div>

                {/* Masonry Grid with Visual Flair */}
                <div className="columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.05,
                                type: "spring",
                                bounce: 0.3
                            }}
                            className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer mb-4"
                            onClick={() => openLightbox(image)}
                        >
                            {/* Overlay with subtle gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                            {/* Hover Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-50 group-hover:scale-100">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                </div>
                            </div>

                            <img
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-in-out filter brightness-90 group-hover:brightness-100"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-alabaster/50 hover:text-alabaster transition-colors p-2"
                            onClick={closeLightbox}
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-6 text-alabaster/50 hover:text-alabaster transition-colors p-4 hidden md:block"
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                        >
                            <ChevronLeft size={48} />
                        </button>
                        <button
                            className="absolute right-6 text-alabaster/50 hover:text-alabaster transition-colors p-4 hidden md:block"
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={selectedImage}
                            alt="Full screen view"
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
