import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import { MenuItem, Typography } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FavIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import HappyIcon from '@material-ui/icons/Mood';
import SadIcon from '@material-ui/icons/SentimentDissatisfied';

class MsgBubble extends React.Component {
    constructor(props) {
        super(props);   

        this.state = {
            reponseMenu: false,
            
        };        
    }

    handlePopoverOpen = event => {
        this.setState({ reponseMenu: true });
    };
    
    handlePopoverClose = () => {
        this.setState({ reponseMenu: false });
    };    

    render() {        
        const { reponseMenu } = this.state;
        const {classes, message, login, name, id, reaction, onClickReaction} = this.props
        const responseMenuStyle = {display: (reponseMenu)? "block": "none"}
        
        if (login===name){
            responseMenuStyle.right = 0;
        } else {
            responseMenuStyle.left = 0;            
        }

        const reactionIcons = [ FavIcon, ThumbUpIcon, HappyIcon, SadIcon ]

        return (
            <div className={classes.msgBubble} style={{position:'relative'}}
                onMouseEnter={this.handlePopoverOpen}
                onMouseLeave={this.handlePopoverClose}
            >   
                <Typography className={classes.messageText}>{message}</Typography>
                
                <Paper className={classes.responseMenu} 
                        style={responseMenuStyle}>

                    {reactionIcons.map( (icon, reactionId) => (
                            <span key={reactionId} onClick={()=>onClickReaction({login, name,id, message, reaction, reactionId})} >
                                { React.createElement(icon, {className:classes.reactionIcon} ) }
                            </span>
                        ))}
                </Paper>
               
            </div>
            )
    }
}

export default MsgBubble;