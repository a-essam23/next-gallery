import classes from "./NavBar.module.css";
// import phone from "../../assets/phone.png";
import Link from "next/link";
import { useAuth, useLang } from "../../../context";
import Router from "next/router";

function NavBar() {
    ////TODO tailwind themes...
    const { langData } = useLang();
    const { user } = useAuth();
    return (
        <div
            className={`container flex items-center md:py-1 lg:py-2 xl:py-3 2xl:py-4 gap-4 justify-between `}
        >
            <div
                className={`cursor-pointer w-20 h-auto md:w-24 xl:w-24 `}
                onClick={() => {
                    Router.push("/");
                }}
            >
                <img src="/imgs/logo.png" className="" alt="logo" />
                {/* <img src={phone} alt="whats" /> */}
            </div>
            <div className="flex gap-4">
                <Link href="/collections">
                    <a className={`${classes.item} `}>{langData.explore}</a>
                </Link>
                <Link href="/#about">
                    <a className={classes.item}>{langData.about}</a>
                </Link>
                <Link href="/#contact">
                    <a className={classes.item}>{langData.contact}</a>
                </Link>
                {user?.role === "admin" && (
                    <Link href="/admin">
                        <a className={classes.item}>{langData.admin}</a>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default NavBar;
