 import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './gallery.css';

import project1 from '../../assets/project-void.png';
import project2 from '../../assets/project-lumiere.png';
import project3 from '../../assets/project-ironforge.png';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-page4",
                start: "10% 10%",
                end: "220% 30%",
                scrub: 1,
                pin: true,
            }
        });

        tl4.to(".gallery-page4", {
            backgroundColor: "#0a0000",
        }, 'start');

        gsap.set(".gallery-topText h4, .gallery-topText h3, .gallery-bottomText h3", {
            opacity: 1,
            x: 0
        });

        tl4.to(".gallery-box h3", { opacity: 0 }, 'a')
            .to(".gallery-page4 .gallery-background", {
                width: "calc(100vw - 1rem)",
                height: "calc(100vh - 1rem)",
                borderRadius: "3.5rem",
                y: -40,
            }, 'a')
            .to(".gallery-page4 .gallery-background img", {
                transform: "scale(1)",
            }, 'a')
            .from(".gallery-background .gallery-topText h4, .gallery-background .gallery-topText h3, .gallery-background .gallery-bottomText h3", {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0")
            .to("#gallery-second", {
                transform: "translate(-50%, -56%)",
            }, 'b')
            .to("#gallery-second img", {
                transform: "scale(1)",
            }, 'b')
            .to(".gallery-page4 .gallery-background", {
                scale: 0.9,
                opacity: 0,
                y: -50
            }, 'b')
            .from("#gallery-second .gallery-topText h4, #gallery-second .gallery-topText h3, #gallery-second .gallery-bottomText h3", {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0")
            .to("#gallery-third", {
                transform: "translate(-50%, -56%)",
            }, 'c')
            .to("#gallery-third img", {
                transform: "scale(1)",
            }, 'c')
            .to("#gallery-second", {
                scale: 0.9,
                opacity: 0,
            }, 'c')
            .from("#gallery-third .gallery-topText h4, #gallery-third .gallery-topText h3, #gallery-third .gallery-bottomText h3", {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0");

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const generateTitles = (quantity = 6) => {
        const items = [];
        for (let i = 1; i <= quantity; i++) {
            items.push(
                <h3 key={i} style={{ "--index": i }} className='tracking-tighter'>
                    Selected Work
                </h3>
            );
        }
        return items;
    };

    return (
        <section className="gallery-page4" ref={pageRef}>
            <div className="gallery-slider">
                <div className="gallery-box" style={{ "--time": "40s", "--quantity": 6 }}>
                    {generateTitles(6)}
                </div>
            </div>

            {/* PROJECT 1 — VOID STREETWEAR */}
            <div className="gallery-background">
                <img src={project1} alt="Void Streetwear" />
                <div className="gallery-topText">
                    <h4>Void Streetwear</h4>
                    <h3>(Scroll)</h3>
                </div>
                <div className="gallery-bottomText">
                    <div className='w-full flex justify-center items-center gap-0'>
                        <span className='text-[#cc1100] text-2xl mr-3'>◈</span>
                        <h3>
                            Fashion brand concept — bold typography, high-contrast visuals
                            and experimental layout rhythm.
                            <a href="https://098tanishq-source.github.io/void-streetwear/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 underline"
                                style={{ color: '#ff2200' }}>
                                Visit Site
                            </a>
                        </h3>
                    </div>
                    <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48]">
                        <div className="progress-line absolute z-10 h-[0.1rem] top-1/2 -translate-y-1/2 left-0"
                            style={{ width: '33%', background: '#cc1100' }}></div>
                    </div>
                </div>
            </div>

            {/* PROJECT 2 — LUMI-RE */}
            <div id="gallery-second" className="gallery-background2">
                <img src={project2} alt="Lumi-re Restaurant" />
                <div className="gallery-topText">
                    <h4>Lumi-re</h4>
                    <h3>(Scroll)</h3>
                </div>
                <div className="gallery-bottomText">
                    <div className='w-full flex justify-center items-center gap-0'>
                        <span className='text-[#cc1100] text-2xl mr-3'>◈</span>
                        <h3>
                            Fine dining concept — dark romantic aesthetics, refined
                            typography and spacious layout composition.
                            <a href="https://098tanishq-source.github.io/Lumi-re/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 underline"
                                style={{ color: '#ff2200' }}>
                                Visit Site
                            </a>
                        </h3>
                    </div>
                    <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48]">
                        <div className="progress-line absolute z-10 h-[0.1rem] top-1/2 -translate-y-1/2 left-0"
                            style={{ width: '67%', background: '#cc1100' }}></div>
                    </div>
                </div>
            </div>

            {/* PROJECT 3 — IRONFORGE */}
            <div id="gallery-third" className="gallery-background2">
                <img src={project3} alt="IronForge Gym" />
                <div className="gallery-topText">
                    <h4>IronForge Gym</h4>
                    <h3>(Scroll)</h3>
                </div>
                <div className="gallery-bottomText">
                    <div className='w-full flex justify-center items-center gap-0'>
                        <span className='text-[#cc1100] text-2xl mr-3'>◈</span>
                        <h3>
                            Fitness website — high-energy design communicating strength,
                            motivation and clarity with bold headings.
                            <a href="https://098tanishq-source.github.io/ironforge-gym/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 underline"
                                style={{ color: '#ff2200' }}>
                                Visit Site
                            </a>
                        </h3>
                    </div>
                    <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48]">
                        <div className="progress-line absolute z-10 h-[0.1rem] top-1/2 -translate-y-1/2 left-0"
                            style={{ width: '100%', background: '#cc1100' }}></div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Gallery;