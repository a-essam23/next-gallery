export default function Grid({ children, className = "" }) {
    return (
        <div
            className={`grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 ${className}`}
        >
            {children}
        </div>
    );
}
