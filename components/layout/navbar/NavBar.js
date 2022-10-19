import classes from "./NavBar.module.css";
// import phone from "../../assets/phone.png";
import Link from "next/link";
import { useLang } from "../../../hooks";
import Router from "next/router";

function NavBar() {
    ////TODO tailwind themes...
    const langContext = useLang();
    const pageContent = langContext.langData;
    return (
        <div
            className={`container flex items-center md:py-1 lg:py-2 xl:py-3 2xl:py-4 gap-4 justify-between `}
        >
            <div
                className={`flex flex-col cursor-pointer w-20 h-auto md:w-24 xl:w-24 ${
                    langContext.isAr ? "order-1" : ""
                }`}
                onClick={() => {
                    Router.push("/");
                }}
            >
                <img src="/imgs/logo-placeholder.png" className="" alt="logo" />
                {/* <img src={phone} alt="whats" /> */}
            </div>
            <div className="flex gap-4">
                <Link href="/collections">
                    <a
                        className={`${classes.item} ${
                            langContext.isAr ? "order-1" : ""
                        }`}
                    >
                        {pageContent.explore}
                    </a>
                </Link>
                <Link href="/#about">
                    <a className={classes.item}>{pageContent.about}</a>
                </Link>
                <Link href="/#contact">
                    <a className={classes.item}>{pageContent.contact}</a>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
