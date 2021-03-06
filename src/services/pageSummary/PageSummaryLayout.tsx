import {Box, Paper} from "@material-ui/core";
import {PlainLink} from "components/PlainLink";
import {FC} from "react";
import {background2} from "../../theme";
import {IPageSummaryCompProps} from "./_types/IPageSummaryCompProps";

export const PageSummaryLayout: FC<IPageSummaryCompProps & {link: string}> = ({
    title,
    content,
    children: description,
    link,
}) => {
    return (
        <PlainLink href={link}>
            <Paper
                css={theme => ({
                    background: background2,
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                })}>
                <h3>{title}</h3>
                {content}
                {description}
            </Paper>
        </PlainLink>
    );
};
