import bgVid from "../../assets/smoke_final.mp4";
import { useEffect, useRef } from "react";
 
const FAQ1 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let aid;

        const fit = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        fit();
        window.addEventListener("resize", fit);

        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.1 + 0.2,
            a: Math.random() * 0.6 + 0.2,
            sp: Math.random() * 0.002 + 0.0005,
            ph: Math.random() * Math.PI * 2,
        }));

        const frame = (t) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((s) => {
                const alpha = s.a * (0.4 + 0.6 * Math.sin(t * 0.001 * s.sp * 400 + s.ph));
                ctx.beginPath();
                ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            });
            aid = requestAnimationFrame(frame);
        };
        aid = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(aid);
            window.removeEventListener("resize", fit);
        };
    }, []);

    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            background: "#080808",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
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
                @keyframes drift1 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    33%     { transform: translate(30px,-20px) scale(1.05); }
                    66%     { transform: translate(-15px,18px) scale(0.96); }
                }
                @keyframes drift2 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    33%     { transform: translate(-25px,15px) scale(1.04); }
                    66%     { transform: translate(20px,-12px) scale(0.97); }
                }
                @keyframes contentUp {
                    from { opacity:0; transform:translateY(28px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .faq1-btn-primary {
                    padding: 13px 30px;
                    border-radius: 999px;
                    background: #fff;
                    color: #000;
                    font-size: 14px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.15),
                        0 4px 24px rgba(255,255,255,0.2),
                        inset 0 1px 0 rgba(255,255,255,1),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq1-btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -75%;
                    width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transform: skewX(-20deg);
                    transition: left 0.5s ease;
                }
                .faq1-btn-primary:hover::before { left: 150%; }
                .faq1-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.25),
                        0 8px 32px rgba(255,255,255,0.35),
                        inset 0 1px 0 rgba(255,255,255,1),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                }

                .faq1-btn-ghost {
                    padding: 13px 30px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid rgba(255,255,255,0.18);
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.12),
                        inset 0 -1px 0 rgba(255,255,255,0.04);
                    transition: all 0.2s;
                }
                .faq1-btn-ghost:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.35);
                    transform: translateY(-2px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        0 4px 20px rgba(255,255,255,0.08);
                }
            `}</style>

            {/* starfield */}
            <canvas ref={canvasRef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                zIndex: 1, pointerEvents: "none",
            }} />

            {/* blob 1 — right side, grey/white */}
            <div style={{
                position: "absolute",
                right: "-60px", top: "8%",
                width: "520px", height: "460px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(160,160,160,0.35) 0%, rgba(80,80,80,0.12) 50%, transparent 72%)",
                filter: "blur(56px)",
                animation: "drift1 8s ease-in-out infinite",
                pointerEvents: "none", zIndex: 2,
                animationDelay: "-2s",
            }} />

            {/* blob 2 — left bottom */}
            <div style={{
                position: "absolute",
                left: "-40px", bottom: "10%",
                width: "300px", height: "260px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(100,100,100,0.25) 0%, transparent 70%)",
                filter: "blur(50px)",
                animation: "drift2 9s ease-in-out infinite",
                pointerEvents: "none", zIndex: 2,
                animationDelay: "-4s",
            }} />

            {/* navbar */}
            <nav style={{
                position: "relative", zIndex: 10,
                height: "60px",
                padding: "0 44px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
            }}>
                <span style={{
                    fontWeight: "800", fontSize: "15px",
                    color: "#fff", letterSpacing: "2.5px",
                }}>TANISHQ</span>

                <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                    {["Services", "Projects", "Contact"].map((l) => (
                        <span key={l} style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.4)",
                            cursor: "pointer",
                            letterSpacing: "0.5px",
                            transition: "color 0.2s",
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                        >{l}</span>
                    ))}

                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            padding: "8px 20px",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: "500",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        }}
                    >
                        ✦ Get started
                    </a>
                </div>
            </nav>

            {/* main content */}
            <div style={{
                flex: 1,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "0 48px 48px",
                position: "relative", zIndex: 5,
                textAlign: "center",
                animation: "contentUp 0.9s ease forwards",
            }}>
                {/* badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "5px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "12px",
                    marginBottom: "28px",
                    backdropFilter: "blur(8px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}>
                    <span style={{
                        width: 5, height: 5,
                        borderRadius: "50%",
                        background: "#cc1100",
                        boxShadow: "0 0 6px #cc1100",
                        display: "inline-block",
                        flexShrink: 0,
                    }} />
                    All you need is a perfect dev. ME!
                </div>

                {/* heading */}
                <h1 style={{
                    fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                    fontWeight: "800",
                    color: "#fff",
                    lineHeight: 1.08,
                    letterSpacing: "-1.5px",
                    marginBottom: "18px",
                    maxWidth: "760px",
                }}>
                    How much do i charge<br />for a basic site?
                </h1>

                {/* answer */}
                <p style={{
                    fontSize: "clamp(13px, 1.4vw, 16px)",
                    color: "rgba(255,255,255,0.48)",
                    lineHeight: "1.75",
                    maxWidth: "560px",
                    marginBottom: "36px",
                }}>
                    For a basic responsive website with modern design and essential sections,
                    I charge between{" "}
                    <strong style={{ color: "rgba(255,255,255,0.88)" }}>
                        ₹2,000 – ₹4,000 INR
                    </strong>{" "}
                    depending on pages and features.
                </p>

                {/* buttons */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        className="faq1-btn-primary">
                        Get Started Now
                    </a>
                    <a href="https://098tanishq-source.github.io/void-streetwear/"
                        target="_blank" rel="noopener noreferrer"
                        className="faq1-btn-ghost">
                        See Projects
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ1;