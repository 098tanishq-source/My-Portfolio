import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgVid from "../../assets/beam-art.mp4";

const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const textZoneRef = useRef(null);
    const [mouse, setMouse] = useState({ x: -999, y: -999 });
    const [splineVisible, setSplineVisible] = useState(false);

    const handleMouseMove = (e) => {
        const rect = textZoneRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => setMouse({ x: -999, y: -999 });

    // lazy load spline only when section visible
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setSplineVisible(true);
        }, { threshold: 0.1 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    // grain — throttled to every 4 frames
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let aid;
        let frame = 0;
        let w = 0, h = 0;

        const fit = () => {
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w;
            canvas.height = h;
        };
        fit();
        window.addEventListener("resize", fit);

        const drawGrain = () => {
            frame++;
            if (frame % 4 === 0 && w > 0 && h > 0) {
                const imageData = ctx.createImageData(w, h);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    const val = Math.random() * 25;
                    imageData.data[i] = val;
                    imageData.data[i + 1] = val;
                    imageData.data[i + 2] = val;
                    imageData.data[i + 3] = 15;
                }
                ctx.putImageData(imageData, 0, 0);
            }
            aid = requestAnimationFrame(drawGrain);
        };
        drawGrain();
        return () => {
            cancelAnimationFrame(aid);
            window.removeEventListener("resize", fit);
        };
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

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
        )
        .fromTo(".act-spline",
            { opacity: 0, x: 80, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: "power3.out" },
            "-=1.2"
        );
    }, { scope: sectionRef });

    const spotlightClip = `circle(90px at ${mouse.x}px ${mouse.y}px)`;

    const headingStyle = {
        fontFamily: "'Bebas Neue', 'Syne', sans-serif",
        lineHeight: 0.88,
        letterSpacing: "4px",
        fontSize: "clamp(4rem, 12vh, 11rem)",
        userSelect: "none",
    };

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                background: "#03030a",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                perspective: "1000px",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                .spline-loader {
                    width: 36px; height: 36px;
                    border: 2px solid rgba(204,17,0,0.2);
                    border-top-color: #cc1100;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            {/* Video BG */}
            <video autoPlay muted loop playsInline style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                opacity: 0.2, zIndex: 0,
            }}>
                <source src={bgVid} type="video/mp4" />
            </video>

            {/* Dark overlay */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(3,3,10,0.95) 40%, rgba(10,0,0,0.6) 100%)",
                zIndex: 1,
            }} />

            {/* Grain */}
            <canvas ref={canvasRef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "none",
                zIndex: 2, opacity: 0.6,
            }} />

            {/* Left accent */}
            <div style={{
                position: "absolute",
                left: 0, top: "15%", bottom: "15%",
                width: "3px",
                background: "linear-gradient(to bottom, transparent, #cc1100, transparent)",
                zIndex: 3,
            }} />

            {/* SPLINE — lazy loaded */}
            <div className="act-spline" style={{
                position: "absolute",
                right: 0, top: 0,
                width: "55%", height: "100%",
                zIndex: 3, opacity: 0,
                maskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 50%, transparent 100%)",
            }}>
                {splineVisible && (
                    <Suspense fallback={
                        <div style={{
                            width: "100%", height: "100%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <div className="spline-loader" />
                        </div>
                    }>
                        <Spline
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Suspense>
                )}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, rgba(3,3,10,1) 0%, rgba(3,3,10,0.15) 45%, transparent 100%)",
                    pointerEvents: "none",
                }} />
            </div>

            {/* LEFT content */}
            <div style={{
                position: "relative",
                zIndex: 4,
                padding: "0 clamp(32px, 6vw, 100px)",
                width: "55%",
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

                {/* Heading with spotlight */}
                <div
                    ref={textZoneRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: "relative", display: "inline-block" }}
                >
                    {/* BASE layer — cream */}
                    <div>
                        <div style={{ overflow: "hidden", marginBottom: "0.05em" }}>
                            <div className="act-word-1" style={{ ...headingStyle, color: "#f0ece4", opacity: 0 }}>
                                WHY
                            </div>
                        </div>
                        <div style={{ overflow: "hidden", marginBottom: "0.05em" }}>
                            <div className="act-word-2" style={{ ...headingStyle, color: "#f0ece4", opacity: 0 }}>
                                HIRE
                            </div>
                        </div>
                        <div style={{ overflow: "hidden", marginBottom: "clamp(20px, 4vh, 40px)" }}>
                            <div className="act-word-3" style={{
                                ...headingStyle,
                                color: "transparent",
                                WebkitTextStroke: "2px #cc1100",
                                opacity: 0,
                            }}>
                                ME?
                            </div>
                        </div>
                    </div>

                    {/* SPOTLIGHT layer — reddish pink */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        clipPath: spotlightClip,
                        WebkitClipPath: spotlightClip,
                        pointerEvents: "none",
                    }}>
                        <div style={{ overflow: "hidden", marginBottom: "0.05em" }}>
                            <div style={{ ...headingStyle, color: "#c8526a" }}>WHY</div>
                        </div>
                        <div style={{ overflow: "hidden", marginBottom: "0.05em" }}>
                            <div style={{ ...headingStyle, color: "#c8526a" }}>HIRE</div>
                        </div>
                        <div style={{ overflow: "hidden", marginBottom: "clamp(20px, 4vh, 40px)" }}>
                            <div style={{
                                ...headingStyle,
                                color: "#c8526a",
                                WebkitTextStroke: "2px #c8526a",
                            }}>ME?</div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="act-divider" style={{
                    width: "clamp(200px, 30vw, 500px)",
                    height: "1px",
                    background: "linear-gradient(90deg, #cc1100, transparent)",
                    marginBottom: "clamp(16px, 3vh, 28px)",
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
                        { num: "5",      unit: "Days",  label: "Avg. delivery"  },
                        { num: "₹2K–8K", unit: "",     label: "Per project"    },
                        { num: "3+",     unit: "Sites", label: "Live & running" },
                        { num: "16",     unit: "yo",    label: "Self-taught"    },
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
                                {s.num}
                                <span style={{ color: "#cc1100" }}>
                                    {s.unit && ` ${s.unit}`}
                                </span>
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