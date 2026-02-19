import { useBusinessOpen } from '../../hooks/useBusinessOpen';
import { Instagram, Facebook } from 'lucide-react';
import { getAssetPath } from '../../utils/paths';

const Footer = () => {
    const isOpen = useBusinessOpen();

    return (
        <footer id="location" className="bg-[#151311] py-12 md:py-16 border-t border-white/5 text-alabaster font-body">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12 border-b border-white/5 pb-12">

                {/* Brand - Full Width on Mobile */}
                <div className="col-span-2 md:col-span-1 space-y-6">
                    <div className="flex flex-col items-start gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                            <img src={getAssetPath("assets/logo.jpg")} alt="Slice of Italy" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-alabaster/80 text-sm leading-relaxed max-w-xs font-body">
                            Neapolitan pizza made the Irish way.<br />
                            Long-fermented dough, premium Irish & Italian produce, and our signature Monaghan twist.
                        </p>
                    </div>
                </div>

                {/* Location - Left Column */}
                <div className="col-span-1 space-y-4">
                    <h4 className="text-terracotta text-xs uppercase tracking-widest">Location</h4>
                    <p className="text-alabaster/80 text-sm leading-relaxed">
                        7 Glaslough St<br />
                        Roosky, Monaghan<br />
                        H18 D544
                    </p>
                    <p className="text-alabaster/80 text-sm font-bold">
                        <a href="tel:04794044" className="hover:text-terracotta transition-colors">047 94044</a>
                    </p>
                </div>

                {/* Hours - Right Column */}
                <div className="col-span-1 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <h4 className="text-terracotta text-xs uppercase tracking-widest">Hours</h4>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${isOpen ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                    {isOpen ? 'Open Now' : 'Closed'}
                                </span>
                            </div>
                        </div>
                        <p className="text-alabaster/80 text-sm leading-relaxed space-y-1">
                            <span className="block"><span className="w-20 inline-block text-alabaster/50">Mon - Wed:</span> Closed</span>
                            <span className="block"><span className="w-20 inline-block text-alabaster/50">Thursday:</span> 3pm - 10pm</span>
                            <span className="block"><span className="w-20 inline-block text-alabaster/50">Friday:</span> 12pm - 10pm</span>
                            <span className="block"><span className="w-20 inline-block text-alabaster/50">Saturday:</span> 12pm - 10:45pm</span>
                            <span className="block"><span className="w-20 inline-block text-alabaster/50">Sunday:</span> 12pm - 10pm</span>
                        </p>
                    </div>

                    {/* Onyx Badge - Moved Here */}

                </div>

                {/* Connect - Full Width on Mobile to accommodate horizontal layout */}
                <div className="col-span-2 md:col-span-1 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-4 mt-4 md:mt-0">
                    <div className="space-y-4">
                        <h4 className="text-terracotta text-xs uppercase tracking-widest hidden md:block">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Onyx Badge - Moved Here */}
                    <div className="flex flex-col items-end md:items-start gap-2">
                        <a
                            href="https://www.onyxandcode.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-100 transition-opacity"
                        >
                            <img src={getAssetPath("assets/onyx_logo.png")} alt="Onyx & Code" className="h-8 md:h-12 w-auto opacity-70" />
                        </a>
                        <span className="text-[10px] text-alabaster/60 uppercase tracking-widest font-body text-right md:text-left">
                            Designed by{' '}
                            <a href="https://www.onyxandcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">
                                Onyx & Code
                            </a>
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright Only */}
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-center opacity-40">
                <p className="text-[10px] text-alabaster text-center">
                    © 2026 Slice of Italy. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
