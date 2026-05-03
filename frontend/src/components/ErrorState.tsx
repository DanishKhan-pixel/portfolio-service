interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="error-state">
            <div className="error-icon">⚠</div>
            <h3 className="error-title">Something went wrong</h3>
            <p className="error-message">
                {message || 'Unable to load data. Please check your connection and try again.'}
            </p>
            {onRetry && (
                <button className="btn btn-secondary" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
}
