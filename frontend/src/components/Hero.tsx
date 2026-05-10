import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Download, Mail, Briefcase, Code } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import { scrollToSection } from '../utils/helpers';
import Skeleton from './Skeleton';

const TERMINAL_LINES = [
    { prompt: '~$', text: 'python manage.py runserver', delay: 0 },
    { prompt: '>', text: 'Initializing Backend Engineer...', delay: 600 },
    { prompt: '>', text: 'Python Specialist Loaded ✓', delay: 1200, success: true },
    { prompt: '>', text: 'Django REST APIs Ready ✓', delay: 1800, success: true },
    { prompt: '>', text: 'PostgreSQL Connected ✓', delay: 2400, success: true },
    { prompt: '>', text: 'System Online — Ready to build.', delay: 3000, success: true },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function Hero() {
    const fetcher = useCallback(() => api.getProfile(), []);
    const { data: profile, loading } = useApi(fetcher);
    const [visibleLines, setVisibleLines] = useState(0);

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -100]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    useEffect(() => {
        const timers = TERMINAL_LINES.map((line, i) =>
            setTimeout(() => setVisibleLines(i + 1), line.delay + 500)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    if (loading) {
        return (
            <section id="hero" className="hero">
                <div className="container hero-grid">
                    <div>
                        <Skeleton variant="text-sm" width="140px" />
                        <Skeleton variant="heading" width="80%" />
                        <Skeleton variant="heading" width="60%" />
                        <Skeleton variant="text" count={3} />
                    </div>
                    <Skeleton variant="card" height="300px" />
                </div>
            </section>
        );
    }

    if (!profile) return null;

    const nameParts = profile.full_name.split(' ');
    const firstName = nameParts.slice(0, -1).join(' ');
    const lastName = nameParts[nameParts.length - 1];

    return (
        <section id="hero" className="hero">
            <motion.div
                className="hero-background"
                style={{ y: heroY, opacity: heroOpacity }}
            >
                <motion.div
                    className="glow-orb glow-orb-blue"
                    style={{ top: '10%', right: '5%' }}
                    animate={{
                        y: [-10, 10, -10],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="glow-orb glow-orb-purple"
                    style={{ bottom: '20%', left: '-5%' }}
                    animate={{
                        y: [0, 20, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="glow-orb glow-orb-cyan"
                    style={{ top: '40%', right: '20%' }}
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="glow-orb glow-orb-pink"
                    style={{ bottom: '10%', right: '10%' }}
                    animate={{
                        y: [0, 12, 0],
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            <div className="grid-pattern" />

            <div className="container hero-grid">
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="hero-status"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.span
                            className="hero-status-dot"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        SYSTEM ONLINE
                    </motion.div>

                    <motion.h1
                        className="hero-name"
                        variants={fadeInUp}
                    >
                        <span className="hero-name-highlight gradient-text">{firstName}</span>
                        <br />
                        {lastName}.
                    </motion.h1>

                    <motion.div
                        className="hero-title"
                        variants={fadeInUp}
                    >
                        {profile.title.split('|').map((part, i, arr) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                {part.trim()}
                                {i < arr.length - 1 && (
                                    <span className="hero-title-divider"> | </span>
                                )}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        className="hero-ctas"
                        variants={fadeInUp}
                    >
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('projects')}
                            id="cta-view-projects"
                            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ExternalLink size={16} />
                            View Projects
                        </motion.button>
                        {profile.resume_url && (
                            <motion.a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                                id="cta-download-resume"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download size={16} />
                                Resume
                            </motion.a>
                        )}
                        <motion.button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('contact')}
                            id="cta-contact"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Mail size={16} />
                            Contact Me
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        variants={fadeInUp}
                    >
                        <motion.div
                            className="hero-stat"
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
                        >
                            <div className="hero-stat-icon">
                                <Briefcase size={18} />
                            </div>
                            <div>
                                <div className="hero-stat-number">
                                    {profile.years_of_experience}+
                                </div>
                                <div className="hero-stat-label">Years</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="hero-stat"
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
                        >
                            <div className="hero-stat-icon">
                                <Code size={18} />
                            </div>
                            <div>
                                <div className="hero-stat-number">150K+</div>
                                <div className="hero-stat-label">Lines of Code</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-terminal"
                    initial={{ opacity: 0, x: 40, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                    style={{ willChange: 'transform, opacity' }}
                >
                    <motion.div
                        animate={{
                        boxShadow: [
                            '0 0 20px rgba(59, 130, 246, 0.3)',
                            '0 0 40px rgba(59, 130, 246, 0.5)',
                            '0 0 60px rgba(168, 85, 247, 0.3)',
                            '0 0 20px rgba(59, 130, 246, 0.3)',
                        ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                        borderRadius: 'var(--radius-md)',
                        padding: '2px',
                        background: 'linear-gradient(135deg, var(--color-accent), var(--color-purple), var(--color-cyan))',
                    }}
                    >
                        <div className="terminal">
                            <div className="terminal-header">
                                <span className="terminal-dot" />
                                <span className="terminal-dot" />
                                <span className="terminal-dot" />
                                <span className="terminal-title">~/portfolio</span>
                            </div>
                            <div className="terminal-body">
                                {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                                    <motion.div
                                        className="terminal-line"
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="terminal-prompt">{line.prompt}</span>
                                        <span className={line.success ? 'terminal-success' : ''}>
                                            {line.text}
                                        </span>
                                    </motion.div>
                                ))}
                                {visibleLines < TERMINAL_LINES.length && (
                                    <div className="terminal-line">
                                        <span className="terminal-prompt">~$</span>
                                        <motion.span
                                            className="cursor-blink"
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}