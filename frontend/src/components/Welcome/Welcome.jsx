 import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import smokeVid from "../../assets/smoke_final.mp4";
import heroVid from "../../assets/hero-bg.mp4";
import demonImg from "../../assets/wp7605842.jpg";

const Welcome = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".clip-text-welcome");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".welcome-section",
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
            },
        });
        lines.forEach((line) => {
            tl.to(line, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                duration: 1,
            });
        });

        gsap.fromTo(".welcome-line-accent",
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: ".welcome-section",
                    start: "top 50%",
                }
            }
        );

        gsap.fromTo(".welcome-vid-left",
            { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.4,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".welcome-bottom",
                    start: "top 80%",
                }
            }
        );

        gsap.fromTo(".welcome-vid-right",
            { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.4,
                ease: "power4.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: ".welcome-bottom",
                    start: "top 80%",
                }
            }
        );

        gsap.fromTo(".welcome-bio",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".welcome-bottom",
                    start: "top 75%",
                }
            }
        );

        gsap.fromTo(".welcome-stat",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".welcome-bottom",
                    start: "top 70%",
                }
            }
        );

        gsap.fromTo(".welcome-demon",
            { opacity: 0, x: 40 },
            {
                opacity: 1,
                x: 0,
                duration: 1.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".welcome-bottom",
                    start: "top 75%",
                }
            }
        );
    });

    return (
        <div
            className="welcome-section w-full min-h-[120vh] md:px-7 px-6 pb-24 overflow-hidden"
            style={{ background: '#080808', position: 'relative' }}
        >
            {/* demon bg image — bleeds from right */}
            <div className="welcome-demon"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '45%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}>
                <img
                    src={demonImg}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'right center',
                        opacity: 0.28,
                        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, black 100%)',
                    }}
                />
                {/* red tint overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, transparent 40%, rgba(204,17,0,0.08) 100%)',
                }} />
            </div>

            {/* all content above bg */}
            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* big scroll reveal text */}
                <div className="flex flex-col gap-2">
                    <div className="w-full md:w-[86%] md:text-[64px] text-[34px] md:pt-20 pt-12">
                        <div className="w-full flex flex-col justify-center items-start">
                            {welcomeLines.map((text, index) => (
                                <span key={index}
                                    style={{
                                        position: 'relative',
                                        display: 'block',
                                        color: 'rgba(240,236,228,0.12)',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.01em'
                                    }}>
                                    {text}
                                    <span className="clip-text-welcome"
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0,
                                            color: '#f0ece4',
                                            clipPath: 'inset(0% 100% 0% 0%)',
                                            whiteSpace: 'nowrap',
                                            letterSpacing: '-0.01em'
                                        }}>
                                        {text}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* red accent line */}
                <div className="welcome-line-accent origin-left md:mt-10 mt-6"
                    style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, #cc1100, rgba(204,17,0,0.1))',
                        width: '100%'
                    }}
                />

                {/* bottom section */}
                <div className="welcome-bottom flex md:flex-row flex-col justify-between items-stretch md:mt-14 mt-10 gap-6">

                    {/* LEFT video */}
                    <div className="welcome-vid-left flex-shrink-0 md:w-[280px] w-full md:h-[320px] h-[200px] overflow-hidden"
                        style={{
                            border: '1px solid rgba(204,17,0,0.2)',
                            clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                            position: 'relative',
                        }}>
                        <video
                            src={smokeVid}
                            autoPlay loop muted playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
                        />
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'linear-gradient(transparent, rgba(8,8,8,0.95))',
                            padding: '30px 14px 12px'
                        }}>
                            <p style={{ color: '#cc1100', fontSize: '0.6rem', letterSpacing: '3px' }}>
                                SMOKE & CODE
                            </p>
                        </div>
                    </div>

                    {/* CENTER bio + stats */}
                    <div className="welcome-bio flex flex-col justify-between flex-1 md:px-10 gap-10">
                        <p className="md:text-[1.5rem] text-[1.1rem] md:leading-[1.4] leading-[1.5]"
                            style={{ color: 'rgba(240,236,228,0.38)' }}>
                            Self-taught frontend developer from India,
                            building clean and modern websites.
                            <br /><br />
                            <span style={{ color: 'rgba(204,17,0,0.75)' }}>
                                Available for freelance — local and international.
                            </span>
                        </p>

                        <div className="flex gap-10 flex-wrap">
                            {[
                                { num: '3+', label: 'Projects Built' },
                                { num: '16', label: 'Years Old' },
                                { num: '₹8K', label: 'Monthly Goal', red: true },
                            ].map((stat, i) => (
                                <div key={i} className="welcome-stat flex flex-col gap-2">
                                    <span style={{
                                        fontSize: '2.8rem',
                                        fontWeight: '600',
                                        lineHeight: 1,
                                        color: stat.red ? '#cc1100' : '#f0ece4'
                                    }}>
                                        {stat.num}
                                    </span>
                                    <span style={{
                                        color: 'rgba(240,236,228,0.28)',
                                        fontSize: '0.65rem',
                                        letterSpacing: '2px'
                                    }}>
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT video */}
                    <div className="welcome-vid-right flex-shrink-0 md:w-[280px] w-full md:h-[320px] h-[200px] overflow-hidden"
                        style={{
                            border: '1px solid rgba(240,236,228,0.06)',
                            clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                            position: 'relative',
                        }}>
                        <video
                            src={heroVid}
                            autoPlay loop muted playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                        />
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'linear-gradient(transparent, rgba(8,8,8,0.95))',
                            padding: '30px 14px 12px'
                        }}>
                            <p style={{ color: 'rgba(240,236,228,0.4)', fontSize: '0.6rem', letterSpacing: '3px' }}>
                                MATRIX RAIN
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Welcome;