import {MdxRemote} from "next-mdx-remote/types";
import {ITOC} from "../mdx/TOCremarkPlugin";
import {ILinks} from "../pageSummary/_types/IPageSummaryCompProps";
import {IPageShareSummary} from "./IPageShareSummary";

export type IPageProps = {
    source: MdxRemote.Source;
    ToC: ITOC;
    urlBase: string;
    shareData: IPageShareSummary;
    links: ILinks;
};
