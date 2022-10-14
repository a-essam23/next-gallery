import { useLang } from "../../hooks";

export default function LanguageSelection({}) {
    const { changeLanguage, isAr } = useLang();
    return (
        <div
            className={`absolute flex gap-4 mt-2 mx-2 text-xs md:text-sm top-11 md:top-14 lg:top-1 ${
                isAr ? "left-0 lg:right-0" : "right-0 lg:left-0"
            } z-40 order-1`}
        >
            <div
                className="cursor-pointer hover:text-sky-900 hover:underline "
                onClick={() => {
                    changeLanguage("ar");
                }}
            >
                العربيه
            </div>
            <div
                className="cursor-pointer hover:text-sky-900 hover:underline"
                onClick={() => {
                    changeLanguage("en");
                }}
            >
                English
            </div>
        </div>
    );
}
