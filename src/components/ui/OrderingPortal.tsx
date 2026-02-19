import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface OrderingPortalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ORDERING_URL = "https://www.sliceofitaly.ie/order#/restaurant/39400/collection/63948";

const OrderingPortal = ({ isOpen, onClose }: OrderingPortalProps) => {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (Blur & Darken) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-espresso/80 backdrop-blur-md"
                    />

                    {/* The Portal Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 z-[210] h-[98vh] bg-white rounded-t-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header / Controls */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-espresso flex items-center justify-between px-6 z-10">
                            <span className="text-alabaster font-body text-xs tracking-widest uppercase">
                                Secure Ordering Portal
                            </span>
                            <div className="flex items-center gap-4">
                                <a
                                    href={ORDERING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-terracotta text-xs font-bold hover:underline"
                                >
                                    Open in New Tab
                                </a>
                                <button
                                    onClick={onClose}
                                    className="text-alabaster hover:text-terracotta transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* The Iframe */}
                        <div className="w-full h-full pt-12 bg-white">
                            <iframe
                                src={ORDERING_URL}
                                className="w-full h-full border-0"
                                title="Ordering Interface"
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default OrderingPortal;
