 import React from 'react'
import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Choose from '../../components/Choose/Choose'
import Gallery from '../../components/Gallery/Gallery'
import MapLink from '../../components/MapLink/MapLink'
import MarqueeSticky from '../../components/Layouts/MarqueeSticky'
import StickyCols from '../../components/StickyCols/StickyCols'
import FAQ from '../../components/FAQ/FAQ'
import Activities from '../../components/Activities/Activities'
import Showcase from '../../components/Showcase/Showcase'
import Feedback from '../../components/Feedback/Feedback'
import FooterBanner from '../../components/FooterBanner/FooterBanner'

const Home = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
                <Welcome />
            </div>
            <div style={{ position: 'relative', zIndex: 3 }}>
                <Choose />
            </div>
            <div style={{ position: 'relative', zIndex: 4 }}>
                <Gallery />
            </div>
            <div style={{ position: 'relative', zIndex: 5 }}>
                <MapLink />
            </div>
            <div style={{ position: 'relative', zIndex: 6 }}>
                <MarqueeSticky />
            </div>
            <div style={{ position: 'relative', zIndex: 7 }}>
                <StickyCols />
            </div>
            <div style={{ position: 'relative', zIndex: 8 }}>
                <FAQ />
            </div>
            <div style={{ position: 'relative', zIndex: 9 }}>
                <Activities />
            </div>
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Showcase />
            </div>
            <div style={{ position: 'relative', zIndex: 11 }}>
                <Feedback />
            </div>
            <div style={{ position: 'relative', zIndex: 12 }}>
                <FooterBanner />
            </div>
        </div>
    )
}

export default Home