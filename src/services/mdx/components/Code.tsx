import {FC, useContext} from "react";
import {background2, background3} from "../../../theme";

export const InlineCode: FC<{children: string}> = ({children}) => {
    return (
        <code
            css={theme => ({
                display: "inline-block",
                backgroundColor: "#f6f6f6",
                borderRadius: 5,
                wordBreak: "break-word",
            })}
            dangerouslySetInnerHTML={{
                __html: children
                    .replace(
                        /[\x26\x0A\<>'"]/g,
                        r => "&#" + r.charCodeAt(0) + ";"
                    )
                    .replace(/\s/g, "&nbsp;"),
            }}
        />
    );
};
