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
} from "../../../components";
import { getOne } from "../../../services";
import { useFetch } from "../../../hooks";
import { checkJWTcookie, ServerSideErrorHandler } from "../../../lib";

///TODO
export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    // console.log(jwt);
    if (!jwt) ServerSideErrorHandler(context, { status: 401 });
    const { data, error } = await getOne(
        context.req.headers.host,
        "folder",
        context.query.collectionId,
        jwt
    );

    if (error) return ServerSideErrorHandler(context, error);
    // const models = Array(10)
    //     .fill()
    //     .map((el, i) => {
    //         return {
    //             name: `Model${i + 1}`,
    //             _id: i,
    //             image: `/imgs/placeholder.jpg`,
    //             visible: i % 3,
    //         };
    //     });
    return {
        props: { models: data.images || [] }, // will be passed to the page component as props
    };
}

export default function AdminCollectionPage({ models }) {
    const router = useRouter();
    const collectionId = router.query.collectionId;
    const [modalContent, setModalContent] = useState({
        collection: collectionId,
    });
    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { isLoading, msg, handleUpdate, handleDelete } = useFetch();

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

            {models.length === 0 && <EmptyPlaceHolder />}

            <Grid className="p-4">
                {models.map((album) => (
                    <ModelWithOptions
                        key={v4()}
                        data={album}
                        onClickDelete={() => handleDelete("model", album.name)}
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
                    />
                ))}
            </Grid>
        </AdminLayout>
    );
}
