import Image from "next/image";
import { useRouter } from "next/router";

function Collection({ data: { name = "", details } }) {
    const router = useRouter();
    return (
        <div
            className="flex w-full h-full relative bg-slate-50 rounded-2xl flex-col cursor-pointer shadow-sm hover:shadow-xl border overflow-hidden
            hover:scale-[102%] transition ease-linear"
            onClick={() => {
                router.push(`/explore/${name}`);
            }}
        >
            <Image
                width={650}
                height={600}
                src={details?.cover || "/missing.jpg"}
                alt={name}
                className="object-cover"
            />
            <div className="flex pointer-events-none rounded-2xl p-2 max-w-full items-center justify-center">
                <div className="text-black capitalize text-normal text-center overflow-hidden">
                    {name}
                </div>
            </div>
        </div>
    );
}

export default Collection;
