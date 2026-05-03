import { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'about', 'techstack', 'projects', 'architecture', 'experience', 'education', 'contact'];

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            { rootMargin: '-80px 0px -40% 0px', threshold: [0.1, 0.3, 0.5] }
        );

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return activeSection;
}
