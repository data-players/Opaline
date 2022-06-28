import React from 'react';
import {Toolbar, SaveButton} from 'react-admin';

const UserEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

export default UserEditToolbar;
