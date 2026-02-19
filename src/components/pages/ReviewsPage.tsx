import { motion } from 'framer-motion';
import { type Review } from '../../data/reviews'; // Rename import
import ReviewCard from '../ui/ReviewCard';
import { Star } from 'lucide-react';

interface ReviewsPageProps {
    onOpenReview: () => void;
    reviews: Review[];
}

const ReviewsPage = ({ onOpenReview, reviews }: ReviewsPageProps) => {
    // Calculate stats dynamicall (reused logic - could be extracted to hook)
    const stats = {
        total: reviews.length,
        average: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
        distribution: {
            5: reviews.filter(r => r.rating === 5).length,
            4: reviews.filter(r => r.rating === 4).length,
            3: reviews.filter(r => r.rating === 3).length,
            2: reviews.filter(r => r.rating === 2).length,
            1: reviews.filter(r => r.rating === 1).length,
        }
    };

    return (
        <div className="min-h-screen bg-espresso pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h1 className="font-display text-5xl md:text-7xl text-alabaster">
                        Guest Reviews
                    </h1>
                    <p className="text-alabaster/60 font-body text-lg max-w-2xl mx-auto">
                        See what our guests are saying about their Slice of Italy experience.
                    </p>

                    {/* Stats Summary */}
                    <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 rounded-full px-8 py-3 mt-8">
                        <span className="font-display text-3xl text-alabaster font-bold">
                            {stats.average}
                        </span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill="#E31B23" className="text-red-500" />
                            ))}
                        </div>
                        <span className="text-alabaster/40 text-sm uppercase tracking-wider ml-2 border-l border-white/10 pl-4">
                            {stats.total} Reviews
                        </span>
                    </div>

                    <div className="pt-8">
                        <button
                            onClick={onOpenReview}
                            className="px-8 py-4 bg-white text-espresso font-bold uppercase tracking-wider text-sm rounded-full hover:bg-terracotta hover:text-white transition-colors shadow-xl"
                        >
                            Write a Review
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <ReviewCard review={review} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
