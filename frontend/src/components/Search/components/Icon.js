githimport React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNewOutlined';
import ConstructionIcon from '@mui/icons-material/ConstructionOutlined';
import ManIcon from '@mui/icons-material/ManOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import WomanIcon from '@mui/icons-material/WomanOutlined';
import PersonIcon from '@mui/icons-material/WcOutlined';

const useStyles = makeStyles(theme => ({
  nextButtonCiconContainerontainer: {
  }
}));

const Icon = ({ name }) => {
  const classes = useStyles();
  return (
    <Box className={classes.iconContainer}>
      { (name === 'accessibility-new') && <AccessibilityNewIcon /> }
      { (name === 'construction') && <ConstructionIcon /> }
      { (name === 'man') && <ManIcon /> }
      { (name === 'school') && <SchoolIcon /> }
      { (name === 'search') && <SearchIcon /> }
      { (name === 'woman') && <WomanIcon /> }
      { (name === 'person') && <PersonIcon /> }
    </Box>
  )
}

export default Icon;
