import {Global} from "@emotion/react";
import {Box, Container} from "@material-ui/core";
import Head from "next/head";
import {FC, Fragment, useState} from "react";
import {IPageShareSummary} from "../services/_types/IPageShareSummary";
import {Navbar} from "./Navbar";
import {IIndex, Sidebar} from "./sideIndex/Sidebar";

export const Layout: FC<{
    index?: IIndex;
    fullPage?: boolean;
    shareData?: IPageShareSummary;
}> = ({children, index, fullPage, shareData = {}}) => {
    const [navVisible, setNavVisible] = useState(false);

    const content = (
        <Box display="flex" flexDirection="row">
            {index && (
                <Sidebar
                    index={index}
                    open={navVisible}
                    setOpen={setNavVisible}
                />
            )}

            <Box
                flex={1}
                flexShrink={1}
                css={theme => ({
                    maxWidth: "100%",
                    minWidth: 0,
                    [theme.breakpoints.up("md")]: {
                        paddingLeft: theme.spacing(index ? 2 : 0),
                    },
                })}>
                {children}
            </Box>
        </Box>
    );

    return (
        <div className="layout" css={{overflowX: "hidden"}}>
            {/* metadata */}
            <Head>
                <title>TarVK</title>
                <link rel="icon" href="/logo.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                {shareData.title && (
                    <meta
                        property="og:title"
                        content={shareData.title}
                        key="og-title"
                    />
                )}
                {shareData.description && (
                    <meta
                        property="og:description"
                        content={shareData.description}
                        key="og-description"
                    />
                )}
                {shareData.tags && (
                    <meta
                        property="og:keywords"
                        content={shareData.tags.join(", ")}
                        key="og-keywords"
                    />
                )}
                {shareData.image && (
                    <meta
                        property="og:image"
                        content={shareData.image}
                        key="og-image"
                    />
                )}
            </Head>

            {/* Styling */}
            <Global
                styles={theme => ({
                    "body, html": {
                        margin: 0,
                        padding: 0,
                        height: "100%",
                        width: "100%",
                        ...(theme.typography.body1 as any),
                    },
                })}></Global>

            {/* Components */}
            <Navbar hasSidebar={!!index} setSidebarOpen={setNavVisible} />

            {fullPage ? content : <Container>{content}</Container>}
        </div>
    );
};
