import React from 'react';
import { Redirect } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import WorkIcon from '@mui/icons-material/Work';

import { getSlugFromContainerUrl } from '../../selectors/urls';


const Structure = ({ structure, programs }) => {
  return (
    <>
      { ! structure &&
        <Redirect to="/404" />
      }
      { structure &&
        <>
          <div>Structure : {structure.label}</div>
          <List sx={{/* width: '100%', maxWidth: 360, bgcolor: 'background.paper' */}}>
            { programs.map((program, index) => (
              <ListItem key={index}>
                <ListItemButton component="a" href={`/programmes/${getSlugFromContainerUrl('programs', program.id)}`}>
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