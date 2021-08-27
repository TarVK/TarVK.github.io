import {alpha, InputBase, makeStyles} from "@material-ui/core";
import {FC, useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {Interpolation, Theme} from "@emotion/react";

// From: https://material-ui.com/components/app-bar/#app-bar-with-search-field
const useStyles = makeStyles(theme => ({
    search: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "16ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export const SearchBar: FC<{
    onSubmit: (search: string) => void;
    className?: string;
    placeHolder?: string;
}> = ({onSubmit, className, placeHolder = "Search…"}) => {
    const [value, setValue] = useState("");
    const classes = useStyles();

    return (
        <div className={`${classes.search} ${className}`}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={placeHolder}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={value}
                onChange={evt => setValue(evt.target.value)}
                onKeyDown={e => {
                    if (e.keyCode == 13) onSubmit(value);
                    if (e.keyCode == 27) (e.target as HTMLElement).blur();
                }}
                inputProps={{"aria-label": "search"}}
            />
        </div>
    );
};
