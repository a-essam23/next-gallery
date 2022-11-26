import { useLang } from "../../context";

export default function LanguageSelection({}) {
    const { changeLanguage } = useLang();
    return (
        <div
            className={`absolute items-end justify-end flex w-full px-4 md:px-6 gap-1 text-xs md:text-sm top-14 mt-1 md:top-4 md:flex-col text-white`}
        >
            <button
                className="hover:text-rose-700 hover:underline z-20"
                onClick={() => {
                    changeLanguage("en");
                }}
            >
                English
            </button>
            <button
                className="hover:text-rose-700 hover:underline z-20"
                onClick={() => {
                    changeLanguage("ar");
                }}
            >
                العربيه
            </button>
        </div>
    );
}
