import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './ArtistListFilter.css';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export default function ArtistListFilter({filterArtistListHandler}) {
    const theme = useTheme();
    let alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    alphabet = alphabet.map((item, index) => {
        return <li key={index} onClick={() => filterArtistListHandler(item)}><span>{item}</span></li>
    })

    return (
        <div className="ArtistListFilter">
            <AppBar position="static" color="default">
                <Tabs
                    value={0}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Artists" />
                </Tabs>
            </AppBar>
            <TabPanel value={0} index={0} dir={theme.direction}>
                <ul className="ArtistListFilter-alphabet">
                    {alphabet}
                </ul>
            </TabPanel>
        </div>
    );
}