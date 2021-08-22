import elasticlunr from "elasticlunr";
import {IDoc} from "./_types/IDoc";

export function createSearchIndex() {
    return elasticlunr<IDoc>(function () {
        this.addField("title");
        this.addField("description");
        this.addField("tags");
        this.addField("source");
        this.setRef("path");
        this.saveDocument(false);
    });
}
