import hydrate from "next-mdx-remote/hydrate";
import {FC, Fragment, useMemo} from "react";
import {markdownComponents} from "services/mdx/components/markdownComponents";
import {PageSummaryLayout} from "services/pageSummary/PageSummaryLayout";
import {IPageSummaryCompProps} from "services/pageSummary/_types/IPageSummaryCompProps";
import {IPagePreviewData} from "services/search/_types/IPagePreviewData";
import {MDXContent} from "../../services/mdx/page/MarkdownPage";

export const PagePreview: FC<{page: IPagePreviewData}> = ({page}) => {
    const PageSummary = useMemo(
        () => (props: IPageSummaryCompProps) =>
            <PageSummaryLayout {...props} link={page.url} />,
        [page]
    );

    return (
        <MDXContent
            source={page.mdx}
            urlBase={page.urlBase}
            components={{
                ...markdownComponents,
                PageSummary,
            }}
        />
    );
};
