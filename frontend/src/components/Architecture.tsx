import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2, Layers } from 'lucide-react';
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

export default function Architecture() {
    return (
        <SectionWrapper
            id="architecture"
            label="SYSTEM_DESIGN"
            title="Architecture & Design"
            subtitle='"The Blueprint of Scalability"'
        >
            <div className="arch-content">
                <div className="arch-info">
                    <h3>
                        <Layers
                            size={18}
                            style={{ marginRight: 8, verticalAlign: 'middle' }}
                        />
                        Design Philosophy
                    </h3>
                    <p>
                        I specialize in the full lifecycle of software architecture. From
                        API gateway design to database optimization and horizontal scaling,
                        every layer is intentional. I create systems that handle production
                        traffic with grace.
                    </p>

                    <ul className="arch-features">
                        {FEATURES.map((f, i) => (
                            <li className="arch-feature" key={i}>
                                <CheckCircle2
                                    size={16}
                                    className="arch-feature-icon"
                                />
                                {f}
                            </li>
                        ))}
                    </ul>

                    <div className="terminal" style={{ marginTop: 'var(--space-lg)' }}>
                        <div className="terminal-header">
                            <span className="terminal-dot" />
                            <span className="terminal-dot" />
                            <span className="terminal-dot" />
                            <span className="terminal-title">api_endpoints.py</span>
                        </div>
                        <div className="terminal-body">
                            {ENDPOINTS.map((ep, i) => (
                                <div className="terminal-line" key={i}>
                                    <span className="terminal-success">{ep.method}</span>
                                    <span>{ep.path}</span>
                                    <span className="terminal-dim"> # {ep.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    className="arch-diagram"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="arch-diagram-title">
                        <Layers size={14} />
                        api_gateway_flow_preview
                    </div>

                    <div className="arch-flow">
                        <div className="arch-flow-box">CLIENT (MOBILE/WEB)</div>
                        <ChevronDown size={20} className="arch-flow-arrow" />
                        <div className="arch-flow-box highlighted">
                            API GATEWAY / REVERSE PROXY
                        </div>
                        <ChevronDown size={20} className="arch-flow-arrow" />
                        <div className="arch-flow-row">
                            <div className="arch-flow-box">
                                SERVICE A<br />
                                <small style={{ opacity: 0.7 }}>AUTH_SVC</small>
                            </div>
                            <div className="arch-flow-box">
                                SERVICE B<br />
                                <small style={{ opacity: 0.7 }}>CORE_API</small>
                            </div>
                        </div>
                        <ChevronDown size={20} className="arch-flow-arrow" />
                        <div className="arch-flow-row">
                            <div className="arch-flow-box">PostgreSQL</div>
                            <div className="arch-flow-box">Redis Cache</div>
                        </div>
                    </div>

                    <p
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-tertiary)',
                            marginTop: 'var(--space-lg)',
                            lineHeight: 1.6,
                        }}
                    >
                        High-availability pattern with horizontal scaling
                        and automated caching layers.
                    </p>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
