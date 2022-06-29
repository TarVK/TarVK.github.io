import {ReactNode} from "react";

export type IPageSummaryCompProps = {
    title: string;
    tags: string[];
    children: ReactNode;
    content: ReactNode;
    featuredIndex?: number;
    navIndex?: number;
    shareImage?: string;
    links?: ILinks;
};

export type ILinks = {type: ILinkType; url: string; text?: string}[];
export type ILinkType =
    | "yt"
    | "video"
    | "download"
    | "github"
    | "website"
    | "demo";
