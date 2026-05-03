import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

export default function Education() {
    const fetcher = useCallback(() => api.getEducation(), []);
    const { data: education, loading, error, refetch } = useApi(fetcher);

    return (
        <SectionWrapper
            id="education"
            label="EDUCATION_HISTORY"
            title="Education"
            subtitle="academic_certification.key"
        >
            {loading ? (
                <div className="education-grid">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} variant="card" height="120px" />
                    ))}
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : education && education.length > 0 ? (
                <div className="education-grid">
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.id}
                            className="education-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="education-icon">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <div className="education-degree">{edu.degree}</div>
                                <div className="education-institute">
                                    {edu.institute_name}
                                </div>
                                <div className="education-year">
                                    {edu.start_year} — {edu.end_year || 'Present'}
                                </div>
                                {edu.field_of_study && (
                                    <div className="education-field">
                                        {edu.field_of_study}
                                    </div>
                                )}
                                {edu.grade && (
                                    <div className="education-field">
                                        Grade: {edu.grade}
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
