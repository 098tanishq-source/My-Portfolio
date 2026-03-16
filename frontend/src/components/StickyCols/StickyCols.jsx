 import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import colimg1 from "../../assets/project-void.png";
import colimg2 from "../../assets/project-lumiere.png";
import colimg3 from "../../assets/project-ironforge.png";

gsap.registerPlugin(ScrollTrigger);

const StickyCols = () => {

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".sticky-cols",
                start: "top 20%",
                end: "+=90%",
                pin: true,
                scrub: 1,
            },
        });

        tl.to(".col-1", { opacity: 0, scale: 0.8, duration: 0.8 })
            .to(".col-2", { x: "0%", duration: 0.8 }, "<")
            .to(".col-3", { y: "0%", duration: 0.8 }, "<")
            .to(".col-img-1 img", { scale: 1, duration: 0.8 }, "<")
            .to(".col-img-2", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.8 }, "<")
            .to(".col-img-2 img", { scale: 1.6, duration: 0.8 }, "<")
            .to(".col-2", { opacity: 0, scale: 0.8, duration: 0.8 })
            .to(".col-3", { x: "0%", duration: 0.8 }, "-=0.8")
            .to(".col-4", { y: "0%", duration: 0.8 }, "<");

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            tl.kill();
        };
    });

    return (
        <section className="sticky-cols w-screen h-dvh overflow-hidden lg:mb-20" style={{ background: '#0a0000' }}>
            <div className="sticky-cols-wrapper relative w-full h-screen">

                <div className="col col-1">
                    <div className="col-content">
                        <div className="col-content-wrapper" style={{ background: '#150000' }}>
                            <div style={{ padding: '2rem' }}>
                                <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '4px', color: '#cc1100', textTransform: 'uppercase', marginBottom: '16px' }}>SELECTED WORK</p>
                                <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '700', color: '#f0ece4', lineHeight: '1.1' }}>Void<br />Streetwear</h1>
                                <p style={{ marginTop: '12px', fontSize: '0.75rem', color: 'rgba(240,236,228,0.4)', letterSpacing: '1px' }}>Fashion · UI Design · HTML/CSS/JS</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-img col-img-1">
                        <div className="col-img-wrapper">
                            <img src={colimg1} alt="Void Streetwear" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                        </div>
                    </div>
                    <div className="col col-img-2 p-2">
                        <div className="col-img-wrapper">
                            <img src={colimg2} alt="Lumi-re" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                        </div>
                    </div>
                </div>

                <div className="col col-3">
                    <div className="col-content-wrapper" style={{ background: '#150000' }}>
                        <div style={{ padding: '2rem' }}>
                            <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '4px', color: '#cc1100', textTransform: 'uppercase', marginBottom: '16px' }}>SELECTED WORK</p>
                            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '700', color: '#f0ece4', lineHeight: '1.1' }}>Lumi-re<br />Restaurant</h1>
                            <p style={{ marginTop: '12px', fontSize: '0.75rem', color: 'rgba(240,236,228,0.4)', letterSpacing: '1px' }}>Fine Dining · Web Design · HTML/CSS/JS</p>
                        </div>
                    </div>
                    <div className="col-content-wrapper-2" style={{ background: '#150000' }}>
                        <div style={{ padding: '2rem' }}>
                            <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '4px', color: '#cc1100', textTransform: 'uppercase', marginBottom: '16px' }}>SELECTED WORK</p>
                            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '700', color: '#f0ece4', lineHeight: '1.1' }}>IronForge<br />Gym</h1>
                            <p style={{ marginTop: '12px', fontSize: '0.75rem', color: 'rgba(240,236,228,0.4)', letterSpacing: '1px' }}>Fitness · Frontend Dev · HTML/CSS/JS</p>
                        </div>
                    </div>
                </div>

                <div className="col col-4">
                    <div className="col-img col-img-1">
                        <div className="col-img-wrapper">
                            <img src={colimg3} alt="IronForge" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StickyCols;