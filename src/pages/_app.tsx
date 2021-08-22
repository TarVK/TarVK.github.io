import React, {Fragment} from "react";
import {Layout} from "../components/Layout";
import {AppProps} from "next/app";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../theme";
import {MuiThemeProvider, StylesProvider} from "@material-ui/core";
import {IIndex} from "../components/sideIndex/Sidebar";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    let nav: IIndex | undefined = (pageProps as IPageIndexProps).index;
    if (nav?.items.length == 0) nav = undefined;

    return (
        <Fragment>
            <Head>
                <title>LaunchMenu</title>
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

                <meta property="og:title" content="Tar" key="og-title" />
                <meta property="og:type" content="website" key="og-type" />
                <meta
                    property="og:description"
                    content="Work by TarVK"
                    key="og-description"
                />
                <meta
                    property="og:image"
                    content="https://launchmenu.github.io/logo.jpg"
                    key="og-image"
                />
                <meta
                    property="og:image:alt"
                    content="My logo saying Tar"
                    key="og-image-alt"
                />
            </Head>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <MuiThemeProvider theme={theme}>
                        <Layout index={nav}>
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
};
