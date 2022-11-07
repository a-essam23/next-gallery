import { v4 } from "uuid";

export default function RadioButtons({ items = [], selectedButton }) {
    const buttonClass =
        " 2xl:p-2 w-full text-center cursor-not-allowed text-sm md:text-xl 2xl:text-2xl bg-gray-200";
    const selectedButtonClass =
        "2xl:p-2 w-full text-center cursor-pointer text-sm 2xl:text-2xl border-b-0";
    return (
        <div className="flex flex-1">
            {items.map((item, i) => {
                return (
                    <div
                        key={v4()}
                        className={`2xl:p-2 w-full text-center ${
                            selectedButton === item
                                ? "cursor-pointer border-b-0"
                                : "cursor-not-allowed bg-gray-200"
                        } text-sm md:text-xl 2xl:text-2xl `}
                    >
                        {item.toUpperCase()}
                    </div>
                );
            })}
        </div>
    );
}
