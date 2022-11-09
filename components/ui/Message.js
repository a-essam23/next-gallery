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
    text = true,
    size = "md",
    className,
}) {
    //// TODO : ADD TIMEOUT PROPERTY!
    const icons = { fail: faTimes, success: faCheck };
    const sizes = {
        sm: { text: "p-1 text-sm gap-1", icon: "sm" },
        md: { text: "p-2 text-lg gap-2", icon: "lg" },
        lg: { text: "p-4 text-2xl gap-4", icon: "xl" },
    };
    return (
        <>
            {options && (
                <div
                    className={`flex w-full h-max justify-center items-center ${
                        sizes[size]?.text || sizes["md"].text
                    } ${
                        options.status === "success"
                            ? "text-green-600"
                            : "text-red-600"
                    } ${className}`}
                >
                    {icon && (
                        <FontAwesomeIcon
                            icon={icons[options.status]}
                            size={sizes[size]?.icon || "lg"}
                        />
                    )}
                    {text && options?.content && <span>{options.content}</span>}
                </div>
            )}
        </>
    );
}
