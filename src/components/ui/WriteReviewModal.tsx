import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, Image as ImageIcon } from 'lucide-react';

interface ReviewData {
    name: string;
    rating: number;
    text: string;
    image: File | null;
}

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ReviewData) => void;
}

const WriteReviewModal = ({ isOpen, onClose, onSubmit }: WriteReviewModalProps) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Submit the review data
        onSubmit({
            name,
            rating,
            text: (e.target as any).querySelector('textarea').value,
            image
        });

        // Close and reset
        setTimeout(() => {
            onClose();
            setRating(0);
            setImage(null);
            setName('');
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#1a1816] border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl pointer-events-auto relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-alabaster/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative">
                                <h3 className="font-display text-2xl text-alabaster mb-1">Share your experience</h3>
                                <p className="text-alabaster/50 text-sm mb-6 font-body">Tell us about your visit to Slice of Italy.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <input
                                        type="text"
                                        placeholder="Your Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-alabaster placeholder:text-alabaster/30 focus:outline-none focus:border-red-500/50 transition-colors font-body text-sm"
                                        required
                                    />

                                    {/* Star Rating */}
                                    <div className="flex justify-center gap-2 mb-8">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(star)}
                                                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    size={32}
                                                    fill={star <= (hoverRating || rating) ? "#E31B23" : "none"}
                                                    className={star <= (hoverRating || rating) ? "text-red-500" : "text-white/20"}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Text Area */}
                                    <textarea
                                        placeholder="What did you enjoy most?"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-alabaster placeholder:text-alabaster/30 focus:outline-none focus:border-red-500/50 transition-colors min-h-[120px] resize-none font-body text-sm"
                                    />

                                    {/* Image Upload */}
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full h-12 border border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-alabaster/60 hover:text-alabaster hover:border-white/40 hover:bg-white/5 transition-all group"
                                        >
                                            {image ? (
                                                <>
                                                    <ImageIcon size={18} className="text-green-500" />
                                                    <span className="text-sm text-green-500 font-bold">{image.name}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={18} className="group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-bold uppercase tracking-wider">Add Photos</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-espresso font-bold uppercase tracking-widest py-4 rounded-full hover:bg-terracotta hover:text-white transition-colors"
                                    >
                                        Post Review
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WriteReviewModal;
