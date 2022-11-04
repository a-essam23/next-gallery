import Head from "next/head";

export default function Header({ title = "" }) {
    return (
        <Head>
            <title>{"Roman Classic" + (title && ` | ${title}`)}</title>
            <meta charSet="UTF-8"></meta>
            <meta name="description" content=""></meta>
            <meta name="keywords" content="Gallery Application"></meta>
            <meta name="author" content=""></meta>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
        </Head>
    );
}
