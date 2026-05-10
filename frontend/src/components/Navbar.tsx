import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/helpers';

const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'techstack', label: 'Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const activeSection = useActiveSection();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavClick = (id: string) => {
        scrollToSection(id);
        setMobileOpen(false);
    };

    return (
        <nav className={`navbar ${mobileOpen ? 'open' : ''}`} id="navbar">
            <div className="container navbar-inner">
                <a
                    href="#hero"
                    className="navbar-logo"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('hero');
                    }}
                >
                    <span className="navbar-logo-icon">D</span>
                    <span>Danish</span>
                </a>

                <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.id);
                                }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        id="theme-toggle"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        id="mobile-menu-toggle"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
