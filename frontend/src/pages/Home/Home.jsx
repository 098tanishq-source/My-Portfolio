 import React, { lazy, Suspense } from 'react'

const Hero = lazy(() => import('../../components/Hero/Hero'))
const Welcome = lazy(() => import('../../components/Welcome/Welcome'))
const Choose = lazy(() => import('../../components/Choose/Choose'))
const Gallery = lazy(() => import('../../components/Gallery/Gallery'))
const MarqueeSticky = lazy(() => import('../../components/Layouts/MarqueeSticky'))
const StickyCols = lazy(() => import('../../components/StickyCols/StickyCols'))
const FAQ = lazy(() => import('../../components/FAQ/FAQ'))
const Activities = lazy(() => import('../../components/Activities/Activities'))
const Showcase = lazy(() => import('../../components/Showcase/Showcase'))
const Feedback = lazy(() => import('../../components/Feedback/Feedback'))
const FooterBanner = lazy(() => import('../../components/FooterBanner/FooterBanner'))

const Home = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Suspense fallback={null}>
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
                    <MarqueeSticky />
                </div>
                <div style={{ position: 'relative', zIndex: 6 }}>
                    <StickyCols />
                </div>
                <div style={{ position: 'relative', zIndex: 7 }}>
                    <FAQ />
                </div>
                <div style={{ position: 'relative', zIndex: 8 }}>
                    <Activities />
                </div>
                <div style={{ position: 'relative', zIndex: 9 }}>
                    <Showcase />
                </div>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <Feedback />
                </div>
                <div style={{ position: 'relative', zIndex: 11 }}>
                    <FooterBanner />
                </div>
            </Suspense>
        </div>
    )
}

export default Home