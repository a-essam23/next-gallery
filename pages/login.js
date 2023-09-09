import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    Layout,
    Loading,
    LoginForm,
    Message,
    RegisterForm,
} from "../components";
import { useAuth, useLang } from "../context";
import { useFetch } from "../hooks";
import { useUser } from "../context/UserProvider";

export const getServerSideProps = async (context) => {
    return {
        props: {
            data: null,
        },
    };
};

export default function Loginpage({}) {
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();
    const { user, setUser } = useUser();
    const [msg, setMsg] = useState({});
    const { post, isLoading } = useFetch();
    const { langData } = useLang();
    return (
        <Layout className={"items-center"} title={"Login"}>
            <div className="absolute shadow-cd rounded max-w-xs lg:max-w-2xl 2xl:max-w-4xl w-max h-max m-auto bg-slate-100 p-6 xl:p-6 2xl:p-16">
                {isRegister ? (
                    <RegisterForm
                        onFinish={async (d) => {
                            setMsg({});
                            const { data, error } = await post(
                                "/api/v1/auth/register",
                                d
                            );
                            if (error)
                                setMsg({
                                    content: error.message,
                                    status: "failed",
                                });
                            setUser(data);
                            setMsg({
                                content:
                                    "Successfully logged in... redirecting...",
                                status: "success",
                            });
                            if (data) router.replace("/");
                        }}
                    />
                ) : (
                    <LoginForm
                        onFinish={async (d) => {
                            setMsg({});
                            const { data, error } = await post(
                                "/api/v1/auth/login",
                                d
                            );
                            if (error)
                                setMsg({
                                    content: error.message,
                                    status: "failed",
                                });
                            setUser(data);
                            setMsg({
                                content:
                                    "Successfully registered... redirecting...",
                                status: "success",
                            });
                            if (data) router.replace("/");
                        }}
                    />
                )}
                {isRegister ? (
                    <button
                        className="font-bold text-lg"
                        onClick={() => {
                            setIsRegister(false);
                        }}
                    >
                        {langData["loginText"]}
                    </button>
                ) : (
                    <button
                        className="font-bold text-lg"
                        onClick={() => {
                            setIsRegister(true);
                        }}
                    >
                        {langData["registerText"]}
                    </button>
                )}
                <Loading isLoading={isLoading} />
                <Message icon options={msg} />
                {/* <div_
                    className="flex px-4 pt-4 justify-evenly "
                >
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="text-red-600 cursor-pointer"
                        size="2x"
                        onClick={() => {
                            router.push("/api/v1/auth/google");
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-blue-600 cursor-pointer"
                        size="2x"
                        onClick={() => {
                            router.push("/api/v1/auth/facebook");
                        }}
                    />
                </div> */}
            </div>
        </Layout>
    );
}
