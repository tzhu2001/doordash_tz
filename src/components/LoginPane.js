import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import logo from 'images/logo.png'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { getUserSetting } from 'lib/utils'
import { MenuItem } from '@material-ui/core';


const LoginPane = ({classes, loginName, show, rooms, selectedRoomId, setLoginName, setSelectedRoomId, onEnterClick}) => (      
    
    <Dialog
        open={show} 
        >
        
        <Grid container className={classes.loginPane} justify="center" >
            
            <img src={logo} className={classes.logo}/>           
            
            <Grid item xs={12}>
                <TextField   
                    fullWidth                 
                    label = "Name"                
                    value = { loginName }                
                    onChange = { (e) => setLoginName(e.target.value) }
                    />
            </Grid>
            
            <Grid item xs={12}>
                <TextField                    
                    fullWidth
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
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={onEnterClick} disabled={ !loginName }>Enter</Button>                   
            </Grid>
        </Grid>
    
    </Dialog>
);


export default LoginPane;