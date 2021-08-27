import {MdxRemote} from "next-mdx-remote/types";
import {markdownComponents} from "../components/markdownComponents";
import hydrate from "next-mdx-remote/hydrate";
import {ITOC} from "../TOCremarkPlugin";
import {Box} from "@material-ui/core";
import {PageIndexProvider} from "./PageIndexContext";
import {PageIndex} from "./PageIndex";
import Head from "next/head";
import {FC, ReactNode, useEffect} from "react";
import {SearchResults} from "components/search/SearchResults";
import {UrlBaseContext} from "../UrlBaseContext";

export default function MarkdownPage({
    source,
    ToC,
    head,
    url,
    urlBase,
}: {
    source: MdxRemote.Source;
    ToC: ITOC;
    urlBase: string;
    url?: string;
    head?: ReactNode;
}) {
    return (
        <PageIndexProvider>
            {url && (
                <Head>
                    <meta property="og:url" content={url} key="url" />
                </Head>
            )}
            {head}

            <Box
                display="flex"
                css={theme => ({
                    [theme.breakpoints.down("sm")]: {
                        flexDirection: "column-reverse",
                    },
                })}>
                <Box
                    flexGrow={1}
                    flexShrink={1}
                    minWidth={0}
                    css={theme => ({
                        [theme.breakpoints.up("md")]: {
                            paddingRight: theme.spacing(2),
                        },
                    })}>
                    <MDXContent source={source} urlBase={urlBase} />
                    <Box height="80vh" />
                </Box>
                <PageIndex ToC={ToC} />
            </Box>
        </PageIndexProvider>
    );
}

export const MDXContent: FC<{
    source: MdxRemote.Source;
    urlBase: string;
    components?: MdxRemote.Components;
}> = ({source, urlBase, components = markdownComponents}) => {
    const content = hydrate(source, {components});
    return (
        <UrlBaseContext.Provider value={urlBase}>
            {content}
        </UrlBaseContext.Provider>
    );
};

export function createMarkdownPageComponent(head: ReactNode) {
    return (props: {source: MdxRemote.Source; ToC: ITOC; urlBase: string}) => (
        <MarkdownPage {...props} head={head} />
    );
}
