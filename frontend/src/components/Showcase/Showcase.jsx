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
        desc: "A modern streetwear website concept with bold typography and experimental layout rhythm.",
        stack: "HTML · CSS · JS",
        link: "https://098tanishq-source.github.io/void-streetwear/",
    },
    {
        img: project2,
        num: "02",
        title: "Lumi-re Restaurant",
        category: "Fine Dining · Web Design",
        desc: "An elegant restaurant concept built around dark romantic aesthetics and refined typography.",
        stack: "HTML · CSS · JS",
        link: "https://098tanishq-source.github.io/Lumi-re/",
    },
    {
        img: project3,
        num: "03",
        title: "IronForge Gym",
        category: "Fitness · Frontend Dev",
        desc: "A high-energy gym website designed to communicate strength, motivation and clarity.",
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
            <div ref={imgConRef} className="absolute top-0 left-0 h-full flex items-center justify-start gap-2 p-2">
                {projects.map((project, index) => (
                    <div key={index} className="relative flex-shrink-0 w-[95vw] h-full overflow-hidden">

                         <div className="w-[90vw] absolute top-10 left-5 flex justify-between items-start text-[#f4efe7] z-10">
                            <div>
                                <p className="text-xs tracking-widest opacity-60 mb-1">{project.category}</p>
                                <h1 className="text-3xl font-bold">{project.title}</h1>
                            </div>
                            <p className="border-[1px] rounded-3xl px-3 py-1 text-center text-[0.7rem] opacity-70">{project.stack}</p>
                        </div>

                        <img src={project.img} alt={project.title} className="image-item w-full h-full object-cover object-top rounded-[2.5rem]" />

                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                        <div className="w-[90vw] absolute bottom-10 left-5 flex justify-between items-end z-10">
                            <div className="max-w-[60%]">
                                <p className="text-[0.75rem] text-[#f4efe7] opacity-70 leading-relaxed">{project.desc}</p>
                                <p className="text-[0.65rem] text-[#f4efe7] opacity-40 mt-1">Static front-end concept — extendable with CMS</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1">
                                    <p className="text-[#f4efe7] border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem]">{project.num}</p>
                                    <p className="text-[#4e484e] border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem]">03</p>
                                </div>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[0.7rem] text-[#f4efe7] border-[1px] border-[#f4efe7] rounded-3xl px-4 py-1.5 hover:bg-[#f4efe7] hover:text-black transition-all duration-300 tracking-wider">
                                    VISIT SITE
                                </a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Showcase;