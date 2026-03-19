import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgVid from "../../assets/beam-art.mp4";

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    // Noise/grain canvas overlay
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let aid;

        const drawGrain = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const val = Math.random() * 30;
                imageData.data[i] = val;
                imageData.data[i+1] = val;
                imageData.data[i+2] = val;
                imageData.data[i+3] = 18;
            }
            ctx.putImageData(imageData, 0, 0);
            aid = requestAnimationFrame(drawGrain);
        };
        drawGrain();
        return () => cancelAnimationFrame(aid);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        // Cinematic reveal sequence
        tl.fromTo(".act-eyebrow", 
            { opacity: 0, letterSpacing: "20px" },
            { opacity: 1, letterSpacing: "6px", duration: 1.2, ease: "power3.out" }
        )
        .fromTo(".act-word-1",
            { opacity: 0, y: 120, rotateX: -90, transformOrigin: "bottom center" },
            { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
            "-=0.6"
        )
        .fromTo(".act-word-2",
            { opacity: 0, y: 120, rotateX: -90, transformOrigin: "bottom center" },
            { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
            "-=0.7"
        )
        .fromTo(".act-word-3",
            { opacity: 0, y: 120, rotateX: -90, transformOrigin: "bottom center" },
            { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
            "-=0.7"
        )
        .fromTo(".act-divider",
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 1, ease: "power3.inOut" },
            "-=0.4"
        )
        .fromTo(".act-answer",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "-=0.4"
        )
        .fromTo(".act-stat",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.3"
        )
        .fromTo(".act-cta",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.2"
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            background: "#03030a",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            perspective: "1000px",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                .act-display {
                    font-family: 'Bebas Neue', 'Syne', sans-serif;
                    line-height: 0.88;
                    letter-spacing: 4px;
                }
            `}</style>

            {/* Video BG */}
            <video autoPlay muted loop playsInline style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                opacity: 0.25,
                zIndex: 0,
            }}>
                <source src={bgVid} type="video/mp4" />
            </video>

            {/* Dark overlay gradient */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(3,3,10,0.92) 40%, rgba(10,0,0,0.7) 100%)",
                zIndex: 1,
            }} />

            {/* Grain canvas */}
            <canvas ref={canvasRef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "none",
                zIndex: 2,
                opacity: 0.6,
            }} />

            {/* Red accent line — left edge */}
            <div style={{
                position: "absolute",
                left: 0, top: "15%", bottom: "15%",
                width: "3px",
                background: "linear-gradient(to bottom, transparent, #cc1100, transparent)",
                zIndex: 3,
            }} />

            {/* Content */}
            <div style={{
                position: "relative",
                zIndex: 4,
                padding: "0 clamp(32px, 6vw, 100px)",
                width: "100%",
            }}>
                {/* Eyebrow */}
                <p className="act-eyebrow" style={{
                    color: "#cc1100",
                    fontSize: "0.6rem",
                    letterSpacing: "6px",
                    fontWeight: "600",
                    marginBottom: "clamp(16px, 3vh, 32px)",
                    opacity: 0,
                }}>WHY HIRE ME</p>

                {/* 3D word reveal */}
                <div style={{ overflow: "hidden", marginBottom: "0.05em" }}>
                    <div className="act-display act-word-1" style={{
                        fontSize: "clamp(4rem, 12vh, 11rem)",
                        color: "#f0ece4",
                        opacity: 0,
                    }}>WHY</div>
                </div>
                <div style={{ overflow: "hidden", marginBottom: "0.05em" }}>
                    <div className="act-display act-word-2" style={{
                        fontSize: "clamp(4rem, 12vh, 11rem)",
                        color: "#f0ece4",
                        opacity: 0,
                    }}>HIRE</div>
                </div>
                <div style={{ overflow: "hidden", marginBottom: "clamp(20px, 4vh, 40px)" }}>
                    <div className="act-display act-word-3" style={{
                        fontSize: "clamp(4rem, 12vh, 11rem)",
                        color: "transparent",
                        WebkitTextStroke: "2px #cc1100",
                        opacity: 0,
                    }}>ME?</div>
                </div>

                {/* Divider */}
                <div className="act-divider" style={{
                    width: "clamp(200px, 30vw, 500px)",
                    height: "1px",
                    background: "linear-gradient(90deg, #cc1100, transparent)",
                    marginBottom: "clamp(16px, 3vh, 28px)",
                    opacity: 1,
                }} />

                {/* Answer */}
                <p className="act-answer" style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                    color: "rgba(240,236,228,0.5)",
                    lineHeight: 1.7,
                    maxWidth: "460px",
                    marginBottom: "clamp(20px, 4vh, 36px)",
                    opacity: 0,
                }}>
                    Because I build sites that look premium<br />
                    <em style={{ color: "rgba(240,236,228,0.85)", fontStyle: "normal", fontWeight: 600 }}>
                        and actually get you clients.
                    </em>
                </p>

                {/* Stats */}
                <div style={{
                    display: "flex",
                    gap: "clamp(24px, 4vw, 56px)",
                    marginBottom: "clamp(24px, 4vh, 40px)",
                    flexWrap: "wrap",
                }}>
                    {[
                        { num: "5", unit: "Days", label: "Avg. delivery" },
                        { num: "₹2K–8K", unit: "", label: "Per project" },
                        { num: "3+", unit: "Sites", label: "Live & running" },
                        { num: "16", unit: "yo", label: "Self-taught" },
                    ].map((s, i) => (
                        <div key={i} className="act-stat" style={{ opacity: 0 }}>
                            <div style={{
                                fontSize: "clamp(1.4rem, 2.5vh, 2rem)",
                                fontWeight: "800",
                                color: "#f0ece4",
                                lineHeight: 1,
                                fontFamily: "'Bebas Neue', sans-serif",
                                letterSpacing: "1px",
                            }}>
                                {s.num}<span style={{ color: "#cc1100" }}>{s.unit && ` ${s.unit}`}</span>
                            </div>
                            <div style={{
                                fontSize: "0.55rem",
                                letterSpacing: "2px",
                                color: "rgba(240,236,228,0.25)",
                                marginTop: "4px",
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a href="https://ig.me/m/_friendly_dev"
                    target="_blank" rel="noopener noreferrer"
                    className="act-cta"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "12px",
                        padding: "13px 30px",
                        background: "transparent",
                        color: "#f0ece4",
                        fontSize: "0.65rem",
                        fontWeight: "700",
                        letterSpacing: "3px",
                        textDecoration: "none",
                        border: "1px solid rgba(240,236,228,0.2)",
                        transition: "all 0.25s ease",
                        opacity: 0,
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "#cc1100";
                        e.currentTarget.style.borderColor = "#cc1100";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "rgba(240,236,228,0.2)";
                    }}
                >
                    START A PROJECT ↗
                </a>
            </div>
        </section>
    );
};

export default Activities;