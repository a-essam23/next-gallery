import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export default function Message({
    options = {
        content: null,
        status: null,
    },
    delay = 3,
    icon = false,
    className,
}) {
    //// TODO : ADD TIMEOUT PROPERTY!
    const icons = { fail: faTimes, success: faCheck };
    return (
        <>
            {options && (
                <div
                    className={`flex w-full h-full justify-center p-4 text-2xl gap-4 ${
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
