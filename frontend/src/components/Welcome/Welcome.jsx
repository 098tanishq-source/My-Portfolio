 import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";

const Welcome = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".clip-text-welcome");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".welcome-section",
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
            },
        });
        lines.forEach((line) => {
            tl.to(line, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.2,
                duration: 1,
            });
        });
    });

    return (
        <div className="welcome-section w-full h-[120vh] md:px-7 px-6"
            style={{ background: '#080808' }}>

            <div className="flex flex-col gap-2 tracking-[-4] leading-2">
                <div className="w-full md:w-[86%] md:text-[64px] text-[34px] welcome-line md:pt-20">
                    <div className="w-full welcome-text flex flex-col justify-center items-start">
                        {welcomeLines.map((text, index) => (
                          <span key={index} className="text-darkBrown md:tracking-[-0.010em] tracking-[0.015em]">
    {text}
    <span className="clip-text-welcome md:tracking-[-0.010em] tracking-[0.015em]">
        {text}
    </span>
</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex md:flex-row flex-col justify-between items-center md:p-4 md:mt-20 mt-10">
                <div className="flex flex-row justify-center items-center gap-4">
                    <div className="md:w-56 w-44 md:h-56 w-44 rounded-[8rem] overflow-hidden"
                        style={{ background: '#1a0000', border: '1px solid rgba(204,17,0,0.2)' }}>
                        <div className="w-full h-full flex items-center justify-center"
                            style={{ color: '#cc1100', fontSize: '3rem' }}>
                            ◈
                        </div>
                    </div>
                    <div className="md:w-56 w-44 md:h-56 w-44 rounded-[8rem] overflow-hidden"
                        style={{ background: '#0d0000', border: '1px solid rgba(204,17,0,0.15)' }}>
                        <div className="w-full h-full flex items-center justify-center"
                            style={{ color: 'rgba(204,17,0,0.4)', fontSize: '3rem' }}>
                            ◉
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 w-full md:mt-0 mt-10">
                    <p className="md:text-[2rem] text-[1.4rem] md:leading-[1.1] md:pr-24 font-normal leading-[26px] tracking-[-0.2px]"
                        style={{ color: 'rgba(240,236,228,0.4)' }}>
                        <span>Self-taught frontend developer from India,
                            building clean and modern websites.</span>
                        <br /><br />
                        <span style={{ color: 'rgba(204,17,0,0.7)' }}>
                            Available for freelance projects — local and international.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;