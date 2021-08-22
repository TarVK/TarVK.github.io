import {IPagePreviewData} from "services/search/_types/IPagePreviewData";
type IPVD = Record<string, IPagePreviewData[]>;

let previews: Promise<IPVD> | undefined;
export async function getPreviews(): Promise<IPVD> {
    if (previews) return previews;

    previews = (async () => {
        const rawData = await fetch("search/pagePreviews.json");
        return (await rawData.json()) as IPVD;
    })();
    return previews;
}
