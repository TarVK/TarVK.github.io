import React, {Fragment} from "react";
import {Layout} from "../components/Layout";
import {AppProps} from "next/app";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../theme";
import {MuiThemeProvider, StylesProvider} from "@material-ui/core";
import {IIndex} from "../components/sideIndex/Sidebar";
import Head from "next/head";
import {IPageShareSummary} from "../services/_types/IPageShareSummary";

export default function App({Component, pageProps}: AppProps) {
    const typedProps = pageProps as IPageIndexProps;
    let nav: IIndex | undefined = typedProps.index;
    const shareData: IPageShareSummary | undefined = typedProps.shareData;
    if (nav?.items.length == 0) nav = undefined;

    return (
        <Fragment>
            <Head>
                <meta
                    name="description"
                    content="Work by TarVK"
                    key="description"
                />
                <meta
                    name="keywords"
                    content="Work, TarVK, Tar"
                    key="keywords"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="https://tarvk.github.io/images/logo.jpg"
                />

                <meta property="og:title" content="Tar" key="og-title" />
                <meta property="og:type" content="website" key="og-type" />
                <meta
                    property="og:description"
                    content="Work by TarVK"
                    key="og-description"
                />
                <meta
                    property="og:image"
                    content="https://tarvk.github.io/images/logo.png"
                    key="og-image"
                />
                <meta
                    property="og:image:alt"
                    content="My logo saying Tar"
                    key="og-image-alt"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
                />
                <style>
                    {`  
                    .katex-display > .katex {
                        display: inline-block;
                        white-space: nowrap;
                        max-width: 100%;
                        overflow-x: auto;
                        text-align: initial;
                    }
                    .katex {
                        font: normal 1.21em KaTeX_Main, Times New Roman, serif;
                        line-height: 1.2;
                        white-space: normal;
                        text-indent: 0;
                        padding-right: 2px; // Fix scrollbar errors
                    }`}
                </style>
            </Head>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <MuiThemeProvider theme={theme}>
                        <Layout index={nav} shareData={shareData}>
                            <Component {...pageProps} />
                        </Layout>
                    </MuiThemeProvider>
                </ThemeProvider>
            </StylesProvider>
        </Fragment>
    );
}

export type IPageIndexProps = {
    index?: IIndex;
    shareData?: IPageShareSummary;
};
