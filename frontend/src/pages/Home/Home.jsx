 import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Choose from '../../components/Choose/Choose'
import Gallery from '../../components/Gallery/Gallery'
import Activities from '../../components/Activities/Activities'
import Feedback from '../../components/Feedback/Feedback'
import FooterBanner from '../../components/FooterBanner/FooterBanner'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    useEffect(() => {
        const onResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Navbar />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
                <Welcome />
            </div>
            <div style={{ position: 'relative', zIndex: 3 }}>
                <Choose />
            </div>
            <div style={{ position: 'relative', zIndex: 100 }}>
                <Gallery />
            </div>
            <div style={{ position: 'relative', zIndex: 5 }}>
                <Activities />
            </div>
            <div style={{ position: 'relative', zIndex: 5 }}>
                <Feedback />
            </div>
            <div style={{ position: 'relative', zIndex: 5 }}>
                <FooterBanner />
            </div>
        </div>
    )
}

export default Home