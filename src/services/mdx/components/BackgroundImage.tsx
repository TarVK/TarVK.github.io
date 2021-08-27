import {FunctionInterpolation, Interpolation} from "@emotion/react";
import {Theme} from "@material-ui/core";
import {FC} from "react";
import {useUrl} from "../UrlBaseContext";

export const BackgroundImage: FC<{
    src: string;
    blur?: number;
    lightening?: number;
    stretchTop?: number;
    height?: string | number;
    className?: string;
    css?: FunctionInterpolation<Theme>;
}> = ({
    src,
    blur = 5,
    lightening = 0.4,
    height,
    stretchTop,
    children,
    className,
    css,
}) => (
    <div
        css={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            minHeight: height,
        }}>
        <div
            className={className}
            css={theme => ({
                position: "absolute",
                zIndex: -1,
                top: stretchTop ? -stretchTop : 0,
                left: "-90%",
                right: "-90%",
                height: stretchTop ? `calc(${stretchTop}px + 100%)` : "100%",
                backgroundColor: "white",
                overflow: "hidden",
                [theme.breakpoints.down("sm")]: {
                    left: -50,
                    right: -50,
                },
                ...(css
                    ? css instanceof Function
                        ? (css(theme) as any)
                        : css
                    : {}),
            })}>
            <div
                css={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    opacity: 1 - lightening,
                    backgroundImage: `url(${useUrl(src)})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                    filter: `blur(${blur}px)`,
                }}
            />
        </div>
        {children}
    </div>
);
