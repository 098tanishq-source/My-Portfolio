 import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import bgVid from "../../assets/earth.mp4";
import { MailIcon, MapPinIcon, InstagramIcon, GithubIcon } from "lucide-react";

const FooterBanner = () => {
    const formRef = useRef(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError(false);
        try {
            await emailjs.sendForm(
                "service_0d4o5pd",
                "template_nnbp3ly",
                formRef.current,
                "74DzAt5aPo0DLl-6K"
            );
            setSent(true);
            setForm({ name: "", email: "", budget: "", message: "" });
        } catch {
            setError(true);
        } finally {
            setSending(false);
        }
    };

    const contactInfo = [
        { icon: MailIcon,      label: "Email",     value: "098tanishq@gmail.com",  href: "mailto:098tanishq@gmail.com" },
        { icon: InstagramIcon, label: "Instagram",  value: "@_friendly_dev",        href: "https://ig.me/m/_friendly_dev" },
        { icon: MapPinIcon,    label: "Location",   value: "New Delhi, India",      href: null },
        { icon: GithubIcon,    label: "GitHub",     value: "098tanishq-source",     href: "https://github.com/098tanishq-source" },
    ];

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            overflow: 'hidden',
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
                .gc * { font-family: 'Open Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
                .gc-card {
                    width: 100%; max-width: 900px; border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.35);
                    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                    background: rgba(255,255,255,0.07);
                    display: grid; grid-template-columns: 1fr 1.1fr;
                    overflow: hidden; position: relative; z-index: 2;
                }
                .gc-left {
                    padding: 44px 36px;
                    border-right: 1px solid rgba(255,255,255,0.15);
                    display: flex; flex-direction: column; justify-content: space-between;
                    background: rgba(255,255,255,0.04);
                }
                .gc-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
                .gc-sub { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.7; margin-bottom: 36px; max-width: 280px; }
                .gc-info-item { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-decoration: none; transition: all 0.2s; }
                .gc-info-item:last-child { border-bottom: none; }
                .gc-info-item:hover .gc-info-label { color: rgba(255,255,255,0.9) !important; }
                .gc-info-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .gc-right { padding: 44px 36px; }
                .gc-form-title { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 6px; }
                .gc-form-sub { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-bottom: 28px; }
                .gc-field { position: relative; border-bottom: 2px solid rgba(255,255,255,0.3); margin-bottom: 22px; }
                .gc-field label { position: absolute; top: 50%; left: 0; transform: translateY(-50%); color: rgba(255,255,255,0.55); font-size: 14px; pointer-events: none; transition: 0.18s ease; }
                .gc-field input, .gc-field select, .gc-field textarea { width: 100%; background: transparent; border: none; outline: none; font-size: 14px; color: #fff; padding: 8px 0 5px; }
                .gc-field select option { background: #0a1628; color: #fff; }
                .gc-field textarea { resize: none; height: 64px; padding-top: 14px; }
                .gc-field.area label { top: 16px; transform: none; }
                .gc-field input:focus ~ label, .gc-field input:valid ~ label,
                .gc-field select:valid ~ label, .gc-field select:focus ~ label,
                .gc-field textarea:focus ~ label, .gc-field textarea:valid ~ label {
                    font-size: 0.68rem; top: 0px; transform: translateY(-100%);
                    color: rgba(255,255,255,0.8); letter-spacing: 1.5px; text-transform: uppercase;
                }
                .gc-field.area textarea:focus ~ label, .gc-field.area textarea:valid ~ label {
                    top: -8px; transform: none; font-size: 0.68rem;
                    letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.8);
                }
                .gc-field::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: #fff; transition: width 0.3s ease; }
                .gc-field:focus-within::after { width: 100%; }
                .gc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .gc-btn { width: 100%; margin-top: 8px; padding: 13px 20px; background: #fff; color: #000; font-weight: 700; font-size: 14px; border: 2px solid transparent; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; }
                .gc-btn:hover { color: #fff; border-color: #fff; background: rgba(255,255,255,0.12); }
                .gc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .gc-or { text-align: center; margin-top: 18px; color: rgba(255,255,255,0.4); font-size: 0.75rem; }
                .gc-or a { color: #fff; text-decoration: none; font-weight: 600; }
                .gc-or a:hover { text-decoration: underline; }
                .gc-error { color: #ff8080; font-size: 0.72rem; margin: 8px 0; }
                .gc-success { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; height: 100%; padding: 40px 0; text-align: center; }
                .gc-success-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #fff; }
                .gc-again { background: transparent; border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.6); padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 0.72rem; letter-spacing: 1px; transition: all 0.2s; margin-top: 4px; }
                .gc-again:hover { border-color: #fff; color: #fff; }
                @keyframes spin-gc { to { transform: rotate(360deg); } }
                .gc-spinner { width: 15px; height: 15px; border: 2px solid rgba(0,0,0,0.2); border-top-color: #000; border-radius: 50%; animation: spin-gc 0.7s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px; }
                @media (max-width: 680px) {
                    .gc-card { grid-template-columns: 1fr; }
                    .gc-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
                    .gc-row { grid-template-columns: 1fr; gap: 0; }
                }
            `}</style>

            <video autoPlay muted loop playsInline style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', zIndex: 0,
            }}>
                <source src={bgVid} type="video/mp4" />
            </video>

            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1 }} />

            <div className="gc">
                <div className="gc-card">
                    <div className="gc-left">
                        <div>
                            <h2 className="gc-title">Let's build<br />something great.</h2>
                            <p className="gc-sub">I respond within 24 hours. Tell me about your project and I'll get back with a quote.</p>
                        </div>
                        <div>
                            {contactInfo.map((item, i) => {
                                const Tag = item.href ? 'a' : 'div';
                                return (
                                    <Tag key={i} href={item.href || undefined} target={item.href ? "_blank" : undefined} rel="noopener noreferrer" className="gc-info-item">
                                        <div className="gc-info-icon">
                                            <item.icon size={15} color="rgba(255,255,255,0.7)" />
                                        </div>
                                        <div>
                                            <p className="gc-info-label" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: '600', transition: 'color 0.2s' }}>{item.label}</p>
                                            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', marginTop: '1px' }}>{item.value}</p>
                                        </div>
                                    </Tag>
                                );
                            })}
                        </div>
                    </div>

                    <div className="gc-right">
                        {sent ? (
                            <div className="gc-success">
                                <div className="gc-success-icon">✓</div>
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700' }}>Message Sent!</h3>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>I'll get back to you within 24 hours.</p>
                                <button className="gc-again" onClick={() => setSent(false)}>SEND ANOTHER</button>
                            </div>
                        ) : (
                            <>
                                <p className="gc-form-title">Send a message</p>
                                <p className="gc-form-sub">Fill out the form and I'll get back to you.</p>
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <div className="gc-row">
                                        <div className="gc-field">
                                            <input type="text" name="name" value={form.name} onChange={handleChange} required />
                                            <label>Your name</label>
                                        </div>
                                        <div className="gc-field">
                                            <input type="email" name="email" value={form.email} onChange={handleChange} required />
                                            <label>Your email</label>
                                        </div>
                                    </div>
                                    <div className="gc-field">
                                        <select name="budget" value={form.budget} onChange={handleChange} required>
                                            <option value="" disabled></option>
                                            <option value="₹2,000–₹4,000">₹2,000 – ₹4,000 · Basic site</option>
                                            <option value="₹4,000–₹8,000">₹4,000 – ₹8,000 · Full animated</option>
                                            <option value="₹8,000+">₹8,000+ · Custom project</option>
                                            <option value="Let's discuss">Let's discuss</option>
                                        </select>
                                        <label>Budget range</label>
                                    </div>
                                    <div className="gc-field area">
                                        <textarea name="message" value={form.message} onChange={handleChange} required />
                                        <label>Your message</label>
                                    </div>
                                    {error && <p className="gc-error">Something went wrong. DM me on Instagram instead.</p>}
                                    <button type="submit" disabled={sending} className="gc-btn">
                                        {sending ? <><span className="gc-spinner" />Sending...</> : 'Send Message'}
                                    </button>
                                </form>
                                <p className="gc-or" style={{ marginTop: '16px' }}>
                                    Or DM me on{' '}
                                    <a href="https://ig.me/m/_friendly_dev" target="_blank" rel="noopener noreferrer">Instagram</a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBanner;