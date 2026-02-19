import InteractiveSlice from '../3d/InteractiveSlice';

const MenuPreview = () => {
    return (
        <section id="menu-preview" className="relative w-full py-20 bg-espresso">
            {/* Section Header */}
            <div className="container mx-auto px-6 text-center mb-12">
                <span className="font-body text-terracotta tracking-widest uppercase text-sm">Taste the Heritage</span>
                <h2 className="font-display text-4xl md:text-6xl text-alabaster mt-2">
                    Culinary <span className="italic text-sage">Masterpieces</span>
                </h2>
                <div className="w-24 h-[1px] bg-terracotta/50 mx-auto mt-6"></div>
            </div>

            {/* 3D Interactive Component */}
            <div className="w-full relative z-10">
                <InteractiveSlice />
            </div>


        </section>
    );
};

export default MenuPreview;
