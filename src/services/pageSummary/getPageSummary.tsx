import {FC} from "react";
import {renderMarkdown} from "services/mdx/compileMarkdown";
import {getReactNodeTextContent} from "./getReactNodeTextContent";
import {PageSummaryLayout} from "./PageSummaryLayout";
import {IPageSummary} from "./_types/IPageSummary";
import {IPageSummaryCompProps} from "./_types/IPageSummaryCompProps";

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

    let rDescription = "";
    let rTitle = "";
    let rFeaturedIndex: number | undefined;
    let rTagsList: string[] = [];
    let rNavIndex: number | undefined;
    const PageSummary: FC<IPageSummaryCompProps> = ({
        title,
        children: description,
        content,
        featuredIndex,
        navIndex,
        tags = [],
    }) => {
        rTitle = title;
        rTagsList = tags;
        rFeaturedIndex = featuredIndex;
        rDescription = getReactNodeTextContent(description);
        rNavIndex = navIndex;

        return (
            <PageSummaryLayout
                title={title}
                tags={tags}
                content={content}
                link="">
                {description}
            </PageSummaryLayout>
        );
    };

    const {source: rendered} = await renderMarkdown(
        summaryString,
        urlBase,
        {PageSummary},
        false
    );

    return {
        title: rTitle,
        featuredIndex: rFeaturedIndex,
        description: rDescription,
        tags: rTagsList,
        compiledMdx: rendered,
        navIndex: rNavIndex,
    };
}
