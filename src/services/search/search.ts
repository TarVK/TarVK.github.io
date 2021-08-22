import elasticlunr, {Index, SearchResults} from "elasticlunr";
import {IDoc} from "./_types/IDoc";

const indices: Record<string, Promise<Index<IDoc>>> = {};

/**
 * Searches for an article that includes the given query term
 * @param indexName The name of the search index to use
 * @param query The query to perform
 */
export async function search(
    indexName: string,
    query: string
): Promise<SearchResults[]> {
    if (!indices[indexName]) {
        indices[indexName] = (async () => {
            const indexData = await fetch(`/search/${indexName}`);
            const indexJSON = await indexData.json();
            return elasticlunr.Index.load<IDoc>(indexJSON);
        })();
    }

    const index = await indices[indexName];
    const result = index.search(query);
    return result;
}
