 import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const FooterBanner = () => {
    const fbConRef = useRef(null);

    useGSAP(() => {
        if (!fbConRef.current) return;
        gsap.fromTo('.fb-inner',
            { scale: 1.05 },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: fbConRef.current,
                    start: "top bottom-=20%",
                    end: "bottom top+=20%",
                    scrub: true,
                }
            }
        );
    }, { scope: fbConRef });

    const handleEmail = function() {
        window.location.href = 'mailto:098tanishq@gmail.com';
    };

    return (
        <div ref={fbConRef} className="w-screen h-dvh p-2 overflow-hidden">
            <div className="fb-inner w-full h-full relative overflow-hidden rounded-4xl"
                style={{ background: 'linear-gradient(135deg, #0a0000 0%, #1a0000 50%, #0a0000 100%)' }}>

                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(204,17,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(204,17,0,0.04) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />

                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
                }} />

                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center select-none"
                    style={{
                        fontSize: '10vw',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(204,17,0,0.15)',
                        whiteSpace: 'nowrap',
                    }}>
                    TANISHQ
                </h1>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-8">
                    <div style={{ width: '40px', height: '1px', background: '#cc1100', margin: '0 auto 16px' }} />
                    <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '4px', color: 'rgba(240,236,228,0.4)', textTransform: 'uppercase', marginBottom: '16px' }}>
                        Want to work together?
                    </p>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: '700', color: '#f0ece4', lineHeight: '1.1', marginBottom: '32px' }}>
                        Let's build something<br />
                        <span style={{ color: '#cc1100' }}>great together.</span>
                    </h2>
                    <button
                        onClick={handleEmail}
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            padding: '14px 36px',
                            background: '#cc1100',
                            color: '#f0ece4',
                            border: 'none',
                            clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                            cursor: 'pointer',
                        }}
                    >
                        GET IN TOUCH
                    </button>
                </div>

                <div className="absolute bottom-5 px-8 w-full flex justify-between items-end">
                    <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(204,17,0,0.5)' }}>
                        TANISHQ — FRONTEND DEV & UI DESIGNER
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '2px', color: 'rgba(240,236,228,0.2)' }}>
                        INDIA — AVAILABLE WORLDWIDE
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FooterBanner;