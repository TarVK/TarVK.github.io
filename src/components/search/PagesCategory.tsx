import {FC, Fragment, useState, useEffect} from "react";
import {IPagePreviewData} from "services/search/_types/IPagePreviewData";
import {getPreviews} from "./getPreviews";
import {Box, CircularProgress, Grid} from "@material-ui/core";
import {PagePreview} from "components/search/PagePreview";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./SearchResults";
import {Button} from "@material-ui/core";

export const PagesCategory: FC<{
    category: string;
    maxCount?: number;
    allowSearch?: boolean;
    allowReveal?: boolean;
}> = ({category, maxCount = 4, allowSearch = true, allowReveal = true}) => {
    const [results, setResults] = useState<IPagePreviewData[]>([]);
    const [allResults, setAllResults] = useState<IPagePreviewData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const previews = await getPreviews();
            const categoryPreviews = previews[category];

            if (!categoryPreviews) {
                setIsLoading(false);
                return;
            }

            const sortedPreviews = [...categoryPreviews].sort(
                (a, b) => a.priority - b.priority
            );
            const limitedSortedPreviews = sortedPreviews.slice(
                0,
                showAll ? Infinity : maxCount
            );

            setIsLoading(false);
            setAllResults(sortedPreviews);
            setResults(limitedSortedPreviews);
        })();
    }, [showAll]);

    if (isLoading) return <CircularProgress />;

    return (
        <Box css={{position: "relative" as const}}>
            {allowSearch ? (
                <SearchBar
                    onSubmit={search => setSearch(search)}
                    css={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        transform: "translateY(-100%)",
                        width: "auto",
                    }}
                    placeHolder={`Search ${category}…`}
                />
            ) : undefined}
            {search ? (
                <SearchResults index={`${category}.json`} query={search} />
            ) : (
                <Fragment>
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
                    </Grid>
                    {allowReveal && (allResults.length > maxCount || showAll) && (
                        <Button
                            css={theme => ({marginTop: theme.spacing(1)})}
                            onClick={() => setShowAll(s => !s)}>
                            {showAll ? "Show less" : "Show more"}
                        </Button>
                    )}
                </Fragment>
            )}
        </Box>
    );
};
