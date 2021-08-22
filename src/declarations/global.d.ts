import {Theme as LibTheme} from "@material-ui/core";
/// <reference path="./TextFit" />
/// <reference path="./remark-sectionize" />
/// <reference types="@emotion/react/types/css-prop" />

declare module "@emotion/react" {
    export interface Theme extends LibTheme {}
}
