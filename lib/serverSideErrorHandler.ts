import { Redirect } from "next";

export type ErrorTypes = 401 | 404;
export type SSEHRedirect = {
    redirect: {
        permenant: boolean;
        destination: string;
        source: string;
    };
};

export const checkIfAdmin = (context: any) => {
    if (!context.req.session?.role || context.req.session.role !== "admin")
        return SSEH(context, 401);
};

export const SSEH = (context: any, error: ErrorTypes): SSEHRedirect => {
    console.log("SSEH", error);
    const status = {
        401: {
            redirect: {
                permenant: false,
                destination: "/login",
                source: context.resolvedUrl || "/",
            },
        },

        404: {
            redirect: {
                permenant: false,
                destination: "/404",
                source: context.resolvedUrl || "/",
            },
        },
    };
    return status[error] || status[404];
};
