import {MdxRemote} from "next-mdx-remote/types";
import {ILinks} from "./IPageSummaryCompProps";

export type IPageSummary = {
    compiledMdx: MdxRemote.Source;
} & IPageSummaryData;

export type IPageSummaryData = {
    title: string;
    description: string;
    tags: string[];
    featuredIndex?: number;
    navIndex?: number;
    shareImage?: string;
    links?: ILinks;
};
