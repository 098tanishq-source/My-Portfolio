import bgVid from "../../assets/smoke_final.mp4";
import { useEffect, useRef } from "react";
 
const FAQ5 = () => {
    const globeRef = useRef(null);

    useEffect(() => {
        const canvas = globeRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = 420, H = 420;
        canvas.width = W; canvas.height = H;
        const cx = W / 2, cy = H / 2, R = 170;
        let rot = 0, aid;

        // globe dots
        const dots = [];
        for (let lat = -80; lat <= 80; lat += 7) {
            for (let lng = -180; lng <= 180; lng += 7) {
                const r2 = lat * Math.PI / 180;
                const l2 = lng * Math.PI / 180;
                const land =
                    (lat > 25 && lat < 70 && lng > -25 && lng < 60) ||
                    (lat > -35 && lat < 15 && lng > -20 && lng < 55) ||
                    (lat > 25 && lat < 75 && lng > -140 && lng < -50) ||
                    (lat > -55 && lat < 15 && lng > -80 && lng < -35) ||
                    (lat > -45 && lat < -10 && lng > 110 && lng < 155);
                dots.push({ r2, l2, land });
            }
        }

        const cities = [
            { lat: 28.6, lng: 77.2, name: "Delhi" },
            { lat: 40.7, lng: -74, name: "New York" },
            { lat: 51.5, lng: -0.1, name: "London" },
            { lat: 35.7, lng: 139.7, name: "Tokyo" },
            { lat: -33.9, lng: 18.4, name: "Cape Town" },
            { lat: 48.8, lng: 2.3, name: "Paris" },
            { lat: 1.3, lng: 103.8, name: "Singapore" },
        ];

        // arc connections between cities
        const arcs = [
            [0, 1], [0, 2], [1, 2], [2, 5], [0, 6], [3, 6], [1, 5]
        ];

        // animated packets on arcs
        const packets = arcs.map(([a, b]) => ({
            from: a, to: b,
            t: Math.random(),
            speed: 0.003 + Math.random() * 0.003,
        }));

        const project = (lat, lng) => {
            const r2 = lat * Math.PI / 180;
            const l2 = lng * Math.PI / 180 + rot;
            const x = R * Math.cos(r2) * Math.sin(l2);
            const y3 = R * Math.sin(r2);
            const z = R * Math.cos(r2) * Math.cos(l2);
            return { px: cx + x, py: cy - y3, z };
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // --- ATMOSPHERE GLOW ---
            const atm = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.18);
            atm.addColorStop(0, "rgba(13,148,136,0.12)");
            atm.addColorStop(0.5, "rgba(13,148,136,0.05)");
            atm.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
            ctx.fillStyle = atm;
            ctx.fill();

            // --- GLOBE BASE ---
            const globeGrad = ctx.createRadialGradient(cx - 50, cy - 50, 10, cx, cy, R);
            globeGrad.addColorStop(0, "rgba(10,30,30,0.95)");
            globeGrad.addColorStop(0.5, "rgba(3,20,20,0.98)");
            globeGrad.addColorStop(1, "rgba(0,8,8,1)");
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = globeGrad;
            ctx.fill();

            rot += 0.004;

            // --- LATITUDE LINES ---
            for (let lat = -60; lat <= 60; lat += 30) {
                const r2 = lat * Math.PI / 180;
                const ry = R * Math.sin(r2);
                const rx = R * Math.cos(r2);
                ctx.beginPath();
                ctx.ellipse(cx, cy - ry, rx, rx * 0.15, 0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(13,148,136,0.07)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            // --- LONGITUDE LINES ---
            for (let lng = 0; lng < 180; lng += 30) {
                const angle = lng * Math.PI / 180 + rot;
                ctx.beginPath();
                ctx.ellipse(cx, cy, R * Math.abs(Math.cos(angle)), R, R * Math.sin(angle) > 0 ? 0 : Math.PI, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(13,148,136,0.05)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            // --- DOTS ---
            dots.forEach(d => {
                const l2 = d.l2 + rot;
                const x3 = R * Math.cos(d.r2) * Math.sin(l2);
                const y3 = R * Math.sin(d.r2);
                const z = R * Math.cos(d.r2) * Math.cos(l2);
                if (z < 0) return;
                const px = cx + x3, py = cy - y3;
                const bright = z / R;
                ctx.beginPath();
                ctx.arc(px, py, d.land ? 1.6 : 0.7, 0, Math.PI * 2);
                ctx.fillStyle = d.land
                    ? `rgba(13,148,136,${0.25 + bright * 0.55})`
                    : `rgba(13,148,136,${0.04 + bright * 0.08})`;
                ctx.fill();
            });

            // --- ARC CONNECTIONS ---
            arcs.forEach(([ai, bi]) => {
                const ca = cities[ai], cb = cities[bi];
                const pa = project(ca.lat, ca.lng);
                const pb = project(cb.lat, cb.lng);
                if (pa.z < 0 || pb.z < 0) return;
                const midX = (pa.px + pb.px) / 2;
                const midY = (pa.py + pb.py) / 2 - 40;
                ctx.beginPath();
                ctx.moveTo(pa.px, pa.py);
                ctx.quadraticCurveTo(midX, midY, pb.px, pb.py);
                ctx.strokeStyle = "rgba(13,148,136,0.2)";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            });

            // --- ANIMATED PACKETS on arcs ---
            packets.forEach(pkt => {
                pkt.t += pkt.speed;
                if (pkt.t > 1) pkt.t = 0;
                const ca = cities[pkt.from], cb = cities[pkt.to];
                const pa = project(ca.lat, ca.lng);
                const pb = project(cb.lat, cb.lng);
                if (pa.z < 0 || pb.z < 0) return;
                const t = pkt.t;
                const midX = (pa.px + pb.px) / 2;
                const midY = (pa.py + pb.py) / 2 - 40;
                const bx = (1 - t) * (1 - t) * pa.px + 2 * (1 - t) * t * midX + t * t * pb.px;
                const by = (1 - t) * (1 - t) * pa.py + 2 * (1 - t) * t * midY + t * t * pb.py;
                const grd = ctx.createRadialGradient(bx, by, 0, bx, by, 5);
                grd.addColorStop(0, "rgba(13,255,200,0.9)");
                grd.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(bx, by, 5, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(bx, by, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(200,255,240,0.95)";
                ctx.fill();
            });

            // --- CITY DOTS ---
            cities.forEach(c => {
                const { px, py, z } = project(c.lat, c.lng);
                if (z < 0) return;
                // outer ring
                ctx.beginPath();
                ctx.arc(px, py, 7, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(13,148,136,0.3)";
                ctx.lineWidth = 1;
                ctx.stroke();
                // inner dot
                ctx.beginPath();
                ctx.arc(px, py, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(13,255,200,0.9)";
                ctx.fill();
                // glow
                const cg = ctx.createRadialGradient(px, py, 0, px, py, 10);
                cg.addColorStop(0, "rgba(13,255,200,0.4)");
                cg.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(px, py, 10, 0, Math.PI * 2);
                ctx.fillStyle = cg;
                ctx.fill();
            });

            // --- GLASS LENS OVERLAY ---
            // rim shadow
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(13,148,136,0.25)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // specular highlight — top left
            const spec = ctx.createRadialGradient(cx - 60, cy - 60, 0, cx - 30, cy - 30, R * 0.7);
            spec.addColorStop(0, "rgba(255,255,255,0.09)");
            spec.addColorStop(0.3, "rgba(255,255,255,0.03)");
            spec.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = spec;
            ctx.fill();

            // small top glint
            const glint = ctx.createRadialGradient(cx - 55, cy - 65, 0, cx - 55, cy - 65, 40);
            glint.addColorStop(0, "rgba(255,255,255,0.18)");
            glint.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(cx - 55, cy - 65, 40, 0, Math.PI * 2);
            ctx.fillStyle = glint;
            ctx.fill();

            // bottom edge reflection
            const edge = ctx.createRadialGradient(cx + 40, cy + 100, 0, cx + 40, cy + 100, 60);
            edge.addColorStop(0, "rgba(13,148,136,0.15)");
            edge.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = edge;
            ctx.fill();

            aid = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(aid);
    }, []);

    return (
        <div style={{
            position: "relative",
            width: "100%", height: "100vh",
            background: "#030d0d",
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
                @keyframes contentLeft5 {
                    from { opacity:0; transform:translateX(-28px); }
                    to   { opacity:1; transform:translateX(0); }
                }
                @keyframes globeIn {
                    from { opacity:0; transform:scale(0.88); }
                    to   { opacity:1; transform:scale(1); }
                }
                @keyframes tagFloat {
                    0%,100% { transform:translateY(0); }
                    50% { transform:translateY(-4px); }
                }
                .faq5-navlink {
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq5-navlink:hover { color: rgba(255,255,255,0.8); }

                .faq5-btn {
                    padding: 13px 28px;
                    background: #0d9488;
                    color: #fff;
                    font-size: 12px;
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
                        0 4px 28px rgba(13,148,136,0.5),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq5-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq5-btn:hover::before { left: 160%; }
                .faq5-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 40px rgba(13,148,136,0.65),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                }

                .faq5-pay {
                    padding: 7px 16px;
                    border: 1px solid rgba(13,148,136,0.3);
                    color: #0d9488;
                    font-family: monospace;
                    font-size: 11px;
                    letter-spacing: 1.5px;
                    background: rgba(13,148,136,0.06);
                    transition: all 0.2s;
                    cursor: default;
                }
                .faq5-pay:hover {
                    background: rgba(13,148,136,0.14);
                    border-color: rgba(13,148,136,0.55);
                    color: #2dd4bf;
                }
            `}</style>

            {/* teal radial glow — right */}
            <div style={{
                position: "absolute",
                top: "50%", right: "-5%",
                transform: "translateY(-50%)",
                width: "600px", height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(13,148,136,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none", zIndex: 1,
            }} />

            {/* grid overlay */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                backgroundImage: "linear-gradient(rgba(13,148,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.025) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }} />

            {/* navbar */}
            <nav style={{
                position: "relative", zIndex: 10,
                height: "64px", padding: "0 52px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
            }}>
                <span style={{ fontWeight: "800", fontSize: "14px", color: "#fff", letterSpacing: "3px" }}>TANISHQ</span>
                <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                    {["About", "Work", "Blog"].map(l => (
                        <a key={l} href="#" className="faq5-navlink">{l}</a>
                    ))}
                    <a href="https://ig.me/m/_friendly_dev" target="_blank" rel="noopener noreferrer"
                        style={{
                            padding: "8px 22px",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#fff",
                            fontSize: "11px", fontWeight: "700",
                            letterSpacing: "2px", textTransform: "uppercase",
                            textDecoration: "none",
                            background: "transparent",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                    >Book a call</a>
                </div>
            </nav>

            {/* body */}
            <div style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                alignItems: "center",
                padding: "0 52px 40px",
                position: "relative", zIndex: 5,
                maxWidth: "1200px",
                margin: "0 auto",
                width: "100%",
            }}>

                {/* LEFT */}
                <div style={{ animation: "contentLeft5 0.9s ease forwards" }}>
                    {/* tag */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        marginBottom: "20px",
                        animation: "tagFloat 3s ease-in-out infinite",
                    }}>
                        <span style={{ fontFamily: "monospace", fontSize: "13px", color: "rgba(255,255,255,0.15)", fontWeight: "700" }}>05</span>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "4px", color: "#0d9488", textTransform: "uppercase" }}>Global Clients</span>
                    </div>

                    {/* big heading */}
                    <h1 style={{
                        fontFamily: "'Bebas Neue', 'Syne', sans-serif",
                        fontSize: "clamp(2.5srem, 6vh, 7rem)",
                        fontWeight: "900",
                        lineHeight: 0.92,
                        letterSpacing: "2px",
                        color: "#fff",
                        marginBottom: "28px",
                        textTransform: "uppercase",
                    }}>
                        Do you work<br />with<br />
                        <em style={{
                            fontStyle: "normal",
                            WebkitTextStroke: "1px rgba(13,148,136,0.5)",
                            color: "transparent",
                            display: "block",
                        }}>international</em>
                        <span style={{ color: "#fff" }}>clients?</span>
                    </h1>

                    <p style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: "1.8",
                        maxWidth: "400px",
                        marginBottom: "24px",
                    }}>
                        100% yes. I work with clients across India, the US, Europe, and beyond.{" "}
                        <strong style={{ color: "rgba(255,255,255,0.82)" }}>Payments handled seamlessly</strong>{" "}
                        through multiple platforms.
                    </p>

                    {/* payment tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                        {["PayPal", "Wise", "Crypto", "UPI · India"].map((p) => (
                            <div key={p} className="faq5-pay">{p}</div>
                        ))}
                    </div>

                    <a href="https://ig.me/m/_friendly_dev"
                        target="_blank" rel="noopener noreferrer"
                        className="faq5-btn">
                        Get in touch ↗
                    </a>
                </div>

                {/* RIGHT — 3D globe */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "globeIn 1.2s ease forwards",
                    position: "relative",
                }}>
                    {/* outer glow ring */}
                    <div style={{
                        position: "absolute",
                        width: "440px", height: "440px",
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse at center, rgba(13,148,136,0.08) 0%, transparent 70%)",
                        filter: "blur(20px)",
                        pointerEvents: "none",
                    }} />
                    <canvas ref={globeRef}
                        style={{
                            position: "relative",
                            borderRadius: "50%",
                            filter: "drop-shadow(0 0 30px rgba(13,148,136,0.3)) drop-shadow(0 0 60px rgba(13,148,136,0.1))",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FAQ5;