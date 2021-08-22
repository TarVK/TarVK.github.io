import {FC, Fragment, useState, useEffect} from "react";
import {IPagePreviewData} from "services/search/_types/IPagePreviewData";
import {getPreviews} from "./getPreviews";
import {CircularProgress} from "@material-ui/core";
import {PagePreview} from "components/search/PagePreview";

export const PagesCategory: FC<{category: string; maxCount?: number}> = ({
    category,
    maxCount = 6,
}) => {
    const [results, setResults] = useState<IPagePreviewData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const previews = await getPreviews();
            const categoryPreviews = previews[category];

            console.log(previews, categoryPreviews);
            if (!categoryPreviews) {
                setIsLoading(false);
                return;
            }

            const sortedPreviews = [...categoryPreviews]
                .sort((a, b) => a.priority - b.priority)
                .slice(0, maxCount);

            setIsLoading(false);
            setResults(sortedPreviews);
        })();
    }, []);

    if (isLoading) return <CircularProgress />;

    return (
        <Fragment>
            {results.map(preview => (
                <PagePreview key={preview.file} page={preview} />
            ))}
        </Fragment>
    );
};
