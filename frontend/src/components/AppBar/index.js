import * as React from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Drawer from '../Drawer';

function GoBack() {
  const history = useHistory();
  return (
    <BrowserRouter>
      <Button color="inherit" onClick={() => history.goBack()}><ArrowBackIcon/></Button>
    </BrowserRouter>
  );
}

export default function AppBar({logo}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <GoBack />
          </Box>
          { logo &&
            <Typography variant="h6" component="div">
              Logo
            </Typography>
          }
          <Drawer/>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}