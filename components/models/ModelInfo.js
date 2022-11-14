import {
    faFacebookMessenger,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useLang } from "../../context";
import { useDimensions } from "../../hooks";
export default function ModelInfo({
    data: {
        sizes = {
            small: "",
            original: "/imgs/blank.jpg",
        },
        name,
        size = null,
    },
    className,
}) {
    ///// TODO MAKE NEW COMPONENT FOR MOB A
    const { width, windowSize } = useDimensions();
    const { langData, dir } = useLang();
    return width > 1024 ? (
        <div
            dir="ltr"
            className={`py-0 sm:py-6 md:py-8 flex lg:py-10 xl:px-8 xl:py-8 2xl:px-8 min-w-full 2xl:w-11/12 h-full overflow-scroll no-scrollbar lg:overflow-hidden lg:h-120 xl:h-144 2xl:h-216 ${+className}`}
        >
            <div className="basis-7/12 h-full flex w-full justify-center items-center lg:shadow-boxLeft rounded-3xl lg:rounded-r-none ">
                <img
                    src={sizes.original}
                    alt={name}
                    className="object:cover w-full h-full max-h-full md:rounded-3xl md:rounded-b-none lg:rounded-tr-none lg:rounded-l-3xl "
                />
            </div>
            <div className="gap-2 md:gap-4 sm:rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl flex flex-col basis-5/12 flex-grow lg:shadow-boxRight ">
                <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-6 2xl:gap-8 rounded-3xl">
                    <div className="flex px-4 gap-5 sm:gap-8 2xl:gap-4 ">
                        <a href="/facebook">
                            <FontAwesomeIcon
                                icon={faFacebookMessenger}
                                color="#006AFF"
                                className="w-6 sm:w-8 lg:w-6 h-auto"
                            />
                        </a>
                        <a href="/whatsapp">
                            <FontAwesomeIcon
                                icon={faWhatsapp}
                                color="green"
                                className="w-6 sm:w-8 lg:w-6 h-auto"
                            />
                        </a>
                    </div>

                    <div
                        dir="ltr"
                        className="items-center text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center overflow-x-clip"
                    >
                        {name}
                    </div>
                </div>

                <div className="gap-2 text-gray-600 sm:gap-4 items-center flex text-xl sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-bold justify-center">
                    {size && size.split("x").join(" x ")}
                </div>
                <div
                    dir={dir}
                    className="overflow-y-scroll no-scrollbar bg-white border-t-2 w-full grow h-52 lg:h-full rounded-3xl rounded-t-none relative "
                >
                    <div className="top-4 left-4 font-bold p-4">
                        {langData.comments.toUpperCase()}:
                    </div>
                    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 -rotate-45 text-4xl w-full text-center">
                        {langData.comingSoon.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div
            className={`sm:py-6 md:py-8 flex flex-col w-full h-full overflow-scroll no-scrollbar ${+className}`}
        >
            <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-6 2xl:gap-8 rounded-3xl">
                <div className="flex px-4 gap-5 sm:gap-8 2xl:gap-4 ">
                    <a href="/facebook">
                        <FontAwesomeIcon
                            icon={faFacebookMessenger}
                            color="#006AFF"
                            className="w-6 sm:w-8 lg:w-6 h-auto"
                        />
                    </a>
                    <a href="/whatsapp">
                        <FontAwesomeIcon
                            icon={faWhatsapp}
                            color="green"
                            className="w-6 sm:w-8 lg:w-6 h-auto"
                        />
                    </a>
                </div>
                <div
                    dir="ltr"
                    className="items-center text-2xl sm:text-2xl md:text-3xl font-semibold text-center overflow-x-clip"
                >
                    {name}
                </div>
            </div>

            <div className="gap-2 pb-5 text-gray-600 sm:gap-4 items-center flex text-xl sm:text-xl md:text-xl font-bold justify-center ">
                {size && size.split("x").join(" x ")}
            </div>

            <div className="flex w-full justify-center items-center rounded-3xl ">
                <img
                    src={sizes.original}
                    alt={name}
                    className="object-cover w-full max-h-full rounded-3xl rounded-b-none "
                />
            </div>
            <div
                dir={dir}
                className="gap-2 md:gap-4 rounded-b-3xl flex flex-col basis-5/12 flex-grow "
            >
                <div className="overflow-y-scroll no-scrollbar bg-white w-full grow h-52 rounded-3xl rounded-t-none relative ">
                    <div className="top-4 left-4 p-4 font-bold">
                        {langData.comments.toUpperCase()}:
                    </div>
                    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 -rotate-45 text-4xl w-full text-center">
                        {langData.comingSoon.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
}
