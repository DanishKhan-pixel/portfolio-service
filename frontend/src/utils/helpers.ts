/**
 * Smooth scroll to a section by ID.
 */
export function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Format a date string to "Mon YYYY" format.
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Get skill icon class/key mapping.
 */
export function getSkillIconKey(icon: string): string {
    return icon.toLowerCase().replace(/\s+/g, '-');
}
