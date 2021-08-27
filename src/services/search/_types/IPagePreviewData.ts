import {MdxRemote} from "next-mdx-remote/types";

export type IPagePreviewData = {
    url: string;
    urlBase: string;
    priority: number;
    file: string;
    mdx: MdxRemote.Source;
};
