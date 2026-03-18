 import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import project1 from "../../assets/project-void.png";
import project2 from "../../assets/project-lumiere.png";
import project3 from "../../assets/project-ironforge.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const projects = [
    {
        img: project1,
        num: "01",
        title: "Void Streetwear",
        category: "Fashion · UI Design",
        desc: "Fashion brand concept with bold typography and experimental layout.",
        stack: "HTML · CSS · JS",
        link: "https://098tanishq-source.github.io/void-streetwear/",
    },
    {
        img: project2,
        num: "02",
        title: "Lumi-re Restaurant",
        category: "Fine Dining · Web Design",
        desc: "Fine dining concept with dark romantic aesthetics and refined typography.",
        stack: "HTML · CSS · JS",
        link: "https://098tanishq-source.github.io/Lumi-re/",
    },
    {
        img: project3,
        num: "03",
        title: "IronForge Gym",
        category: "Fitness · Frontend Dev",
        desc: "High-energy gym website communicating strength and motivation.",
        stack: "HTML · CSS · JS",
        link: "https://098tanishq-source.github.io/ironforge-gym/",
    },
];

const Showcase = () => {
    const containerRef = useRef(null);
    const imgConRef = useRef(null);

    useGSAP(() => {
        if (!imgConRef.current || !containerRef.current) return;
        const totalWidth = imgConRef.current.scrollWidth - containerRef.current.offsetWidth;
        gsap.to(imgConRef.current, {
            x: () => -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "-10% 10%",
                end: () => `+=${totalWidth}`,
                scrub: true,
                pin: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-dvh overflow-hidden" style={{ background: '#080808' }}>

            <div ref={imgConRef} className="absolute top-0 left-0 h-full flex items-center gap-4 px-4">
                {projects.map((project, index) => (
                    <div key={index} className="relative flex-shrink-0 overflow-hidden" style={{ width: '92vw', height: '88vh', borderRadius: '2rem' }}>

                        <img src={project.img} alt={project.title} className="w-full h-full object-cover object-top" style={{ borderRadius: '2rem' }} />

                        <div className="absolute inset-0" style={{ borderRadius: '2rem', background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.88) 100%)' }} />

                        <div className="absolute top-7 left-7 right-7 flex justify-between items-start" style={{ zIndex: 10 }}>
                            <div>
                                <p className="text-[0.65rem] tracking-widest mb-1" style={{ color: 'rgba(240,236,228,0.5)' }}>{project.category}</p>
                                <h2 className="text-[2.2rem] font-bold leading-none" style={{ color: '#f0ece4' }}>{project.title}</h2>
                            </div>
                            <span className="text-[0.65rem] tracking-widest px-3 py-1 rounded-full" style={{ border: '1px solid rgba(240,236,228,0.2)', color: 'rgba(240,236,228,0.5)' }}>{project.stack}</span>
                        </div>

                        <div className="absolute bottom-7 left-7 right-7 flex justify-between items-end" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '60%' }}>
                                <p className="text-[0.85rem] leading-relaxed" style={{ color: 'rgba(240,236,228,0.55)' }}>{project.desc}</p>
                                <p className="text-[0.65rem] mt-1" style={{ color: 'rgba(240,236,228,0.25)', letterSpacing: '1px' }}>Static front-end concept</p>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <span className="text-[0.65rem] px-3 py-1 rounded-full" style={{ color: 'rgba(240,236,228,0.4)', border: '1px solid rgba(240,236,228,0.15)' }}>{project.num} / 03</span>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[0.7rem] tracking-widest px-5 py-2 rounded-full transition-all duration-300 hover:bg-red-700" style={{ color: '#f0ece4', border: '1px solid rgba(240,236,228,0.3)', textDecoration: 'none' }}>
                                    VISIT SITE ↗
                                </a>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-7 right-7 h-px" style={{ background: 'linear-gradient(90deg, #cc1100, transparent)' }} />

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Showcase;