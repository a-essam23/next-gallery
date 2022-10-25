import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { LoginForm } from "../components";
export default function Loginpage({}) {
    const handleSubmit = async (data) => {};
    const router = useRouter();
    return (
        <div className="w-full h-screen m-auto top-2/4 flex justify-center items-center">
            <div className="absolute w-full sm:w-max h-max border-2 m-auto bg-slate-100 p-16">
                <div className="text-3xl font-bold">Login:</div>
                <LoginForm
                    onFinish={(data) => {
                        console.log(data);
                    }}
                />

                <div className="flex px-4 gap-16 justify-evenly">
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="text-red-600 cursor-pointer"
                        size="3x"
                        onClick={() => {
                            router.push("/api/v1/auth/google");
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-blue-600 cursor-pointer"
                        size="3x"
                        onClick={() => {
                            router.push("/api/v1/auth/facebook");
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
