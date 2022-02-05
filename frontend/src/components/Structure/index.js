import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import WorkIcon from '@mui/icons-material/Work';

import AppBar from '../AppBar';
import { getSlugFromContainerUrl } from '../../selectors/urls';


const Structure = ({ structure, programs }) => {
  return (
    <>
      { ! structure &&
        <Redirect to="/404" />
      }
      { structure &&
        <>
          <AppBar/>
          <div>Structure : {structure.label}</div>
          <List sx={{/* width: '100%', maxWidth: 360, bgcolor: 'background.paper' */}}>
            { programs.map((program, index) => (
              <ListItem button key={index} component={Link} to={`/programmes/${getSlugFromContainerUrl('programs', program.id)}`}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={program.label} 
                    secondary={program.id}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      }
    </>
  );
}

export default Structure;