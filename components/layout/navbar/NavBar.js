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
            className={`h-full container flex items-center p-5 md:py-1 lg:py-2 gap-4 justify-between text-xs sm:text-sm md:text-lg xl:text-xl`}
        >
            <Link className={`h-full`} href="/">
                <a>
                    <img
                        src="/imgs/logo.png"
                        className="w-20 h-auto md:w-24 xl:w-28 2xl:w-32 invert brightness-75"
                        alt="logo"
                    />
                </a>
            </Link>
            <div className="flex gap-4 h-full">
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
