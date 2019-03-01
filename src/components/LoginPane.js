import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


import TextField from '@material-ui/core/TextField';

import { getUserSetting } from 'lib/utils'
import { MenuItem } from '@material-ui/core';

const LoginPane = ({classes, loginName, show, rooms, selectedRoomId, setLoginName, setSelectedRoomId, onEnterClick}) => (      
    
    <Dialog
        open={show} 
        >
        <TextField                    
            label = "Name"                
            value = { loginName }                
            onChange = { (e) => setLoginName(e.target.value) }
            /> 

        <TextField                    
            select
            label="Chatroom"                    
            value={ selectedRoomId }                    
            onChange = { (e) => setSelectedRoomId(e.target.value) }
            margin="normal"
            >
            {rooms.map(room => (
                <MenuItem key={room.id} value={room.id}>
                    {room.name}
                </MenuItem>
            ))}
        </TextField>
        <Button onClick={onEnterClick} disabled={ !loginName }>Enter</Button>                   
    </Dialog>
);


export default LoginPane;