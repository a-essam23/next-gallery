import { DownOutlined } from "@ant-design/icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tree } from "antd";
import { useState } from "react";

const Sidebar = ({ className }) => {
    const [collapsed, setColapsed] = useState(true);
    const treeData = Array(4)
        .fill()
        .map((el, i) => {
            return {
                title: "group" + i,
                key: i,
            };
        });
    return (
        <div className={`absolute top-full left-0 z-40  ${className} h-screen`}>
            <FontAwesomeIcon
                className="text-rose-900 cursor-pointer"
                icon={faArrowRightFromBracket}
                size="2xl"
            />
            <div className="fixed z-40 top-40 left-0 w-44 ">
                <Tree
                    className="p-4 bg-slate-900 text-white"
                    treeData={treeData}
                    switcherIcon={<DownOutlined />}
                />
            </div>
        </div>
    );
};

export default Sidebar;
