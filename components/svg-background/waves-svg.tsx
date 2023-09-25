import { useRef, useLayoutEffect, useState } from "react";

export interface BackgroundWaveProps {
    amplitude?: number;
    waveLength?: number;
    frequency?: number;
    phase?: number;
    opacity?: number;
    random?: boolean;
    reversed?: boolean;
}

export const BackgroundWave: React.FC<BackgroundWaveProps> = ({
    amplitude = 0.1,
    waveLength = 0.15,
    frequency = -0.15,
    phase = 0,
    opacity = 0.05,
    random = false,
    reversed = false,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
        const updateSize = () => {
            const { width, height } = svgRef.current!.getBoundingClientRect();
            setWidth(width);
            setHeight(height);
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const effectiveAmplitude = (amplitude / 2) * height;
    const effectiveWaveLength = waveLength * width;
    const points = [];
    const step = 1;
    const randomOffset = random ? Math.random() * 2 * Math.PI : 0;
    for (let x = 0; x <= width; x += step) {
        const y =
            effectiveAmplitude *
            Math.sin(
                (2 * Math.PI * frequency * (reversed ? -x : x) + phase) /
                    effectiveWaveLength +
                    randomOffset * (x / width)
            );
        points.push(`${x},${height / 2 - y || 0}`);
    }
    const path = `M ${points.join(" L ")} L ${width},${height} L 0,${height} Z`;

    return (
        <svg
            ref={svgRef}
            className={`absolute z-0 top-0 left-0 w-full h-full ${
                reversed ? "rotate-180" : ""
            } z-0 `}
            viewBox={`0 0 ${width} ${height}`}
        >
            <path d={path} fill="#000000" fillOpacity={opacity} stroke="none" />
        </svg>
    );
};
