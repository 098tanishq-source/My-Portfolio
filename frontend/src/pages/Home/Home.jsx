  import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Choose from '../../components/Choose/Choose'
import Gallery from '../../components/Gallery/Gallery'
import MarqueeSticky from '../../components/Layouts/MarqueeSticky'
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
            <div style={{ position: 'relative', zIndex: 1 }}><Hero /></div>
            <div style={{ position: 'relative', zIndex: 2 }}><Welcome /></div>
            <div style={{ position: 'relative', zIndex: 3 }}><Choose /></div>
            <div style={{ position: 'relative', zIndex: 4 }}><Gallery /></div>
            <div style={{ position: 'relative', zIndex: 5 }}><MarqueeSticky /></div>
            <div style={{ position: 'relative', zIndex: 1000 }}><Activities /></div>
            <div style={{ position: 'relative', zIndex: 1001 }}><Feedback /></div>
            <div style={{ position: 'relative', zIndex: 1002 }}><FooterBanner /></div>
        </div>
    )
}

export default Home