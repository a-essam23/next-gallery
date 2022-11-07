export const checkJWTcookie = (context) => {
    return context.req.cookies?.jwt;
};
/// CSSEH >> CLIENT SERVER SIDE ERROR HANDLER
export const ServerSideErrorHandler = (context, error) => {
    console.log("CSSEH: ", error);
    if (error.status === 401) {
        return {
            redirect: {
                permenant: false,
                destination: "/login",
                source: context.req.headers?.referer,
            },
        };
    }
    if (error.status === 404) {
        return {
            redirect: {
                permenant: false,
                destination: "/404",
            },
        };
    }
    return { props: {} };
};
