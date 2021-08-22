import {ReactNode} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {isClient} from "services/isClient";
import DomParser from "dom-parser";
const parser = new DomParser();

/**
 * Retrieves the purely textual content of an element
 * @param element The element to get the text for
 * @returns The text content
 */
export function getReactNodeTextContent(element: ReactNode): string {
    const html = renderToStaticMarkup(<body>{element}</body>);
    const dom = parser.parseFromString(html);
    return dom.getElementsByTagName("body")?.[0]?.textContent ?? "";
}
