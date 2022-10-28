import { useRef } from "react";

export default function Counter({}) {
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    return (
        <div className="fixed text-lg text-white bg-blue-400 p-4 bottom-0 left-0 z-50">
            Renders: {renderCounter.current}
        </div>
    );
}
