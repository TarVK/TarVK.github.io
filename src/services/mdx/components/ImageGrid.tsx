import {Grid} from "@material-ui/core";
import React, {FC} from "react";
import {useUrl} from "../UrlBaseContext";

export const ImageGrid: FC<{images: string[]; columns?: 2 | 3 | 4}> = ({
    images,
    columns = 2,
}) => (
    <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start">
        {images.map(src => (
            <Grid item sm={(12 / columns) as any} xs={12} key={src}>
                <GridImage src={src} />
            </Grid>
        ))}
    </Grid>
);

const GridImage: FC<{src: string}> = ({src}) => (
    <img
        src={useUrl(src)}
        style={{maxWidth: "100%", minWidth: 0, flexShrink: 1, flexGrow: 1}}
    />
);
