import { useRouter } from "next/router";

//// CSEH >> Client Side Error Handler
const router = useRouter();
export const ClientSideErrorHandler = (error) => {
    if (error?.status === 401) {
        router.replace("/");
    }
    if (error?.status === 404) {
        router.replace("404");
    }
};
