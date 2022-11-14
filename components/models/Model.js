import { useState } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import { useLang } from "../../context";
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
    const router = useRouter();
    const { isAr } = useLang();
    return (
        <div
            className={`flex w-full h-full relative  cursor-pointer shadow-xl hover:scale-105 group ${className}`}
            onClick={
                onClick ||
                (() => {
                    activeLink &&
                        router.push(`/collections/${folder}?swipeRef=${_id}`);
                })
            }
        >
            <div className="">
                <img
                    src={sizes.original}
                    alt={name}
                    className={"object-cover w-full h-full"}
                />
            </div>
            {showCode && (
                <div
                    className={`w-max max-w-full absolute top-0 group-hover:opacity-0
                    ${isAr ? "right-0" : "left-0"} 
                    bg-black opacity-75 p-1 lg:p-3 xl:p-4 pointer-events-none overflow-auto`}
                >
                    <h3
                        dir="ltr"
                        className="text-white font-bold lg:text-2xl max-w-full text-clip"
                    >
                        {name}
                    </h3>
                </div>
            )}
        </div>
    );
}
