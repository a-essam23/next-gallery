import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
    CollectionMasonic,
    EmptyPlaceHolder,
    Layout,
    Searchbar,
} from "../../components";
import { checkJWTcookie, ServerSideErrorHandler } from "../../lib";
import { getAll } from "../../services";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) return ServerSideErrorHandler(context, { status: 401 });

    const { data, error } = await getAll(
        context.req.headers.host,
        "folder",
        jwt
    );

    if (error) return ServerSideErrorHandler(context, error);

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
