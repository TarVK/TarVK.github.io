import {FC, ReactNode, Fragment} from "react";
import {CodeBlock} from "../../../components/CodeBlock";
import {createHeaderComp} from "./createHeaderComp";
import {Section} from "./Section";
import {Video} from "./Video";
import {Key} from "./Key";
import {PlainLink} from "../../../components/PlainLink";
import {Collaborator} from "./Collaborator";
import {Timeline, TimelineItem} from "./Timeline";
import {YTPlayer} from "./YTPlayer";
import {InlineCode} from "./Code";
import {ComponentReference} from "./ComponentReference";
import {BackgroundImage} from "./BackgroundImage";
import {Theme, Tooltip} from "@material-ui/core";
import {Text} from "../../../components/textStyles/Text";
import {PagesCategory} from "../../../components/search/PagesCategory";
import {IPageSummaryCompProps} from "services/pageSummary/_types/IPageSummaryCompProps";
import {ImageGrid} from "./ImageGrid";
import {getReactNodeTextContent} from "services/pageSummary/getReactNodeTextContent";
import Head from "next/head";
import {useUrl} from "../UrlBaseContext";
import {FunctionInterpolation} from "@emotion/react";
import * as PageComps from "../../../articleComponents";
import moment from "moment";

const autoFitImageRenderer: FC<{
    alt?: string;
    src: string;
    title?: string;
    width?: number;
}> = ({alt, src, title, width}) => (
    <img
        alt={alt}
        src={useUrl(src)}
        title={title}
        style={{maxWidth: "100%"}}
        width={width}
    />
);
const codeRender: FC<{
    className?: string;
    children: string;
    showHeader?: string;
    spoiler?: string;
    source?: string;
    highlight?: string;
    video?: string;
}> = ({
    className,
    children,
    showHeader,
    spoiler,
    highlight,
    video,
    source,
    ...rest
}) => {
    const languageData = className?.match(/language-(.*)/);
    const language = languageData?.[1] || "text";
    return (
        <CodeBlock
            code={children.trimEnd()}
            language={language}
            showHeader={
                showHeader == undefined
                    ? language != "text"
                    : showHeader != "false"
            }
            spoiler={spoiler ? spoiler != "false" : false}
            result={video ? <Video src={video} /> : undefined}
            highlight={highlight
                ?.split(",")
                .map(p => p.split(":").map(n => Number(n)) as [number, number])}
            source={source ? useUrl(source) : undefined}
            {...rest}
        />
    );
};

const TooltipRenderer: FC<{title: ReactNode}> = ({title, children}) => (
    <Tooltip
        placement="bottom-start"
        title={<Text css={{color: "white"}}>{title}</Text>}>
        <span>{children}</span>
    </Tooltip>
);

export const markdownComponents = {
    // Standard (markdown)
    code: codeRender,
    inlineCode: InlineCode,
    img: autoFitImageRenderer,
    section: Section,
    a: ({href, ...props}: {href: string; children: ReactNode}) => (
        <PlainLink styled {...props} href={useUrl(href)} />
    ),
    h1: createHeaderComp(1),
    h2: createHeaderComp(2),
    h3: createHeaderComp(3),
    h4: createHeaderComp(4),
    h5: createHeaderComp(5),
    h6: createHeaderComp(6),
    pre: (props: any) => <Fragment {...props} />,

    // Custom (jsx)
    CodeBlock,
    ImageGrid,
    Fragment,
    Video,
    Key,
    Collaborator,
    Timeline,
    TimelineItem,
    YTPlayer,
    ComponentReference,
    Tooltip: TooltipRenderer,
    PagesCategory,
    BackgroundImage,
    Spacer: ({height = 100}: {height?: number}) => <div css={{height}} />,
    Box: (props: {
        css?: FunctionInterpolation<Theme>;
        children?: ReactNode;
    }) => <div {...props} />,
    PageSummary: ({
        title,
        tags = [],
        children: description,
    }: IPageSummaryCompProps) => <Fragment></Fragment>,
    DateDelta: ({
        from,
        to,
        format,
    }: {
        from: string;
        to?: string;
        format: any;
    }) => <Fragment>{moment(to).diff(moment(from), format)}</Fragment>,

    // Page specific
    ...PageComps,
};
