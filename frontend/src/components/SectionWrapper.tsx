import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
    id: string;
    label: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

export default function SectionWrapper({
    id,
    label,
    title,
    subtitle,
    children,
    className = '',
}: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            className={`section ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionVariants}
        >
            <div className="container">
                <div className="section-label">{label}</div>
                <h2 className="section-title">{title}</h2>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
                <div className="section-divider" />
                {children}
            </div>
        </motion.section>
    );
}
