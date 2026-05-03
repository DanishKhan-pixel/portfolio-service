import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';
import { formatDate } from '../utils/helpers';

export default function Certifications() {
    const fetcher = useCallback(() => api.getCertifications(), []);
    const { data: certifications, loading, error, refetch } = useApi(fetcher);

    return (
        <SectionWrapper
            id="certifications"
            label="CERTIFICATIONS"
            title="Certifications"
            subtitle="verified_credentials.cert"
        >
            {loading ? (
                <div className="education-grid">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} variant="card" height="120px" />
                    ))}
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : certifications && certifications.length > 0 ? (
                <div className="education-grid">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            className="education-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                        >
                            <div className="education-icon">
                                <Award size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="education-degree" style={{ marginBottom: '0.2rem' }}>{cert.name}</div>
                                <div className="education-institute">
                                    {cert.issuing_organization}
                                </div>
                                <div className="education-year" style={{ marginTop: '0.4rem' }}>
                                    Issued: {formatDate(cert.issue_date)}
                                    {cert.expiration_date && ` — Expires: ${formatDate(cert.expiration_date)}`}
                                </div>
                                {cert.credential_id && (
                                    <div className="education-field" style={{ marginTop: '0.2rem' }}>
                                        Credential ID: <span style={{ fontFamily: 'var(--font-mono)' }}>{cert.credential_id}</span>
                                    </div>
                                )}
                                {cert.credential_url && (
                                    <div style={{ marginTop: '0.8rem' }}>
                                        <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.85rem', borderBottom: '1px solid var(--color-accent)', paddingBottom: '0.1rem' }}>
                                            View Credential ↗
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : null}
        </SectionWrapper>
    );
}
