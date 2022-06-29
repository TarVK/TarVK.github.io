import {FC} from "react";

export const RightSidebar: FC = ({children}) => (
    <div css={{flexBasis: 240, flexShrink: 0}}>
        <div
            css={theme => ({
                top: theme.mixins.toolbar.height,
                position: "sticky",
                paddingTop: theme.spacing(2),
                boxSizing: "border-box",
                overflowY: "auto",
                [theme.breakpoints.up("md")]: {
                    maxHeight: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
                    paddingLeft: theme.spacing(2),
                },
            })}>
            {children}
            <div
                css={{
                    zIndex: -1,
                    backgroundColor: "white",
                    position: "absolute",
                    left: 2,
                    top: 2,
                    right: 2,
                    bottom: 2,
                    boxShadow: "0px 0px 2px 1px white",
                    opacity: 0.5,
                }}
            />
        </div>
    </div>
);
