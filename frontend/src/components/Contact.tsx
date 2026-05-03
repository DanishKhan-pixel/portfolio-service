import { useCallback, useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import SectionWrapper from './SectionWrapper';
import Skeleton from './Skeleton';
import ErrorState from './ErrorState';

export default function Contact() {
    const fetcher = useCallback(() => api.getProfile(), []);
    const { data: profile, loading, error, refetch } = useApi(fetcher);
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (profile) {
            const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
            window.open(mailto, '_blank');
        }
    };

    return (
        <SectionWrapper
            id="contact"
            label="CONTACT"
            title="Get In Touch"
            subtitle="Have a complex backend challenge or need a consultant for system architecture? Let's connect and build something solid."
        >
            {loading ? (
                <div className="contact-grid">
                    <Skeleton variant="card" height="200px" />
                    <Skeleton variant="card" height="300px" />
                </div>
            ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
            ) : profile ? (
                <div className="contact-grid">
                    <ul className="contact-info-list">
                        <li className="contact-info-item">
                            <div className="contact-info-icon">
                                <Mail size={20} />
                            </div>
                            <div>
                                <div className="contact-info-label">Email</div>
                                <div className="contact-info-value">
                                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                </div>
                            </div>
                        </li>
                        {profile.linkedin_url && (
                            <li className="contact-info-item">
                                <div className="contact-info-icon">
                                    <Linkedin size={20} />
                                </div>
                                <div>
                                    <div className="contact-info-label">LinkedIn</div>
                                    <div className="contact-info-value">
                                        <a
                                            href={profile.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {profile.linkedin_url.replace(/https?:\/\/(www\.)?/, '')}
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )}
                        {profile.github_url && (
                            <li className="contact-info-item">
                                <div className="contact-info-icon">
                                    <Github size={20} />
                                </div>
                                <div>
                                    <div className="contact-info-label">GitHub</div>
                                    <div className="contact-info-value">
                                        <a
                                            href={profile.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {profile.github_url.replace(/https?:\/\/(www\.)?/, '')}
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-form-group">
                            <label className="contact-form-label" htmlFor="contact-subject">
                                Subject
                            </label>
                            <input
                                id="contact-subject"
                                type="text"
                                className="contact-form-input"
                                placeholder="Project Inquiry / Collaboration"
                                value={formData.subject}
                                onChange={(e) =>
                                    setFormData({ ...formData, subject: e.target.value })
                                }
                            />
                        </div>
                        <div className="contact-form-group">
                            <label className="contact-form-label" htmlFor="contact-message">
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                className="contact-form-textarea"
                                placeholder="Tell me about your architectural needs..."
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary contact-form-submit"
                            id="contact-submit"
                        >
                            <Send size={16} />
                            Initiate Connection
                        </button>
                    </form>
                </div>
            ) : null}
        </SectionWrapper>
    );
}
