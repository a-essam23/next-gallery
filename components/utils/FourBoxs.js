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
                <Box item={groups[0]} className="basis-2/5" />
                <Box item={groups[1]} className="basis-3/5" />
            </div>
            <div className="flex flex-col gap-4 w-full h-full ">
                <Box item={groups[2]} className="basis-3/5" />
                <Box item={groups[3]} className="basis-2/5" />
            </div>
        </div>
    );
}
