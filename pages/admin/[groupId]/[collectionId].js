import { useRouter } from "next/router";
import { Button } from "antd";
import { useState } from "react";
import { v4 } from "uuid";
import {
    ModelWithOptions,
    FormModal,
    EmptyPlaceHolder,
    Grid,
    AdminLayout,
    Searchbar,
    Loading,
    Message,
} from "../../../components";
import { getOne } from "../../../services";
import { useFetch } from "../../../hooks";
import { checkJWTcookie, ServerSideErrorHandler } from "../../../lib";

///TODO
export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) ServerSideErrorHandler(context, { status: 401 });
    const { data, error } = await getOne({
        hostname: context.req.headers.host,
        type: "folder",
        name: context.query.collectionId,
        token: jwt,
    });
    if (error) return ServerSideErrorHandler(context, error);
    return {
        props: { models_: data.images || [] }, // will be passed to the page component as props
    };
}

export default function AdminCollectionPage({ models_ = [] }) {
    const router = useRouter();
    const collectionId = router.query.collectionId;
    const [modalContent, setModalContent] = useState({
        collection: collectionId,
    });
    const [models, setModels] = useState(models_);
    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { handleDelete, msg, isLoading, handleUpdate } = useFetch();
    return (
        <AdminLayout>
            {isShown && (
                <FormModal
                    content={modalContent}
                    showClickHander={() => {
                        setIsShown(false);
                    }}
                />
            )}
            <div className="flex w-full h-max gap-2 ">
                <Searchbar className={"w-full p-0"} />
                <Button
                    type="primary"
                    size="large"
                    className="bg-blue-600 mr-8 2xl:mr-16"
                    onClick={() => {
                        setModalContent({
                            type: "model",
                            collection: collectionId,
                        });
                        setIsShown(true);
                    }}
                >
                    Add Model
                </Button>
            </div>
            <Loading isLoading={isLoading} />
            <Message options={msg} icon={true} />
            {models.length === 0 && <EmptyPlaceHolder />}

            <Grid className="p-4">
                {models.map((album) => (
                    <ModelWithOptions
                        key={v4()}
                        data={album}
                        onClickDelete={() => {
                            handleDelete("model", album.name).then(
                                ({ data, error }) => {
                                    if (!error)
                                        setModels(
                                            models.filter(
                                                (m) => m._id !== album._id
                                            )
                                        );
                                }
                            );
                        }}
                        onClickEdit={() => {
                            setModalContent({
                                type: "model",
                                collection: collectionId,
                                name: album.name,
                                currentName: album.name,
                                size: album.size,
                            });
                            setIsUpdate(true);
                            setIsShown(true);
                        }}
                        onCheck={(check) =>
                            handleUpdate(
                                { active: check },
                                "model",
                                album?.name,
                                true
                            )
                        }
                    />
                ))}
            </Grid>
        </AdminLayout>
    );
}
