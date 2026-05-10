import { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

const PRINCIPLES = [
    { title: 'Architecture > Code', desc: 'Scalability designed upfront, not patched later' },
    { title: 'APIs as Products', desc: 'Developer experience first, consumption second' },
    { title: 'Testing as Specification', desc: 'Code that documents itself through tests' },
    { title: 'CI/CD as Mindset', desc: 'Deploy early, deploy often, ship with confidence' },
    { title: 'Security by Default', desc: 'RBAC/ABAC baked into system design' },
    { title: 'Horizontal Growth', desc: 'Systems built to scale, not to bottleneck' },
];

const STATS = [
    { value: 2, suffix: '+', label: 'Years Experience' },
    { value: 3, suffix: '', label: 'Projects' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
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

const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.1,
            type: 'spring' as const,
            stiffness: 100,
            damping: 15,
        },
    }),
};

const principleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.08,
            type: 'spring' as const,
            stiffness: 100,
            damping: 15,
        },
    }),
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                setHasAnimated(true);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, hasAnimated]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export default function About() {
    const fetcher = useCallback(() => api.getProfile(), []);
    const { data: profile, loading, error, refetch } = useApi(fetcher);

    const statsRef = useRef(null);
    const principlesRef = useRef(null);

    return (
        <SectionWrapper
            id="about"
            label="ABOUT_ME"
            title="About Me"
            subtitle=""
        >
            <div className="about-premium-container">
                {loading ? (
                    <div className="about-content">
                        <div className="about-main">
                            <div className="about-label">
                                <span className="about-label-dot" />
                                BACKEND ENGINEER
                            </div>
                            <Skeleton variant="text" count={3} width="100%" />
                            <Skeleton variant="text-sm" width="60%" />
                            <div style={{ marginTop: 'var(--space-lg)' }}>
                                <span className="tech-label">STACK</span>
                                <div className="tech-tags">
                                    {['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS', 'Docker'].map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="about-stats-grid">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="stat-card-premium">
                                    <div className="stat-value-premium"><Skeleton variant="text" width="50px" /></div>
                                    <div className="stat-label-premium"><Skeleton variant="text-sm" width="80px" /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : error ? (
                    <ErrorState message={error} onRetry={refetch} />
                ) : profile ? (
                    <motion.div
                        className="about-content"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <motion.div className="about-main" variants={fadeInUp}>
                            <div className="about-label">
                                <span className="about-label-dot" />
                                BACKEND ENGINEER
                            </div>

                            <motion.blockquote
                                className="about-quote-premium"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <span className="quote-mark">"</span>
                                I don't write code to solve problems.
                                <br />
                                I design systems that embrace growth.
                                <span className="quote-mark">"</span>
                            </motion.blockquote>

                            <motion.p
                                className="about-bio-premium"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                {profile.bio}
                            </motion.p>

                            <motion.div
                                className="about-tech-stack"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="tech-label">STACK</span>
                                <div className="tech-tags">
                                    {['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS', 'Docker'].map((tech, i) => (
                                        <motion.span
                                            key={tech}
                                            className="tech-tag"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + i * 0.05 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="about-stats-grid"
                            ref={statsRef}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="stat-card-premium"
                                    custom={i}
                                    variants={statVariants}
                                    whileHover={{
                                        y: -4,
                                        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                                    }}
                                >
                                    <div className="stat-glow" />
                                    <div className="stat-value-premium">
                                        <AnimatedCounter
                                            value={stat.value}
                                            suffix={stat.suffix}
                                        />
                                    </div>
                                    <div className="stat-label-premium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                ) : null}

                <motion.div
                    className="principles-section"
                    ref={principlesRef}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.06 },
                        },
                    }}
                >
                    <motion.div
                        className="principles-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="principles-icon">◆</span>
                        <span>ENGINEERING PRINCIPLES</span>
                    </motion.div>

                    <div className="principles-grid">
                        {PRINCIPLES.map((principle, i) => (
                            <motion.div
                                key={principle.title}
                                className="principle-card"
                                custom={i}
                                variants={principleVariants}
                                whileHover={{
                                    x: 8,
                                    transition: { type: 'spring', stiffness: 300 },
                                }}
                            >
                                <div className="principle-glow" />
                                <div className="principle-number">{String(i + 1).padStart(2, '0')}</div>
                                <div className="principle-content">
                                    <h4>{principle.title}</h4>
                                    <p>{principle.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="about-background-effects">
                    <div className="about-orb about-orb-1" />
                    <div className="about-orb about-orb-2" />
                    <div className="about-orb about-orb-3" />
                    <div className="about-grid-lines" />
                </div>
            </div>
        </SectionWrapper>
    );
}