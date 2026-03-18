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

        tl4.to(".gallery-page4", { backgroundColor: "#0a0000" }, 'start');

        tl4.to(".gallery-box h3", { opacity: 0 }, 'a')
            .to(".gallery-page4 .gallery-background", {
                width: "calc(100vw - 1rem)",
                height: "calc(100vh - 1rem)",
                borderRadius: "3.5rem",
                y: -40,
            }, 'a')
            .to(".gallery-page4 .gallery-background img", { transform: "scale(1)" }, 'a')
            .from(".gallery-background .gallery-bottomText h3", { opacity: 0, x: 50 })
            .to({}, { duration: 0.4 }, "+=0")
            .to("#gallery-second", { transform: "translate(-50%, -56%)" }, 'b')
            .to("#gallery-second img", { transform: "scale(1)" }, 'b')
            .to(".gallery-page4 .gallery-background", { scale: 0.9, opacity: 0, y: -50 }, 'b')
            .from("#gallery-second .gallery-bottomText h3", { opacity: 0, x: 50 })
            .to({}, { duration: 0.4 }, "+=0")
            .to("#gallery-third", { transform: "translate(-50%, -56%)" }, 'c')
            .to("#gallery-third img", { transform: "scale(1)" }, 'c')
            .to("#gallery-second", { scale: 0.9, opacity: 0 }, 'c')
            .from("#gallery-third .gallery-bottomText h3", { opacity: 0, x: 50 })
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
                    My Work
                </h3>
            );
        }
        return items;
    };

    const ProgressBar = ({ percent }) => (
        <div style={{
            position: 'absolute',
            top: '60px',
            right: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 20,
        }}>
            <span style={{ color: 'rgba(240,236,228,0.3)', fontSize: '0.6rem', letterSpacing: '2px' }}>
                {percent === 33 ? '01' : percent === 67 ? '02' : '03'} / 03
            </span>
            <div style={{ width: '80px', height: '1px', background: 'rgba(240,236,228,0.15)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${percent}%`, background: '#cc1100' }} />
            </div>
        </div>
    );

    return (
        <section className="gallery-page4" ref={pageRef}>
            <div className="gallery-slider">
                <div className="gallery-box" style={{ "--time": "40s", "--quantity": 6 }}>
                    {generateTitles(6)}
                </div>
            </div>

            {/* PROJECT 1 */}
            <div className="gallery-background">
                <img src={project1} alt="Void Streetwear" />
                <ProgressBar percent={33} />
                <div className="gallery-bottomText" style={{ justifyContent: 'center' }}>
                    <a href="https://098tanishq-source.github.io/void-streetwear/"
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            color: '#f0ece4', fontSize: '0.75rem', letterSpacing: '3px',
                            textDecoration: 'none', border: '1px solid rgba(240,236,228,0.3)',
                            padding: '8px 24px', borderRadius: '999px',
                            background: 'rgba(240,236,228,0.05)', backdropFilter: 'blur(10px)',
                        }}>
                        VISIT ↗
                    </a>
                </div>
            </div>

            {/* PROJECT 2 */}
            <div id="gallery-second" className="gallery-background2">
                <img src={project2} alt="Lumi-re Restaurant" />
                <ProgressBar percent={67} />
                <div className="gallery-bottomText" style={{ justifyContent: 'center' }}>
                    <a href="https://098tanishq-source.github.io/Lumi-re/"
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            color: '#f0ece4', fontSize: '0.75rem', letterSpacing: '3px',
                            textDecoration: 'none', border: '1px solid rgba(240,236,228,0.3)',
                            padding: '8px 24px', borderRadius: '999px',
                            background: 'rgba(240,236,228,0.05)', backdropFilter: 'blur(10px)',
                        }}>
                        VISIT ↗
                    </a>
                </div>
            </div>

            {/* PROJECT 3 */}
            <div id="gallery-third" className="gallery-background2">
                <img src={project3} alt="IronForge Gym" />
                <ProgressBar percent={100} />
                <div className="gallery-bottomText" style={{ justifyContent: 'center' }}>
                    <a href="https://098tanishq-source.github.io/ironforge-gym/"
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            color: '#f0ece4', fontSize: '0.75rem', letterSpacing: '3px',
                            textDecoration: 'none', border: '1px solid rgba(240,236,228,0.3)',
                            padding: '8px 24px', borderRadius: '999px',
                            background: 'rgba(240,236,228,0.05)', backdropFilter: 'blur(10px)',
                        }}>
                        VISIT ↗
                    </a>
                </div>
            </div>

        </section>
    );
};

export default Gallery; 