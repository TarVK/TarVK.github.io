import {FC, Fragment, useEffect, useState} from "react";
import {SearchResults as ISearchResults} from "elasticlunr";
import {IPagePreviewData} from "services/search/_types/IPagePreviewData";
import {search} from "services/search/search";
import {CircularProgress} from "@material-ui/core";
import {PagePreview} from "components/search/PagePreview";
import {getPreviews} from "./getPreviews";

export const SearchResults: FC<{query: string; index: string}> = ({
    query,
    index,
}) => {
    const [results, setResults] = useState<IPagePreviewData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (query) {
                setIsLoading(true);
                const [searchResults, previews] = await Promise.all([
                    search(index, query),
                    getPreviews(),
                ]);
                const previewsList = Object.values(previews).flat();

                const foundPreviews = searchResults
                    .map(({ref}) => previewsList.find(({file}) => file == ref))
                    .filter((res): res is IPagePreviewData => !!res);

                setIsLoading(false);
                setResults(foundPreviews);
            }
        })();
    }, [query]);

    if (isLoading) return <CircularProgress />;

    return (
        <Fragment>
            {results.map(preview => (
                <PagePreview key={preview.file} page={preview} />
            ))}
        </Fragment>
    );
};
