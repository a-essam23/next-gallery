import Section from "@components/section";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactNode } from "react";
import EmptyPlaceHolder from "./utils/EmptyPlaceholder";

interface ImageGridSectionProps {
    children: ReactNode | ReactNode[];
    className?: string;
    empty?: boolean;
    size?: "sm" | "md" | "lg";
}

const ImageGridSection: FC<ImageGridSectionProps> = ({
    children,
    empty,
    className = "",
    size = "md",
}) => {
    const sizes = {
        sm: "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4",
        md: "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4",
        lg: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6",
    };
    return (
        <Section
            size="md"
            className={`${
                empty ? "justify-center flex" : `grid ${sizes[size]}`
            } min-h-screen ${className}`}
        >
            {empty ? <EmptyPlaceHolder /> : children}
        </Section>
    );
};

export default ImageGridSection;
