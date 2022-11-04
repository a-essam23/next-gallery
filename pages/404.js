import Router from "next/router";
import { useEffect } from "react";
import { EmptyPlaceHolder, Layout } from "../components";
export default function Custom404() {
    useEffect(() => {
        setTimeout(() => {
            Router.replace("/");
        }, 1500);
    }, []);
    return (
        <Layout>
            <div className="text-4xl py-4 text-center">
                This page does not exist!
            </div>
            <EmptyPlaceHolder />
        </Layout>
    );
}
