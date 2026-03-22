 import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import heroBg from "../../assets/hero-bg.mp4";

const Hero = () => {
    const isMobile = useMediaQuery({ query: "(max-width:768px)" });

    const scrollTo = (selector) => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 4 });
        tl.fromTo(".hero-tag",        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .fromTo(".hero-main-title",  { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }, "-=0.4")
          .fromTo(".hero-sub-title",   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
          .fromTo(".hero-desc",        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .fromTo(".hero-btns",        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
          .fromTo(".hero-scroll-hint", { opacity: 0 },        { opacity: 1, duration: 1,   ease: "power2.out" },       "-=0.2");
    }, []);

    return (
        <section className="hero-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5 mb-20">
            <style>{`
                @keyframes scrollDown {
                    0%   { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
                .lg-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 11px 28px;
                    font-family: monospace;
                    font-size: 0.65rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    border-radius: 999px;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                }
                .lg-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 999px;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }
                .lg-btn::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 50%;
                    border-radius: 999px 999px 0 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
                    pointer-events: none;
                }
                .lg-btn-primary {
                    background: rgba(173,216,230,0.25);
                    color: #f0ece4;
                    box-shadow: 0 4px 24px rgba(173,216,230,0.25), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1);
                }
                .lg-btn-primary:hover {
                    background: rgba(173,216,230,0.38);
                    box-shadow: 0 6px 32px rgba(173,216,230,0.35), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.1);
                    transform: translateY(-1px);
                }
                .lg-btn-secondary {
                    background: rgba(255,255,255,0.08);
                    color: rgba(240,236,228,0.85);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1);
                }
                .lg-btn-secondary:hover {
                    background: rgba(255,255,255,0.15);
                    color: #f0ece4;
                    box-shadow: 0 6px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15);
                    transform: translateY(-1px);
                }
            `}</style>

            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">

                <video src={heroBg} autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0" />

                {/* overlays */}
                <div className="absolute inset-0 z-10" style={{ background: 'rgba(0,0,0,0.45)' }} />
                <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,20,40,0.5) 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-40 z-10" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 100%)' }} />
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)' }} />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14">

                    {/* top left tag */}
                    <div className="hero-tag absolute top-10 left-8 md:left-14 flex items-center gap-3" style={{ opacity: 0 }}>
                        <div className="w-8 h-[1px]" style={{ background: '#add8e6' }} />
                        <span className="text-[0.65rem] tracking-[4px] uppercase" style={{ color: '#add8e6', fontFamily: 'monospace' }}>
                            Frontend Developer · UI Designer
                        </span>
                    </div>

                    {/* top right */}
                    <div className="absolute top-10 right-8 md:right-14" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '3px' }}>
                        EST. 2024
                    </div>

                    {/* main content */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                        <div>
                            <h1 className="hero-main-title font-black leading-none"
                                style={{ opacity: 0, fontSize: 'clamp(64px, 12vw, 160px)', color: '#f0ece4', letterSpacing: '-2px', textShadow: '0 0 60px rgba(173,216,230,0.15)', fontFamily: 'sans-serif' }}>
                                TANISHQ
                            </h1>
                            <h2 className="hero-sub-title font-bold"
                                style={{ opacity: 0, fontSize: 'clamp(18px, 3vw, 36px)', color: 'rgba(240,236,228,0.55)', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                                Frontend Dev & UI Designer
                            </h2>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-4 md:max-w-[340px]">
                            <p className="hero-desc"
                                style={{ opacity: 0, fontSize: '0.75rem', color: 'rgba(240,236,228,0.45)', lineHeight: '1.8', textAlign: isMobile ? 'left' : 'right' }}>
                                I create modern, responsive and visually engaging websites that help brands present themselves clearly online.
                            </p>

                            <div className="hero-btns flex gap-3" style={{ opacity: 0 }}>
                                <button
                                    className="lg-btn lg-btn-primary"
                                    onClick={() => scrollTo('.gallery-section, #gallery')}
                                >
                                    VIEW WORK
                                </button>
                                <button
                                    className="lg-btn lg-btn-secondary"
                                    onClick={() => scrollTo('.gc-card')}
                                >
                                    CONTACT
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* scroll hint */}
                    <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
                        <div className="w-[1px] h-10 overflow-hidden" style={{ background: 'rgba(173,216,230,0.15)' }}>
                            <div className="w-full h-1/2" style={{ background: '#add8e6', animation: 'scrollDown 1.8s ease-in-out infinite' }} />
                        </div>
                        <span style={{ color: 'rgba(240,236,228,0.3)', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '4px' }}>SCROLL</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;