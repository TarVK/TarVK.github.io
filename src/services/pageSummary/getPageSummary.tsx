import {FC} from "react";
import {renderMarkdown} from "services/mdx/compileMarkdown";
import {getPathRelativeToPublic} from "../getPathRelativeToPublic";
import {getReactNodeTextContent} from "./getReactNodeTextContent";
import {PageSummaryLayout} from "./PageSummaryLayout";
import {IPageSummary, IPageSummaryData} from "./_types/IPageSummary";
import {IPageSummaryCompProps} from "./_types/IPageSummaryCompProps";
import Path from "path";

/**
 * Retrieves the summary data of a page
 * @param page The page contents (as a string)
 * @param urlBase The url base to get paths relative to
 * @returns The page summary
 */
export async function getPageSummary(
    page: string,
    urlBase: string
): Promise<IPageSummary> {
    /** TODO: find a more robust solution that doesn't require unstable manual string analysis */
    const summaryClosingTag = page.match(/\<\/PageSummary\>/);
    let summaryString = "";
    if (summaryClosingTag) {
        const end =
            (summaryClosingTag.index ?? 0) + summaryClosingTag[0].length;
        summaryString = page.substring(0, end);
    }

    const {PageSummary, target} = createGetSummaryComponent();

    const {source: rendered} = await renderMarkdown(
        summaryString,
        "/" + Path.dirname(getPathRelativeToPublic(urlBase)),
        {PageSummary},
        false
    );

    return {
        ...target,
        compiledMdx: rendered,
    };
}

export function createGetSummaryComponent(
    RenderComp: FC<
        IPageSummaryCompProps & {
            link: string;
        }
    > = PageSummaryLayout
): {
    PageSummary: FC<IPageSummaryCompProps>;
    target: IPageSummaryData;
} {
    const target: IPageSummaryData = {
        title: "",
        description: "",
        tags: [],
    };

    const PageSummary: FC<IPageSummaryCompProps> = ({
        title,
        children: description,
        content,
        featuredIndex,
        navIndex,
        tags = [],
        shareImage,
    }) => {
        target.title = title;
        target.tags = tags;
        target.featuredIndex = featuredIndex;
        target.description = getReactNodeTextContent(description);
        target.navIndex = navIndex;
        target.shareImage = shareImage;

        return (
            <RenderComp title={title} tags={tags} content={content} link="">
                {description}
            </RenderComp>
        );
    };

    return {
        PageSummary,
        target,
    };
}
