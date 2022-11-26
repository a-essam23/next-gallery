import { useRouter } from "next/router";

export default function Box({
    className,
    onClick = false,
    item = { sizes: { small: "/imgs/blank.jpg" }, name: "" },
}) {
    const router = useRouter();
    return (
        <button
            onClick={
                onClick &&
                (() => {
                    router.push(`/collections/?group=${item.name}`);
                })
            }
            className={`w-full h-full flex-grow min-h-0 bg-white shadow-cd relative cursor-pointer ${className}`}
            style={{
                backgroundImage: `url('${item?.sizes?.small}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
            }}
        >
            <div
                className={`transparent-white absolute top-1/4 left-2/4 -translate-x-2/4 m-auto`}
            >
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center">
                    {item?.name.toUpperCase()}
                </h1>
            </div>
        </button>
    );
}
