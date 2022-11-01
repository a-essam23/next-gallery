import { useEffect, useState } from "react";

const Expire = ({ children, delay = 0 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!(delay > 0)) return;
        const timer = setTimeout(() => {
            setVisible(false);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, []);

    return visible ? <>{children}</> : <></>;
};

export default Expire;
