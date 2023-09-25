import React, { LegacyRef, ReactNode } from "react";
import { LinkProps } from "react-router-dom";

export type ComponentClassName<HTMLElement> =
    React.ComponentProps<HTMLElement>["className"];

export type ComponentSizes = "sm" | "md" | "lg" | "full";

export type ComponentGutter = "sm" | "md" | "lg";

export type ComponentVariants = "primary" | "secondary";

export type ComponentStyle = React.CSSProperties;

export type ComponentRef = any;

export type ComponentChildren = ReactNode | ReactNode[];

export interface ComponentProps {
    id?: string;
    variant?: ComponentVariants;
    size?: ComponentSizes;
    className?: ComponentClassName;
    style?: ComponentStyle;
    Ref?: ComponentRef;
}

// export type Variants = { variant?: ComponentVariants };
export type ThemeSizes = { size?: ComponentSizes };

export interface ParentProps extends ComponentProps {
    children?: ComponentChildren;
}

export interface BaseButtonProps extends ParentProps {
    // type?: "block" | "link";
    onClick?(): any;
    hrefType?: "button" | "submit" | "reset";
    Ref?: LegacyRef<HTMLButtonElement>;
}
