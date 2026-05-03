import { useCallback } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';
import { scrollToSection } from '../utils/helpers';

const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];

export default function Footer() {
    const fetcher = useCallback(() => api.getProfile(), []);
    const { data: profile } = useApi(fetcher);

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-logo">
                    <span
                        className="navbar-logo-icon"
                        style={{ width: 28, height: 28, fontSize: '0.75rem' }}
                    >
                        Y
                    </span>
                    Yahya
                </div>

                <p className="footer-tagline">
                    Building scalable backend architectures and
                    robust API ecosystems with Python &amp; Django.
                </p>

                <div className="footer-links">
                    <div className="footer-link-group">
                        <h4>Navigation</h4>
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.id);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="footer-link-group">
                        <h4>Connect</h4>
                        {profile?.github_url && (
                            <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        )}
                        {profile?.linkedin_url && (
                            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        )}
                        {profile?.email && <a href={`mailto:${profile.email}`}>Email</a>}
                    </div>
                </div>

                <div className="footer-social">
                    {profile?.github_url && (
                        <a
                            href={profile.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-icon"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                    )}
                    {profile?.linkedin_url && (
                        <a
                            href={profile.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-icon"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                    )}
                    {profile?.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            className="btn-icon"
                            aria-label="Email"
                        >
                            <Mail size={18} />
                        </a>
                    )}
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Yahya. All rights reserved.</span>
                    <span className="footer-built">
                        Built with React + Django
                    </span>
                </div>
            </div>
        </footer>
    );
}
