import bgVid from "../../assets/smoke_final.mp4";
import { useEffect, useRef } from "react";

const FAQ3 = () => {
    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            background: "#f8f8ff",
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
                @keyframes blobDrift3 {
                    0%,100% { transform: translate(-50%,-50%) scale(1); }
                    33%     { transform: translate(-48%,-53%) scale(1.05); }
                    66%     { transform: translate(-52%,-47%) scale(0.96); }
                }
                @keyframes contentUp3 {
                    from { opacity:0; transform:translateY(24px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .faq3-navlink {
                    font-size: 14px;
                    color: rgba(0,0,0,0.55);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq3-navlink:hover { color: #000; }

                .faq3-btn {
                    padding: 15px 28px;
                    border-radius: 999px;
                    background: #7c3aed;
                    color: #fff;
                    font-size: 15px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(124,58,237,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                    letter-spacing: 0.2px;
                }
                .faq3-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq3-btn:hover::before { left: 160%; }
                .faq3-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 40px rgba(124,58,237,0.6),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                }
                .faq3-btn-arrow {
                    width: 30px; height: 30px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.22);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 15px;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
                    flex-shrink: 0;
                }
            `}</style>

            {/* big lavender blob — center */}
            <div style={{
                position: "absolute",
                top: "48%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "700px", height: "580px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(167,139,250,0.55) 0%, rgba(139,92,246,0.25) 40%, rgba(196,181,253,0.1) 65%, transparent 78%)",
                filter: "blur(40px)",
                animation: "blobDrift3 7s ease-in-out infinite",
                pointerEvents: "none", zIndex: 1,
            }} />

            {/* secondary softer blob */}
            <div style={{
                position: "absolute",
                top: "44%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px", height: "340px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(196,181,253,0.4) 0%, transparent 70%)",
                filter: "blur(50px)",
                animation: "blobDrift3 9s ease-in-out infinite reverse",
                pointerEvents: "none", zIndex: 1,
            }} />

            {/* navbar */}
            <nav style={{
                position: "relative", zIndex: 10,
                height: "72px", padding: "0 44px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
            }}>
                {/* logo — vintage image style like the reference */}
                <div style={{
                    width: "80px", height: "52px",
                    background: "#f0ece4",
                    border: "1px solid rgba(0,0,0,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", fontWeight: "700",
                    color: "#333", letterSpacing: "2px",
                    fontFamily: "monospace",
                }}>
                    TANISHQ
                </div>

                <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
                    {["About", "Blog", "Work", "Contact"].map(l => (
                        <a key={l} href="#" className="faq3-navlink">{l}</a>
                    ))}
                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            padding: "10px 24px",
                            borderRadius: "999px",
                            background: "#111",
                            color: "#fff",
                            fontSize: "14px", fontWeight: "600",
                            textDecoration: "none",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 12px rgba(0,0,0,0.2)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#333"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.transform = "translateY(0)"; }}
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
                padding: "0 48px 80px",
                position: "relative", zIndex: 5,
                textAlign: "center",
                animation: "contentUp3 0.9s ease forwards",
            }}>
                {/* big heading — dark on light */}
                <h1 style={{
                    fontSize: "clamp(1.7rem, 5vh, 6rem)",
                    fontWeight: "800",
                    color: "#0a0a0a",
                    lineHeight: 1.06,
                    letterSpacing: "-2px",
                    marginBottom: "24px",
                    maxWidth: "820px",
                }}>
                    What about a custom<br />animated site?
                </h1>

                {/* answer */}
                <p style={{
                    fontSize: "clamp(14px, 1.5vw, 17px)",
                    color: "rgba(0,0,0,0.5)",
                    lineHeight: "1.75",
                    maxWidth: "620px",
                    marginBottom: "40px",
                }}>
                    For custom layout, animations and advanced UI interactions, pricing ranges
                    from <strong style={{ color: "rgba(0,0,0,0.8)" }}>₹4,000 – ₹8,000 INR</strong> based on complexity.
                </p>

                {/* single pill button with arrow */}
                <a href="https://ig.me/m/_friendly_dev"
                    target="_blank" rel="noopener noreferrer"
                    className="faq3-btn">
                    Get Started • it's affordable
                    <span className="faq3-btn-arrow">→</span>
                </a>
            </div>
        </div>
    );
};

export default FAQ3;