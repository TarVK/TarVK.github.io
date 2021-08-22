import {compileMarkdown} from "./compileMarkdown";
import {createIndex} from "./pagesIndex/createIndex";

export const createStaticMdxPropsRetriever = (dir: string) => async ({
    params,
}: {
    params: {id: string[]; path: string[]};
}) => ({
    props: {
        url: `https://tarvk.github.io/${[
            ...(dir ? [dir] : []),
            ...(params.id ?? []),
        ].join("/")}`,
        ...(await compileMarkdown(dir, params.id)),
        index: await createIndex(dir, params.id),
    },
});
