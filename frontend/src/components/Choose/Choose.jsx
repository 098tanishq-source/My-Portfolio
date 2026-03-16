 import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { chooseLinesLG, chooseLinesSM } from "../../constants/welcome";

const Choose = () => {

    const isMobD = useMediaQuery({ query: "(max-width:768px)" });
    const chooseLines = isMobD ? chooseLinesSM : chooseLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".choose-title-clip");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".choose-section",
                start: "top 75%",
                end: "bottom 100%",
                scrub: true,
            },
        });

        tl.from(".choose-subtitle", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut"
        });

        if (!isMobD) {
            tl.fromTo(
                ".title-part",
                { height: "10vh" },
                { height: `${isMobD ? "22vh" : "50vh"}`, ease: "none" }
            );
        }

        tl.to(lines, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            stagger: 0.2,
            duration: 1,
        }, "<");

        if (!isMobD) {
            tl.from(".choose-sec", { yPercent: 100, duration: 1 }, "<");
        }
    });

    const skills = [
        { label: "HTML", bright: false },
        { label: "CSS", bright: true },
        { label: "JavaScript", bright: false },
        { label: "React", bright: true },
        { label: "Figma", bright: false },
        { label: "GSAP", bright: true },
        { label: "Tailwind", bright: false },
        { label: "Git & GitHub", bright: true },
        { label: "Responsive", bright: false },
        { label: "UI Design", bright: true },
        { label: "Vite", bright: false },
        { label: "Three.js", bright: true },
    ];

    return (
        <section className="choose-section w-full h-dvh p-8 pt-10" style={{ background: '#0a0000' }}>
            <p className='text-[.7rem] choose-subtitle' style={{ color: '#cc1100', letterSpacing: '3px' }}>
                MY SKILLS & EXPERTISE
            </p>
            <div className="lg:mt-10 mt-7 title-part origin-bottom">
                {chooseLines.map((line, index) => (
                    <h1
                        key={index}
                        className="choose-heading lg:text-[9.5rem] text-[3rem] leading-[0.9] font-medium tracking-tighter choose-title"
                        style={{ color: '#f0ece4' }}
                    >
                        <span className={`choose-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                            {line}
                            <span className={`choose-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                                {line}
                            </span>
                        </span>
                    </h1>
                ))}
            </div>

            <div className="choose-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
                <div className="lg:w-1/2 w-full lg:text-[2rem] text-[1rem] md:leading-[1.1] lg:mt-0 mt-8 lg:pr-16"
                    style={{ color: 'rgba(240,236,228,0.5)' }}>
                    <p>
                        I am a self-taught frontend developer focused on clean,
                        responsive and visually engaging websites. I combine
                        design thinking with modern code to build experiences
                        that look great and work perfectly.
                    </p>
                </div>

                <div className="lg:w-1/2 w-full">
                    <div className="lg:w-[50%] w-[80%]">
                        <p className="text-[.7rem]" style={{ color: 'rgba(240,236,228,0.4)', letterSpacing: '2px' }}>
                            Technologies & tools I work with:
                        </p>
                    </div>
                    <div className="flex flex-1 flex-wrap justify-start items-start gap-2 mt-8">
                        {skills.map((skill, i) => (
                            <div
                                key={i}
                                className="lg:text-[2rem] px-[20px] py-[4px] rounded-full transition-all duration-300 cursor-default"
                                style={{
                                    border: `1px solid ${skill.bright ? 'rgba(240,236,228,0.8)' : 'rgba(204,17,0,0.5)'}`,
                                    color: skill.bright ? '#f0ece4' : '#cc1100',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(204,17,0,0.15)'
                                    e.currentTarget.style.borderColor = '#cc1100'
                                    e.currentTarget.style.color = '#ff2200'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.borderColor = skill.bright ? 'rgba(240,236,228,0.8)' : 'rgba(204,17,0,0.5)'
                                    e.currentTarget.style.color = skill.bright ? '#f0ece4' : '#cc1100'
                                }}
                            >
                                {skill.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Choose;