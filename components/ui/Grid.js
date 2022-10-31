export default function Grid({ children, className = "" }) {
    return (
        <div
            className={`grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ${className}`}
        >
            {children}
        </div>
    );
}
