import {FC} from "react";
import {renderMarkdown} from "services/mdx/compileMarkdown";
import {getReactNodeTextContent} from "./getReactNodeTextContent";
import {PageSummaryLayout} from "./PageSummaryLayout";
import {IPageSummary} from "./_types/IPageSummary";
import {IPageSummaryCompProps} from "./_types/IPageSummaryCompProps";

/**
 * Retrieves the summary data of a page
 * @param page The page contents (as a string)
 * @returns The page summary
 */
export async function getPageSummary(page: string): Promise<IPageSummary> {
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
    let rPriority: number | undefined;
    let rTagsList: string[] = [];
    const PageSummary: FC<IPageSummaryCompProps> = ({
        title,
        children: description,
        content,
        priority,
        tags = [],
    }) => {
        rTitle = title;
        rTagsList = tags;
        rPriority = priority;
        rDescription = getReactNodeTextContent(description);

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
        {PageSummary},
        false
    );

    return {
        title: rTitle,
        priority: rPriority,
        description: rDescription,
        tags: rTagsList,
        compiledMdx: rendered,
    };
}
