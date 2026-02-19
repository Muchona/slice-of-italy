const Story = () => {
    return (
        <section id="story" className="relative w-full py-16 md:py-24 bg-espresso text-alabaster overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-16">

                {/* Text Content */}
                <div className="flex-1 space-y-8">
                    <h2 className="font-display text-4xl md:text-5xl leading-tight">
                        From <span className="text-sage italic">Naples</span> to <br />
                        <span className="text-terracotta">Dublin</span>.
                    </h2>
                    <p className="font-body text-base md:text-lg text-alabaster/80 leading-relaxed">
                        We don't just import ingredients; we import culture. Our flour is milled in the shadow of Mount Vesuvius,
                        and our tomatoes are hand-picked in the San Marzano valley.
                    </p>
                    <p className="font-body text-sm md:text-base text-alabaster/60 leading-relaxed">
                        Every slice tells a story of tradition, patience, and the relentless pursuit of perfection.
                        Welcome to the new standard of Italian dining.
                    </p>
                    <button className="px-8 py-3 border border-alabaster/20 hover:border-terracotta hover:text-terracotta transition-colors rounded-sm uppercase tracking-widest text-xs">
                        Read Our Journey
                    </button>
                </div>

                {/* Visual / Image Placeholder (Abstract) */}
                <div className="flex-1 w-full h-[300px] md:h-[500px] bg-white/5 rounded-sm relative overflow-hidden backdrop-blur-sm border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sage/20 to-terracotta/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-alabaster/20 font-display text-6xl opacity-20 select-none">
                        1985
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Story
