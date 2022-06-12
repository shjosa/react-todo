import {PropsWithChildren} from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = ({ children }: PropsWithChildren<{}>) => {
    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" component="div">
                    {children}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}