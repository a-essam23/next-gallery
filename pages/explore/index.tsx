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
import axios from "@services/axios";

export async function getServerSideProps(context: any) {
    // const jwt = checkJWTcookie(context);
    // if (!jwt) return ServerSideErrorHandler(context, { status: 401 });

    // let filter = "active=true";
    // for (const query in context.query) {
    //     filter = `${filter}&${query}=${context.query[query]}`;
    // }
    const { data, error } = await axios.get(
        `${process.env.HOST}/api/v1/folder/all`
    );
    if (error) return ServerSideErrorHandler(context, error);

    return {
        props: { collections_: data || [] }, // will be passed to the page component as props
    };
}

export default function CollectionsPage({ collections_ = [] }) {
    const [collections, setCollections] = useState(collections_);
    const { isLoading, get } = useFetch();
    useEffect(() => {
        setCollections(collections_);
    }, [collections_]);
    // const [msg, setMsg] = useState(null);
    return (
        <Layout title="Explore" className={"gap-0"}>
            {/* <Searchbar
                onFinish={(payload) => {
                    // setMsg(null);
                    get(
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
            /> */}
            <Loading isLoading={isLoading} />
            {/* <Message options={msg} className="capitalize" /> */}
            {collections.length ? (
                <CollectionMasonic collections={collections} />
            ) : (
                <EmptyPlaceHolder className="" />
            )}
        </Layout>
    );
}
