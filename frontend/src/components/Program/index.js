import React from 'react';
import { Redirect } from 'react-router-dom';


const Program = ({ program }) => {
  return (
    <>
      { ! program &&
        <Redirect to="/404" />
      }
      { program &&
        <div>programme : {program.label}</div>
      }
    </>
  );
}

export default Program;