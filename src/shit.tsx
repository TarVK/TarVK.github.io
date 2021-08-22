import Head from "next/head";
import {compileMarkdown} from "services/mdx/compileMarkdown";
import {createStaticMdxPropsRetriever} from "services/mdx/createStaticMdxPropsRetriever";
import {createMarkdownPageComponent} from "services/mdx/page/MarkdownPage";

const MarkdownPage = createMarkdownPageComponent(<Head>{}</Head>);
export default MarkdownPage;
export const getStaticProps = async () => ({
    props: await compileMarkdown("", ["index"]),
});
