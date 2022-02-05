import React from 'react';
import { Redirect } from 'react-router-dom';


const Structure = ({ structure }) => {
  return (
    <>
      { ! structure &&
        <Redirect to="/404" />
      }
      { structure &&
        <div>Structure : {structure.label}</div>
      }
    </>
  );
}

export default Structure;