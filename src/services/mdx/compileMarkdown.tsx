import {promises as FS} from "fs";
import Path from "path";
import {FC, Fragment} from "react";
import {MdxRemote} from "next-mdx-remote/types";
import sectionize from "remark-sectionize";
import renderToString from "next-mdx-remote/render-to-string";
import {cleanupPath} from "./pagesIndex/createStaticPathsCollector";
import {getPagesDir} from "./pagesIndex/getPagesDir";
import {markdownComponents} from "./components/markdownComponents";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "../../theme";
import {ThemeProvider} from "@emotion/react";
import {TOCRemarkPlugin, ITOC} from "./TOCremarkPlugin";
import {PageIndexProvider} from "./page/PageIndexContext";
import {UrlBaseContext} from "./UrlBaseContext";
import {getPathRelativeToPublic} from "../getPathRelativeToPublic";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import {
    createGetSummaryComponent,
    getPageSummary,
} from "../pageSummary/getPageSummary";
import {IPageProps} from "../_types/IPageProps";
import {IPageShareSummary} from "../_types/IPageShareSummary";

const MdxContextProvider: FC<{urlBase: string}> = ({children, urlBase}) => (
    <UrlBaseContext.Provider value={urlBase}>
        <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={theme}>
                <PageIndexProvider>{children}</PageIndexProvider>
            </MuiThemeProvider>
        </ThemeProvider>
    </UrlBaseContext.Provider>
);

export async function compileMarkdown(
    dir: string,
    urlPath?: string[]
): Promise<IPageProps> {
    let dirPath = getPagesDir(dir);

    if (urlPath) {
        // Obtain the actual file path given the url path
        const pathSections = [...urlPath];

        do {
            const fileNames = await FS.readdir(dirPath);
            const part = pathSections.shift();

            const fileName = fileNames.find(
                fileName => cleanupPath(fileName) == part
            );
            if (!fileName)
                throw new Error(`${part} of ${urlPath} could not be found.`);
            dirPath = Path.join(dirPath, fileName);
        } while (pathSections.length > 0);
    }

    // Obtain and render the source
    let source: string;
    let filePath: string;
    try {
        filePath = dirPath;
        source = await FS.readFile(filePath, "utf-8");
    } catch (e) {
        filePath = Path.join(dirPath, "index.mdx");
        source = await FS.readFile(filePath, "utf-8");
    }

    return renderMarkdown(
        source,
        "/" + getPathRelativeToPublic(Path.dirname(filePath))
    );
}

/**
 * Renders the given mdx markdown
 * @param source The source code to be rendered
 * @param urlBase The url path to get files relative to
 * @param extraComponents The additional components to use during rendering
 * @param generateToc Whether to also generate the table of contents
 * @returns The output code, and potentially the table of contents
 */
export async function renderMarkdown(
    source: string,
    urlBase: string,
    extraComponents: MdxRemote.Components = {},
    generateToc: boolean = true
): Promise<IPageProps> {
    const ToC = [] as ITOC;

    const {PageSummary, target} = createGetSummaryComponent(() => <Fragment />);
    const renderedSource = await renderToString(source, {
        components: {...markdownComponents, PageSummary, ...extraComponents},
        provider: {
            component: MdxContextProvider,
            props: {urlBase},
        },
        mdxOptions: {
            rehypePlugins: [rehypeKatex],
            remarkPlugins: [
                remarkMath,
                ...(generateToc
                    ? [sectionize, [TOCRemarkPlugin, {output: ToC}]]
                    : ([] as any[])),
            ],
        },
    });
    const shareData: IPageShareSummary = {
        ...(target.title ? {title: target.title} : undefined),
        ...(target.description ? {description: target.description} : undefined),
        ...(target.tags ? {tags: target.tags} : undefined),
        ...(target.shareImage ? {image: target.shareImage} : undefined),
    };

    return {
        source: renderedSource,
        urlBase,
        ToC,
        shareData,
        links: target.links ?? [],
    };
}
