import {promises as FS} from "fs";
import Path from "path";
import {INavItem} from "../../../components/sideIndex/NavItem";
import {IIndex} from "../../../components/sideIndex/Sidebar";
import {getPageSummary} from "../../pageSummary/getPageSummary";
import {cleanupPath, getPathIndex} from "./createStaticPathsCollector";
import {getPagesDir} from "./getPagesDir";

export async function createIndex(
    dir: string,
    selected: string[] = []
): Promise<IIndex> {
    const item = await createNavItem(getPagesDir(dir));
    selected = [...selected];

    if (item && "children" in item && item.children) {
        // Make the specified path selected
        let p: INavItem | undefined = item;
        while (p && "children" in p && p.children && selected.length > 0) {
            const part = selected.shift();
            p.opened = true;
            p = p.children.find(
                item => "name" in item && item.name.toLowerCase() == part
            );
        }
        if (p && "name" in p) p.selected = true;

        return {rootPath: dir ? `/${dir}` : "", items: item.children};
    }
    return {rootPath: dir ? `/${dir}` : "", items: []};
}

async function createNavItem(dir: string): Promise<INavItem | undefined> {
    const stat = await FS.lstat(dir);
    const name = cleanupPath(Path.basename(dir), false);
    const pathOrderIndex = getPathIndex(dir);

    if (!stat.isDirectory()) {
        if (Path.extname(dir) == ".mdx" && name != "index") {
            const orderIndex =
                (await getOrderIndexOverwrite(dir)) ?? pathOrderIndex;
            return {
                name,
                ...(orderIndex != undefined ? {orderIndex} : null),
            };
        } else return undefined;
    }

    const files = await FS.readdir(dir);
    const orderIndex =
        (files.includes("index.mdx")
            ? await getOrderIndexOverwrite(Path.join(dir, "index.mdx"))
            : undefined) ?? pathOrderIndex;
    return {
        name,
        ...(orderIndex != undefined ? {orderIndex} : null),
        opened: false,
        hasIndex: files.includes("index.mdx"),
        children: (
            await Promise.all(
                files.map(fileName => createNavItem(Path.join(dir, fileName)))
            )
        )
            .filter((n): n is INavItem => !!n)
            .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)),
    };
}

async function getOrderIndexOverwrite(
    path: string
): Promise<number | undefined> {
    const fileContent = await FS.readFile(path, "utf-8");
    const pageSummary = await getPageSummary(fileContent, path);
    return pageSummary?.navIndex;
}
