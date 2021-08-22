import {createStaticPathsCollector} from "../services/mdx/pagesIndex/createStaticPathsCollector";
import {createMarkdownPageComponent} from "../services/mdx/page/MarkdownPage";
import {promises as FS} from "fs";
import Path from "path";
import Head from "next/head";
import {compileMarkdown} from "services/mdx/compileMarkdown";
import {createIndex} from "services/mdx/pagesIndex/createIndex";
import {getPagesDir} from "services/mdx/pagesIndex/getPagesDir";
import {generateSearchIndex} from "services/search/generateSearchIndex";

const MarkdownPage = createMarkdownPageComponent(<Head>{}</Head>);
export default MarkdownPage;
export const getStaticProps = async ({
    params,
}: {
    params: {id: string[]; path: string[]};
}) => {
    const isHomePage = params.id == undefined;

    // If this is the homepage, also generate the search index that can be used in the FE on request
    if (isHomePage) {
        const pagesPath = getPagesDir("");
        const files = await Promise.all(
            (await FS.readdir(pagesPath)).map(async file => ({
                file,
                isDir: (
                    await FS.lstat(Path.join(pagesPath, file))
                ).isDirectory(),
            }))
        );
        const dirs = files.filter(({isDir}) => isDir).map(({file}) => file);

        await generateSearchIndex(
            dirs.map(path => ({path: Path.join(pagesPath, path), name: path}))
        );
    }

    return {
        props: {
            url: `https://tarvk.github.io/${[...(params.id ?? [])].join("/")}`,
            ...(await compileMarkdown("", params.id)),
            /** Website index shouldn't be shown on the homepage */
            ...(isHomePage ? {} : {index: await createIndex("", params.id)}),
        },
    };
};
export const getStaticPaths = createStaticPathsCollector("");
