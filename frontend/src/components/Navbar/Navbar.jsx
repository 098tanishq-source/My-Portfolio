 import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";

const navItems = [
    { name: "Home",    icon: Home,      selector: ".hero-section"    },
    { name: "Work",    icon: Briefcase, selector: ".gallery-section" },
    { name: "About",   icon: User,      selector: ".welcome-section" },
    { name: "Contact", icon: Mail,      selector: ".gc-card"         },
];

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const [hoveredTab, setHoveredTab] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    const handleClick = (item) => {
        setActiveTab(item.name);
        const el = document.querySelector(item.selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <style>{`
                @keyframes shine {
                    0%   { transform: translateX(-100%); }
                    50%  { transform: translateX(100%);  }
                    100% { transform: translateX(100%);  }
                }
                .nav-shine { animation: shine 3s ease-in-out infinite; }
            `}</style>

            <div style={{
                position: 'fixed', top: '60px', left: 0, right: 0,
                zIndex: 9999, display: 'flex', justifyContent: 'center',
                pointerEvents: 'none',
            }}>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '999px',
                        padding: '6px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        pointerEvents: 'auto',
                    }}
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;
                        const isHovered = hoveredTab === item.name;

                        return (
                            <div
                                key={item.name}
                                onClick={() => handleClick(item)}
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    padding: '10px 20px',
                                    borderRadius: '999px',
                                    transition: 'color 0.3s ease',
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                    fontFamily: 'monospace',
                                    fontSize: '0.65rem',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                    userSelect: 'none',
                                }}
                            >
                                {/* active glow */}
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ position: 'absolute', inset: 0, borderRadius: '999px', zIndex: 0, overflow: 'hidden' }}
                                    >
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(204,17,0,0.25)', borderRadius: '999px', filter: 'blur(4px)' }} />
                                        <div style={{ position: 'absolute', inset: '-4px', background: 'rgba(204,17,0,0.15)', borderRadius: '999px', filter: 'blur(12px)' }} />
                                        <div className="nav-shine" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(204,17,0,0.2), transparent)', borderRadius: '999px' }} />
                                    </motion.div>
                                )}

                                {/* hover bg */}
                                <AnimatePresence>
                                    {isHovered && !isActive && (
                                        <motion.div
                                            key="hover-bg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.08)', borderRadius: '999px', zIndex: 0 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* mascot */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            key={`mascot-${item.name}`}
                                            initial={{ opacity: 0, y: 12, scale: 0.7 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 12, scale: 0.7 }}
                                            transition={{ type: "spring", stiffness: 320, damping: 22 }}
                                            style={{
                                                position: 'absolute',
                                                top: '-58px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                pointerEvents: 'none',
                                                zIndex: 20,
                                                width: '48px',
                                            }}
                                        >
                                            {/* head */}
                                            <motion.div
                                                animate={isHovered
                                                    ? { rotate: [0, -6, 6, -6, 0], scale: [1, 1.1, 1], transition: { duration: 0.5 } }
                                                    : { y: [0, -4, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                                                }
                                                style={{
                                                    width: '40px', height: '40px',
                                                    background: '#add8e6',
                                                    borderRadius: '50%',
                                                    position: 'relative',
                                                    margin: '0 auto',
                                                }}
                                            >
                                                {/* left eye */}
                                                <motion.div
                                                    animate={isHovered
                                                        ? { scaleY: [1, 0.1, 1], transition: { duration: 0.2 } }
                                                        : { scaleY: [1,1,1,0.1,1], transition: { duration: 3, repeat: Infinity, times: [0,0.6,0.7,0.75,0.8] } }
                                                    }
                                                    style={{ position: 'absolute', width: '7px', height: '7px', background: '#1a1a2e', borderRadius: '50%', left: '22%', top: '35%' }}
                                                />
                                                {/* right eye */}
                                                <motion.div
                                                    animate={isHovered
                                                        ? { scaleY: [1, 0.1, 1], transition: { duration: 0.2 } }
                                                        : { scaleY: [1,1,1,0.1,1], transition: { duration: 3, repeat: Infinity, times: [0,0.6,0.7,0.75,0.8] } }
                                                    }
                                                    style={{ position: 'absolute', width: '7px', height: '7px', background: '#1a1a2e', borderRadius: '50%', right: '22%', top: '35%' }}
                                                />
                                                {/* left cheek */}
                                                <div style={{ position: 'absolute', width: '8px', height: '5px', background: 'rgba(255,150,170,0.6)', borderRadius: '50%', left: '8%', top: '54%' }} />
                                                {/* right cheek */}
                                                <div style={{ position: 'absolute', width: '8px', height: '5px', background: 'rgba(255,150,170,0.6)', borderRadius: '50%', right: '8%', top: '54%' }} />
                                                {/* mouth */}
                                                <motion.div
                                                    animate={isHovered ? { scaleY: 1.6, y: -1 } : { scaleY: 1, y: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    style={{ position: 'absolute', width: '14px', height: '6px', borderBottom: '2.5px solid #1a1a2e', borderRadius: '0 0 8px 8px', left: '30%', top: '58%' }}
                                                />

                                                {/* sparkles */}
                                                <AnimatePresence>
                                                    {isHovered && (
                                                        <>
                                                            <motion.div
                                                                key="s1"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                style={{ position: 'absolute', top: '-6px', right: '-4px', fontSize: '11px' }}
                                                            >✨</motion.div>
                                                            <motion.div
                                                                key="s2"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2, delay: 0.1 }}
                                                                style={{ position: 'absolute', top: '-10px', left: '-2px', fontSize: '9px' }}
                                                            >✨</motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* tail */}
                                            <motion.div
                                                animate={isHovered
                                                    ? { y: [0, -5, 0], transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } }
                                                    : { y: [0, 2, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
                                                }
                                                style={{
                                                    width: '13px', height: '13px',
                                                    background: '#add8e6',
                                                    transform: 'rotate(45deg)',
                                                    margin: '-7px auto 0',
                                                    borderRadius: '2px',
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* label */}
                                <span style={{ position: 'relative', zIndex: 1 }}>
                                    <span className="hidden md:inline">{item.name}</span>
                                    <span className="md:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={18} strokeWidth={2.5} />
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </>
    );
};

export default Navbar;