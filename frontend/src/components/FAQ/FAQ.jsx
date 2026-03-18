 import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FAQ1 from "./FAQ1";
import FAQ2 from "./FAQ2";
import FAQ3 from "./FAQ3";
import FAQ4 from "./FAQ4";
import FAQ5 from "./FAQ5";

gsap.registerPlugin(ScrollTrigger);

const pageStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
     overflow: "hidden", 
};

const FAQ = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Use toArray scoped to the section — avoids class-selector confusion
        const panels = gsap.utils.toArray(".faq-panel", sectionRef.current);

        gsap.set(panels[0], { zIndex: 5 });
        gsap.set(panels[1], { x: "100%",  zIndex: 4 });
        gsap.set(panels[2], { y: "100%",  zIndex: 3 });
        gsap.set(panels[3], { x: "-100%", zIndex: 2 });
        gsap.set(panels[4], { y: "100%",  zIndex: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,   // ✅ ref directly — no scope conflict
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: 1.2,
                pinSpacing: true,
            }
        });

        tl.to(panels[0], { x: "-100%", duration: 1, ease: "power2.inOut" })
          .to(panels[1], { x: "0%",    duration: 1, ease: "power2.inOut", zIndex: 6 }, "<")

          .to(panels[1], { y: "-100%", duration: 1, ease: "power2.inOut" }, "+=0.5")
          .to(panels[2], { y: "0%",    duration: 1, ease: "power2.inOut", zIndex: 7 }, "<")

          .to(panels[2], { x: "100%",  duration: 1, ease: "power2.inOut" }, "+=0.5")
          .to(panels[3], { x: "0%",    duration: 1, ease: "power2.inOut", zIndex: 8 }, "<")

          .to(panels[3], { y: "100%",  duration: 1, ease: "power2.inOut" }, "+=0.5")
          .to(panels[4], { y: "0%",    duration: 1, ease: "power2.inOut", zIndex: 9 }, "<");

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            tl.kill();
        };
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="faq-section"
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                background: "#060606",
            }}
        >
            {/* ✅ zIndex in JSX so correct panel shows before GSAP hydrates */}
            <div className="faq-panel" style={{ ...pageStyle, zIndex: 5 }}><FAQ1 /></div>
            <div className="faq-panel" style={{ ...pageStyle, zIndex: 4 }}><FAQ2 /></div>
            <div className="faq-panel" style={{ ...pageStyle, zIndex: 3 }}><FAQ3 /></div>
            <div className="faq-panel" style={{ ...pageStyle, zIndex: 2 }}><FAQ4 /></div>
            <div className="faq-panel" style={{ ...pageStyle, zIndex: 1 }}><FAQ5 /></div>
        </section>
    );
};

export default FAQ;