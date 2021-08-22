import {Box} from "@material-ui/core";
import {PlainLink} from "components/PlainLink";
import {FC} from "react";
import {IPageSummaryCompProps} from "./_types/IPageSummaryCompProps";

export const PageSummaryLayout: FC<IPageSummaryCompProps & {link: string}> = ({
    title,
    content,
    children: description,
    link,
}) => {
    return (
        <Box>
            <PlainLink href={link}>
                <h3>{title}</h3>
            </PlainLink>
            {content}
            {description}
        </Box>
    );
};
