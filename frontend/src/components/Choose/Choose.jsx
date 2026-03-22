 import { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";
import { Calendar, Code, FileText, Palette, Rocket, ArrowRight, Link, Zap, X, Plus } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import wavesVid from "../../assets/waves.mp4";

// ── CARD IMAGES ───────────────────────────────────────────────────────────
const cardImages = [
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80",
];

const sectionCards = [
    { id: "process", label: "HOW I WORK",    sub: "My process",        color: "#8b5cf6", imgIndex: 0 },
    { id: "tech",    label: "TECH SKILLS",   sub: "Languages & tools", color: "#3b82f6", imgIndex: 1 },
    { id: "design",  label: "DESIGN SKILLS", sub: "Creative side",     color: "#14b8a6", imgIndex: 2 },
    { id: "pricing", label: "PRICING",       sub: "What it costs",     color: "#f59e0b", imgIndex: 3 },
    { id: "faq",     label: "FAQ",           sub: "Your questions",    color: "#ec4899", imgIndex: 4 },
    { id: "journey", label: "MY JOURNEY",    sub: "How it started",    color: "#f97316", imgIndex: 5 },
];

// ── 3D IMAGE CARD ─────────────────────────────────────────────────────────
function ImageCard({ position, rotation, texture, color, onClick, isHovered, onHover, onUnhover }) {
    const meshRef = useRef(null);
    const targetScale = useRef(1);
    const currentScale = useRef(1);

    useFrame(() => {
        if (!meshRef.current) return;
        targetScale.current = isHovered ? 1.25 : 1;
        currentScale.current += (targetScale.current - currentScale.current) * 0.12;
        meshRef.current.scale.setScalar(currentScale.current);
    });

    return (
        <group position={position} rotation={rotation}>
            <mesh ref={meshRef}
                onClick={e => { e.stopPropagation(); onClick(); }}
                onPointerEnter={e => { e.stopPropagation(); onHover(); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={e => { e.stopPropagation(); onUnhover(); document.body.style.cursor = 'default'; }}
            >
                <planeGeometry args={[2.2, 1.6]} />
                <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.92} />
            </mesh>
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(2.2, 1.6)]} />
                <lineBasicMaterial color={color} transparent opacity={isHovered ? 1 : 0.4} />
            </lineSegments>
        </group>
    );
}

// ── PARTICLE SPHERE ───────────────────────────────────────────────────────
function ParticleSphereScene({ onCardClick }) {
    const SPHERE_RADIUS = 6;
    const groupRef = useRef(null);
    const [hoveredId, setHoveredId] = useState(null);
    const textures = useTexture(cardImages);

    useMemo(() => {
        textures.forEach(t => {
            if (t) { t.wrapS = THREE.ClampToEdgeWrapping; t.wrapT = THREE.ClampToEdgeWrapping; t.flipY = false; }
        });
    }, [textures]);

    const particles = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 800; i++) {
            const phi = Math.acos(-1 + (2 * i) / 800);
            const theta = Math.sqrt(800 * Math.PI) * phi;
            const r = SPHERE_RADIUS + (Math.random() - 0.5) * 3;
            pts.push({
                position: [r * Math.cos(theta) * Math.sin(phi), r * Math.cos(phi), r * Math.sin(theta) * Math.sin(phi)],
                scale: Math.random() * 0.007 + 0.002,
                color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.8, 0.6 + Math.random() * 0.3),
            });
        }
        return pts;
    }, []);

    const cardPositions = useMemo(() => {
        return sectionCards.map((_, i) => {
            const angle = (i / sectionCards.length) * Math.PI * 2;
            const tilt = (i % 2 === 0) ? 0.4 : -0.4;
            const x = SPHERE_RADIUS * Math.cos(angle);
            const y = tilt * SPHERE_RADIUS * 0.5;
            const z = SPHERE_RADIUS * Math.sin(angle);
            const position = new THREE.Vector3(x, y, z);
            const outwardDir = position.clone().normalize();
            const euler = new THREE.Euler();
            const matrix = new THREE.Matrix4();
            matrix.lookAt(position, position.clone().add(outwardDir), new THREE.Vector3(0, 1, 0));
            euler.setFromRotationMatrix(matrix);
            euler.z += Math.PI;
            return { position: [x, y, z], rotation: [euler.x, euler.y, euler.z] };
        });
    }, []);

    useFrame(() => { if (groupRef.current) groupRef.current.rotation.y += 0.0004; });

    return (
        <group ref={groupRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position} scale={p.scale}>
                    <sphereGeometry args={[1, 6, 4]} />
                    <meshBasicMaterial color={p.color} transparent opacity={1} />
                </mesh>
            ))}
            {sectionCards.map((card, i) => (
                <ImageCard key={card.id}
                    position={cardPositions[i].position}
                    rotation={cardPositions[i].rotation}
                    texture={textures[card.imgIndex]}
                    color={card.color}
                    isHovered={hoveredId === card.id}
                    onHover={() => setHoveredId(card.id)}
                    onUnhover={() => setHoveredId(null)}
                    onClick={() => onCardClick(card.id)}
                />
            ))}
        </group>
    );
}

// ── CLOUD CONFIG ──────────────────────────────────────────────────────────
const cloudProps = {
    containerProps: { style: { display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" } },
    options: { reverse: true, depth: 1, wheelZoom: false, imageScale: 2, activeCursor: "pointer", tooltip: "native", initial: [0.1, -0.1], clickToFront: 500, tooltipDelay: 0, outlineColour: "#0000", maxSpeed: 0.04, minSpeed: 0.02, dragControl: true },
};

const iconSlugs = ["react", "javascript", "html5", "css3", "tailwindcss", "gsap", "vite", "figma", "git", "github", "vercel", "npm", "visualstudiocode", "typescript"];

// ── PROCESS DATA ──────────────────────────────────────────────────────────
const timelineData = [
    { id: 1, title: "Discovery", date: "Day 1",   icon: Calendar, content: "I learn about your brand, goals and target audience before anything else.", relatedIds: [2],    status: "completed",   energy: 100 },
    { id: 2, title: "Design",    date: "Day 2-3",  icon: Palette,  content: "Wireframes and visual direction. You approve before I write a single line of code.", relatedIds: [1,3], status: "completed",   energy: 85  },
    { id: 3, title: "Build",     date: "Day 3-5",  icon: Code,     content: "Clean React code, GSAP animations, fully responsive. Fast and production ready.", relatedIds: [2,4], status: "in-progress", energy: 70  },
    { id: 4, title: "Review",    date: "Day 5",    icon: FileText, content: "You get a live preview. We tweak anything until it feels perfect.", relatedIds: [3,5], status: "pending",     energy: 50  },
    { id: 5, title: "Launch",    date: "Day 5-6",  icon: Rocket,   content: "Deployed, live and ready to get you clients.", relatedIds: [4],    status: "pending",     energy: 30  },
];

// ── PRICING DATA ──────────────────────────────────────────────────────────
const pricingTiers = [
    { name: "Starter",  icon: "✏️", price: "₹2,000", desc: "Simple landing page",      features: ["1 page", "Responsive", "3 day delivery", "1 revision"],                  popular: false, rotate: "-1deg" },
    { name: "Standard", icon: "⭐️", price: "₹4,000", desc: "Multi-page animated site",  features: ["Up to 4 pages", "GSAP animations", "5 day delivery", "2 revisions"],     popular: true,  rotate: "1deg"  },
    { name: "Premium",  icon: "✨",  price: "₹8,000", desc: "Full custom project",        features: ["Unlimited pages", "Custom everything", "7 days", "Unlimited revisions"], popular: false, rotate: "-2deg" },
];

// ── FAQ DATA ──────────────────────────────────────────────────────────────
const faqCategories = { pricing: "Pricing", timeline: "Timeline", technical: "Technical", process: "Process", advanced: "Advanced" };

const faqData = {
    pricing: [
        { q: "How much do you charge?", a: "Rs 2,000 to Rs 8,000 depending on scope. Basic landing page starts at Rs 2K, full animated site up to Rs 8K." },
        { q: "What payment terms?", a: "50% advance before starting, 50% on delivery. No hidden charges." },
        { q: "How many revisions?", a: "1 on Basic, 2 on Standard, unlimited on Premium." },
        { q: "Do you build e-commerce?", a: "Yes, basic product listing and cart. Reach out for a custom quote." },
    ],
    timeline: [
        { q: "How long will it take?", a: "3 to 7 days depending on plan. Basic in 3 days, premium in up to 7." },
        { q: "What happens after delivery?", a: "You get the full code. Available for questions and minor fixes for 7 days." },
        { q: "Do you provide maintenance?", a: "Yes, on a separate agreement. Reach out for monthly maintenance pricing." },
        { q: "Can you add pages later?", a: "Absolutely. Future additions are charged separately based on scope." },
    ],
    technical: [
        { q: "Do you make mobile-friendly sites?", a: "Yes, every site is fully responsive across mobile, tablet and desktop." },
        { q: "Will my website load fast?", a: "Yes, I optimize assets and use Vite builds with performance best practices." },
        { q: "What technologies do you use?", a: "React, Vite, Tailwind CSS, GSAP for animations, and Figma for design." },
        { q: "Domain and hosting setup?", a: "Yes, I can guide you or deploy to Vercel/GitHub Pages for free." },
        { q: "Can I update content myself?", a: "Yes for simple edits. I will build an easy-to-edit structure and walk you through it." },
    ],
    process: [
        { q: "How do you handle communication?", a: "Via Instagram DM or WhatsApp. Updates at each stage before moving forward." },
        { q: "Can you redesign my existing site?", a: "Yes. Share your current site and what you want changed for a quote." },
        { q: "Do you add animations?", a: "Yes — GSAP scroll animations, hover effects and entrance reveals are my specialty." },
        { q: "Do you provide SEO?", a: "Basic SEO — meta tags, Open Graph, page titles — is always included." },
        { q: "Why hire you?", a: "Fast delivery, premium design, honest pricing, and I actually care about making your site work for your business." },
    ],
    advanced: [
        { q: "Custom UI based on my brand?", a: "Yes, I design with your brand colors, fonts and tone from the start." },
        { q: "Can you improve my UX?", a: "Yes. I analyze your current UX and redesign flows to reduce friction." },
        { q: "Do you write the content?", a: "You provide main content. I help structure and polish it." },
        { q: "Can I see previous work?", a: "Yes! Check the Projects section on this portfolio or visit my GitHub." },
    ],
};

// ── VIDEO BG ──────────────────────────────────────────────────────────────
const VideoBg = () => (
    <>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, zIndex: 0 }}>
            <source src={wavesVid} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1 }} />
    </>
);

// ── PROCESS CONTENT ───────────────────────────────────────────────────────
const ProcessContent = () => {
    const [expandedItems, setExpandedItems] = useState({});
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const [activeNodeId, setActiveNodeId] = useState(null);
    const nodeRefs = useRef({});
    const timerRef = useRef(null);

    useEffect(() => {
        if (!autoRotate) return;
        timerRef.current = setInterval(() => setRotationAngle(prev => Number(((prev + 0.3) % 360).toFixed(3))), 50);
        return () => clearInterval(timerRef.current);
    }, [autoRotate]);

    const getRelatedItems = (itemId) => (timelineData.find(i => i.id === itemId)?.relatedIds || []);

    const toggleItem = (id) => {
        setExpandedItems(prev => {
            const newState = { ...prev };
            Object.keys(newState).forEach(key => { if (parseInt(key) !== id) newState[parseInt(key)] = false; });
            newState[id] = !prev[id];
            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);
                clearInterval(timerRef.current);
                setRotationAngle(270 - (timelineData.findIndex(item => item.id === id) / timelineData.length) * 360);
                const pulse = {};
                getRelatedItems(id).forEach(r => { pulse[r] = true; });
                setPulseEffect(pulse);
            } else { setActiveNodeId(null); setAutoRotate(true); setPulseEffect({}); }
            return newState;
        });
    };

    const getPos = (index, total) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const rad = (angle * Math.PI) / 180;
        return { x: 200 * Math.cos(rad), y: 200 * Math.sin(rad), zIndex: Math.round(100 + 50 * Math.cos(rad)), opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2))) };
    };

    const getStatusStyle = (s) => {
        if (s === "completed")   return { bg: "#000", color: "#fff", border: "#fff" };
        if (s === "in-progress") return { bg: "#fff", color: "#000", border: "#000" };
        return { bg: "rgba(0,0,0,0.4)", color: "#fff", border: "rgba(255,255,255,0.5)" };
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <VideoBg />
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => { setExpandedItems({}); setActiveNodeId(null); setPulseEffect({}); setAutoRotate(true); }}
            >
                <div style={{ position: 'absolute', zIndex: 10, width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}>
                    <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', animation: 'ping-ring 1s ease-out infinite' }} />
                    <div style={{ position: 'absolute', width: '96px', height: '96px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'ping-ring 1s ease-out infinite', animationDelay: '0.5s' }} />
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
                </div>
                <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
                {timelineData.map((item, i) => {
                    const pos = getPos(i, timelineData.length);
                    const isExp = expandedItems[item.id];
                    const isRel = activeNodeId && getRelatedItems(activeNodeId).includes(item.id);
                    const isPulsing = pulseEffect[item.id];
                    const Icon = item.icon;
                    const ss = getStatusStyle(item.status);
                    return (
                        <div key={item.id} ref={el => nodeRefs.current[item.id] = el}
                            onClick={e => { e.stopPropagation(); toggleItem(item.id); }}
                            style={{ position: 'absolute', transform: `translate(${pos.x}px, ${pos.y}px)`, zIndex: isExp ? 200 : pos.zIndex, opacity: isExp ? 1 : pos.opacity, transition: 'all 0.7s ease', cursor: 'pointer' }}
                        >
                            {isPulsing && <div style={{ position: 'absolute', width: `${item.energy * 0.5 + 40}px`, height: `${item.energy * 0.5 + 40}px`, left: `-${item.energy * 0.25}px`, top: `-${item.energy * 0.25}px`, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', animation: 'pulse-ring 1s ease-in-out infinite' }} />}
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isExp ? '#fff' : isRel ? 'rgba(255,255,255,0.5)' : '#000', border: `2px solid ${isExp ? '#fff' : isRel ? '#fff' : 'rgba(255,255,255,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isExp ? 'scale(1.5)' : 'scale(1)', transition: 'all 0.3s ease', boxShadow: isExp ? '0 0 20px rgba(255,255,255,0.3)' : 'none', color: isExp ? '#000' : '#fff' }}>
                                <Icon size={16} />
                            </div>
                            <div style={{ position: 'absolute', top: '48px', left: '50%', transform: isExp ? 'translateX(-50%) scale(1.25)' : 'translateX(-50%)', whiteSpace: 'nowrap', color: isExp ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: '0.6rem', letterSpacing: '2px', fontWeight: isExp ? '700' : '400', transition: 'all 0.3s' }}>{item.title}</div>
                            {isExp && (
                                <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', width: '256px', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.8)', zIndex: 300 }}>
                                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', width: '1px', height: '12px', background: 'rgba(255,255,255,0.5)' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ padding: '2px 10px', borderRadius: '999px', fontSize: '0.55rem', letterSpacing: '1px', fontWeight: '600', background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                                            {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                                        </span>
                                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', fontFamily: 'monospace' }}>{item.date}</span>
                                    </div>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', lineHeight: 1.6, marginBottom: '14px' }}>{item.content}</p>
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.55rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={10} /> Energy</span>
                                            <span style={{ color: '#fff', fontSize: '0.55rem', fontFamily: 'monospace' }}>{item.energy}%</span>
                                        </div>
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${item.energy}%`, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '999px' }} />
                                        </div>
                                    </div>
                                    {item.relatedIds.length > 0 && (
                                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                                <Link size={10} color="rgba(255,255,255,0.7)" />
                                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.55rem', letterSpacing: '2px' }}>CONNECTED</span>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {item.relatedIds.map(relId => {
                                                    const relItem = timelineData.find(i => i.id === relId);
                                                    return (
                                                        <button key={relId} onClick={e => { e.stopPropagation(); toggleItem(relId); }}
                                                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', height: '24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontSize: '0.6rem', cursor: 'pointer', borderRadius: '4px' }}
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                        >{relItem?.title} <ArrowRight size={8} /></button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ── TECH SKILLS ───────────────────────────────────────────────────────────
const TechSkillsContent = () => {
    const [data, setData] = useState(null);
    useEffect(() => { fetchSimpleIcons({ slugs: iconSlugs }).then(setData); }, []);
    const renderedIcons = useMemo(() => {
        if (!data) return null;
        return Object.values(data.simpleIcons).map(icon =>
            renderSimpleIcon({ icon, bgHex: "#080510", fallbackHex: "#ffffff", minContrastRatio: 2, size: 48, aProps: { href: undefined, target: undefined, rel: undefined, onClick: e => e.preventDefault() } })
        );
    }, [data]);
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoBg />
            <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
                {data ? <Cloud {...cloudProps}><>{renderedIcons}</></Cloud> : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(59,130,246,0.3)', borderTopColor: '#3b82f6', animation: 'spin-loader 0.8s linear infinite' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

// ── DESIGN SKILLS ─────────────────────────────────────────────────────────
const DesignSkillsContent = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const skills = [
        { name: "UI / UX Design", level: 88 }, { name: "Figma", level: 85 },
        { name: "Typography", level: 80 }, { name: "Color Theory", level: 82 },
        { name: "Responsive Design", level: 90 }, { name: "Animations", level: 92 },
    ];
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoBg />
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '480px', padding: '0 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                        <div style={{ height: '1px', width: '48px', background: 'rgba(255,255,255,0.2)' }} />
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', letterSpacing: '4px' }}>EXPERTISE</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {skills.map((skill, i) => (
                            <div key={skill.name} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px', margin: '0 -16px', borderRadius: '10px', background: hoveredIndex === i ? 'rgba(255,255,255,0.04)' : 'transparent', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ height: '20px', width: '2px', borderRadius: '999px', background: '#14b8a6', opacity: hoveredIndex === i ? 1 : 0, transform: hoveredIndex === i ? 'scaleY(1)' : 'scaleY(0.5)', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
                                        <span style={{ fontSize: '1rem', fontWeight: '500', color: hoveredIndex === i ? '#fff' : 'rgba(255,255,255,0.5)', transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-20px)', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}>{skill.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ position: 'relative', width: '96px', height: '4px', borderRadius: '999px', overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, borderRadius: '999px', background: 'linear-gradient(90deg, rgba(20,184,166,0.8), #14b8a6)', width: hoveredIndex === i ? `${skill.level}%` : '0%', transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)', transitionDelay: hoveredIndex === i ? '100ms' : '0ms' }} />
                                        </div>
                                        <span style={{ width: '40px', fontSize: '0.8rem', fontFamily: 'monospace', textAlign: 'right', color: '#fff', opacity: hoveredIndex === i ? 1 : 0, transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}>{skill.level}%</span>
                                    </div>
                                </div>
                                {i < skills.length - 1 && <div style={{ height: '1px', margin: '0 16px', background: (hoveredIndex === i || hoveredIndex === i + 1) ? 'transparent' : 'rgba(255,255,255,0.06)', transition: 'background 0.5s' }} />}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(20,184,166,0.6)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '2px' }}>Hover to explore</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── PRICING ───────────────────────────────────────────────────────────────
const PricingContent = () => (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <VideoBg />
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 clamp(20px,5vw,60px)', overflow: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
                .cp-cw:hover .cp-ci { box-shadow:8px 8px 0 0 rgba(255,255,255,0.9)!important; transform:translate(-4px,-4px); }
                .cp-ci { background:rgba(0,0,0,0.8); border:2px solid rgba(255,255,255,0.85); border-radius:12px; box-shadow:4px 4px 0 0 rgba(255,255,255,0.8); transition:all 0.3s ease; padding:24px; position:relative; backdrop-filter:blur(12px); }
                .cp-cw { transition:all 0.3s ease; }
                .cp-b { width:100%; padding:11px; font-family:'Caveat',cursive; font-size:1.15rem; font-weight:700; border:2px solid rgba(255,255,255,0.85); border-radius:8px; cursor:pointer; box-shadow:4px 4px 0 0 rgba(255,255,255,0.7); transition:all 0.25s ease; }
                .cp-b:hover { box-shadow:6px 6px 0 0 rgba(255,255,255,0.8); transform:translate(-2px,-2px); }
            `}</style>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: '1.2rem', color: '#f59e0b', transform: 'rotate(-1deg)', display: 'inline-block' }}>Simple Pricing</div>
                <br />
                <h2 style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontWeight: '700', color: '#fff', transform: 'rotate(-1deg)', display: 'inline-block', margin: 0, position: 'relative' }}>
                    What it costs
                </h2>
                <br />
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: '1rem', color: 'rgba(255,255,255,0.35)', transform: 'rotate(-1deg)', display: 'inline-block', marginTop: '4px' }}>No hidden fees — just clean work.</div>
            </div>
            <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '860px', alignItems: 'center' }}>
                {pricingTiers.map((tier, i) => (
                    <div key={i} className="cp-cw" style={{ flex: 1, transform: `rotate(${tier.rotate})` }}>
                        <div className="cp-ci">
                            {tier.popular && <div style={{ position: 'absolute', top: '-12px', right: '-8px', background: '#f59e0b', color: '#000', fontFamily: "'Caveat',cursive", fontSize: '0.9rem', fontWeight: '700', padding: '2px 12px', borderRadius: '999px', transform: 'rotate(12deg)', border: '2px solid rgba(255,255,255,0.85)', zIndex: 10 }}>Popular!</div>}
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '12px' }}>{tier.icon}</div>
                            <h3 style={{ fontFamily: "'Caveat',cursive", fontSize: '1.6rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>{tier.name}</h3>
                            <p style={{ fontFamily: "'Caveat',cursive", color: 'rgba(255,255,255,0.35)', fontSize: '0.95rem', marginBottom: '14px' }}>{tier.desc}</p>
                            <div style={{ fontFamily: "'Caveat',cursive", fontSize: '2.4rem', fontWeight: '700', color: '#fff', lineHeight: 1, marginBottom: '16px' }}>{tier.price}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                {tier.features.map((f, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
                                        </div>
                                        <span style={{ fontFamily: "'Caveat',cursive", color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="cp-b" onClick={() => document.querySelector('.gc-card')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: tier.popular ? '#f59e0b' : 'transparent', color: tier.popular ? '#000' : '#fff' }}>Get Started</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── FAQ ───────────────────────────────────────────────────────────────────
const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', background: open ? 'rgba(255,255,255,0.04)' : 'transparent', marginBottom: '8px', overflow: 'hidden', transition: 'background 0.3s' }}>
            <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}>
                <span style={{ color: open ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>{q}</span>
                <div style={{ flexShrink: 0, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: open ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                    <Plus size={18} />
                </div>
            </button>
            <div style={{ maxHeight: open ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <div style={{ padding: '0 20px 16px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>{a}</p>
                    <button onClick={() => document.querySelector('.gc-card')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ display: 'inline-block', marginTop: '10px', color: '#ec4899', fontSize: '0.7rem', letterSpacing: '1px', background: 'none', border: 'none', borderBottom: '1px solid rgba(236,72,153,0.4)', paddingBottom: '1px', cursor: 'pointer', transition: 'color 0.2s' }}>
                        Still have doubts? Contact now
                    </button>
                </div>
            </div>
        </div>
    );
};

const FAQContent = () => {
    const [selectedCat, setSelectedCat] = useState('pricing');
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoBg />
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 40px 32px', overflowY: 'auto' }}>
                <p style={{ color: '#ec4899', fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '8px' }}>FREQUENTLY ASKED</p>
                <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: '700', marginBottom: '32px', letterSpacing: '-1px' }}>Your Questions</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
                    {Object.entries(faqCategories).map(([key, label]) => (
                        <button key={key} onClick={() => setSelectedCat(key)} style={{ padding: '7px 18px', borderRadius: '6px', fontSize: '0.65rem', letterSpacing: '1.5px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.25s ease', background: selectedCat === key ? '#ec4899' : 'transparent', border: `1px solid ${selectedCat === key ? '#ec4899' : 'rgba(255,255,255,0.15)'}`, color: selectedCat === key ? '#fff' : 'rgba(255,255,255,0.4)', boxShadow: selectedCat === key ? '0 0 16px rgba(236,72,153,0.3)' : 'none' }}>
                            {label}
                        </button>
                    ))}
                </div>
                <div style={{ width: '100%', maxWidth: '680px' }}>
                    {faqData[selectedCat]?.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
                </div>
            </div>
        </div>
    );
};

// ── JOURNEY ───────────────────────────────────────────────────────────────
const JourneyContent = () => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const data = [
        {
            title: "Early 2024",
            content: (
                <div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '16px' }}>
                        Opened my first HTML tutorial on YouTube. Built a basic page with a heading and a button. Thought I was a hacker. I was not — but something clicked that day.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['HTML', 'CSS', 'First Webpage'].map(tag => (
                            <span key={tag} style={{ padding: '4px 12px', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '999px', color: '#8b5cf6', fontSize: '0.65rem', letterSpacing: '1px' }}>{tag}</span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "Mid 2024",
            content: (
                <div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '16px' }}>
                        Learned CSS, Flexbox, Grid. Discovered React and got completely mind-blown by components. Started staying up past midnight to code. No regrets.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['React', 'JavaScript', 'Tailwind CSS', 'Flexbox'].map(tag => (
                            <span key={tag} style={{ padding: '4px 12px', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '999px', color: '#3b82f6', fontSize: '0.65rem', letterSpacing: '1px' }}>{tag}</span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "Late 2024",
            content: (
                <div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '16px' }}>
                        Built Void Streetwear, Lumi-re Restaurant and IronForge Gym — all from scratch. Started learning GSAP and fell in love with animations.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {['GSAP', 'Vite', 'Figma', 'Real Projects'].map(tag => (
                            <span key={tag} style={{ padding: '4px 12px', border: '1px solid rgba(20,184,166,0.4)', borderRadius: '999px', color: '#14b8a6', fontSize: '0.65rem', letterSpacing: '1px' }}>{tag}</span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Void Streetwear', href: 'https://098tanishq-source.github.io/void-streetwear/' },
                            { label: 'Lumi-re', href: 'https://098tanishq-source.github.io/Lumi-re/' },
                            { label: 'IronForge Gym', href: 'https://098tanishq-source.github.io/ironforge-gym/' },
                        ].map(p => (
                            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                                style={{ padding: '6px 14px', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)', borderRadius: '6px', color: '#14b8a6', fontSize: '0.7rem', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,184,166,0.25)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(20,184,166,0.1)'}
                            >{p.label}</a>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '16px' }}>
                        Set my pricing, started taking clients. Built this portfolio to show what I can do. 16 years old, self-taught, from New Delhi — and just getting started.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        {['Freelancing', 'Portfolio', 'Available Now'].map(tag => (
                            <span key={tag} style={{ padding: '4px 12px', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '999px', color: '#f59e0b', fontSize: '0.65rem', letterSpacing: '1px' }}>{tag}</span>
                        ))}
                    </div>
                    <a href="https://ig.me/m/_friendly_dev" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: '#f59e0b', borderRadius: '6px', color: '#000', fontSize: '0.7rem', letterSpacing: '1.5px', fontWeight: '700', textDecoration: 'none', transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        LET'S WORK TOGETHER
                    </a>
                </div>
            ),
        },
    ];

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoBg />
            <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 5, overflowY: 'auto' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 40px 20px' }}>
                    <p style={{ color: '#f97316', fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '10px' }}>THE BEGINNING</p>
                    <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: '700', marginBottom: '12px', letterSpacing: '-1px' }}>How It Started</h2>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', maxWidth: '380px', lineHeight: 1.7 }}>
                        16 years old, self-taught, New Delhi. Here's the real timeline of how I went from zero to freelancing.
                    </p>
                </div>

                <div ref={ref} style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', paddingBottom: '80px' }}>
                    {data.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', gap: '40px', padding: `${index === 0 ? 20 : 80}px 40px 0` }}>
                            <div style={{ position: 'sticky', top: '40px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, minWidth: '80px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)' }} />
                                </div>
                                <h3 style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1.1rem', fontWeight: '800', textAlign: 'center', lineHeight: 1.2 }}>{item.title}</h3>
                            </div>
                            <div style={{ flex: 1, paddingTop: '8px' }}>{item.content}</div>
                        </div>
                    ))}

                    {/* animated line */}
                    <div style={{ position: 'absolute', left: '60px', top: 0, width: '2px', height: `${height}px`, background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, transparent 100%)', overflow: 'hidden' }}>
                        <motion.div style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                            position: 'absolute', top: 0, left: 0, right: 0,
                            width: '2px', borderRadius: '999px',
                            background: 'linear-gradient(to bottom, #8b5cf6, #3b82f6, #14b8a6, #f59e0b)',
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── CONTENT MAP ───────────────────────────────────────────────────────────
const contentMap = {
    process: ProcessContent,
    tech:    TechSkillsContent,
    design:  DesignSkillsContent,
    pricing: PricingContent,
    faq:     FAQContent,
    journey: JourneyContent,
};

// ── MAIN CHOOSE ───────────────────────────────────────────────────────────
const Choose = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const maskRef = useRef(null);
    const overlayRef = useRef(null);

    const openSection = useCallback((sectionId, screenX, screenY) => {
        if (isAnimating) return;
        setIsAnimating(true);
        const sectionEl = document.getElementById('choose-section');
        const sectionRect = sectionEl?.getBoundingClientRect();
        const originX = sectionRect ? screenX - sectionRect.left : window.innerWidth / 2;
        const originY = sectionRect ? screenY - sectionRect.top : window.innerHeight / 2;
        const mask = maskRef.current;
        gsap.set(mask, { display: 'block', scale: 0, opacity: 1, left: originX, top: originY, xPercent: -50, yPercent: -50 });
        gsap.to(mask, {
            scale: 50, duration: 1.2, ease: 'power3.inOut',
            onComplete: () => {
                setActiveSection(sectionId);
                const overlay = overlayRef.current;
                gsap.set(overlay, { opacity: 0, display: 'flex' });
                gsap.to(overlay, {
                    opacity: 1, duration: 0.4, ease: 'power2.out',
                    onComplete: () => { gsap.set(mask, { display: 'none' }); setIsAnimating(false); }
                });
            }
        });
    }, [isAnimating]);

    const closeSection = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        const overlay = overlayRef.current;
        const mask = maskRef.current;
        gsap.to(overlay, {
            opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: () => {
                gsap.set(overlay, { display: 'none' });
                gsap.set(mask, { display: 'block', scale: 50, opacity: 1, left: '50%', top: '50%', xPercent: -50, yPercent: -50 });
                gsap.to(mask, {
                    scale: 0, duration: 1, ease: 'power3.inOut',
                    onComplete: () => { gsap.set(mask, { display: 'none' }); setActiveSection(null); setIsAnimating(false); }
                });
            }
        });
    }, [isAnimating]);

    const ActiveContent = activeSection ? contentMap[activeSection] : null;
    const activeCard = sectionCards.find(c => c.id === activeSection);

    return (
        <section id="choose-section" style={{ width: '100%', height: '140vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                @keyframes ping-ring  { 0%   { transform:scale(1);   opacity:0.7; } 100% { transform:scale(1.6); opacity:0; } }
                @keyframes pulse-ring { 0%,100% { opacity:0.6; } 50% { opacity:0.2; } }
                @keyframes spin-loader { to { transform:rotate(360deg); } }
                @keyframes pulse-dot  { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
            `}</style>

            <div ref={maskRef} style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', background: '#000', display: 'none', zIndex: 200, pointerEvents: 'none' }} />

            {/* sphere */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: activeSection ? 0 : 1, transition: 'opacity 0.5s ease', pointerEvents: activeSection ? 'none' : 'auto' }}>
                <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }} onPointerMissed={() => {}}>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                        <ParticleSphereScene onCardClick={(id) => {
                            const sectionEl = document.getElementById('choose-section');
                            const rect = sectionEl?.getBoundingClientRect();
                            const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
                            const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
                            openSection(id, cx, cy);
                        }} />
                    </Suspense>
                    <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
                </Canvas>

                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}>
                            <span style={{ color: '#fff', fontSize: '1.6rem', fontWeight: '900' }}>T</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem', letterSpacing: '3px' }}>CLICK A CARD</p>
                    </div>
                </div>
            </div>

            {/* overlay */}
            <div ref={overlayRef} style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 150, display: 'none', flexDirection: 'column', opacity: 0 }}>
                <button onClick={closeSection}
                    style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 160, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >
                    <X size={16} />
                </button>
                <div style={{ flex: 1, width: '100%', height: '100%' }}>
                    {ActiveContent && <ActiveContent />}
                </div>
            </div>
        </section>
    );
};

export default Choose;