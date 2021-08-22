import Path from "path";

export function getSearchDataDir(): string {
    return Path.join(process.cwd(), "public", "search");
}
