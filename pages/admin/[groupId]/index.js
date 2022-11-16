import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
    AdminLayout,
    EmptyPlaceHolder,
    FormModal,
    Searchbar,
    Grid,
    CollectionWithOptions,
    Loading,
    Message,
} from "../../../components";
import { useFetch } from "../../../hooks";
import { checkJWTcookie, ServerSideErrorHandler } from "../../../lib";
import { getOne } from "../../../services";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) ServerSideErrorHandler(context, { status: 401 });
    const { data, error } = await getOne({
        hostname: context.req.headers.host,
        type: "group",
        name: context.query.groupId,
        token: jwt,
    });
    if (error) return ServerSideErrorHandler(context, error);
    // const collections = Array(5)
    //     .fill()
    //     .map((el, i) => {
    //         return {
    //             name: `Collection${i + 1}`,
    //             _id: i,
    //             image: `/imgs/placeholder${Math.floor(Math.random() * 4)}.jpg`,
    //         };
    //     });
    return {
        props: { collections_: data?.folders || [] }, // will be passed to the page component as props
    };
}
//// TODO REPLACE ADMIN SSR WITH CSR FOR AUTH VALIDATION!

//// TODO REPLACE STATE WITH REDUCER

export default function AdminGrouppage({ collections_ = [] }) {
    const router = useRouter();
    const groupId = router.query.groupId;
    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    // eslint-disable-next-line
    const [collections, setCollections] = useState(collections_ || []);
    const [modalContent, setModalContent] = useState({ group: groupId });
    const { isLoading, msg, handleDelete, setMsg, handleUpdate } = useFetch();
    ////TODO ADD CHECK/UNCHECK ALL BUTTON
    useEffect(() => {
        setCollections(collections_);
        setMsg(null);
        // eslint-disable-next-line
    }, [collections_]);

    return (
        <AdminLayout>
            {isShown && (
                <FormModal
                    isUpdate={isUpdate}
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
                    className="bg-blue-600 "
                    onClick={() => {
                        setModalContent({
                            type: "collection",
                            group: groupId,
                        });
                        setIsUpdate(false);
                        setIsShown(true);
                    }}
                >
                    Add Collection
                </Button>
            </div>
            <div className="flex justify-center">
                <Loading isLoading={isLoading} />
                <Message options={msg} icon timeout={2} />
            </div>
            {collections.length ? (
                <Grid className="p-4">
                    {collections.map((collection) => (
                        <CollectionWithOptions
                            key={v4()}
                            data={collection}
                            onClickAdd={() => {
                                setModalContent({
                                    type: "model",
                                    group: groupId,
                                    collection: collection?.name,
                                });
                                setIsUpdate(false);
                                setIsShown(true);
                            }}
                            onClickEdit={() => {
                                setModalContent({
                                    ...modalContent,
                                    type: "collection",
                                    name: collection.name,
                                    currentName: collection.name,
                                    image: collection?.sizes?.original,
                                });
                                setIsUpdate(true);
                                setIsShown(true);
                            }}
                            onClickDelete={() =>
                                handleDelete(
                                    "collection",
                                    collection?.name
                                ).then(({ data, error }) => {
                                    if (!error)
                                        setCollections(
                                            collections.filter(
                                                (c) => c._id !== c._id
                                            )
                                        );
                                })
                            }
                            onCheck={(check) =>
                                handleUpdate(
                                    { active: check },
                                    "collection",
                                    collection?.name,
                                    true
                                )
                            }
                        />
                    ))}
                </Grid>
            ) : (
                <EmptyPlaceHolder />
            )}
        </AdminLayout>
    );
}
