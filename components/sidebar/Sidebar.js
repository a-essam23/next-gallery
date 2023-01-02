import { faUser } from "@fortawesome/free-solid-svg-icons";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context";
import { useDimensions, useFetch } from "../../hooks";
import Loading from "../ui/Loading/Loading";
import Message from "../ui/Message";
import { motion } from "framer-motion";

const Sidebar = ({ className }) => {
    const getWidth = () => {
        if (width > 1600) return "20%";
        if (width > 1000) return "25%";
        if (width > 600) return "35%";
        return "50%";
    };
    const { user } = useAuth();
    const { width } = useDimensions();
    const router = useRouter();
    const [isCollapsed, setIsColapsed] = useState(true);
    const [groups, setGroups] = useState([]);
    const { isLoading, msg, handleGetAll } = useFetch();
    useEffect(() => {
        handleGetAll("folder", "active=true").then(({ data, error }) => {
            if (error) router.replace("/login");
            else {
                let allGroups = [];
                data.forEach((folder, i) => {
                    const group = allGroups.find((grp) => {
                        return grp.label === folder.group;
                    });
                    if (group) {
                        group.children.push({
                            label: (
                                <Link href={`/collections/${folder.name}`}>
                                    {folder.name}
                                </Link>
                            ),
                            key: folder.id,
                        });
                    } else {
                        allGroups.push({
                            label: folder.group,
                            key: folder.group + i,
                            children: [
                                {
                                    label: (
                                        <Link
                                            href={`/collections/${folder.name}`}
                                        >
                                            {folder.name}
                                        </Link>
                                    ),
                                    key: folder._id,
                                },
                            ],
                        });
                    }
                });
                setGroups(allGroups);
            }
        });
    }, []);

    return (
        <motion.div
            animate={{ width: isCollapsed ? 0 : getWidth() }}
            transition={{ duration: 0.65 }}
            dir="ltr"
            className={`fixed h-screen bg-slate-900 top-0 right-0 z-30 pt-2 pb-8 ${className} h-screen group`}
        >
            <CaretLeftOutlined
                className={`absolute z-20 top-2/4 p-3 lg:p-4 transition hover:-translate-x-6 -translate-x-3 lg:-translate-x-4 text-lg lg:text-3xl bg-slate-900 text-rose-900 rounded-full cursor-pointer group-hover:opacity-100 ${
                    isCollapsed ? "opacity-60 hover:opacity-100 " : "rotate-180"
                }`}
                size="xl"
                onClick={() => setIsColapsed(!isCollapsed)}
            />

            <div className="p-4 bg-slate-700 flex gap-2 items-center">
                <div className="bg-gray-400 p-3 flex w-max rounded-full">
                    <span icon={faUser} className="text-gray-100 " size="sm" />
                </div>
                <span className="text-white text-lg">{user?.name || "Username"}</span>
            </div>
            <Loading isLoading={isLoading} />
            <Menu mode="inline" theme="dark" items={groups} />
        </motion.div>
    );
};

export default Sidebar;
