import { useEffect, useState } from "react";

const useDimensions = () => {
    const [windowSize, setWindowSize] = useState({});
    useEffect(() => {
        setWindowSize({ width: innerWidth, height: innerHeight });
        const resize = () => {
            setWindowSize({
                width: innerWidth,
                height: innerHeight,
            });
        };

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);
    return {
        width: windowSize?.width,
        height: windowSize?.height,
    };
};

export default useDimensions;
