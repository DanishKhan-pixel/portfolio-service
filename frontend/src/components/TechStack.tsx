import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    SiPython, SiDjango, SiPostgresql, SiRedis,
    SiReact, SiJavascript, SiDocker, SiNginx,
    SiGithub, SiAmazonwebservices,
} from 'react-icons/si';
import { Database, Server, Wrench, Code, Globe } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import type { Skill } from '../types';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

const ICON_MAP: Record<string, React.ReactNode> = {
    python: <SiPython />,
    django: <SiDjango />,
    postgresql: <SiPostgresql />,
    redis: <SiRedis />,
    react: <SiReact />,
    javascript: <SiJavascript />,
    docker: <SiDocker />,
    nginx: <SiNginx />,
    github: <SiGithub />,
    aws: <SiAmazonwebservices />,
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    Backend: <Server size={16} />,
    Frontend: <Globe size={16} />,
    DevOps: <Wrench size={16} />,
    Database: <Database size={16} />,
    Tools: <Code size={16} />,
    Other: <Code size={16} />,
};

const ALL = 'All';

function getSkillIcon(icon: string) {
    const key = icon.toLowerCase().replace(/\s+/g, '');
    return ICON_MAP[key] || <Code size={18} />;
}

function groupByCategory(skills: Skill[]) {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach((s) => {
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push(s);
    });
    return grouped;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.4 },
    }),
};

export default function TechStack() {
    const fetcher = useCallback(() => api.getSkills(), []);
    const { data: skills, loading, error, refetch } = useApi(fetcher);
    const [activeCategory, setActiveCategory] = useState(ALL);

    const categories = useMemo(() => {
        if (!skills) return [ALL];
        const cats = [...new Set(skills.map((s) => s.category))];
        return [ALL, ...cats];
    }, [skills]);

    const filtered = useMemo(() => {
        if (!skills) return [];
        if (activeCategory === ALL) return skills;
        return skills.filter((s) => s.category === activeCategory);
    }, [skills, activeCategory]);

    const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

    return (
        <SectionWrapper
            id="techstack"
            label="TECH_STACK"
            title="Technical Stack"
            subtitle="My go-to technologies, frameworks & tooling."
        >
            {loading ? (
                <div className="loading-wrapper">
                    <Skeleton variant="text-sm" width="200px" />
                    <div className="stack-grid">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} variant="card" height="80px" />
                        ))}
                    </div>
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : skills && skills.length > 0 ? (
                <>
                    <div className="stack-categories">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`stack-category-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat !== ALL && CATEGORY_ICONS[cat]}
                                {cat !== ALL ? ` ${cat}` : cat}
                            </button>
                        ))}
                    </div>

                    {Object.entries(grouped).map(([category, catSkills]) => (
                        <div key={category} style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: 'var(--color-text-tertiary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: 'var(--space-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-sm)',
                                }}
                            >
                                {CATEGORY_ICONS[category]} {category}
                            </h3>
                            <div className="stack-grid">
                                {catSkills.map((skill, i) => (
                                    <motion.div
                                        key={skill.id}
                                        className="skill-card"
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        custom={i}
                                    >
                                        <div className="skill-icon">
                                            {getSkillIcon(skill.icon || skill.name)}
                                        </div>
                                        <div className="skill-info">
                                            <div className="skill-name">{skill.name}</div>
                                            <div className="skill-level-text">
                                                {skill.proficiency_level}%
                                            </div>
                                            <div className="progress-bar">
                                                <motion.div
                                                    className="progress-bar-fill"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.proficiency_level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: i * 0.05 }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            ) : null}
        </SectionWrapper>
    );
}
