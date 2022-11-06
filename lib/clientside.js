import { useRouter } from "next/router";

//// CSEH >> Client Side Error Handler

export const ClientSideErrorHandler = (error) => {
    const router = useRouter();
    if (error?.status === 401) {
        router.replace("/");
    }
    if (error?.status === 404) {
        router.replace("404");
    }
};
