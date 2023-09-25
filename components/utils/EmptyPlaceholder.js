import Image from "next/image";

export default function EmptyPlaceHolder({ className = "" }) {
    return (
        <div
            className={`flex flex-col justify-center items-center w-full h-full ${className} p-16 2xl:p-32 bg-slate-50`}
        >
            <div className="text-xl lg:text-3xl 2xl:text-6xl p-16 text-center opacity-20">
                This collection is empty
            </div>
            <Image
                src={"/imgs/empty.png"}
                className="opacity-20"
                width={250}
                height={250}
            />
        </div>
    );
}
