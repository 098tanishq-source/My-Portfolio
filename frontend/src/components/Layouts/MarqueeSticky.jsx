import MarqueeText from "../Marquee/MarqueeText";

const MarqueeSticky = () => {
    return (
        <section style={{ width: '100%', overflow: 'hidden', background: '#080808', paddingBottom: '20px' }}>
            <div style={{ padding: '20px 32px 12px' }}>
                <p style={{ color: '#cc1100', fontSize: '0.7rem', letterSpacing: '3px' }}>
                    AVAILABLE FOR FREELANCE<br />
                    PROJECTS — LOCAL & INTERNATIONAL
                </p>
            </div>
            <MarqueeText />
        </section>
    );
};

export default MarqueeSticky;