import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '../ui/ThreeDCard';
// import { Pizza, Wine, Coffee, UtensilsCrossed } from 'lucide-react'; // Commented out to avoid potential crashes, using text for now

const categories = [
    { id: 'all', label: 'All' },
    { id: 'pizza', label: 'Pizze' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'antipasti', label: 'Antipasti' },
    { id: 'dolci', label: 'Dolci' },
];

const menuItems = [
    {
        id: 1,
        title: "Margherita DOC",
        price: "$14",
        description: "San Marzano tomato, buffalo mozzarella, fresh basil, extra virgin olive oil.",
        category: "pizza",
        color: "bg-red-900/40"
    },
    {
        id: 2,
        title: "Truffle Carbonara",
        price: "$24",
        description: "Fresh tagliatelle, guanciale, pecorino romano, black truffle shavings.",
        category: "pasta",
        color: "bg-yellow-900/40"
    },
    {
        id: 3,
        title: "Prosciutto & Fig",
        price: "$18",
        description: "Parma ham, fresh figs, gorgonzola dolce, walnuts, honey drizzle.",
        category: "antipasti",
        color: "bg-orange-900/40"
    },
    {
        id: 4,
        title: "Wild Mushroom",
        price: "$19",
        description: "Roasted wild mushrooms, thyme, truffle oil, garlic cream base.",
        category: "pizza",
        color: "bg-stone-800"
    },
    {
        id: 5,
        title: "Osso Buco",
        price: "$32",
        description: "Slow-braised veal shanks, saffron risotto, gremolata.",
        category: "pasta", // Technically secondi, but grouping for simplicity or allow 'pasta' to be 'mains'
        color: "bg-amber-900/40"
    },
    {
        id: 6,
        title: "Classic Tiramisu",
        price: "$10",
        description: "Mascarpone cream, espresso-soaked savoiardi, cocoa powder.",
        category: "dolci",
        color: "bg-stone-900"
    }
];

interface MenuGridProps {
    onOpenOrder: () => void;
}

const MenuGrid = ({ onOpenOrder }: MenuGridProps) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    return (
        <section id="menu" className="relative w-full py-12 md:py-20 bg-espresso text-alabaster">
            <div className="w-full max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-display text-5xl md:text-6xl mb-4">Our Menu</h2>
                    <div className="w-24 h-[1px] bg-terracotta mx-auto mb-8"></div>

                    {/* Category Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                                    px-6 py-2 rounded-full font-body text-sm font-medium tracking-wide transition-all duration-300 border
                                    ${activeCategory === cat.id
                                        ? 'bg-terracotta text-white border-terracotta shadow-lg shadow-terracotta/20'
                                        : 'bg-white/5 text-alabaster/60 border-white/10 hover:border-white/30 hover:text-alabaster'
                                    }
                                `}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={item.id}
                            >
                                <CardContainer containerClassName="w-full h-full !py-0 block">
                                    <CardBody className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-terracotta/20 w-auto h-auto">
                                        {/* Image Placeholder - Pops out */}
                                        <CardItem translateZ="50" className="w-full">
                                            <div className={`w-full h-64 ${item.color} flex items-center justify-center transition-colors duration-300 group-hover:bg-opacity-60`}>
                                                <span className="text-white/20 font-display italic text-2xl">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </CardItem>

                                        {/* Content */}
                                        <div className="p-6">
                                            <CardItem translateZ="40" className="flex justify-between items-baseline mb-2">
                                                <h3 className="font-display text-2xl text-alabaster group-hover:text-terracotta transition-colors">
                                                    {item.title}
                                                </h3>
                                                <span className="font-body text-lg text-terracotta font-medium">
                                                    {item.price}
                                                </span>
                                            </CardItem>

                                            <CardItem translateZ="30" as="p" className="font-body text-alabaster/70 text-sm leading-relaxed">
                                                {item.description}
                                            </CardItem>

                                            <CardItem translateZ="20" className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                                                <span className="text-xs font-bold uppercase tracking-widest text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Add to Order
                                                </span>
                                            </CardItem>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Buttons */}
                <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button
                        onClick={onOpenOrder}
                        className="px-8 py-3 bg-terracotta text-white font-body font-medium rounded-full hover:bg-terracotta/90 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-terracotta/20"
                    >
                        Order Now
                    </button>
                    <button
                        onClick={onOpenOrder}
                        className="px-8 py-3 bg-transparent border border-white/20 text-white font-body font-medium rounded-full hover:bg-white/10 transition-transform hover:scale-105 active:scale-95"
                    >
                        View Full Menu
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MenuGrid;
