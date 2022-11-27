import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faWhatsapp,
    faFacebookMessenger,
    faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
    return (
        <div className="bg-slate-900 p-10 text-white">
            <div className="flex flex-col justify-center items-center gap-4 pb-4">
                <img
                    alt="roman-classic-logo"
                    src="/imgs/logo.png"
                    className="invert w-32 h-auto brightness-75"
                />
                <span>© 2022</span>
            </div>

            <div className="flex flex-col gap-16 md:flex-row md:gap-0 ">
                <div className="flex gap-4 underline basis-2/4 justify-center">
                    <div>
                        <a>Privacy policy</a>
                    </div>
                    <div>
                        <a>Terms and conditions</a>
                    </div>
                </div>
                <div className="flex flex-col gap-4 basis-2/4 justify-center items-center">
                    <p>Created by PLACEHOLDER group</p>
                    <p>Contact us at </p>
                    <a className="underline">PLACEHOLDER@mail.co</a>

                    <div className="flex gap-4 justify-evenly items-center">
                        {[
                            {
                                title: "facebook",
                                icon: faFacebookSquare,
                                color: "white",
                            },
                            {
                                title: "messanger",
                                icon: faFacebookMessenger,
                                color: "rgb(0,126,255)",
                            },
                            {
                                title: "whatsapp",
                                icon: faWhatsapp,
                                color: "rgb(71,199,86)",
                            },
                        ].map((el, i) => {
                            return (
                                <a
                                    key={el.title + i}
                                    className="hover:scale-125 hover:transition-transform hover:delay-75 hover:brightness-125"
                                >
                                    <FontAwesomeIcon
                                        icon={el.icon}
                                        color={el?.color}
                                        size="xl"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
