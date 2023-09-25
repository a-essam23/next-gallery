import {
    faFacebookMessenger,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faShare, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu, MenuProps } from "antd";
import Image from "next/image";
import { FC } from "react";
import { v4 } from "uuid";

interface ModelDetailsProps {
    className?: string;

    data?: {
        name?: string;
        details?: { [key: string]: any };
    };
}

const ModelDetails: FC<ModelDetailsProps> = ({ data, className }) => {
    const items: MenuProps["items"] = [
        {
            label: (
                <a
                    href="facebook.com"
                    className="flex items-center text-sm gap-2"
                >
                    <FontAwesomeIcon
                        icon={faFacebookMessenger}
                        color="#006AFF"
                        className="text-normal"
                    />
                    <span>Messenger</span>
                </a>
            ),
            key: "messenger",
        },
        {
            type: "divider",
        },
        {
            label: (
                <a
                    href="web.whatsapp.com"
                    className="flex items-center text-sm gap-2"
                >
                    <FontAwesomeIcon
                        icon={faWhatsapp}
                        color="green"
                        className="text-normal"
                    />
                    <span>Whatsapp</span>
                </a>
            ),
            key: "3",
        },
    ];

    return (
        <div className="w-full h-full flex flex-col lg:flex-row lg:items-stretch">
            <div className="relative lg:border-r-2 flex-grow tr">
                <Image
                    fill
                    alt={data?.name || ""}
                    src={data?.details?.cover || "/missing.jpg"}
                    className="object-contain ansition-all"
                />
            </div>

            <div className="lg:w-72 flex flex-col h-max py-2">
                <div className="flex flex-col">
                    <Dropdown
                        menu={{ items }}
                        trigger={["click", "hover"]}
                        className="w-max px-2"
                    >
                        <div className="pointer-cursor">
                            <FontAwesomeIcon
                                icon={faShareNodes}
                                className="w-6 h-6 aspect-3/3 text-blue-500 cursor-pointer"
                            />
                        </div>
                    </Dropdown>
                    <div className="items-center text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center overflow-x-clip">
                        {data?.name}
                    </div>
                </div>
                <span className="border w-full mx-auto" />
                {data?.details && (
                    <div className="flex flex-col gap-2 p-2">
                        {Object.keys(data?.details).map(
                            (key) =>
                                key !== "cover" && (
                                    <div
                                        key={v4()}
                                        className="grid grid-cols-2 w-full p-2 items-center text-center bg-gray-200"
                                    >
                                        <span className="text-gray-900 text-h5 capitalize">
                                            {key.replace("_", "")}
                                        </span>
                                        <span className="text-normal">
                                            {data?.details?.[key]}
                                        </span>
                                    </div>
                                )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelDetails;
