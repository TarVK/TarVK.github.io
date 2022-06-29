import React, {FC, Fragment} from "react";
import {
    ILinks,
    ILinkType,
} from "../services/pageSummary/_types/IPageSummaryCompProps";
import {Text} from "../components/textStyles/Text";
import Link from "next/link";
import {List, ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import {PlainLink} from "./PlainLink";
import Youtube from "@material-ui/icons/YouTube";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Download from "@material-ui/icons/CloudDownload";
import GitHub from "@material-ui/icons/GitHub";
import Videocam from "@material-ui/icons/Videocam";
import Website from "@material-ui/icons/Language";
import {useTheme} from "@emotion/react";

export const RelatedLinks: FC<{links: ILinks}> = ({links}) => {
    const theme = useTheme();

    return links.length > 0 ? (
        <Fragment>
            <Text css={{fontWeight: 800}}>Links</Text>

            <List>
                {links.map(({type, url, text}) => {
                    const typeData = icons[type];
                    return (
                        <PlainLink href={url}>
                            <ListItem
                                style={{
                                    paddingRight: theme.spacing(1),
                                    paddingLeft: theme.spacing(1),
                                }}
                                button>
                                <ListItemIcon style={{minWidth: 35}}>
                                    <typeData.icon />
                                </ListItemIcon>
                                <ListItemText>
                                    {text ?? typeData.name}
                                </ListItemText>
                            </ListItem>
                        </PlainLink>
                    );
                })}
            </List>

            <div css={{height: 20}} />
        </Fragment>
    ) : (
        <Fragment />
    );
};

export const icons: Record<ILinkType, {name: string; icon: FC}> = {
    yt: {name: "Youtube", icon: Youtube},
    demo: {name: "Live demo", icon: PlayArrow},
    download: {name: "Download", icon: Download},
    github: {name: "GitHub", icon: GitHub},
    video: {name: "Video demo", icon: Videocam},
    website: {name: "Project site", icon: Website},
};
