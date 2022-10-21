import { v4 } from "uuid";

export default function RadioButtons({ items = [], selectedButton }) {
    const buttonClass =
        "outline outline-2 outline-gray-300 2xl:p-2 w-full text-center cursor-not-allowed text-lg 2xl:text-2xl bg-gray-200";
    const selectedButtonClass =
        "2xl:p-2 w-full text-center cursor-pointer text-lg 2xl:text-2xl border-b-0";
    return (
        <div className="flex flex-1">
            {items.map((item, i) => {
                return (
                    <div
                        key={v4()}
                        className={
                            item === selectedButton
                                ? selectedButtonClass
                                : buttonClass
                        }
                    >
                        {item.toUpperCase()}
                    </div>
                );
            })}
        </div>
    );
}
