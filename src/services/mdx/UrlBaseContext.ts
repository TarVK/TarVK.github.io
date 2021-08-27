import {createContext, useContext} from "react";
import Path from "path";

export const UrlBaseContext = createContext("");

export const useUrl = (url: string) => {
    const urlBase = useContext(UrlBaseContext);
    if (url[0] == "~") return urlBase + url.slice(1);
    return url;
};
