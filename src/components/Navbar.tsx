import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Modal,
    Paper,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";

import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import {PlainLink} from "./PlainLink";
import {SearchBar} from "./search/SearchBar";
import {SearchResults} from "./search/SearchResults";

type ILink = {name: string; to: string; el?: JSX.Element};

const useStyles = makeStyles(theme => ({
    hideMobile: {
        display: "block",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    showMobile: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block",
        },
    },
}));

export const Navbar: FC<{
    hasSidebar?: boolean;
    setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}> = ({hasSidebar, setSidebarOpen}) => {
    const styles = useStyles();

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [search, setSearch] = useState("");

    const toggleDrawer = (override?: boolean) =>
        setDrawerVisible(visible => override ?? !visible);

    const home = (
        <PlainLink href="/">
            <Button
                color="primary"
                css={theme => ({
                    height: theme.mixins.toolbar.height,
                    "> *": {
                        display: "inline-block",
                        height: "100%",
                    },
                })}>
                <img src="/images/headerLogo.png" css={{height: "100%"}} />
            </Button>
        </PlainLink>
    );
    const leftLinks: ILink[] = [
        {name: "Projects", to: "/#projects"},
        {name: "Articles", to: "/#articles"},
        {name: "Hobbies", to: "/#hobbies"},
    ];
    const rightLinks: ILink[] = [
        {
            name: "Github",
            el: (
                <GitHubIcon
                    css={theme => ({fontSize: 40, verticalAlign: "middle"})}
                />
            ),
            to: "https://www.github.com/TarVK",
        },
    ];

    const drawerList = () => (
        <Box
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
            px={1}>
            <List>
                {leftLinks.map(({name, el, to}) => (
                    <ListItem
                        css={theme => ({
                            paddingLeft: theme.spacing(1),
                            paddingRight: theme.spacing(1),
                        })}
                        button
                        key={name}>
                        <PlainLink href={to}>
                            <ListItemText>
                                <Typography color="primary" variant="h6">
                                    {el ?? name}
                                </Typography>
                            </ListItemText>
                        </PlainLink>
                    </ListItem>
                ))}
                <Divider />
                {rightLinks.map(({name, el, to}) => (
                    <ListItem
                        css={theme => ({
                            paddingLeft: theme.spacing(1),
                            paddingRight: theme.spacing(1),
                        })}
                        button
                        key={name}>
                        <PlainLink href={to}>
                            <ListItemText>
                                <Typography color="primary" variant="h6">
                                    {el ?? name}
                                </Typography>
                            </ListItemText>
                        </PlainLink>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky">
            <Toolbar
                css={theme => ({
                    [theme.breakpoints.down("sm")]: {minHeight: 0},
                })}>
                <Box className={styles.showMobile} style={{width: "100%"}}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between">
                        {hasSidebar && (
                            <Button
                                color="primary"
                                onClick={() => setSidebarOpen?.(d => !d)}
                                css={{height: "100%"}}>
                                <MenuIcon />
                            </Button>
                        )}
                        {home}

                        <Button
                            color="primary"
                            onClick={() => toggleDrawer()}
                            css={{height: "100%"}}>
                            <MenuIcon />
                        </Button>
                        <Drawer
                            anchor="right"
                            open={drawerVisible}
                            onClose={() => toggleDrawer(false)}>
                            {drawerList()}
                        </Drawer>
                    </Grid>
                </Box>
                <Box className={styles.hideMobile} style={{width: "100%"}}>
                    <Container>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between">
                            <Box css={{display: "inline"}}>
                                {home}
                                <Box css={{display: "inline"}} mr={3} />
                                {leftLinks.map(({name, el, to}) => (
                                    <Button color="primary" key={name}>
                                        <PlainLink href={to}>
                                            <Typography variant="h6">
                                                {el ?? name}
                                            </Typography>
                                        </PlainLink>
                                    </Button>
                                ))}
                            </Box>
                            <Box>
                                {rightLinks.map(({name, el, to}) => (
                                    <Button color="primary" key={name}>
                                        <PlainLink href={to}>
                                            <Typography variant="h6">
                                                {el ?? name}
                                            </Typography>
                                        </PlainLink>
                                    </Button>
                                ))}
                                <SearchBar onSubmit={setSearch} />

                                <Modal
                                    open={!!search}
                                    onClose={() => setSearch("")}>
                                    <Container style={{outline: "none"}}>
                                        <Paper
                                            css={theme => ({
                                                marginTop: theme.spacing(4),
                                                padding: theme.spacing(1),
                                            })}>
                                            <SearchResults
                                                index="all.json"
                                                query={search}
                                            />
                                        </Paper>
                                    </Container>
                                </Modal>
                            </Box>
                        </Grid>
                    </Container>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
