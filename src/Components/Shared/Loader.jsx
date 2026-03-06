import React from 'react';

const Loader = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col justify-center items-center bg-dark-900 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

            <div className="relative group">
                {/* Outer Rotating Ring */}
                <div className="w-24 h-24 rounded-full border-t-2 border-l-2 border-primary/40 animate-spin transition-all duration-1000" />

                {/* Inner Pulsing Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-dark-800 rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
                    <div className="w-8 h-8 bg-primary rounded-sm rotate-45 animate-ping opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-primary font-serif italic font-bold text-xl tracking-tighter scale-90">MC</h2>
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute -top-4 -left-4 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75" />
                <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-300" />
            </div>

            {/* Loading text with typewriter effect-like animation */}
            <div className="mt-12 text-center">
                <span className="text-light/40 font-sans uppercase tracking-[0.5em] text-[10px] md:text-xs animate-pulse">
                    Preparing Experience
                </span>
                <div className="mt-2 flex justify-center gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
