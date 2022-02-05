import React from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from '../AppBar';

const Program = ({ program }) => {
  return (
    <>
      { ! program && 
        <Redirect to="/404" />
      }
      { program &&
        <>
          <AppBar/>
          <div>Programme : {program.label}</div>
        </>
      }
    </>
  );
}

export default Program;