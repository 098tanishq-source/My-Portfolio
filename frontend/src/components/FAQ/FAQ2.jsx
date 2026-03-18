import bgVid from "../../assets/smoke_final.mp4";
import { useEffect, useRef } from "react";
 
const FAQ2 = () => {
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

        const stars = Array.from({ length: 130 }, () => ({
            x: Math.random(), y: Math.random(),
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
            background: "#000",
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
                @keyframes blobPulse {
                    0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.9; }
                    50%     { transform: translate(-50%,-52%) scale(1.06); opacity: 1; }
                }
                @keyframes contentUp {
                    from { opacity:0; transform:translateY(24px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .faq2-btn-fill {
                    padding: 13px 28px;
                    border-radius: 999px;
                    background: #7c3aed;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(124,58,237,0.6),
                        0 0 0 1px rgba(124,58,237,0.4),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq2-btn-fill::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq2-btn-fill:hover::before { left: 160%; }
                .faq2-btn-fill:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 8px 36px rgba(124,58,237,0.75),
                        0 0 0 1px rgba(124,58,237,0.5),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                }

                .faq2-btn-ghost {
                    padding: 13px 28px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.04);
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
                    backdrop-filter: blur(10px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        inset 0 -1px 0 rgba(255,255,255,0.03);
                    transition: all 0.2s;
                }
                .faq2-btn-ghost:hover {
                    background: rgba(255,255,255,0.09);
                    border-color: rgba(255,255,255,0.32);
                    transform: translateY(-2px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.18),
                        0 4px 18px rgba(255,255,255,0.06);
                }

                .faq2-navlink {
                    font-size: 14px;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq2-navlink:hover { color: #fff; }
            `}</style>

            {/* starfield canvas */}
            <canvas ref={canvasRef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                zIndex: 1, pointerEvents: "none",
            }} />

            {/* CENTER blob — big purple orb */}
            <div style={{
                position: "absolute",
                top: "42%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "560px", height: "480px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(109,40,217,0.65) 0%, rgba(88,28,180,0.35) 35%, rgba(60,10,130,0.1) 60%, transparent 75%)",
                filter: "blur(28px)",
                animation: "blobPulse 6s ease-in-out infinite",
                pointerEvents: "none", zIndex: 2,
            }} />

            {/* inner bright core */}
            <div style={{
                position: "absolute",
                top: "40%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "280px", height: "240px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(139,92,246,0.5) 0%, rgba(109,40,217,0.2) 50%, transparent 75%)",
                filter: "blur(20px)",
                animation: "blobPulse 4s ease-in-out infinite reverse",
                pointerEvents: "none", zIndex: 2,
            }} />

            {/* navbar */}
            <nav style={{
                position: "relative", zIndex: 10,
                height: "60px", padding: "0 44px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
            }}>
                {/* logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "32px", height: "32px",
                        background: "#7c3aed",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px", fontWeight: "900", color: "#fff",
                    }}>T</div>
                    <span style={{ fontWeight: "800", fontSize: "15px", color: "#fff", letterSpacing: "1px" }}>TANISHQ</span>
                </div>

                {/* links */}
                <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
                    {["Home", "About", "Blog", "Contact"].map(l => (
                        <a key={l} href="#" className="faq2-navlink">{l}</a>
                    ))}
                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            padding: "9px 22px",
                            borderRadius: "10px",
                            background: "#7c3aed",
                            color: "#fff",
                            fontSize: "14px", fontWeight: "600",
                            textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#6d28d9";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "#7c3aed";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Book a call
                    </a>
                </div>
            </nav>

            {/* main content */}
            <div style={{
                flex: 1,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "0 48px 60px",
                position: "relative", zIndex: 5,
                textAlign: "center",
                animation: "contentUp 0.9s ease forwards",
            }}>
                {/* badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "5px 16px",
                    borderRadius: "999px",
                    background: "#7c3aed",
                    color: "#fff",
                    fontSize: "13px", fontWeight: "600",
                    marginBottom: "28px",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}>
                    New
                </div>

                {/* big heading */}
                <h1 style={{
                    fontSize: "clamp(1.2rem, 5vh, 5rem)",
                    fontWeight: "800",
                    color: "#fff",
                    lineHeight: 1.08,
                    letterSpacing: "-1.5px",
                    marginBottom: "20px",
                    maxWidth: "820px",
                }}>
                    how much do you charge for<br />animated websites ?
                </h1>

                {/* answer */}
                <p style={{
                    fontSize: "clamp(13px, 1.4vw, 16px)",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: "1.75",
                    maxWidth: "540px",
                    marginBottom: "36px",
                }}>
                    For custom layout, animations and advanced UI interactions, pricing ranges
                    from <strong style={{ color: "rgba(255,255,255,0.88)" }}>₹4,000 – ₹8,000 INR</strong> based
                    on complexity.
                </p>

                {/* buttons */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        className="faq2-btn-fill">
                        Get in touch ↗
                    </a>
                    <a href="https://098tanishq-source.github.io/void-streetwear/"
                        target="_blank" rel="noopener noreferrer"
                        className="faq2-btn-ghost">
                        View services
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ2;