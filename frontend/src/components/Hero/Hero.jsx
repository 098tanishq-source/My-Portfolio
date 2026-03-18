  import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import heroBg from "../../assets/hero-bg.mp4";

const Hero = () => {
    const isMobile = useMediaQuery({ query: "(max-width:768px)" });

    const handleViewEnter = (e) => { e.currentTarget.style.background = '#ff2200'; }
    const handleViewLeave = (e) => { e.currentTarget.style.background = '#cc1100'; }
    const handleContactEnter = (e) => {
        e.currentTarget.style.borderColor = '#ff2200';
        e.currentTarget.style.color = '#f0ece4';
    }
    const handleContactLeave = (e) => {
        e.currentTarget.style.borderColor = 'rgba(255,34,0,0.4)';
        e.currentTarget.style.color = 'rgba(240,236,228,0.7)';
    }

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(".hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-main-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }, "-=0.4")
        .fromTo(".hero-sub-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .fromTo(".hero-btns", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.2");
    }, []);

    return (
        <section className="hero-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5 mb-20">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">

                <video src={heroBg} autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0" />

                <div className="absolute inset-0 z-10" style={{ background: 'rgba(0,0,0,0.55)' }} />
                <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(120,0,0,0.5) 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-40 z-10" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }} />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14">

                    <div className="hero-tag absolute top-10 left-8 md:left-14 flex items-center gap-3" style={{ opacity: 0 }}>
                        <div className="w-8 h-[1px]" style={{ background: '#ff2200' }}></div>
                        <span className="text-[0.65rem] tracking-[4px] uppercase" style={{ color: '#ff2200', fontFamily: 'monospace' }}>
                            Frontend Developer · UI Designer
                        </span>
                    </div>

                    <div className="absolute top-10 right-8 md:right-14" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '3px' }}>
                        EST. 2024
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                        <div>
                            <h1 className="hero-main-title font-black leading-none" style={{ opacity: 0, fontSize: 'clamp(64px, 12vw, 160px)', color: '#f0ece4', letterSpacing: '-2px', textShadow: '0 0 40px rgba(255,30,0,0.25)', fontFamily: 'sans-serif' }}>
                                TANISHQ
                            </h1>
                            <h2 className="hero-sub-title font-bold" style={{ opacity: 0, fontSize: 'clamp(18px, 3vw, 36px)', color: 'rgba(240,236,228,0.55)', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                                Frontend Dev & UI Designer
                            </h2>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-4 md:max-w-[340px]">
                            <p className="hero-desc" style={{ opacity: 0, fontSize: '0.75rem', color: 'rgba(240,236,228,0.45)', lineHeight: '1.8', textAlign: isMobile ? 'left' : 'right' }}>
                                I create modern, responsive and visually engaging websites that help brands present themselves clearly online.
                            </p>

                            <div className="hero-btns flex gap-3" style={{ opacity: 0 }}>
                                <a href="#showcase"
                                    className="text-[0.65rem] tracking-[3px] uppercase px-5 py-3 transition-all duration-300"
                                    style={{ background: '#cc1100', color: '#f0ece4', fontFamily: 'monospace', clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                                    onMouseEnter={handleViewEnter}
                                    onMouseLeave={handleViewLeave}>
                                    VIEW WORK
                                </a>
                                <a href="mailto:098tanishq@gmail.com"
                                    className="text-[0.65rem] tracking-[3px] uppercase px-5 py-3 transition-all duration-300"
                                    style={{ border: '1px solid rgba(255,34,0,0.4)', color: 'rgba(240,236,228,0.7)', fontFamily: 'monospace', clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                                    onMouseEnter={handleContactEnter}
                                    onMouseLeave={handleContactLeave}>
                                    CONTACT
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
                        <div className="w-[1px] h-10 overflow-hidden" style={{ background: 'rgba(255,34,0,0.2)' }}>
                            <div className="w-full h-1/2" style={{ background: '#ff2200', animation: 'scrollDown 1.8s ease-in-out infinite' }} />
                        </div>
                        <span style={{ color: 'rgba(240,236,228,0.3)', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '4px' }}>SCROLL</span>
                    </div>

                </div>
            </div>
            <style>{`
                @keyframes scrollDown {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
            `}</style>
        </section>
    );
};

export default Hero;