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
} from "../../../components";

export async function getServerSideProps(context) {
    const models = Array(10)
        .fill()
        .map((el, i) => {
            return {
                name: `Model${i + 1}`,
                _id: i,
                image: `/imgs/placeholder.jpg`,
                visible: i % 3,
            };
        });
    return {
        props: { models }, // will be passed to the page component as props
    };
}

export default function AdminCollectionPage({ models }) {
    const [isShown, setIsShown] = useState(false);
    // eslint-disable-next-line
    const router = useRouter();
    const collection = router.query.collectionId;

    const handleDelete = async (code) => {};

    return (
        <AdminLayout>
            {isShown && (
                <FormModal
                    selectedCollection={collection}
                    type={"model"}
                    onClickHandler={() => {
                        setIsShown(false);
                    }}
                />
            )}

            <div className="flex items-center justify-between p-4">
                <Button
                    type="primary"
                    size="large"
                    className="bg-blue-600 mr-8 2xl:mr-16"
                    onClick={() => {
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
                        onClickDelete={() => handleDelete(album.code)}
                        onClickEdit={() => {
                            setIsUpdate(album);
                        }}
                    />
                ))}
            </Grid>
        </AdminLayout>
    );
}
