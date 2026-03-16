 import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './marqueetext.css';

const MarqueeText = () => {
    const animationRef = useRef(null);
    const isForwardRef = useRef(true);

    useEffect(() => {
        const startAnimation = (direction) => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
            const target = ".marquee-text-marquee";
            const config = {
                duration: 10,
                repeat: -1,
                ease: "none",
                modifiers: {
                    x: gsap.utils.unitize(function(x) {
                        return parseFloat(x) % 100;
                    })
                }
            };
            if (direction === 'forward') {
                config.x = '-200%';
            } else {
                config.x = '0%';
            }
            animationRef.current = gsap.to(target, config);
        };

        startAnimation('forward');

        const handleWheel = function(event) {
            const newDir = event.deltaY > 0 ? 'forward' : 'reverse';
            const isForward = isForwardRef.current;
            if ((newDir === 'forward' && !isForward) || (newDir === 'reverse' && isForward)) {
                isForwardRef.current = newDir === 'forward';
                startAnimation(newDir);
            }
        };

        window.addEventListener("wheel", handleWheel);

        return function() {
            window.removeEventListener("wheel", handleWheel);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    const marqueeItems = Array(6).fill(null).map(function(_, index) {
        return (
            <div key={index} className="marquee-text-marquee">
                <h1>Available for Freelance<span className="star-rotate">*</span></h1>
            </div>
        );
    });

    return (
        <div className="marquee-text-container">
            <div className="marquee-text-move">
                {marqueeItems}
            </div>
        </div>
    );
};

export default MarqueeText;