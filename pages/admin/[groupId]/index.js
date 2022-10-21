import { Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 } from "uuid";
import {
    AdminLayout,
    EmptyPlaceHolder,
    FormModal,
    Searchbar,
    Grid,
    CollectionWithOptions,
} from "../../../components";

export async function getServerSideProps(context) {
    const collections = Array(5)
        .fill()
        .map((el, i) => {
            return {
                name: `Collection${i + 1}`,
                _id: i,
                image: `/imgs/placeholder${Math.floor(Math.random() * 4)}.jpg`,
            };
        });
    return {
        props: { collections }, // will be passed to the page component as props
    };
}

export default function AdminGrouppage({ collections = [] }) {
    const [isShown, setIsShown] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [modalType, setModalType] = useState(null);
    const router = useRouter();
    const groupId = router.query.groupId;

    ////TODO ADD CHECK/UNCHECK ALL BUTTON

    const handleDelete = async (folderName) => {};

    return (
        <AdminLayout>
            {isShown && (
                <FormModal
                    type={modalType}
                    selectedCollection={selectedCollection}
                    selectedGroup={groupId}
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
                        setModalType("collection");
                        setIsShown(true);
                    }}
                >
                    Add Collection
                </Button>
            </div>
            {collections.length > 0 ? (
                <Grid className="p-4">
                    {collections.map((collection) => (
                        <CollectionWithOptions
                            key={v4()}
                            data={collection}
                            onClickAdd={() => {
                                setModalType("model");
                                setSelectedCollection(collection.name);
                                setIsShown(true);
                            }}
                            onClickDelete={() => {
                                console.log("deleting");
                                handleDelete(collection.name);
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
