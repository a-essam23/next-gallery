import { useLang } from "../../hooks";

export default function LanguageSelection({}) {
    const { changeLanguage } = useLang();
    return (
        <div
            className={`absolute flex w-max gap-1 mt-2 mx-2 text-sm top-14 md:top-1 flex-col z-20 order-1`}
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
