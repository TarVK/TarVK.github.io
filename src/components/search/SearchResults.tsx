import {FC, Fragment, useEffect, useState} from "react";
import {SearchResults as ISearchResults} from "elasticlunr";
import {IPagePreviewData} from "services/search/_types/IPagePreviewData";
import {search} from "services/search/search";
import {CircularProgress, Grid} from "@material-ui/core";
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
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start">
            {results.map(preview => (
                <Grid item sm={6} xs={12} key={preview.file}>
                    <PagePreview page={preview} />
                </Grid>
            ))}
            {results.length == 0 && (
                <Grid item sm={12} xs={12}>
                    Nothing could be found matching this prompt
                </Grid>
            )}
        </Grid>
    );
};
