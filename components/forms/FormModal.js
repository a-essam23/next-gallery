import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
    RadioButtons,
    GroupForm,
    ModelForm,
    CollectionForm,
    Message,
    Loading,
} from "../../components";
import { useFetch } from "../../hooks";

export default function FormModal({
    className,
    content = {
        type: null,
        group: null,
        collection: null,
        currentName: null,
        name: null,
        image: null,
        size: null,
    },
    showClickHander,
    isUpdate = false,
}) {
    const [previewImage, setPreviewImage] = useState(content.image);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [useWatermark, setUseWatermark] = useState(false);
    const { isLoading, msg, handleUpload, handleUpdate } = useFetch();
    const previewFileHandler = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("loadend", () => {
            if (!useWatermark) {
                setFileToUpload(file);
                setPreviewImage(reader.result);
                return;
            }
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
                canvas.toBlob((blob) => {
                    const fileAfterWM = new File(
                        [blob],
                        file.name,
                        {
                            type: "image/jpeg",
                        },
                        "image/jpeg"
                    );
                    setFileToUpload(fileAfterWM);
                });
            };
            // ;
        });
    };

    const options = {
        content,
        previewFile: previewFileHandler,
        onFinish: isUpdate
            ? async (d) =>
                  await handleUpdate(
                      { ...d },
                      content.type,
                      content.currentName
                  )
            : async (d) =>
                  await handleUpload({ ...d, Key: fileToUpload }, content.type),
        isDisabled: isUpdate,
        onCheckChange: (checked) => {
            setUseWatermark(checked);
        },
    };

    const forms = {
        group: <GroupForm options={options} />,
        collection: <CollectionForm options={options} />,
        model: <ModelForm options={options} />,
    };

    return (
        <>
            <div className="fixed bg-black opacity-50 w-screen h-screen left-0 top-0 z-10 "></div>
            <div
                className={`bg-white flex h-144 xl:h-4/5 2xl:h-200 w-11/12 xl:w-8/12 m-auto fixed z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ${className}`}
            >
                <FontAwesomeIcon
                    icon={faXmarkCircle}
                    size="3x"
                    className="text-red-500 border-2 rounded-full bg-white cursor-pointer"
                    onClick={showClickHander}
                />
                <div className="flex relative basis-2/5 p-4 border-r-2 border-gray-200">
                    <div className="flex w-full justify-center items-center ">
                        <img
                            src={previewImage}
                            alt="image-to-be-sent"
                            className="max-h-full"
                        />
                    </div>
                </div>

                <div className="basis-3/5  ">
                    <div className="flex flex-1 ">
                        <RadioButtons
                            items={["group", "collection", "model"]}
                            selectedButton={content.type}
                        />
                    </div>

                    {forms[content.type]}
                    {/* {<Spin className="px-4" />} */}
                    <Loading isLoading={isLoading || false} />
                    {msg && <Message options={msg} icon size={"lg"} />}
                </div>
            </div>
        </>
    );
}
