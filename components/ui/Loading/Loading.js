import styles from "./Loading.module.css";

export default function Loading({ isLoading }) {
    return (
        <>
            {isLoading && (
                <div
                    className={`flex w-full h-2 rounded-full ${
                        isLoading ? styles.isLoading : ""
                    }`}
                />
            )}
        </>
    );
}
