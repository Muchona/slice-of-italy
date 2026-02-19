import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews, type Review } from '../../data/reviews';
import ReviewCard from '../ui/ReviewCard';

interface ReviewsProps {
    onOpenReview?: () => void;
    reviews?: Review[];
    limit?: number;
    onViewAll?: () => void;
}

const Reviews = ({ onOpenReview, reviews: propReviews = reviews, limit, onViewAll }: ReviewsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Filter reviews if limit is set
    const displayReviews = limit ? propReviews.slice(0, limit) : propReviews;

    // Calculate stats dynamically from ALL reviews
    const stats = useMemo(() => {
        const total = propReviews.length;
        const average = propReviews.reduce((acc, review) => acc + review.rating, 0) / total;
        const distribution = {
            5: propReviews.filter(r => r.rating === 5).length,
            4: propReviews.filter(r => r.rating === 4).length,
            3: propReviews.filter(r => r.rating === 3).length,
            2: propReviews.filter(r => r.rating === 2).length,
            1: propReviews.filter(r => r.rating === 1).length,
        };
        return { total, average: average.toFixed(1), distribution };
    }, [propReviews]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-espresso relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">

                {/* Header & Stats - Centered Stack */}
                <div className="w-full max-w-4xl mx-auto text-center mb-12 md:mb-16 space-y-8 md:space-y-12">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="font-display text-4xl md:text-5xl text-alabaster">
                            Guest Impressions
                        </h2>
                        <p className="text-alabaster/60 font-body text-lg">
                            Start your own tradition with us.
                        </p>
                    </motion.div>

                    {/* Stats Card - Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-lg mx-auto"
                    >
                        <div className="flex items-end justify-center gap-4 mb-6">
                            <span className="font-display text-6xl text-alabaster font-bold">
                                {stats.average}
                            </span>
                            <div className="mb-2 text-left">
                                <div className="flex gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="#E31B23" className="text-red-500" />
                                    ))}
                                </div>
                                <p className="text-xs text-alabaster/50 uppercase tracking-widest">
                                    Based on {stats.total} Reviews
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => {
                                const count = stats.distribution[rating as keyof typeof stats.distribution];
                                const percentage = (count / stats.total) * 100;

                                return (
                                    <div key={rating} className="flex items-center gap-3 text-xs">
                                        <span className="w-3 text-alabaster/50 font-bold">{rating}</span>
                                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-red-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={onOpenReview}
                                className="px-8 py-3 bg-white text-espresso font-bold uppercase tracking-wider text-sm rounded-full hover:bg-terracotta transition-colors"
                            >
                                Write a Review
                            </button>

                            {onViewAll && (
                                <button
                                    onClick={onViewAll}
                                    className="px-8 py-3 border border-white/20 text-alabaster font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white/10 transition-colors"
                                >
                                    View All Reviews
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Carousel - Centered & Full Width */}
                <div className="w-full relative px-4 md:px-12">

                    {/* Scroll Controls - Floating Absolutes for Centered Look */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-espresso/50 backdrop-blur-md border border-white/10 hover:bg-white/10 text-alabaster transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-espresso/50 backdrop-blur-md border border-white/10 hover:bg-white/10 text-alabaster transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Carousel Track */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {displayReviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="snap-center shrink-0 w-[85vw] md:w-[400px]"
                            >
                                <ReviewCard review={review} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Controls (Visible below on mobile) */}
                    <div className="flex justify-center gap-4 mt-6 md:hidden">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-alabaster transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-alabaster transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
