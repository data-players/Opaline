import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const containerMargin = 40;
const containerMarginAfterTransition = 12;

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: containerMargin,
    marginRight: containerMargin,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: containerMarginAfterTransition,
      paddingRight: containerMarginAfterTransition,
    },
  },
}));

const LargeContainer = React.forwardRef(({ children, ...rest }, ref) => {
  const classes = useStyles();
  return (
    <Container ref={ref} maxWidth="lg" classes={{ root: classes.container }} {...rest}>
      {children}
    </Container>
  );
});

export default LargeContainer;
