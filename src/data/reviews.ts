export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
    platform: 'google' | 'facebook';
    image?: string;
}

export const reviews: Review[] = [
    {
        id: '1',
        author: 'Sarah O\'Connor',
        rating: 5,
        text: 'Absolutely the best pizza in Monaghan! The dough is incredible - light, airy, and full of flavour. You can really taste the quality of the ingredients. A true slice of Italy!',
        date: '2 weeks ago',
        platform: 'google'
    },
    {
        id: '2',
        author: 'Michael Murphy',
        rating: 5,
        text: 'Stumbled upon this gem by accident and I\'m so glad I did. The "Nduja & Honey" vibe is unmatched. Great atmosphere and friendly staff too.',
        date: '1 month ago',
        platform: 'google'
    },
    {
        id: '3',
        author: 'Emma Walsh',
        rating: 5,
        text: 'Finally, proper Neapolitan pizza! The crust is perfection. Loved the dips as well. Highly recommend booking a table as it gets busy.',
        date: '3 weeks ago',
        platform: 'google'
    },
    {
        id: '4',
        author: 'David Kelly',
        rating: 4,
        text: 'Pizza was delicious, very authentic. Service was a little slow but it was a busy Saturday night. Worth the wait though!',
        date: '2 months ago',
        platform: 'google'
    },
    {
        id: '5',
        author: 'Ciara Byrne',
        rating: 5,
        text: 'Hands down the best takeaway in town. It travels really well which is rare for this style of pizza. 10/10.',
        date: '1 week ago',
        platform: 'google'
    }
];

export const ratingStats = {
    average: 4.8,
    total: 142,
    distribution: {
        5: 120,
        4: 18,
        3: 3,
        2: 1,
        1: 0
    }
};
