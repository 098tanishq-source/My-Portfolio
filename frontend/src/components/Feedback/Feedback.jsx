import { useState, useEffect, useRef } from "react";
import bgVid from "../../assets/waves.mp4";

const slides = [
    {
        num: "01", label: "UI / UX DESIGN", sub: "Figma · CSS · Layouts",
        title: "Clean,\nmodern\ninterfaces.",
        desc: "Built with attention to spacing, typography and responsive layouts that work on every device.",
    },
    {
        num: "02", label: "FRONTEND DEV", sub: "React · Vite · JavaScript",
        title: "Fast,\nscalable\ncode.",
        desc: "Every project starts with understanding the brand before a single line of code is created.",
    },
    {
        num: "03", label: "WEB DESIGN", sub: "Responsive · Modern · Clean",
        title: "Visual\nideas,\nlive sites.",
        desc: "I turn designs into working websites — fast, clean and ready to scale with your business.",
    },
    {
        num: "04", label: "ANIMATIONS", sub: "GSAP · Motion · CSS",
        title: "Sites\nthat feel\nalive.",
        desc: "Smooth scroll triggers, hover effects and entrance reveals that make every interaction premium.",
    },
];

const AUTO = 4000;

const Feedback = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [out, setOut] = useState(false);
    const timerRef = useRef(null);
    const borderRef = useRef(null);
    const total = slides.length;

    const goTo = (i, manual = false) => {
        setOut(true);
        setTimeout(() => {
            setActive(((i % total) + total) % total);
            setOut(false);
        }, 300);
        if (manual) {
            setPaused(true);
            clearInterval(timerRef.current);
            setTimeout(() => setPaused(false), 8000);
        }
    };

    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(() => goTo(active + 1), AUTO);
        return () => clearInterval(timerRef.current);
    }, [paused, active]);

    // JS canvas spinning border — guaranteed to work everywhere
    useEffect(() => {
        const canvas = borderRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let angle = 0;
        let aid;

        const fit = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        fit();
        window.addEventListener('resize', fit);

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const r = 28; // border radius
            ctx.clearRect(0, 0, w, h);

            // rotating conic gradient center
            const cx = w / 2, cy = h / 2;
            const grad = ctx.createConicGradient(angle, cx, cy);
            grad.addColorStop(0,    '#00c9a7');
            grad.addColorStop(0.2,  '#00aaff');
            grad.addColorStop(0.4,  '#00e5cc');
            grad.addColorStop(0.6,  'transparent');
            grad.addColorStop(0.8,  '#00c9a7');
            grad.addColorStop(1,    '#00e5cc');

            // draw thick outer rounded rect
            ctx.save();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 3;
            ctx.shadowColor = '#00c9a7';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(w - r, 0);
            ctx.quadraticCurveTo(w, 0, w, r);
            ctx.lineTo(w, h - r);
            ctx.quadraticCurveTo(w, h, w - r, h);
            ctx.lineTo(r, h);
            ctx.quadraticCurveTo(0, h, 0, h - r);
            ctx.lineTo(0, r);
            ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();

            angle += 0.015;
            aid = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(aid);
            window.removeEventListener('resize', fit);
        };
    }, []);

    const cur = slides[active];

    return (
        <section style={{
            width: '100%',
            background: '#020808',
            position: 'relative',
            borderRadius: '28px',
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

                .fb-inner {
                    position: relative;
                    z-index: 1;
                    border-radius: 26px;
                    overflow: hidden;
                    height: 100vh;
                    width: 100%;
                    background: #020808;
                }

                .fb-text { transition: opacity 0.3s ease, transform 0.3s ease; }
                .fb-text-out { opacity: 0; transform: translateY(20px); }
                .fb-text-in  { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* canvas border — sits on top of everything */}
            <canvas
                ref={borderRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    pointerEvents: 'none',
                    borderRadius: '28px',
                }}
            />

            <div className="fb-inner">

                {/* waves video bg */}
                <video autoPlay muted loop playsInline style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: 0.45, zIndex: 0,
                }}>
                    <source src={bgVid} type="video/mp4" />
                </video>

                {/* dark overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,8,16,0.80) 0%, rgba(0,15,12,0.70) 100%)',
                    zIndex: 1,
                }} />

                {/* CONTENT */}
                <div style={{
                    position: 'relative', zIndex: 4,
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 clamp(32px, 6vw, 100px)',
                }}>
                    {/* top row */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'clamp(24px, 4vh, 48px)',
                    }}>
                        <p style={{ color: '#00c9a7', fontSize: '0.6rem', letterSpacing: '4px', fontWeight: '600' }}>
                            WHAT I BRING
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                {slides.map((_, i) => (
                                    <button key={i} onClick={() => goTo(i, true)} style={{
                                        width: i === active ? '24px' : '5px',
                                        height: '4px', borderRadius: '999px',
                                        background: i === active ? '#00c9a7' : 'rgba(240,236,228,0.1)',
                                        border: 'none', cursor: 'pointer', padding: 0,
                                        transition: 'all 0.4s ease',
                                    }} />
                                ))}
                            </div>

                            <span style={{ color: 'rgba(240,236,228,0.2)', fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '2px' }}>
                                {String(active + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                            </span>

                            <button onClick={() => goTo(active - 1, true)} style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: 'transparent',
                                border: '1px solid rgba(0,201,167,0.25)',
                                color: 'rgba(0,201,167,0.6)', fontSize: '0.8rem',
                                cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#00c9a7'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,201,167,0.25)'}
                            >←</button>

                            <button onClick={() => goTo(active + 1, true)} style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: '#00c9a7',
                                border: '1px solid #00c9a7',
                                color: '#020808', fontSize: '0.8rem',
                                cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 16px rgba(0,201,167,0.45)',
                                transition: 'all 0.2s',
                            }}>→</button>
                        </div>
                    </div>

                    {/* main layout */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '1fr auto',
                        gap: '60px', alignItems: 'flex-end',
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <span style={{ color: '#00c9a7', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '3px' }}>
                                    {cur.num}
                                </span>
                                <div style={{ height: '1px', width: '40px', background: 'rgba(0,201,167,0.4)' }} />
                                <span style={{ color: '#00aaff', fontSize: '0.6rem', letterSpacing: '3px' }}>
                                    {cur.label}
                                </span>
                            </div>

                            {cur.title.split('\n').map((line, i) => (
                                <div key={`${active}-${i}`} style={{ overflow: 'hidden' }}>
                                    <div className={`fb-text ${out ? 'fb-text-out' : 'fb-text-in'}`} style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        fontSize: 'clamp(4rem, 12vh, 10rem)',
                                        lineHeight: 0.9, letterSpacing: '3px',
                                        color: i === 2 ? 'transparent' : '#f0ece4',
                                        WebkitTextStroke: i === 2 ? '2px #00c9a7' : 'none',
                                        transitionDelay: `${i * 0.05}s`,
                                    }}>
                                        {line}
                                    </div>
                                </div>
                            ))}

                            <div style={{
                                width: 'clamp(160px, 25vw, 400px)', height: '1px',
                                background: 'linear-gradient(90deg, #00c9a7, #00aaff, transparent)',
                                margin: 'clamp(16px, 3vh, 28px) 0',
                            }} />

                            <p className={`fb-text ${out ? 'fb-text-out' : 'fb-text-in'}`} style={{
                                color: 'rgba(240,236,228,0.5)',
                                fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                                lineHeight: 1.7, maxWidth: '500px',
                                transitionDelay: '0.15s',
                            }}>
                                {cur.desc}
                            </p>
                        </div>

                        <div style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'flex-end', gap: '16px',
                            paddingBottom: '8px',
                        }}>
                            {slides.map((s, i) => (
                                <button key={i} onClick={() => goTo(i, true)} style={{
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', padding: 0,
                                    color: i === active ? '#f0ece4' : 'rgba(240,236,228,0.15)',
                                    fontSize: i === active ? '0.75rem' : '0.6rem',
                                    letterSpacing: '2px',
                                    fontWeight: i === active ? '700' : '400',
                                    transition: 'all 0.3s ease', textAlign: 'right',
                                }}>
                                    {s.label}
                                    {i === active && (
                                        <span style={{
                                            display: 'block', color: '#00aaff',
                                            fontSize: '0.55rem', letterSpacing: '1px', marginTop: '2px',
                                        }}>{s.sub}</span>
                                    )}
                                </button>
                            ))}

                            <a href="https://ig.me/m/_friendly_dev"
                                target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                                    padding: '12px 26px', background: 'transparent',
                                    color: '#f0ece4', fontSize: '0.62rem',
                                    fontWeight: '700', letterSpacing: '3px',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(0,201,167,0.3)',
                                    marginTop: '8px', transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#00c9a7';
                                    e.currentTarget.style.borderColor = '#00c9a7';
                                    e.currentTarget.style.color = '#020808';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = 'rgba(0,201,167,0.3)';
                                    e.currentTarget.style.color = '#f0ece4';
                                }}
                            >
                                START A PROJECT ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;