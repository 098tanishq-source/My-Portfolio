const MapLink = () => {
    return (
        <section className="w-screen h-[90vh] flex flex-col justify-center items-center text-center"
            style={{ background: '#080808' }}>

            <p style={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                letterSpacing: '4px',
                color: '#cc1100',
                textTransform: 'uppercase',
                marginBottom: '24px'
            }}>
                AVAILABLE FOR FREELANCE
            </p>

            <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                lineHeight: '1.1',
                letterSpacing: '-1px',
                color: '#f0ece4',
                fontWeight: '700',
                marginBottom: '16px'
            }}>
                Got a project in mind?<br />
                <span style={{ color: 'rgba(240,236,228,0.15)' }}>Let's build it together.</span>
            </h1>

            <p style={{
                fontSize: '0.85rem',
                color: 'rgba(240,236,228,0.35)',
                marginBottom: '48px',
                letterSpacing: '1px'
            }}>
                Based in India · Working worldwide · Remote friendly
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={function() { window.location.href = 'mailto:098tanishq@gmail.com'; }}
                    style={{
                        padding: '16px 40px',
                        background: '#cc1100',
                        color: '#f0ece4',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        border: 'none',
                        clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                        cursor: 'pointer',
                    }}
                >
                    EMAIL ME
                </button>
                <button
                    onClick={function() { window.open('https://ig.me/m/_friendly_dev', '_blank'); }}
                    style={{
                        padding: '16px 40px',
                        background: 'transparent',
                        color: '#cc1100',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(204,17,0,0.4)',
                        clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                        cursor: 'pointer',
                    }}
                >
                    DM ON INSTAGRAM
                </button>
            </div>

        </section>
    );
};

export default MapLink;