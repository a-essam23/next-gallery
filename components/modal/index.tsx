import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ReactNode,
    FC,
    useState,
    RefObject,
    useEffect,
    useRef,
    Dispatch,
    SetStateAction,
} from "react";

export interface ModalProps {
    defaultValue?: boolean;
    children: ReactNode | ReactNode[];
    visible?: boolean;
    setVisible?: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

const Modal: FC<ModalProps> = ({
    children,
    defaultValue = false,
    visible = false,
    className = "",
    setVisible = () => {},
}) => {
    useEffect(() => {
        const handleEscapeKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setVisible(false);
            }
        };

        if (visible) {
            document.addEventListener("keydown", handleEscapeKeyPress);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKeyPress);
        };
    }, [visible]);
    return visible ? (
        <div
            className={`flex transition-all fixed top-0 left-0 w-screen h-screen no-scrollbar ${
                visible ? "z-50 bg-black/80" : "-z-10 opacity-0"
            }`}
        >
            <div
                className={`w-full h-5/6 md:w-3/4 xl:h-4/5 relative p-4 bg-primary-active transition-all text-contrast rounded-primary m-auto overflow-hidden ${className}`}
            >
                <div className="absolute z-50 right-4 top-4">
                    <button
                        onClick={() => setVisible(false)}
                        className="text-h5  flex items-center justify-center aspect-square border-contrast text-contrast hover:bg-primary-hover rounded-full"
                    >
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Modal;
