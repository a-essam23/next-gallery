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
import { deleteOne, getOne } from "../../../services";

export async function getServerSideProps(context) {
    const { data, error } = await getOne(
        context.req.headers.host,
        "group",
        context.query.groupId
    );
    if (error) {
        return {
            redirect: {
                permenant: false,
                destination: "/admin",
            },
        };
    }
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
        props: { collections: data.folders || [] }, // will be passed to the page component as props
    };
}
//// TODO REPLACE ADMIN SSR WITH CSR FOR AUTH VALIDATION!

//// TODO REPLACE STATE WITH REDUCER

export default function AdminGrouppage({ collections = [] }) {
    const router = useRouter();
    const groupId = router.query.groupId;
    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    // const [collections, setcollections] = useState(ssCollections);
    const [modalContent, setModalContent] = useState({ group: groupId });
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    ////TODO ADD CHECK/UNCHECK ALL BUTTON

    ///TODO CREATE A MESSAGE COMPOENENT WITH ICONS

    // useEffect(() => {
    //     console.log(isShown);
    // }, [isShown]);

    useEffect(() => {}, [isShown]);

    const handleDelete = async (type, name, setIsLoading, setMsg) => {
        setIsLoading(true);
        const { data, error } = await deleteOne("", type, name);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error, status: "fail" });
        } else {
            setMsg({ content: "Added!", status: "success" });
        }
    };

    return (
        <AdminLayout isLoading={isLoading}>
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
            {collections.length > 0 ? (
                <Grid className="p-4">
                    {collections.map((collection) => (
                        <CollectionWithOptions
                            key={v4()}
                            data={collection}
                            onClickAdd={() => {
                                setModalContent({
                                    type: "model",
                                    group: groupId,
                                    collection: collection.name,
                                });
                                // setModalType("model");
                                // setSelectedCollection(collection.name);
                                setIsUpdate(false);
                                setIsShown(true);
                            }}
                            onClickEdit={() => {
                                setModalContent({
                                    ...modalContent,
                                    type: "collection",
                                    name: collection.name,
                                    currentName: collection.name,
                                    image: collection.sizes.original,
                                });
                                setIsUpdate(true);
                                setIsShown(true);
                            }}
                            onClickDelete={() => {
                                handleDelete(
                                    "collection",
                                    collection.name,
                                    setIsLoading,
                                    setMsg
                                );
                            }}
                            onCheck={(check) => console.log(check)}
                        />
                    ))}
                </Grid>
            ) : (
                <EmptyPlaceHolder />
            )}
        </AdminLayout>
    );
}
