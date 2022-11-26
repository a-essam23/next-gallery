import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faWhatsappSquare,
    faSquarePinterest,
} from "@fortawesome/free-brands-svg-icons";
import classes from "./Contact.module.css";

export default function Contact({ className, hrefs = {} }) {
    return (
        <>
            <div className={classes.cards}>
                <div
                    className={`${classes.services} grid grid-cols-1 sm:grid-cols-3 gap-4`}
                >
                    <div
                        className={`${classes["content"]} ${classes["content-1"]}`}
                    >
                        <FontAwesomeIcon icon={faSquareFacebook} size="5x" />
                        <h2>Facebook</h2>
                        <p>
                            Facebook is the largest social networking site that
                            easy to connect with family, friends and businesses
                        </p>

                        <a
                            href={hrefs?.facebook || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CLICK HERE
                        </a>
                    </div>
                    <div
                        className={`${classes["content"]} ${classes["content-2"]}`}
                    >
                        <FontAwesomeIcon icon={faWhatsappSquare} size="5x" />
                        <h2>WhatsApp</h2>
                        <p>
                            WhatsApp is a messaging app that lets users text,
                            chat, and share media, including voice messages and
                            video
                        </p>

                        <a
                            href={hrefs?.whatsapp || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CLICK HERE
                        </a>
                    </div>
                    <div
                        className={`${classes["content"]} ${classes["content-3"]}`}
                    >
                        <FontAwesomeIcon icon={faSquarePinterest} size="5x" />
                        <h2>Pinterest</h2>
                        <p>
                            Pinterest is social media service designed to enable
                            saving and discovery of information on the internet
                        </p>

                        <a
                            href={hrefs?.pinterest || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CLICK HERE
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
