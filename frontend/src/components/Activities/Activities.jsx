 import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { activitiesLinesLG } from "../../constants/activites";
import { chooseLinesSM as activitiesLinesSM } from "../../constants/welcome";
import './activities.css';

const skills = [
    { name: "HTML & CSS", level: "95%", label: "Expert" },
    { name: "JavaScript", level: "85%", label: "Advanced" },
    { name: "React", level: "78%", label: "Proficient" },
    { name: "Figma & UI Design", level: "88%", label: "Advanced" },
    { name: "GSAP & Animations", level: "72%", label: "Proficient" },
    { name: "Git & GitHub", level: "80%", label: "Advanced" },
]

const Activities = () => {
    const isMobD = useMediaQuery({ query: "(max-width:768px)" });
    const activitiesLines = isMobD ? activitiesLinesSM : activitiesLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".activities-title-clip");
        const progressLines = gsap.utils.toArray(".skill-bar-fill");

        const activitiesTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".activities-section",
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            },
        });

        activitiesTl.from(".activities-subtitle", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut"
        });

        if (!isMobD) {
            activitiesTl.fromTo(
                ".activities-part",
                { height: "10vh" },
                { height: "50vh", ease: "none" }
            );
        }

        activitiesTl.to(lines, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            stagger: 0.2,
            duration: 1,
        }, "<");

        if (!isMobD) {
            activitiesTl.from(".activities-sec", {
                yPercent: 100,
                duration: 1,
            }, "<");
        }

        // Animate skill bars
        progressLines.forEach((bar, i) => {
            activitiesTl.fromTo(bar,
                { width: "0%" },
                { width: bar.dataset.level, duration: 0.6, ease: "power2.out" },
                i === 0 ? ">" : "<"
            );
        });
    });

    return (
        <section className="activities-section w-full h-[120vh] p-8 mt-16"
            style={{ background: '#0a0000' }}>
            <p className='text-[.7rem] font-bold activities-subtitle'
                style={{ color: '#cc1100', letterSpacing: '3px' }}>
                MY SKILLS & EXPERTISE
            </p>
            <div className="lg:mt-10 mt-7 activities-part origin-bottom">
                {activitiesLines.map((line, index) => (
                    <h1 key={index}
                        className="activities-heading lg:text-[9.5rem] text-[3rem] leading-[0.9] font-medium tracking-tighter"
                        style={{ color: '#f0ece4' }}>
                        <span className={`activities-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                            {line}
                            <span className={`activities-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                                {line}
                            </span>
                        </span>
                    </h1>
                ))}
            </div>

            <div className="activities-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
                {/* LEFT — Skill bars */}
                <div className="lg:w-1/2 w-full">
                    <p className="text-[.7rem] mb-8" style={{ color: 'rgba(240,236,228,0.4)', letterSpacing: '2px' }}>
                        PROFICIENCY LEVELS
                    </p>
                    <div className="flex flex-col gap-6 mr-14">
                        {skills.map((skill, i) => (
                            <div key={i} className="w-full">
                                <div className="flex justify-between w-full mb-2">
                                    <h1 className="text-xl" style={{ color: '#f0ece4' }}>{skill.name}</h1>
                                    <p className="text-[0.7rem]" style={{ color: '#cc1100' }}>{skill.label}</p>
                                </div>
                                <div className="relative w-full h-[1px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                    <div
                                        className="skill-bar-fill absolute h-full top-0 left-0"
                                        data-level={skill.level}
                                        style={{ background: '#cc1100', width: '0%', boxShadow: '0 0 8px rgba(204,17,0,0.5)' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — About */}
                <div className="lg:w-1/2 w-full lg:text-[1.6rem] text-[1rem] md:leading-[1.2] lg:mt-0 mt-8"
                    style={{ color: 'rgba(240,236,228,0.45)' }}>
                    <p>
                        I am a self-taught frontend developer from
                        India, focused on building clean, fast and
                        visually engaging websites. I combine strong
                        design sense with modern code to deliver
                        experiences that look great and work perfectly
                        across all devices.
                    </p>
                    <div className="mt-8 flex gap-4 flex-wrap">
                        <div className="px-4 py-2 text-[0.7rem] tracking-[2px]"
                            style={{ border: '1px solid rgba(204,17,0,0.3)', color: '#cc1100' }}>
                            INDIA BASED
                        </div>
                        <div className="px-4 py-2 text-[0.7rem] tracking-[2px]"
                            style={{ border: '1px solid rgba(240,236,228,0.15)', color: 'rgba(240,236,228,0.5)' }}>
                            AVAILABLE NOW
                        </div>
                        <div className="px-4 py-2 text-[0.7rem] tracking-[2px]"
                            style={{ border: '1px solid rgba(240,236,228,0.15)', color: 'rgba(240,236,228,0.5)' }}>
                            REMOTE FRIENDLY
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activities;