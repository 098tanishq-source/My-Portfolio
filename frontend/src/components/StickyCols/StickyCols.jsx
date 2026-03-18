 import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01", title: "Brief", sub: "We Talk First",
        desc: "You tell me what you need — your brand, your audience, your goal. No forms, no agency nonsense. Just a direct conversation.",
        tags: ["Discovery", "Goals", "Timeline"], color: "#cc1100",
        nodes: [
            { id: "A", label: "Client", x: 80, y: 110 },
            { id: "B", label: "Goals", x: 280, y: 60 },
            { id: "C", label: "Budget", x: 280, y: 160 },
            { id: "D", label: "Brief", x: 500, y: 110 },
        ],
        edges: [["A","B"], ["A","C"], ["B","D"], ["C","D"]],
    },
    {
        num: "02", title: "Design", sub: "Visuals First",
        desc: "I design the look and feel before writing a single line of code. Typography, layout, color — everything locked in before we build.",
        tags: ["Figma", "UI/UX", "Layout"], color: "#ff4400",
        nodes: [
            { id: "A", label: "Wireframe", x: 80, y: 110 },
            { id: "B", label: "Typography", x: 260, y: 50 },
            { id: "C", label: "Colors", x: 260, y: 170 },
            { id: "D", label: "Layout", x: 460, y: 110 },
            { id: "E", label: "Approve", x: 600, y: 110 },
        ],
        edges: [["A","B"], ["A","C"], ["B","D"], ["C","D"], ["D","E"]],
    },
    {
        num: "03", title: "Build", sub: "Code It Clean",
        desc: "Fast, responsive, pixel-perfect. Built with React, Tailwind, GSAP. No templates, no shortcuts. Every element from scratch.",
        tags: ["React", "Tailwind", "GSAP"], color: "#ff2200",
        nodes: [
            { id: "A", label: "React", x: 80, y: 110 },
            { id: "B", label: "Tailwind", x: 250, y: 50 },
            { id: "C", label: "GSAP", x: 250, y: 170 },
            { id: "D", label: "Build", x: 430, y: 110 },
            { id: "E", label: "Test", x: 570, y: 60 },
            { id: "F", label: "Fix", x: 570, y: 160 },
        ],
        edges: [["A","B"], ["A","C"], ["B","D"], ["C","D"], ["D","E"], ["D","F"]],
    },
    {
        num: "04", title: "Deliver", sub: "Live in Days",
        desc: "3–10 days from brief to live. You get the files, the code, the deployment. Clean handoff, ready to scale.",
        tags: ["3–10 Days", "Deployed", "Yours"], color: "#cc1100",
        nodes: [
            { id: "A", label: "Files", x: 80, y: 110 },
            { id: "B", label: "Deploy", x: 270, y: 110 },
            { id: "C", label: "Live", x: 450, y: 60 },
            { id: "D", label: "Scale", x: 450, y: 160 },
            { id: "E", label: "Done ✓", x: 600, y: 110 },
        ],
        edges: [["A","B"], ["B","C"], ["B","D"], ["C","E"], ["D","E"]],
    },
];

const NodeDiagram = ({ step }) => {
    const svgRef = useRef(null);
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useGSAP(() => {
        if (!svgRef.current) return;
        const nodes = svgRef.current.querySelectorAll(".n-node");
        const edges = svgRef.current.querySelectorAll(".n-edge");
        const labels = svgRef.current.querySelectorAll(".n-label");
        const glows = svgRef.current.querySelectorAll(".n-glow");

        gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.set(edges, { strokeDashoffset: 300, opacity: 0 });
        gsap.set(labels, { opacity: 0 });
        gsap.set(glows, { scale: 0, opacity: 0, transformOrigin: "center center" });

        const tl = gsap.timeline({ delay: 0.1 });
        tl.to(edges, { strokeDashoffset: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" })
          .to(glows, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "<0.2")
          .to(nodes, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, "<0.05")
          .to(labels, { opacity: 1, duration: 0.3, stagger: 0.06 }, "<0.1");

        gsap.to(glows, {
            scale: 1.8, opacity: 0, duration: 1.5,
            stagger: 0.2, repeat: -1, ease: "power2.out",
        });

        nodes.forEach((node) => {
            gsap.to(node.querySelector('rect'), {
                filter: `drop-shadow(0 0 8px ${step.color})`,
                duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
            });
        });
    }, { scope: svgRef, dependencies: [step.num] });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const color = step.color;
        const particles = [];

        step.edges.forEach(([from, to]) => {
            const a = step.nodes.find(n => n.id === from);
            const b = step.nodes.find(n => n.id === to);
            if (!a || !b) return;
            const scaleX = canvas.width / 680;
            const scaleY = canvas.height / 220;
            for (let i = 0; i < 3; i++) {
                particles.push({
                    ax: a.x * scaleX, ay: a.y * scaleY,
                    bx: b.x * scaleX, by: b.y * scaleY,
                    t: Math.random(),
                    speed: 0.003 + Math.random() * 0.003,
                    size: 2 + Math.random() * 2,
                    opacity: 0.6 + Math.random() * 0.4,
                });
            }
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.t += p.speed;
                if (p.t > 1) p.t = 0;
                const mx = (p.ax + p.bx) / 2;
                const t = p.t;
                const x = (1-t)*(1-t)*p.ax + 2*(1-t)*t*mx + t*t*p.bx;
                const y = (1-t)*(1-t)*p.ay + 2*(1-t)*t*((p.ay+p.by)/2) + t*t*p.by;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
                grad.addColorStop(0, color + 'ff');
                grad.addColorStop(1, color + '00');
                ctx.beginPath();
                ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            });
            animRef.current = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animRef.current);
    }, [step.num]);

    const getNode = (id) => step.nodes.find(n => n.id === id);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 2,
            }} />
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: `linear-gradient(to bottom, transparent 0%, ${step.color}08 50%, transparent 100%)`,
                animation: 'scanline 3s linear infinite',
                pointerEvents: 'none',
            }} />
            <svg ref={svgRef} width="100%" height="100%"
                viewBox="0 0 680 220"
                style={{ position: 'relative', zIndex: 3, overflow: 'visible' }}>
                <defs>
                    <filter id={`glow-${step.num}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                {step.edges.map(([from, to], i) => {
                    const a = getNode(from);
                    const b = getNode(to);
                    if (!a || !b) return null;
                    const mx = (a.x + b.x) / 2;
                    return (
                        <path key={i} className="n-edge"
                            d={`M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`}
                            fill="none"
                            stroke={`${step.color}80`}
                            strokeWidth="1.5"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                            filter={`url(#glow-${step.num})`}
                        />
                    );
                })}
                {step.nodes.map((node, i) => (
                    <g key={i}>
                        <circle className="n-glow"
                            cx={node.x} cy={node.y} r="20"
                            fill="none" stroke={step.color}
                            strokeWidth="1" opacity="0"
                        />
                        <g className="n-node"
                            style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
                            <rect x={node.x-46} y={node.y-20} width="92" height="40" rx="6"
                                fill={`${step.color}15`} stroke={`${step.color}40`}
                                strokeWidth="1" filter={`url(#glow-${step.num})`}
                            />
                            <rect x={node.x-44} y={node.y-18} width="88" height="36" rx="5"
                                fill="#080808" stroke={step.color} strokeWidth="1"
                            />
                            <circle cx={node.x-34} cy={node.y} r="4" fill={step.color} />
                            <circle cx={node.x-34} cy={node.y} r="4" fill={step.color}
                                filter={`url(#glow-${step.num})`} opacity="0.5"
                            />
                            <text className="n-label"
                                x={node.x+6} y={node.y+1}
                                textAnchor="middle" dominantBaseline="middle"
                                fill="#f0ece4" fontSize="11"
                                fontFamily="monospace" letterSpacing="0.5"
                            >{node.label}</text>
                        </g>
                    </g>
                ))}
            </svg>
        </div>
    );
};

const Card = ({ step }) => (
    <div style={{
        width: '100%', height: '100%',
        background: '#0a0000',
        display: 'flex', flexDirection: 'row',
        position: 'relative', overflow: 'hidden',
    }}>
        {/* LEFT */}
        <div style={{
            width: '50%', height: '100%',
            borderRight: `1px solid ${step.color}20`,
            padding: 'clamp(24px, 4vw, 56px)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
        }}>
            <span style={{
                position: 'absolute', bottom: '-20px', right: '10px',
                fontSize: 'clamp(6rem, 10vw, 10rem)', fontWeight: '900',
                color: `${step.color}06`, lineHeight: 1,
                userSelect: 'none', fontFamily: 'monospace', pointerEvents: 'none',
            }}>{step.num}</span>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: step.color }} />
                    <span style={{ color: step.color, fontSize: '0.6rem', letterSpacing: '3px' }}>STEP {step.num}</span>
                </div>
                <h2 style={{
                    color: '#f0ece4',
                    fontSize: 'clamp(2rem, 5vvh, 6.5rem)',
                    fontWeight: '700', lineHeight: 0.9,
                    letterSpacing: '-2px', marginBottom: '12px',
                }}>{step.title}</h2>
                <p style={{ color: step.color, fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '24px' }}>
                    {step.sub}
                </p>
                <p style={{ color: 'rgba(240,236,228,0.45)', fontSize: 'clamp(0.8rem, 1.1vw, 1rem)', lineHeight: '1.7' }}>
                    {step.desc}
                </p>
            </div>

            <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {step.tags.map((tag, j) => (
                        <span key={j} style={{
                            border: `1px solid ${step.color}40`,
                            color: step.color, fontSize: '0.6rem',
                            letterSpacing: '2px', padding: '4px 12px',
                        }}>{tag}</span>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {steps.map((s, i) => (
                        <div key={i} style={{
                            height: '3px',
                            width: s.num === step.num ? '32px' : '8px',
                            background: s.num === step.num ? step.color : 'rgba(240,236,228,0.1)',
                            borderRadius: '2px',
                        }} />
                    ))}
                </div>
            </div>

            <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '100%', height: '2px',
                background: `linear-gradient(90deg, ${step.color}, transparent)`,
            }} />
        </div>

        {/* RIGHT — node diagram */}
        <div style={{
            width: '50%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '40px', position: 'relative',
            background: `radial-gradient(ellipse at center, ${step.color}08 0%, transparent 70%)`,
        }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
                <defs>
                    <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="15" cy="15" r="1" fill={step.color} />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div style={{
                position: 'absolute', top: '28px', left: '28px',
                color: `${step.color}60`, fontSize: '0.6rem', letterSpacing: '3px',
            }}>
                WORKFLOW — {step.title.toUpperCase()}
            </div>
            <NodeDiagram step={step} />
        </div>
    </div>
);

const StickyCols = () => {
    useGSAP(() => {
        gsap.set(".sc-col-2", { x: "100%" });
        gsap.set(".sc-col-3", { y: "100%" });
        gsap.set(".sc-col-4", { y: "100%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".sc-section",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1,
            },
        });

        tl.to(".sc-col-1", { opacity: 0, scale: 0.92, duration: 1 })
          .to(".sc-col-2", { x: "0%", duration: 1 }, "<")
          .to(".sc-col-2", { opacity: 0, scale: 0.92, duration: 1 }, "+=0.5")
          .to(".sc-col-3", { y: "0%", duration: 1 }, "<")
          .to(".sc-col-3", { opacity: 0, scale: 0.92, duration: 1 }, "+=0.5")
          .to(".sc-col-4", { y: "0%", duration: 1 }, "<");

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
            tl.kill();
        };
    });

    const colBase = {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
    };

    return (
        <section className="sc-section"
            style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0000' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div className="sc-col-1" style={colBase}><Card step={steps[0]} /></div>
                <div className="sc-col-2" style={colBase}><Card step={steps[1]} /></div>
                <div className="sc-col-3" style={colBase}><Card step={steps[2]} /></div>
                <div className="sc-col-4" style={colBase}><Card step={steps[3]} /></div>
            </div>
        </section>
    );
};

export default StickyCols;