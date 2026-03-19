import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { chooseLinesLG, chooseLinesSM } from "../../constants/welcome";

import redVid    from "../../assets/red.mp4";
import orangeVid from "../../assets/orange.mp4";
import greenVid  from "../../assets/green.mp4";
import yellowVid from "../../assets/yellow.mp4";
import pinkVid   from "../../assets/pink.mp4";
import purpleVid from "../../assets/purple.mp4";
import greyVid   from "../../assets/grey.mp4";
import cyanVid   from "../../assets/cyan.mp4";

const skills = [
    { label: "HTML",       sub: "Structure & Markup",    color: "#ff4400", bg: "rgba(255,68,0,0.06)",    vid: redVid,    hidden: true },
    { label: "HTML",       sub: "Structure & Markup",    color: "#ff4400", bg: "rgba(255,68,0,0.06)",    vid: redVid    },
    { label: "CSS",        sub: "Styling & Layouts",     color: "#ff8800", bg: "rgba(255,136,0,0.06)",   vid: orangeVid },
    { label: "JavaScript", sub: "Logic & Interactivity", color: "#22cc44", bg: "rgba(34,204,68,0.06)",   vid: greenVid  },
    { label: "React",      sub: "UI Component Library",  color: "#ffdd00", bg: "rgba(255,221,0,0.06)",   vid: yellowVid },
    { label: "Figma",      sub: "UI/UX Design",          color: "#ff44aa", bg: "rgba(255,68,170,0.06)",  vid: pinkVid   },
    { label: "GSAP",       sub: "Animations & Motion",   color: "#aa44ff", bg: "rgba(170,68,255,0.06)",  vid: purpleVid },
    { label: "Tailwind",   sub: "Utility CSS Framework", color: "#888888", bg: "rgba(136,136,136,0.06)", vid: greyVid   },
    { label: "Three.js",   sub: "3D & WebGL",            color: "#00ddff", bg: "rgba(0,221,255,0.06)",   vid: cyanVid   },
];

const shardData = [
    { x: -420, y: -300, r: -42, w: 220, h: 200 },
    { x:  300, y: -320, r:  35, w: 220, h: 200 },
    { x: -460, y:   40, r: -25, w: 220, h: 200 },
    { x:  360, y: -160, r:  38, w: 210, h: 190 },
    { x: -380, y: -120, r: -32, w: 210, h: 190 },
    { x:  340, y:  180, r:  28, w: 220, h: 200 },
    { x: -340, y:  240, r: -22, w: 220, h: 200 },
    { x:   60, y:  320, r:  15, w: 200, h: 180 },
    { x: -100, y: -280, r:  15, w: 200, h: 180 },
];

const shardClips = [
    "polygon(50% 5%, 95% 45%, 58% 52%, 5% 44%)",
    "polygon(50% 5%, 95% 44%, 78% 95%, 52% 58%)",
    "polygon(52% 58%, 22% 96%, 5% 44%, 42% 52%)",
    "polygon(58% 52%, 95% 44%, 82% 86%, 52% 58%)",
    "polygon(5%  44%, 42% 52%, 18% 86%, 8%  62%)",
    "polygon(78% 95%, 52% 58%, 82% 86%)",
    "polygon(22% 96%, 18% 86%, 52% 58%)",
    "polygon(42% 52%, 58% 52%, 52% 58%)",
    "polygon(50% 5%, 70% 35%, 50% 45%, 30% 35%)",
];

const Choose = () => {
    const isMobD = useMediaQuery({ query: "(max-width:768px)" });
    const chooseLines = isMobD ? chooseLinesSM : chooseLinesLG;
    const sectionRef = useRef(null);
    const wheelRef   = useRef(null);
    const bgTintRef  = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const videoRefs  = useRef(skills.map(() => null));

    const total = skills.length;
    const cx = 350, cy = 350, radius = 300;

    const buildSlice = (i) => {
        const step  = (2 * Math.PI) / total;
        const start = i * step - Math.PI / 2;
        const end   = start + step;
        const x1 = cx + radius * Math.cos(start);
        const y1 = cy + radius * Math.sin(start);
        const x2 = cx + radius * Math.cos(end);
        const y2 = cy + radius * Math.sin(end);
        const mid = (start + end) / 2;
        return {
            path: `M${cx} ${cy} L${x1} ${y1} A${radius} ${radius} 0 0 1 ${x2} ${y2}Z`,
            tx: cx + radius * 0.66 * Math.cos(mid),
            ty: cy + radius * 0.66 * Math.sin(mid),
            rot: (mid * 180) / Math.PI + 90,
        };
    };

    const activeSkill = skills[activeIndex] || skills[1];

    const updateActive = (idx) => {
        const safeIdx = Math.max(0, Math.min(idx, skills.length - 1));
        setActiveIndex(safeIdx);
        if (bgTintRef.current) {
            bgTintRef.current.style.background = skills[safeIdx].bg;
        }
        videoRefs.current.forEach((vid, i) => {
            if (!vid) return;
            if (i === safeIdx) {
                vid.style.opacity = '1';
                vid.play().catch(() => {});
            } else {
                vid.style.opacity = '0';
            }
        });
    };

    useGSAP(() => {
        const lines = gsap.utils.toArray(".choose-title-clip");
        gsap.timeline({
            scrollTrigger: {
                trigger: ".choose-heading-zone",
                start: "top 80%",
                end:   "top 20%",
                scrub: true,
            }
        })
        .from(".choose-subtitle", { yPercent: 100, opacity: 0 })
        .fromTo(".title-part", { height: "8vh" }, { height: "48vh", ease: "none" }, "<")
        .to(lines, { clipPath: "inset(0% 0% 0% 0%)", stagger: 0.25, ease: "none", duration: 1 }, "<");

        const shardEls = gsap.utils.toArray(".choose-shard");
        const centerEl = sectionRef.current.querySelector(".choose-diamond-center");

        gsap.set(shardEls,               { opacity: 0, x: 0, y: 0, rotation: 0, scale: 1 });
        gsap.set(centerEl,               { scale: 1, opacity: 1 });
        gsap.set(".choose-wheel-wrap",   { opacity: 0, xPercent: 20 });
        gsap.set(".choose-bio",          { opacity: 0, y: 40 });
        gsap.set(".choose-active-block", { opacity: 0, y: 20 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".choose-pin-zone",
                start:   "top top",
                end:     "+=400%",
                scrub:   1.2,
                pin:     true,
                pinSpacing: true,
                anticipatePin: 1,
            }
        });

        tl.to(centerEl, { scale: 1.5, duration: 0.15, ease: "power2.out" });

        tl.to(shardEls, {
            opacity: 1,
            x: i => shardData[i].x,
            y: i => shardData[i].y,
            rotation: i => shardData[i].r,
            scale: 1.05,
            duration: 0.6,
            stagger: 0.04,
            ease: "expo.out",
        }, "<0.05");

        tl.to(centerEl, { scale: 0.1, opacity: 0, duration: 0.3 }, "<0.1");

        tl.to(shardEls, { opacity: 0, scale: 0.7, duration: 0.4, stagger: 0.03 }, "+=0.25");

        tl.to(".choose-wheel-wrap", { opacity: 1, xPercent: 0, duration: 0.6, ease: "power3.out" }, "<0.1");
        tl.to(".choose-active-block", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.15");
        tl.to(".choose-bio", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.1");

        tl.to(wheelRef.current, {
            rotation: -360,
            ease: "none",
            duration: 3,
            onUpdate() {
                const prog = tl.progress();
                if (prog > 0.55) {
                    const wp  = (prog - 0.55) / 0.45;
                    const idx = 1 + (Math.floor(wp * (total - 1)) % (total - 1));
                    updateActive(idx);
                }
            }
        }, "+=0.1");

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="choose-section w-full"
            style={{ background: '#0a0000', position: 'relative' }}
        >
            {/* heading zone */}
            <div className="choose-heading-zone p-8 pt-12">
                <p className="choose-subtitle text-[.7rem] overflow-hidden"
                    style={{ color: '#cc1100', letterSpacing: '3px' }}>
                    MY SKILLS & EXPERTISE
                </p>
                <div className="title-part origin-bottom mt-6">
                    {chooseLines.map((line, i) => (
                        <h1 key={i}
                            className="lg:text-[9.5rem] text-[3rem] leading-[0.9] font-medium tracking-tighter"
                            style={{ color: '#f0ece4' }}>
                            <span className={`choose-title-break ${i===1?"lg:pb-3 pb-2":""}`}>
                                {line}
                                <span className={`choose-title-clip ${i===1?"lg:pb-3 pb-2":""}`}>
                                    {line}
                                </span>
                            </span>
                        </h1>
                    ))}
                </div>
            </div>

            {/* pin zone */}
            <div className="choose-pin-zone"
                style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

                {/* fullscreen bg videos */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                    {skills.map((skill, i) => (
                        <video
                            key={i}
                            ref={el => videoRefs.current[i] = el}
                            src={skill.vid}
                            autoPlay loop muted playsInline
                            preload="none"
                            style={{
                                position: 'absolute', inset: 0,
                                width: '100%', height: '100%',
                                objectFit: 'cover',
                                opacity: i === 1 ? 1 : 0,
                                transition: 'opacity 1s ease',
                            }}
                        />
                    ))}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to right, rgba(10,0,0,0.92) 45%, rgba(10,0,0,0.5) 100%)',
                    }} />
                    <div ref={bgTintRef} style={{
                        position: 'absolute', inset: 0,
                        transition: 'background 1s ease',
                    }} />
                </div>

                {/* center diamond */}
                <div className="choose-diamond-center"
                    style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '130px', height: '130px',
                        background: activeSkill.color,
                        clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 10,
                        transition: 'background 0.5s ease',
                        boxShadow: `0 0 60px ${activeSkill.color}80`,
                    }}>
                    <span style={{ color: '#0a0000', fontSize: '0.6rem', letterSpacing: '3px', fontWeight: '700' }}>
                        SKILLS
                    </span>
                </div>

                {/* shards */}
                {skills.map((skill, i) => (
                    <div key={i} className="choose-shard"
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: `${shardData[i].w}px`,
                            height: `${shardData[i].h}px`,
                            clipPath: shardClips[i],
                            background: 'rgba(10,0,0,0.9)',
                            border: `1px solid ${skill.color}60`,
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', flexDirection: 'column',
                            gap: '8px', opacity: 0, zIndex: 5,
                        }}>
                        <span style={{
                            color: skill.color, fontSize: '1.2rem', fontWeight: '800',
                            letterSpacing: '3px', textAlign: 'center',
                            textShadow: `0 0 20px ${skill.color}80`,
                        }}>{skill.label}</span>
                        <span style={{
                            color: 'rgba(240,236,228,0.35)',
                            fontSize: '0.65rem', letterSpacing: '1px', textAlign: 'center',
                        }}>{skill.sub}</span>
                    </div>
                ))}

                {/* LEFT content */}
                <div style={{
                    position: 'absolute',
                    left: '5%', top: '50%',
                    transform: 'translateY(-50%)',
                    width: 'clamp(280px, 38%, 500px)',
                    display: 'flex', flexDirection: 'column',
                    gap: '28px', zIndex: 6,
                }}>
                    <div className="choose-active-block" style={{ opacity: 0 }}>
                        <div style={{
                            borderLeft: `3px solid ${activeSkill.color}`,
                            paddingLeft: '16px',
                            transition: 'border-color 0.4s ease',
                        }}>
                            <p style={{ color: activeSkill.color, fontSize: '0.6rem', letterSpacing: '3px', transition: 'color 0.4s' }}>
                                CURRENTLY SHOWING
                            </p>
                            <h3 style={{
                                color: '#f0ece4',
                                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                                fontWeight: '700', lineHeight: 1, marginTop: '6px',
                                transition: 'all 0.4s ease',
                            }}>
                                {activeSkill.label}
                            </h3>
                            <p style={{ color: 'rgba(240,236,228,0.5)', fontSize: '0.9rem', marginTop: '6px', letterSpacing: '1px' }}>
                                {activeSkill.sub}
                            </p>
                        </div>
                        <div className="flex gap-2 mt-5 flex-wrap">
                            {skills.filter(s => !s.hidden).map((s, i) => (
                                <div key={i} style={{
                                    width: (i + 1) === activeIndex ? '28px' : '6px',
                                    height: '4px',
                                    background: (i + 1) === activeIndex ? s.color : 'rgba(240,236,228,0.1)',
                                    transition: 'all 0.4s ease', borderRadius: '2px',
                                }} />
                            ))}
                        </div>
                    </div>

                    <div className="choose-bio" style={{ opacity: 0 }}>
                        <p style={{ color: 'rgba(240,236,228,0.45)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                            Self-taught developer combining design thinking
                            with modern code — building experiences that look
                            great and work perfectly.
                        </p>
                        <div className="flex gap-3 mt-4 flex-wrap">
                            {['8 Technologies', 'UI Focused', 'India Based'].map((t, i) => (
                                <span key={i} style={{
                                    border: `1px solid ${activeSkill.color}50`,
                                    color: activeSkill.color,
                                    fontSize: '0.6rem', letterSpacing: '2px', padding: '4px 12px',
                                    transition: 'all 0.4s ease',
                                }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* wheel — responsive, hangs off right edge */}
                <div className="choose-wheel-wrap"
                    style={{
                        position: 'absolute',
                        right: '-15vw',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '55vw',
                        height: '55vw',
                        opacity: 0,
                        zIndex: 4,
                    }}>
                    <svg
                        ref={wheelRef}
                        width="100%"
                        height="100%"
                        viewBox="0 0 700 700"
                        style={{ transformOrigin: 'center center' }}
                    >
                        {skills.map((skill, i) => {
                            const { path, tx, ty, rot } = buildSlice(i);
                            const isActive = i === activeIndex;
                            return (
                                <g key={i} style={{ opacity: skill.hidden ? 0 : 1 }}>
                                    <path d={path}
                                        fill={isActive ? `${skill.color}25` : 'rgba(10,0,0,0.7)'}
                                        stroke={isActive ? skill.color : 'rgba(240,236,228,0.05)'}
                                        strokeWidth={isActive ? "2" : "0.5"}
                                        style={{ transition: 'all 0.5s ease' }}
                                    />
                                    <text
                                        x={tx} y={ty}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill={isActive ? skill.color : 'rgba(240,236,228,0.2)'}
                                        fontSize={isActive ? "17" : "13"}
                                        fontWeight={isActive ? "700" : "400"}
                                        letterSpacing="1.5"
                                        transform={`rotate(${rot - 90}, ${tx}, ${ty})`}
                                        style={{ transition: 'all 0.4s ease', userSelect: 'none' }}
                                    >
                                        {skill.label}
                                    </text>
                                </g>
                            );
                        })}
                        <circle cx={350} cy={350} r={308}
                            fill="none"
                            stroke={`${activeSkill.color}35`}
                            strokeWidth="16"
                            style={{ transition: 'stroke 0.5s ease' }}
                        />
                        <circle cx={350} cy={350} r="75"
                            fill="#0a0000"
                            stroke={`${activeSkill.color}60`}
                            strokeWidth="1.5"
                            style={{ transition: 'stroke 0.5s ease' }}
                        />
                        <text x={350} y={350}
                            textAnchor="middle" dominantBaseline="middle"
                            fill={activeSkill.color}
                            fontSize="12" letterSpacing="3" fontWeight="600"
                            style={{ transition: 'fill 0.4s ease' }}
                        >SKILLS</text>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Choose;