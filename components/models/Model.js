import { useState } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
export default function Model({
    data: {
        _id = v4(),
        sizes = {
            small: "",
            original: "/imgs/blank.jpg",
        },
        name = "",
        folder = "",
    },
    className = "",
    activeLink = false,
    showCode = true,
    onClick,
}) {
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();
    return (
        <div
            className={`flex w-full h-full relative transition-all cursor-pointer shadow-xl hover:scale-105 ${className}`}
            onMouseLeave={() => setIsHovering(false)}
            onMouseOver={() => setIsHovering(true)}
            onClick={
                onClick ||
                (() => {
                    activeLink &&
                        router.push(`/collections/${folder}?ref=${_id}`);
                })
            }
        >
            <div className="w-full h-full">
                <img
                    src={sizes.original}
                    alt={name}
                    className={"object-cover w-full h-full"}
                />
            </div>
            {!isHovering && showCode && (
                <div className="absolute top-0 left-0 bg-black opacity-75 p-4 lg:p-3 xl:p-4 pointer-events-none ">
                    <h3 className="text-white font-bold text-2xl">{name}</h3>
                </div>
            )}
        </div>
    );
}
