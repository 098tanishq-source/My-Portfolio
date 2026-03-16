 import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

const services = [
    {
        title: "Clean, modern interfaces built with attention to spacing, typography and responsive layouts that work on every device.",
        label: "UI / UX Design",
        sublabel: "Figma · CSS · Layouts",
        progress: "33%"
    },
    {
        title: "Every project starts with understanding the brand tone and audience before a single line of code or design is created.",
        label: "Frontend Dev",
        sublabel: "React · Vite · JavaScript",
        progress: "66%"
    },
    {
        title: "I turn visual ideas into working websites — fast, clean and ready to scale with your business as it grows over time.",
        label: "Web Design",
        sublabel: "Responsive · Modern · Clean",
        progress: "100%"
    }
];

const Feedback = () => {
    const [index, setIndex] = useState(0);
    const total = services.length;

    const handleNext = () => setIndex((prev) => (prev + 1) % total);
    const handlePrev = () => setIndex((prev) => (prev - 1 + total) % total);

    const current = services[index];

    return (
        <section className="w-screen h-dvh p-8 flex flex-col justify-center items-center"
            style={{ background: '#080808' }}>
            <div className="w-full text-left">

                <p className="text-[.7rem] font-bold text-left"
                    style={{ color: '#cc1100', letterSpacing: '4px' }}>
                    WHAT I BRING
                </p>

                <div className="mt-4 mb-6">
                    <h1 style={{
                        color: '#f0ece4',
                        fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
                        lineHeight: '1.15',
                        fontWeight: '600',
                        maxWidth: '800px'
                    }}>
                        {current.title}
                    </h1>
                </div>

                <div className="flex items-center gap-4 mt-12">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#150000', border: '1px solid rgba(204,17,0,0.3)' }}>
                        <span style={{ color: '#cc1100', fontSize: '1.2rem' }}>◈</span>
                    </div>
                    <p style={{ color: 'rgba(240,236,228,0.5)', fontSize: '0.75rem', letterSpacing: '1px' }}>
                        {current.label}<br />
                        <span style={{ color: 'rgba(204,17,0,0.6)' }}>{current.sublabel}</span>
                    </p>
                </div>

                <div className="flex justify-between items-center mt-14">
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full"
                            style={{ border: '1px solid rgba(204,17,0,0.3)', background: 'transparent' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(204,17,0,0.1)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <IoMdArrowBack style={{ color: '#f0ece4', width: '1.5rem', height: '1.5rem' }} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full"
                            style={{ border: '1px solid rgba(204,17,0,0.3)', background: 'transparent' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(204,17,0,0.1)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <IoMdArrowForward style={{ color: '#f0ece4', width: '1.5rem', height: '1.5rem' }} />
                        </button>
                    </div>

                    <div className="relative h-[1px] w-70" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                            className="absolute h-full top-0 left-0 transition-all duration-500"
                            style={{ width: current.progress, background: '#cc1100', boxShadow: '0 0 8px rgba(204,17,0,0.5)' }}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Feedback;