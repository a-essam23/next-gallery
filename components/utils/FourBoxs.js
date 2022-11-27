import { useRouter } from "next/router";
import { Box } from "../../components";
export default function FourBoxes({
    className,
    activeLink = false,
    groups = Array(4),
}) {
    //// TODO CREATE COMPONENT FOR BOX INSTEAD!
    return (
        <div className={"flex flex-1 gap-4 w-full h-full " + className}>
            <div className="flex flex-col gap-4 w-full h-full ">
                <Box
                    item={groups[0]}
                    onClick={activeLink}
                    className="basis-2/5 rounded-2xl"
                />
                <Box
                    item={groups[1]}
                    onClick={activeLink}
                    className="basis-3/5 rounded-2xl"
                />
            </div>
            <div className="flex flex-col gap-4 w-full h-full ">
                <Box
                    item={groups[2]}
                    onClick={activeLink}
                    className="basis-3/5 rounded-2xl"
                />
                <Box
                    item={groups[3]}
                    onClick={activeLink}
                    className="basis-2/5 rounded-2xl"
                />
            </div>
        </div>
    );
}
