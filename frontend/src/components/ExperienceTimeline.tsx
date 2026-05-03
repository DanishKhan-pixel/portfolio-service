import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import { formatDate } from '../utils/helpers';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

export default function ExperienceTimeline() {
    const fetcher = useCallback(() => api.getExperience(), []);
    const { data: experiences, loading, error, refetch } = useApi(fetcher);

    return (
        <SectionWrapper
            id="experience"
            label="EXPERIENCE"
            title="Work Experience"
            subtitle="career_log_history.log"
        >
            {loading ? (
                <div className="loading-wrapper">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} variant="card" height="180px" />
                    ))}
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : experiences && experiences.length > 0 ? (
                <div className="timeline">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            className="timeline-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div
                                className={`timeline-dot ${exp.is_current ? 'current' : ''}`}
                            />
                            <div className="timeline-card">
                                <div className="timeline-header">
                                    <div>
                                        <div className="timeline-role">{exp.role}</div>
                                        <div className="timeline-company">
                                            {exp.company_url ? (
                                                <a
                                                    href={exp.company_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {exp.company_name}
                                                </a>
                                            ) : (
                                                exp.company_name
                                            )}
                                        </div>
                                    </div>
                                    <div className="timeline-date">
                                        {formatDate(exp.start_date)} —{' '}
                                        {exp.end_date
                                            ? formatDate(exp.end_date)
                                            : 'Present'}
                                        {exp.duration && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                    color: 'var(--color-accent)',
                                                    fontSize: '0.7rem',
                                                }}
                                            >
                                                {exp.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {exp.description && (
                                    <p className="timeline-desc">{exp.description}</p>
                                )}
                                {exp.description_bullets && exp.description_bullets.length > 0 && (
                                    <ul className="timeline-bullets" style={{ margin: '10px 0', paddingLeft: '20px', color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
                                        {exp.description_bullets.map((bullet, idx) => (
                                            <li key={idx} style={{ marginBottom: '6px' }}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="timeline-tech">
                                    {exp.technologies_used.map((t) => (
                                        <span key={t} className="tag">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : null}
        </SectionWrapper>
    );
}
