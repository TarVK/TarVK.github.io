import {promises as FS} from "fs";
import Path from "path";
import {getPageSummary} from "services/pageSummary/getPageSummary";
import {createSearchIndex} from "./createSearchIndex";
import {IPagePreviewData} from "./_types/IPagePreviewData";
import {cleanupPath} from "services/mdx/pagesIndex/createStaticPathsCollector";
import {getSearchDataDir} from "./getSearchDataDir";
import {getPathRelativeToPublic} from "../getPathRelativeToPublic";

/**
 * Generates a search index and stores it in public/searchIndex.ts
 * @param categories The different categories to create separate (and a 1 combined) indexes for
 */
export async function generateSearchIndex(
    categories: {path: string; name: string}[]
): Promise<void> {
    const pagePreviews: Record<string, IPagePreviewData[]> = {};
    const index = createSearchIndex();

    for (let {path, name} of categories) {
        const categoryIndex = createSearchIndex();
        const cleanedName = cleanupPath(name);
        const categoryPagePreviews: IPagePreviewData[] = (pagePreviews[
            cleanedName
        ] = []);

        // Add all available mdx files to the index
        const files = await getMDXFiles(path);
        for (let file of files) {
            let filePath = Path.join(path, ...file);
            if ((await FS.lstat(filePath)).isDirectory())
                filePath = Path.join(filePath, "index.mdx");
            const fileContent = await FS.readFile(filePath, "utf-8");

            const pageSummary = await getPageSummary(fileContent, filePath);
            const relativePath = Path.relative(process.cwd(), filePath);
            const doc = {
                path: relativePath,
                title: pageSummary.title,
                tags: pageSummary.tags.join(", "),
                description: pageSummary.description,
                source: fileContent,
            };
            categoryIndex.addDoc(doc);
            index.addDoc(doc);

            categoryPagePreviews.push({
                featuredIndex: pageSummary.featuredIndex ?? 1e4,
                urlBase: "/" + getPathRelativeToPublic(Path.dirname(filePath)),
                url: [name, ...file].map(part => cleanupPath(part)).join("/"),
                file: relativePath,
                mdx: pageSummary.compiledMdx,
            });
        }

        // Save the index to file
        await FS.writeFile(
            Path.join(getSearchDataDir(), `${cleanedName}.json`),
            JSON.stringify(categoryIndex)
        );
    }

    // Save the overall index to file
    await FS.writeFile(
        Path.join(getSearchDataDir(), `all.json`),
        JSON.stringify(index)
    );

    // Save the previews file
    await FS.writeFile(
        Path.join(getSearchDataDir(), `pagePreviews.json`),
        JSON.stringify(pagePreviews)
    );
}

export async function getMDXFiles(
    dir: string,
    urlPath: string[] = []
): Promise<string[][]> {
    const files = await FS.readdir(dir);
    return (
        await Promise.all(
            files.map(async fileName => {
                const file = Path.join(dir, fileName);
                const stat = await FS.lstat(file);
                if (stat.isDirectory())
                    return getMDXFiles(file, [...urlPath, fileName]);
                else if (Path.extname(fileName) == ".mdx") {
                    if (fileName == "index.mdx") return [urlPath];
                    return [[...urlPath, fileName]];
                } else return [];
            })
        )
    ).flat();
}
