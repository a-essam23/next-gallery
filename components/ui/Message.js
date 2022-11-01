import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export default function Message({
    options = {
        content: null,
        status: null,
    },
    icon = true,
    className,
    timeout = 0,
}) {
    const [visible, setVisible] = useState(true);
    const icons = { fail: faTimes, success: faCheck };

    useEffect(() => {
        if (timeout > 0) {
            setTimeout(() => {
                setVisible(false);
            }, timeout * 1000);
        }
    }, []);
    return (
        <>
            {visible && options && (
                <div
                    className={`flex w-max justify-center p-4 text-2xl gap-4 ${
                        options.status === "success"
                            ? "text-green-600"
                            : "text-red-600"
                    } ${className}`}
                >
                    {icon && (
                        <FontAwesomeIcon
                            icon={icons[options.status]}
                            size="xl"
                        />
                    )}
                    {options?.content && options.content}
                </div>
            )}
        </>
    );
}
