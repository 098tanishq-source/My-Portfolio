 const ReserveBtn = () => {
    const handleClick = function() {
        window.open('https://ig.me/m/_friendly_dev', '_blank');
    };

    return (
        <div className="relative z-49">
            <button
                onClick={handleClick}
                className="absolute right-6 top-[2vw] flex justify-end items-center rounded-4xl gap-2 px-4 py-2"
                style={{
                    background: 'rgba(10,0,0,0.85)',
                    border: '1px solid rgba(204,17,0,0.5)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                }}
            >
                <span style={{
                    color: '#f0ece4',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '2px',
                }}>
                    DM ME ↗
                </span>
            </button>
        </div>
    );
};

export default ReserveBtn;