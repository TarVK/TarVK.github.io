import {ReactNode} from "react";

export type IPageSummaryCompProps = {
    title: string;
    tags: string[];
    children: ReactNode;
    content: ReactNode;
    featuredIndex?: number;
    navIndex?: number;
};
