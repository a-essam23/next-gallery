import { useRef, useState, useEffect } from "react";

export interface BackgroundLayersProps {
    minOpacity?: number;
    maxOpacity?: number;
    count?: number;
    reversed?: boolean;
    className?: string;
}

export const BackgroundLayers: React.FC<BackgroundLayersProps> = ({
    minOpacity = 0.2,
    maxOpacity = 0.6,
    count = 3,
    reversed = false,
    className = "",
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const updateSize = () => {
            const { width, height } = svgRef.current!.getBoundingClientRect();
            setWidth(width);
            setHeight(height);
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const layerHeight = height / count;
    const opacityStep = (maxOpacity - minOpacity) / (count - 1);

    const layers = Array.from({ length: count }, (_, i) => {
        const opacity = minOpacity + i * opacityStep;
        const y = reversed ? i * layerHeight : (count - i - 1) * layerHeight;
        return (
            <rect
                key={i}
                x={0}
                y={y}
                width={width}
                height={layerHeight}
                fill="#000000"
                opacity={opacity}
                // className="-z-10"
            />
        );
    });

    return (
        <svg
            ref={svgRef}
            className={`absolute left-0 w-full h-full top-0 -z-10 ${className}`}
            viewBox={`0 0 ${width} ${height}`}
        >
            {layers}
        </svg>
    );
};
