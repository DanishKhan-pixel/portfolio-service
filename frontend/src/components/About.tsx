import { useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

const PHILOSOPHY = [
    'Clean Code as a discipline — I write code meant to be read',
    'Architecture > implementation — scalability is designed, not patched',
    'Testing is the backbone of reliable production services',
    'Deploy early, deploy often — CI/CD as a mindset',
    'Security by design, not as an afterthought',
];


export default function About() {
    const fetcher = useCallback(() => api.getProfile(), []);
    const { data: profile, loading, error, refetch } = useApi(fetcher);

    const projectsFetcher = useCallback(() => api.getProjects(), []);
    const { data: projects, loading: pLoading } = useApi(projectsFetcher);

    return (
        <SectionWrapper
            id="about"
            label="ABOUT_ME"
            title="About Me"
            subtitle=""
        >
            {loading ? (
                <div className="about-grid">
                    <div>
                        <Skeleton variant="text" count={4} />
                        <Skeleton variant="text-sm" width="80%" />
                    </div>
                    <div>
                        <Skeleton variant="card" height="200px" />
                    </div>
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : profile ? (
                <div className="about-grid">
                    <div>
                        <blockquote className="about-quote">
                            &quot;I don&apos;t just write code. I design systems that
                            embrace growth, not fight it.&quot;
                        </blockquote>
                        <p className="about-text">{profile.bio}</p>
                        <div className="about-stats">
                            <div className="about-stat-card">
                                <div className="about-stat-value">
                                    {profile.years_of_experience}+
                                </div>
                                <div className="about-stat-label">Years Experience</div>
                            </div>
                            <div className="about-stat-card">
                                <div className="about-stat-value">
                                    {pLoading ? <Skeleton variant="text-sm" width="30px" /> : projects?.length || 0}
                                </div>
                                <div className="about-stat-label">Projects Completed</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="about-philosophy-title">
                            <span style={{ color: 'var(--color-accent)' }}>◆</span>
                            CORE PHILOSOPHY
                        </div>
                        <ul className="about-philosophy">
                            {PHILOSOPHY.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null}
        </SectionWrapper>
    );
}
