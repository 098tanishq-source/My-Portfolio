import { useState } from "react";

const faqs = [
    { q: "What do you charge for a basic website?", a: "For a basic responsive website with modern design and essential sections, I charge between 2,000 – 4,000 INR depending on pages and features." },
    { q: "What about a full website with animations?", a: "For custom layout, animations and advanced UI interactions, pricing ranges from 4,000 – 8,000 INR based on complexity." },
    { q: "Do you do redesigns?", a: "Yes. I redesign existing websites — improving layout, mobile responsiveness, visual identity and user experience." },
    { q: "What is your delivery time?", a: "Basic websites take 3–5 days. Complex projects take 5–10 days depending on revisions and content availability." },
    { q: "Do you work with international clients?", a: "Yes. I work with both Indian and international clients. All communication and delivery is handled online." },
]

const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b py-6" style={{ borderColor: 'rgba(204,17,0,0.15)', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
            <div className="flex justify-between items-center gap-4">
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#f0ece4', fontWeight: '500' }}>{q}</p>
                <span style={{ color: '#cc1100', fontSize: '1.5rem', display: 'inline-block', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
            </div>
            {open && <p style={{ marginTop: '16px', fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(240,236,228,0.45)', paddingRight: '2rem' }}>{a}</p>}
        </div>
    )
}

const FAQ = () => {
    return (
        <section style={{ background: '#080808', padding: '100px 8vw' }}>
            <div style={{ marginBottom: '60px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '4px', color: '#cc1100', textTransform: 'uppercase', marginBottom: '16px' }}>PRICING & FAQ</p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: '700', color: '#f0ece4', lineHeight: '0.9', letterSpacing: '-1px' }}>
                    How I Work<br />
                    <span style={{ color: 'rgba(240,236,228,0.12)' }}>With Clients</span>
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
                <div>
                    {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
                </div>

                <div style={{ paddingTop: '20px' }}>
                    <div style={{ padding: '40px', background: '#150000', borderRadius: '2rem', border: '1px solid rgba(204,17,0,0.15)', marginBottom: '20px' }}>
                        <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '3px', color: '#cc1100', marginBottom: '12px' }}>BASIC WEBSITE</p>
                        <h3 style={{ fontSize: '3rem', fontWeight: '700', color: '#f0ece4', lineHeight: '1' }}>₹2,000</h3>
                        <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(240,236,228,0.4)' }}>Responsive · Modern · Fast delivery</p>
                    </div>
                    <div style={{ padding: '40px', background: '#150000', borderRadius: '2rem', border: '1px solid rgba(204,17,0,0.15)', marginBottom: '20px' }}>
                        <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '3px', color: '#cc1100', marginBottom: '12px' }}>FULL PROJECT</p>
                        <h3 style={{ fontSize: '3rem', fontWeight: '700', color: '#f0ece4', lineHeight: '1' }}>₹4,000+</h3>
                        <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(240,236,228,0.4)' }}>Custom animations · Advanced UI</p>
                    </div>
                    <button
                        onClick={() => window.location.href = 'mailto:098tanishq@gmail.com'}
                        style={{ width: '100%', padding: '18px', background: '#cc1100', color: '#f0ece4', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                        START A PROJECT
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FAQ