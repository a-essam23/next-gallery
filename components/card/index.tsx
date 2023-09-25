import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { v4 } from "uuid";

interface CardProps {
    name: string;
    parent: string;
    href?: string;
    src: string;
    childCount?: number;
    onClick?: () => any;
}

const Card: FC<CardProps> = ({
    name,
    href,
    parent,
    childCount,
    src,
    onClick,
}) => {
    const CardImage = (
        <>
            <Image
                src={src}
                alt={`${name}`}
                fill
                className="border-2 object-contain border-primary-active rounded-primary object-center"
            />
            <div className="flex transition-all duration-500 ease-linear absolute bottom-0 left-0 w-full overflow-hidden">
                <div className="transition-all ease-in-out duration-500 opacity-75 group-hover:translate-y-full flex px-1.5 py-0.5 flex-col gap-2 bg-black/80 text-white text-contrast w-full">
                    <span className="text-center text-h3 capitalize">
                        {name}
                    </span>
                    <div className="flex flex-col items-center ml-auto">
                        <span className="text-sm text-right">{parent}</span>
                        {childCount && (
                            <span className="text-sm text-right">
                                {childCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    if (onClick)
        return (
            <button
                className={`group relative rounded-primary text-neutral bg-black/60 overflow-hidden aspect-[1/1]`}
                onClick={onClick}
            >
                {CardImage}
            </button>
        );
    if (href)
        return (
            <Link
                href={href}
                className={`group relative rounded-primary text-neutral bg-black/60 overflow-hidden aspect-[1/1]`}
            >
                {CardImage}
            </Link>
        );
    return <></>;
};

export default Card;
