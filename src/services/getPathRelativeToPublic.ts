import Path from "path";

export function getPathRelativeToPublic(path: string) {
    const publicPath = Path.join(process.cwd(), "public");
    return Path.relative(publicPath, path);
}
