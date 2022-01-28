import {MdxRemote} from "next-mdx-remote/types";

export type IPageSummary = {
    title: string;
    description: string;
    tags: string[];
    compiledMdx: MdxRemote.Source;
    featuredIndex?: number;
    navIndex?: number;
};
