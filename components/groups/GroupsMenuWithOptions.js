import { PlusCircleTwoTone } from "@ant-design/icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormModal, Loading, Message } from "../../components";
import { useLang } from "../../context";
import { useFetch } from "../../hooks";

///TODO FIX MENU CURRENT
export default function GroupsMenuWithOptions({}) {
    const [current, setCurrent] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [groups, setGroups] = useState([]);
    const { langData } = useLang();
    const { isLoading, msg, handleDelete, handleGetAll } = useFetch();
    useEffect(() => {
        if (!isShown)
            handleGetAll("group", "active=true").then(({ data, error }) => {
                if (!error) {
                    setGroups(data);
                }
            });
        return () => setIsShown(false);
        // eslint-disable-next-line
    }, [isShown]);
    return (
        <div className="h-max">
            {isShown && (
                <FormModal
                    showClickHander={() => setIsShown(false)}
                    content={{ type: "group" }}
                />
            )}
            <div className="text-2xl rounded-t-xl bg-slate-300 text-white text-center tracking-widest font-bold py-2 px-4 items-center justify-between flex overflow-hidden ">
                {langData.groups.toUpperCase()}
                <PlusCircleTwoTone
                    onClick={() => {
                        setIsShown(true);
                    }}
                />
            </div>
            <Loading isLoading={isLoading} />
            <Message icon options={msg} />
            {groups.length > 0 && (
                <Menu
                    className="h-full "
                    defaultSelectedKeys={["1"]}
                    mode="vertical"
                    theme="light"
                    selectedKeys={[current]}
                    items={
                        groups.length &&
                        groups.map((group) => ({
                            label: (
                                <div className="">
                                    <Link
                                        href={`/admin/${group?.name.toLowerCase()}`}
                                    >
                                        <a
                                            onClick={(e) => {
                                                setCurrent(group?._id);
                                            }}
                                        >
                                            {group?.name.toUpperCase()}
                                        </a>
                                    </Link>
                                    <FontAwesomeIcon
                                        icon={faMinusCircle}
                                        color="red"
                                        className="absolute right-0 top-2/4 -translate-y-2/4 mr-4 "
                                        size="lg"
                                        onClick={() => {
                                            handleDelete("group", group?.name);
                                        }}
                                    />
                                </div>
                            ),
                            key: group._id,
                        }))
                    }
                />
            )}
        </div>
    );
}
