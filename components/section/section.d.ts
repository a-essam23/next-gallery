import { BackgroundWaveProps } from "@components/svg-background";
import {
    ParentProps,
    ComponentSize,
    ComponentGutter,
    ThemeSizes,
    ThemeVariants,
} from "@types/components";

export interface SectionProps extends ParentProps, ThemeSizes, ThemeVariants {
    gutter?: ComponentGutter;
    padding?: ComponentGutter;
    background?: "wave" | "layers";
    backgroundProps?: BackgroundWaveProps | BackgroundWaveProps;
    dir?: "ltr" | "rtl";
}
