import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
    CollectionMasonic,
    EmptyPlaceHolder,
    Layout,
    Searchbar,
} from "../../components";
import { getAll } from "../../services";

export async function getServerSideProps(context) {
    const { data, error } = await getAll(context.req.headers.host, "folder");
    return {
        props: { collections: data || [] }, // will be passed to the page component as props
    };
}

export default function CollectionsPage({ collections = [] }) {
    // const [isLoading, setIsLoading] = useState(true);
    return (
        <Layout>
            <Searchbar
                choices={["collection", "model"]}
                onFinish={(data) => {
                    // setSearchParams({ [data.type]: data.value });
                }}
            />
            {/* {isLoading && <Spin size="large" />} */}
            {collections.length ? (
                <CollectionMasonic collections={collections} />
            ) : (
                <EmptyPlaceHolder />
            )}
        </Layout>
    );
}
