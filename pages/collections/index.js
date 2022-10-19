import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
    CollectionMasonic,
    EmptyPlaceHolder,
    Layout,
    Searchbar,
} from "../../components";

export async function getServerSideProps(context) {
    let collections = Array(32)
        .fill()
        .map((l, i) => {
            const randDigit = Math.floor(Math.random() * 4);
            return {
                name: `Collection ${i + 1}`,
                image: `/imgs/placeholder${randDigit}.jpg`,
            };
        });
    return {
        props: { collections }, // will be passed to the page component as props
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
