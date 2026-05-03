import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, FolderOpen } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import type { ProjectSummary, ProjectDetail } from '../types';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

function ProjectModal({
    project,
    onClose,
}: {
    project: ProjectDetail;
    onClose: () => void;
}) {
    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3 className="modal-title">{project.name}</h3>
                    <button className="modal-close" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-section">
                        <div className="modal-section-title">Description</div>
                        <p className="modal-desc">{project.description}</p>
                    </div>

                    {project.architecture_summary && (
                        <div className="modal-section">
                            <div className="modal-section-title">Architecture</div>
                            <p className="modal-desc">{project.architecture_summary}</p>
                        </div>
                    )}

                    {project.key_features && project.key_features.length > 0 && (
                        <div className="modal-section">
                            <div className="modal-section-title">Key Features</div>
                            <ul className="modal-features">
                                {project.key_features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="modal-section">
                        <div className="modal-section-title">Tech Stack</div>
                        <div className="project-tags">
                            {project.tech_stack.map((t) => (
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <Github size={16} /> GitHub
                        </a>
                    )}
                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const fetcher = useCallback(() => api.getProjects(), []);
    const { data: projects, loading, error, refetch } = useApi(fetcher);
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const handleViewDetails = async (p: ProjectSummary) => {
        setLoadingDetail(true);
        try {
            const detail = await api.getProjectDetail(p.slug);
            setSelectedProject(detail);
        } catch {
            console.error('Failed to load project detail');
        } finally {
            setLoadingDetail(false);
        }
    };

    return (
        <SectionWrapper
            id="projects"
            label="FEATURED_PROJECTS"
            title="Featured Projects"
            subtitle="A selection of architectural challenges solved. Focused on scalability, clean architecture, and real-world problem-solving."
        >
            {loading ? (
                <div className="projects-grid">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} variant="card" height="380px" />
                    ))}
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : projects && projects.length > 0 ? (
                <>
                    <div className="projects-grid">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="project-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                onClick={() => handleViewDetails(project)}
                            >
                                <div className="project-image">
                                    {project.thumbnail_url ? (
                                        <img
                                            src={project.thumbnail_url}
                                            alt={project.name}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="project-image-placeholder">
                                            <FolderOpen size={36} />
                                            <span style={{ fontSize: '0.75rem' }}>
                                                {project.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="project-body">
                                    <h3 className="project-name">{project.name}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <div className="project-tags">
                                        {project.tech_stack.slice(0, 4).map((t) => (
                                            <span key={t} className="tag">{t}</span>
                                        ))}
                                        {project.tech_stack.length > 4 && (
                                            <span className="tag">+{project.tech_stack.length - 4}</span>
                                        )}
                                    </div>
                                    <div className="project-links">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={14} /> Code
                                            </a>
                                        )}
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={14} /> Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {loadingDetail && (
                        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
                            <span className="tag">Loading project details...</span>
                        </div>
                    )}
                </>
            ) : null}

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
