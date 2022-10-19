import { useRouter } from "next/router";

function Collection({ data: { name = "", image } }) {
    const router = useRouter();
    return (
        <div
            className="flex w-full h-full relative bg-slate-50 transition-all rounded-2xl flex-col cursor-pointer shadow"
            onClick={() => {
                router.push(`/collections/${name}`);
            }}
        >
            <img
                src={image}
                alt={name}
                className="object-cover w-full h-full hover:brightness-75 rounded-2xl "
            />

            <div className="flex pointer-events-none rounded-2xl p-2 max-w-full">
                <div className="text-black text-xl  overflow-clip ">
                    {name.toUpperCase()}
                </div>
            </div>
        </div>
    );
}

export default Collection;
