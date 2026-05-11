import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Layers, Zap, Code2, Database, Shield } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const FEATURES = [
    'RESTful API design with versioned endpoints',
    'JWT / Token-based authentication & RBAC',
    'Database query optimization & indexing',
    'Horizontal scaling with load balancing',
    'Containerized deployments with Docker',
    'CI/CD pipelines for automated delivery',
];

const ENDPOINTS = [
    { method: 'GET', path: '/api/profile/', desc: 'Developer profile' },
    { method: 'GET', path: '/api/skills/', desc: 'Technical skill set' },
    { method: 'GET', path: '/api/projects/', desc: 'Project portfolio' },
    { method: 'GET', path: '/api/projects/:slug/', desc: 'Project detail' },
    { method: 'GET', path: '/api/experience/', desc: 'Work experience' },
    { method: 'GET', path: '/api/education/', desc: 'Education history' },
];

const ARCH_NODES = [
    { id: 'client', label: 'CLIENT', sub: '(Mobile/Web)', icon: Code2 },
    { id: 'gateway', label: 'API GATEWAY', sub: 'Reverse Proxy', icon: Zap, highlighted: true },
    { id: 'services', label: 'SERVICES', sub: 'Auth + Core API', icon: Shield },
    { id: 'data', label: 'DATA LAYER', sub: 'PostgreSQL + Redis', icon: Database },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

const floatVariants = {
    initial: { y: 0 },
    animate: {
        y: [-8, 8, -8],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

const glowPulse = {
    initial: { opacity: 0.5 },
    animate: {
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

const cursorBlink = {
    animate: {
        opacity: [1, 0],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

const rowSlide = {
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

const archNodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.15,
            type: 'spring' as const,
            stiffness: 100,
            damping: 12,
        },
    }),
};

export default function Architecture() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <SectionWrapper
            id="architecture"
            label="SYSTEM_DESIGN"
            title="Architecture & Design"
            subtitle='"The Blueprint of Scalability"'
        >
            <div className="arch-content">
                <motion.div
                    className="arch-info"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <motion.h3 variants={itemVariants}>
                        <Layers
                            size={18}
                            style={{ marginRight: 8, verticalAlign: 'middle' }}
                        />
                        Design Philosophy
                    </motion.h3>
                    <motion.p variants={itemVariants}>
                        I specialize in the full lifecycle of software architecture. From
                        API gateway design to database optimization and horizontal scaling,
                        every layer is intentional. I create systems that handle production
                        traffic with grace.
                    </motion.p>

                    <ul className="arch-features">
                        {FEATURES.map((f, i) => (
                            <motion.li
                                className="arch-feature"
                                key={i}
                                variants={itemVariants}
                                whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300 } }}
                            >
                                <CheckCircle2
                                    size={16}
                                    className="arch-feature-icon"
                                />
                                {f}
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div
                        className="terminal"
                        style={{ marginTop: 'var(--space-lg)' }}
                        variants={itemVariants}
                    >
                        <div className="terminal-header">
                            <span className="terminal-dot" />
                            <span className="terminal-dot" />
                            <span className="terminal-dot" />
                            <span className="terminal-title">api_endpoints.py</span>
                            <motion.span
                                className="terminal-cursor"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        </div>
                        <div className="terminal-body">
                            <AnimatePresence>
                                {ENDPOINTS.map((ep, i) => (
                                    <motion.div
                                        className="terminal-line"
                                        key={i}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={rowSlide}
                                        whileHover={{
                                            x: 6,
                                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <span className={`method-badge method-${ep.method.toLowerCase()}`}>
                                            {ep.method}
                                        </span>
                                        <span className="endpoint-path">{ep.path}</span>
                                        <span className="terminal-dim"># {ep.desc}</span>
                                        <motion.span
                                            className="data-flow-indicator"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 + 0.5 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="arch-diagram"
                    ref={containerRef}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    onMouseMove={handleMouseMove}
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), var(--color-bg-card)`,
                    }}
                >
                    <motion.div
                        className="arch-diagram-title"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Layers size={14} />
                        api_gateway_flow_preview
                    </motion.div>

                    <div className="arch-flow">
                        {ARCH_NODES.map((node, index) => (
                            <motion.div
                                key={node.id}
                                custom={index}
                                variants={archNodeVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className={`arch-flow-box ${node.highlighted ? 'highlighted' : ''} ${hoveredNode === node.id ? 'hovered' : ''}`}
                                    onHoverStart={() => setHoveredNode(node.id)}
                                    onHoverEnd={() => setHoveredNode(null)}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)',
                                    }}
                                    animate={
                                        node.highlighted
                                            ? {
                                                  boxShadow: ['0 0 10px rgba(59, 130, 246, 0.3)', '0 0 30px rgba(59, 130, 246, 0.6)', '0 0 10px rgba(59, 130, 246, 0.3)'],
                                              }
                                            : {}
                                    }
                                    transition={
                                        node.highlighted
                                            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                                            : { type: 'spring', stiffness: 300, damping: 20 }
                                    }
                                >
                                    <div className="arch-node-icon">
                                        <node.icon size={14} />
                                    </div>
                                    <span className="arch-node-label">{node.label}</span>
                                    <span className="arch-node-sub">{node.sub}</span>
                                    {node.highlighted && (
                                        <motion.div
                                            className="node-pulse"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </motion.div>

                                {index < ARCH_NODES.length - 1 && (
                                    <motion.div
                                        className="connection-line"
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
                                    >
                                        <motion.div
                                            className="connection-glow"
                                            animate={{
                                                opacity: [0.3, 0.8, 0.3],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: index * 0.2,
                                            }}
                                        />
                                        <ChevronDown size={16} className="connection-arrow" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        className="arch-diagram-footer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <span className="pattern-dots">⬡</span>
                        High-availability pattern with horizontal scaling
                        and automated caching layers.
                    </motion.p>
                </motion.div>
            </div>

            <motion.div
                className="feature-cards-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.12,
                        },
                    },
                }}
            >
                <motion.div className="feature-card" variants={itemVariants}>
                    <motion.div
                        className="feature-card-icon"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Zap size={20} />
                    </motion.div>
                    <h4>High Performance</h4>
                    <p>Optimized request handling with sub-50ms response times</p>
                    <motion.div className="feature-card-glow" />
                </motion.div>

                <motion.div className="feature-card" variants={itemVariants}>
                    <motion.div
                        className="feature-card-icon"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Shield size={20} />
                    </motion.div>
                    <h4>Secure by Design</h4>
                    <p>Enterprise-grade security with OAuth2 & JWT</p>
                    <motion.div className="feature-card-glow" />
                </motion.div>

                <motion.div className="feature-card" variants={itemVariants}>
                    <motion.div
                        className="feature-card-icon"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Database size={20} />
                    </motion.div>
                    <h4>Scalable Data</h4>
                    <p>Horizontal scaling with Redis caching layer</p>
                    <motion.div className="feature-card-glow" />
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
}