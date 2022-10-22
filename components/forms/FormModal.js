import { useCallback, useMemo, useState } from "react";
import {
    RadioButtons,
    GroupForm,
    ModelForm,
    CollectionForm,
} from "../../components";

export default function FormModal({
    className,
    type = null,
    isUpdate = false,
    selectedGroup = null,
    selectedCollection = null,
    showClickHander,
}) {
    const [previewImage, setPreviewImage] = useState(null);
    const [fileToUpload, setFileToUpload] = useState(null);

    const previewFileHandler = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setFileToUpload(file);
        reader.addEventListener("loadend", () => {
            //// TODO MAKE A MORE DYNAMIC WATERMARK WRITER
            const img = document.createElement("img");
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                const text = "WATERMARK";
                const textWidth = ctx.measureText(text).width / 10;
                const fontSize =
                    Math.sqrt(img.width ** 2 + img.height ** 2) / textWidth;
                ctx.drawImage(img, 0, 0);
                ctx.save();
                ctx.translate(fontSize / 2, fontSize);
                ctx.rotate((Math.PI * 1) / 4);
                ctx.fillStyle = "rgba(255, 0, 0, 1)";
                ctx.textBaseline = "center";

                ctx.font = fontSize + "px" + " sans-serif";
                ctx.fillText(text, 0, 0, img.width);
                ctx.restore();

                setPreviewImage(canvas.toDataURL());
                canvas.toBlob((blob) => setFileToUpload(blob));
            };
            // ;
        });
    };

    const options = {
        isUpdate,
        selectedGroup,
        selectedCollection,
        previewFile: previewFileHandler,
    };

    const forms = {
        group: (
            <GroupForm
                options={options}
                onFinish={(data) => {
                    console.log(fileToUpload);
                }}
            />
        ),
        collection: (
            <CollectionForm
                options={options}
                onFinish={(data) => {
                    console.log(data);
                    console.log(fileToUpload);
                }}
            />
        ),
        model: (
            <ModelForm
                options={options}
                onFinish={(data) => {
                    console.log(data);
                    console.log(fileToUpload);
                }}
            />
        ),
    };

    return (
        <>
            <div
                className="fixed bg-black opacity-50 w-screen h-screen left-0 top-0 cursor-pointer z-10 "
                onClick={showClickHander}
            ></div>
            <div
                className={`bg-white flex h-4/5 2xl:h-200 w-8/12 m-auto fixed z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ${className}`}
            >
                <div className="flex relative basis-2/5 outline-2 outline outline-gray-300 p-4">
                    <div className="flex w-full justify-center items-center ">
                        <img
                            src={previewImage}
                            alt="image-to-be-sent"
                            className="max-h-full"
                        />
                    </div>
                </div>

                <div className="basis-3/5 flex-col outline-gray-300 outline-2 outline">
                    <div className="flex flex-1 ">
                        <RadioButtons
                            items={["group", "collection", "model"]}
                            selectedButton={type}
                        />
                    </div>
                    {forms[type]}
                    {/* <div className={"text-2xl px-4"}>{msg}</div> */}
                </div>
            </div>
        </>
    );
}
