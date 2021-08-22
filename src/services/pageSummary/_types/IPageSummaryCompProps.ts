import {ReactNode} from "react";

export type IPageSummaryCompProps = {
    title: string;
    tags: string[];
    priority?: number;
    children: ReactNode;
    content: ReactNode;
};
