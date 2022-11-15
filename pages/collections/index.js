import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
    CollectionMasonic,
    EmptyPlaceHolder,
    Layout,
    Loading,
    Message,
    Searchbar,
} from "../../components";
import { useFetch } from "../../hooks";
import { checkJWTcookie, ServerSideErrorHandler } from "../../lib";
import { getAll } from "../../services";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) return ServerSideErrorHandler(context, { status: 401 });

    const { group } = context.query;
    let filter = "active=ture";
    for (const query in context.query) {
        filter = `${filter}&${query}=${context.query[query]}`;
    }
    console.log(filter);
    const { data, error } = await getAll({
        hostname: context.req.headers.host,
        type: "folder",
        token: jwt,
        filter: group ? `group=${group}` : "",
    });

    if (error) return ServerSideErrorHandler(context, error);

    return {
        props: { collections_: data || [] }, // will be passed to the page component as props
    };
}

export default function CollectionsPage({ collections_ = [] }) {
    const [collections, setCollections] = useState(collections_);
    const { isLoading, handleGetOne } = useFetch();
    useEffect(() => {
        setCollections(collections_);
    }, [collections_]);
    // const [msg, setMsg] = useState(null);
    return (
        <Layout>
            <Searchbar
                choices={["collection", "model"]}
                onFinish={(payload) => {
                    // setMsg(null);
                    handleGetOne(
                        payload.type,
                        payload.value,
                        "active=true"
                    ).then(({ data, error }) => {
                        // if (error)
                        // setMsg({
                        //     status: "fail",
                        //     content: `${payload.type} could not be found`,
                        // });
                        setCollections(data ? [data] : []);
                    });
                    // setSearchParams({ [data.type]: data.value });
                }}
            />
            <Loading isLoading={isLoading} />
            {/* <Message options={msg} className="capitalize" /> */}
            {collections.length ? (
                <CollectionMasonic collections={collections} />
            ) : (
                <EmptyPlaceHolder />
            )}
        </Layout>
    );
}
