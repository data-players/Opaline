import React from 'react';
import { Typography } from '@material-ui/core';

const EndResultSubtitle = ({ subTitleClassName }) => (
  <>
    <br/>
    <span className={subTitleClassName}>pour vous aider au <strong>retour à l'emploi</strong></span>
  </>
)

const ResultStepTitle = ({ length, titleClassName, subTitleClassName }) => (
  <Typography component="h2" variant="h2" className={titleClassName}>
    { length === 1 &&
      <>
        Voici la structure <EndResultSubtitle subTitleClassName={subTitleClassName}/>
      </>
    }
    { length > 1 &&
      <>
        Voici les {length} structures <EndResultSubtitle subTitleClassName={subTitleClassName}/>
      </>
    }
  </Typography>
)

export default ResultStepTitle;