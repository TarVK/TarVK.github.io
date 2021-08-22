import {MdxRemote} from "next-mdx-remote/types";

export type IPageSummary = {
    title: string;
    description: string;
    tags: string[];
    priority?: number;
    compiledMdx: MdxRemote.Source;
};
