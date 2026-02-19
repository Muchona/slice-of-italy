
import { motion } from 'framer-motion';
import { useBusinessOpen } from '../../hooks/useBusinessOpen';

const Locations = () => {
    const isOpen = useBusinessOpen();

    const StatusIndicator = () => (
        <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className={`text-xs font-bold uppercase tracking-wide ${isOpen ? 'text-green-600' : 'text-red-500'}`}>
                {isOpen ? 'Open' : 'Closed'}
            </span>
        </div>
    );

    return (
        <section id="location" className="relative w-full py-20 bg-espresso text-alabaster">
            <div className="container mx-auto px-6 md:px-12">

                {/* Section Header */}
                <h2 className="font-display text-5xl md:text-6xl mb-12 text-center md:text-left">Locations</h2>

                {/* Map Container */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:block h-auto md:h-[600px]">

                    {/* Google Map Iframe */}
                    <div className="relative w-full h-[300px] md:absolute md:inset-0 md:h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src="https://maps.google.com/maps?q=7%20Glaslough%20Street%2C%20Monaghan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative w-full md:absolute md:top-8 md:right-8 md:bottom-8 md:w-[380px] bg-white/95 backdrop-blur-md md:rounded-2xl shadow-xl p-8 overflow-y-auto text-espresso z-10"
                    >
                        {/* Title */}
                        <h3 className="font-display text-3xl mb-1 font-bold">Slice of Italy</h3>

                        {/* Address */}
                        <div className="space-y-1 mb-6 text-sm font-body text-gray-600">
                            <p>7, Glaslough Street, Roosky Monaghan,</p>
                            <p>H18 D544</p>
                            <p>Phone: +3534794044</p>
                        </div>

                        {/* Delivery Hours */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold font-body text-sm">Delivery Hours</h4>
                                <StatusIndicator />
                            </div>
                            <ul className="text-xs text-gray-500 space-y-1 font-body">
                                <li className="flex justify-between"><span>Monday - Wednesday</span> <span>Closed</span></li>
                                <li className="flex justify-between"><span>Thursday</span> <span>3PM - 10PM</span></li>
                                <li className="flex justify-between"><span>Friday</span> <span>12PM - 10PM</span></li>
                                <li className="flex justify-between"><span>Saturday</span> <span>12PM - 10:45PM</span></li>
                                <li className="flex justify-between"><span>Sunday</span> <span>12PM - 10PM</span></li>
                            </ul>
                        </div>

                        {/* Collection Hours */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold font-body text-sm">Collection Hours</h4>
                                <StatusIndicator />
                            </div>
                            <ul className="text-xs text-gray-500 space-y-1 font-body">
                                <li className="flex justify-between"><span>Monday - Wednesday</span> <span>Closed</span></li>
                                <li className="flex justify-between"><span>Thursday</span> <span>4PM - 10PM</span></li>
                                <li className="flex justify-between"><span>Friday</span> <span>12PM - 10PM</span></li>
                                <li className="flex justify-between"><span>Saturday</span> <span>12PM - 10:45PM</span></li>
                                <li className="flex justify-between"><span>Sunday</span> <span>12PM - 10PM</span></li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <button className="flex-1 px-6 py-3 bg-black text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-terracotta transition-colors shadow-lg">
                                Contact Us
                            </button>
                            <a
                                href="https://maps.google.com/maps?q=7%20Glaslough%20Street%2C%20Monaghan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 text-xs font-bold underline hover:text-terracotta transition-colors text-center"
                            >
                                Get directions
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Locations;
