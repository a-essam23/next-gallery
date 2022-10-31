import { PlusCircleTwoTone } from "@ant-design/icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormModal } from "../../components";
import { getAll } from "../../services";

///TODO FIX MENU CURRENT
export default function GroupsMenuWithOptions({}) {
    const [current, setCurrent] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        getAll("", "group", true).then(({ data, error }) => {
            setGroups(data || []);
        });
    }, [isShown]);
    // groups = Array(6)
    //     .fill()
    //     .map((el, i) => {
    //         return {
    //             name: `GROUP${i + 1}`,
    //             _id: i,
    //         };
    //     });
    const handleDelete = async (name) => {};

    return (
        <div className="h-max">
            {isShown && (
                <FormModal
                    type="group"
                    showClickHander={() => setIsShown(false)}
                />
            )}
            <div className="text-2xl roudned bg-slate-300 text-white text-center tracking-widest font-bold py-2 px-4 items-center justify-between flex overflow-hidden">
                GROUPS
                <PlusCircleTwoTone
                    onClick={() => {
                        setIsShown(true);
                    }}
                />
            </div>
            {groups.length && (
                <Menu
                    className="h-full border-b-2 shadow rounded "
                    defaultSelectedKeys={["1"]}
                    mode="vertical"
                    theme="light"
                    selectedKeys={[current]}
                    items={groups.map((group) => ({
                        label: (
                            <div className="">
                                <Link
                                    href={`/admin/${group.name.toLowerCase()}`}
                                >
                                    <a
                                        onClick={(e) => {
                                            setCurrent(group._id);
                                        }}
                                    >
                                        {group.name.toUpperCase() || "NULL"}
                                    </a>
                                </Link>
                                <FontAwesomeIcon
                                    icon={faMinusCircle}
                                    color="red"
                                    className="absolute right-0 top-2/4 -translate-y-2/4 mr-4 "
                                    size="lg"
                                    onClick={() => {
                                        handleDelete(group.name);
                                    }}
                                />
                            </div>
                        ),
                        key: group._id,
                    }))}
                />
            )}
        </div>
    );
}
