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

///TODO

export async function getServerSideProps(context) {
    const { data, error } = await getOne(
        context.req.headers.host,
        "folder",
        context.query.collectionId
    );
    if (error) {
        return {
            redirect: {
                permenant: false,
                destination: "/admin",
            },
        };
    }
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
