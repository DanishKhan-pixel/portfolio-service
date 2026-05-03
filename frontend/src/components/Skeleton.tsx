interface SkeletonProps {
    variant?: 'text' | 'text-sm' | 'heading' | 'card' | 'avatar';
    width?: string;
    height?: string;
    count?: number;
}

export default function Skeleton({ variant = 'text', width, height, count = 1 }: SkeletonProps) {
    const baseClass = variant === 'text'
        ? 'skeleton skeleton-text'
        : variant === 'text-sm'
            ? 'skeleton skeleton-text-sm'
            : variant === 'heading'
                ? 'skeleton skeleton-heading'
                : variant === 'card'
                    ? 'skeleton skeleton-card'
                    : 'skeleton skeleton-avatar';

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={baseClass}
                    style={{ width: width, height: height }}
                />
            ))}
        </>
    );
}
