import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
export default function Loginpage({}) {
    const handleSubmit = async (data) => {};
    const router = useRouter();
    return (
        <div className="w-2/4 h-screen m-auto top-2/4 flex justify-center items-center">
            <div className="absolute w-8/12 h-4/5 border-2 m-auto bg-slate-400 p-16">
                <div className="text-3xl text-white font-bold">Login:</div>
                <div className="flex p-16 gap-16">
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="text-white cursor-pointer"
                        size="3x"
                        onClick={() => {
                            router.push("/api/v1/auth/google");
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-white cursor-pointer"
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
