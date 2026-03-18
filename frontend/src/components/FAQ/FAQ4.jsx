import bgVid from "../../assets/smoke_final.mp4";
import { useEffect, useRef } from "react";
 
const FAQ4 = () => {
    const canvasRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        // scan grid canvas
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let aid;
        const fit = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        fit();
        window.addEventListener("resize", fit);
        let scanY = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(37,99,235,0.04)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 60) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 60) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
            const g = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
            g.addColorStop(0, "transparent");
            g.addColorStop(0.5, "rgba(37,99,235,0.07)");
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.fillRect(0, scanY - 80, canvas.width, 160);
            scanY = (scanY + 0.8) % canvas.height;
            aid = requestAnimationFrame(draw);
        };
        draw();

        // stagger timeline items in
        const items = timelineRef.current?.querySelectorAll(".tl-item");
        if (items) {
            items.forEach((item, i) => {
                item.style.opacity = "0";
                item.style.transform = "translateX(30px)";
                setTimeout(() => {
                    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                    item.style.opacity = "1";
                    item.style.transform = "translateX(0)";
                }, 200 + i * 150);
            });
        }

        return () => { cancelAnimationFrame(aid); window.removeEventListener("resize", fit); };
    }, []);

    const timeline = [
        { day: "Day 1", sub: "kickoff", desc: "Brief received, design direction locked, work begins immediately", done: true },
        { day: "Day 2–3", sub: "build", desc: "Full build: layout, styles, animations, responsiveness", done: true },
        { day: "Day 4", sub: "review", desc: "First preview sent — revisions noted and applied fast", done: true },
        { day: "Day 5", sub: "delivery", desc: "Final files handed over. Deployed. Done.", done: false },
    ];

    return (
        <div style={{
            position: "relative",
            width: "100%", height: "100vh",
            background: "#03080f",
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            fontFamily: "'Syne', system-ui, sans-serif",
        }}>
            <video
    autoPlay muted loop playsInline
    style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 0.12,
        zIndex: 0,
    }}
>
    <source src={bgVid} type="video/mp4" />
</video>
            <style>{`
                @keyframes contentLeft4 {
                    from { opacity:0; transform:translateX(-32px); }
                    to   { opacity:1; transform:translateX(0); }
                }
                @keyframes pulseRing {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes lineGrow {
                    from { height: 0; }
                    to   { height: 100%; }
                }
                .faq4-navlink {
                    font-size: 13px;
                    color: rgba(255,255,255,0.4);
                    text-decoration: none;
                    letter-spacing: 0.5px;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq4-navlink:hover { color: rgba(255,255,255,0.9); }

                .faq4-btn {
                    padding: 14px 32px;
                    background: #2563eb;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(37,99,235,0.55),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.2);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq4-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq4-btn:hover::before { left: 160%; }
                .faq4-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 40px rgba(37,99,235,0.7),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.2);
                }

                .tl-dot-lit {
                    box-shadow: 0 0 0 4px rgba(37,99,235,0.2), 0 0 20px rgba(37,99,235,0.5);
                }
            `}</style>

            {/* scan grid canvas */}
            <canvas ref={canvasRef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                zIndex: 1, pointerEvents: "none",
            }} />

            {/* blue radial glow left */}
            <div style={{
                position: "absolute",
                top: "50%", left: "-5%",
                transform: "translateY(-50%)",
                width: "600px", height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none", zIndex: 2,
            }} />

            {/* navbar */}
            <nav style={{
                position: "relative", zIndex: 10,
                height: "64px", padding: "0 52px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
            }}>
                <span style={{ fontWeight: "800", fontSize: "15px", color: "#fff", letterSpacing: "2px" }}>TANISHQ</span>
                <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                    {["About", "Work", "Blog", "Contact"].map(l => (
                        <a key={l} href="#" className="faq4-navlink">{l}</a>
                    ))}
                    <a href="https://ig.me/m/_friendly_dev" target="_blank" rel="noopener noreferrer"
                        style={{
                            padding: "8px 20px",
                            background: "rgba(37,99,235,0.15)",
                            border: "1px solid rgba(37,99,235,0.4)",
                            color: "#60a5fa",
                            fontSize: "13px", fontWeight: "600",
                            textDecoration: "none",
                            letterSpacing: "0.5px",
                            transition: "all 0.2s",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >Book a call</a>
                </div>
            </nav>

            {/* body */}
            <div style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1.1fr",
                gap: "60px",
                alignItems: "center",
                padding: "0 52px 40px",
                position: "relative", zIndex: 5,
                maxWidth: "1200px",
                margin: "0 auto",
                width: "100%",
            }}>

                {/* LEFT */}
                <div style={{ animation: "contentLeft4 0.9s ease forwards" }}>
                    {/* tag */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        marginBottom: "20px",
                    }}>
                        <span style={{ fontFamily: "monospace", fontSize: "13px", color: "rgba(255,255,255,0.2)", fontWeight: "700" }}>04</span>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "4px", color: "#2563eb", textTransform: "uppercase" }}>Delivery Timeline</span>
                    </div>

                    {/* big heading */}
                    <h1 style={{
                        fontFamily: "'Bebas Neue', 'Syne', sans-serif",
                        fontSize: "clamp(2.4rem, 6vh, 7rem)",
                        fontWeight: "900",
                        lineHeight: 0.9,
                        letterSpacing: "2px",
                        color: "#fff",
                        marginBottom: "28px",
                        textTransform: "uppercase",
                    }}>
                        What is<br />your<br />delivery<br />
                        <em style={{ fontStyle: "normal", color: "#2563eb", display: "block" }}>Time?</em>
                    </h1>

                    <p style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: "1.8",
                        maxWidth: "380px",
                        marginBottom: "36px",
                    }}>
                        Every project has a clear deadline.{" "}
                        <strong style={{ color: "rgba(255,255,255,0.85)" }}>No ghosting. No delays.</strong>{" "}
                        Rush delivery available for urgent projects — just let me know.
                    </p>

                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        className="faq4-btn">
                        Book a call
                    </a>
                </div>

                {/* RIGHT — animated timeline */}
                <div ref={timelineRef} style={{ position: "relative", paddingLeft: "20px" }}>
                    {/* vertical line */}
                    <div style={{
                        position: "absolute",
                        left: "39px", top: "20px", bottom: "20px",
                        width: "1px",
                        background: "linear-gradient(to bottom, #2563eb, rgba(37,99,235,0.1))",
                        overflow: "hidden",
                    }}>
                        <div style={{
                            width: "100%",
                            background: "linear-gradient(to bottom, rgba(96,165,250,0.8), transparent)",
                            animation: "lineGrow 1.5s ease forwards",
                            animationDelay: "0.3s",
                            height: 0,
                        }} />
                    </div>

                    {timeline.map((item, i) => (
                        <div key={i} className="tl-item" style={{
                            display: "flex", gap: "28px",
                            alignItems: "flex-start",
                            padding: "22px 0",
                            position: "relative",
                        }}>
                            {/* dot */}
                            <div style={{ position: "relative", flexShrink: 0 }}>
                                <div
                                    className={item.done ? "tl-dot-lit" : ""}
                                    style={{
                                        width: "42px", height: "42px",
                                        borderRadius: "50%",
                                        background: item.done ? "#2563eb" : "#03080f",
                                        border: `1px solid ${item.done ? "#2563eb" : "rgba(37,99,235,0.4)"}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        zIndex: 2, position: "relative",
                                    }}>
                                    {item.done ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563eb" }} />
                                    )}
                                </div>
                                {/* pulse ring on active dot */}
                                {!item.done && (
                                    <div style={{
                                        position: "absolute", inset: "-4px",
                                        borderRadius: "50%",
                                        border: "1px solid rgba(37,99,235,0.5)",
                                        animation: "pulseRing 2s ease-out infinite",
                                    }} />
                                )}
                            </div>

                            {/* content */}
                            <div style={{ paddingTop: "4px" }}>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
                                    <span style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                                        lineHeight: 1,
                                        letterSpacing: "2px",
                                        color: item.done ? "#fff" : "#2563eb",
                                        textTransform: "uppercase",
                                    }}>{item.day}</span>
                                    <span style={{
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        letterSpacing: "2px",
                                        color: "rgba(255,255,255,0.25)",
                                        textTransform: "uppercase",
                                    }}>{item.sub}</span>
                                </div>
                                <p style={{
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.35)",
                                    lineHeight: "1.6",
                                    maxWidth: "360px",
                                }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ4;