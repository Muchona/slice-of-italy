import { Star } from 'lucide-react';
import type { Review } from '../../data/reviews';

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className="min-w-[300px] md:min-w-[350px] p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 group select-none">
            {/* Header: Author & Rating */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-display text-lg text-alabaster group-hover:text-red-500 transition-colors">
                        {review.author}
                    </h4>
                    <span className="text-xs text-alabaster/40 font-body">{review.date}</span>
                </div>
                {/* Platform Icon (Google 'G') */}
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                    G
                </div>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "#E31B23" : "none"} // Brand Red for stars
                        className={i < review.rating ? "text-red-500" : "text-white/20"}
                    />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-sm text-alabaster/80 leading-relaxed font-body mb-4">
                "{review.text}"
            </p>

            {/* Attached Image */}
            {review.image && (
                <div className="rounded-lg overflow-hidden h-40 w-full mt-4 border border-white/10">
                    <img
                        src={review.image}
                        alt={`Review by ${review.author}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
