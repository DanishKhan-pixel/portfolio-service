import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

export default function Hero() {
    const fetcher = useCallback(() => api.getProfile(), []);
    const { data: profile, loading } = useApi(fetcher);
    const [visibleLines, setVisibleLines] = useState(0);

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
            {/* Animated background orbs */}
            <div className="glow-orb glow-orb-blue" style={{ top: '10%', right: '5%' }} />
            <div className="glow-orb glow-orb-purple" style={{ bottom: '20%', left: '-5%' }} />
            <div className="glow-orb glow-orb-cyan" style={{ top: '40%', right: '20%' }} />
            <div className="glow-orb glow-orb-pink" style={{ bottom: '10%', right: '10%' }} />
            <div className="container hero-grid">
                <motion.div
                    className="animate-fade-in-left"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="hero-status">
                        <span className="hero-status-dot" />
                        SYSTEM ONLINE
                    </div>

                    <h1 className="hero-name">
                        {' '}
                        <span className="hero-name-highlight gradient-text">{firstName}</span>
                        <br />
                        {lastName}.
                    </h1>

                    <div className="hero-title">
                        {profile.title.split('|').map((part, i, arr) => (
                            <span key={i}>
                                {part.trim()}
                                {i < arr.length - 1 && (
                                    <span className="hero-title-divider"> | </span>
                                )}
                            </span>
                        ))}
                    </div>

                    <p className="hero-bio">{profile.bio}</p>

                    <div className="hero-ctas">
                        <button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('projects')}
                            id="cta-view-projects"
                        >
                            <ExternalLink size={16} />
                            View Projects
                        </button>
                        {profile.resume_url && (
                            <a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                                id="cta-download-resume"
                            >
                                <Download size={16} />
                                Resume
                            </a>
                        )}
                        <button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('contact')}
                            id="cta-contact"
                        >
                            <Mail size={16} />
                            Contact Me
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-icon">
                                <Briefcase size={18} />
                            </div>
                            <div>
                                <div className="hero-stat-number">
                                    {profile.years_of_experience}+
                                </div>
                                <div className="hero-stat-label">Years</div>
                            </div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-icon">
                                <Code size={18} />
                            </div>
                            <div>
                                <div className="hero-stat-number">150K+</div>
                                <div className="hero-stat-label">Lines of Code</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-terminal animate-fade-in-right"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
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
                                <div className="terminal-line" key={i}>
                                    <span className="terminal-prompt">{line.prompt}</span>
                                    <span className={line.success ? 'terminal-success' : ''}>
                                        {line.text}
                                    </span>
                                </div>
                            ))}
                            {visibleLines < TERMINAL_LINES.length && (
                                <div className="terminal-line">
                                    <span className="terminal-prompt">~$</span>
                                    <span className="cursor-blink" />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
