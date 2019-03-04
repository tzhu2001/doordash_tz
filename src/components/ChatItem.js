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

import MsgBubble from 'components/MsgBubble';

const ChatItem = ({classes, name, login, message, id, reaction, onClickReaction}) => (          
    <div className={classes.msgContainer}>                        
        
        <div style={{display: 'flex', justifyContent: name===login?'flex-end':'flex-start'}}>
            <div className={classes.avatarContainer}>                                                            
                <Avatar className={classes.smallAvatar}>
                    {name[0].toUpperCase()}
                </Avatar>                
            </div>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <div style={{flexGrow:1}}>   
                    <Typography variant="caption">{name}</Typography>
                    <MsgBubble classes={classes} name={name} login={login} 
                                message={message} id={id} reaction={reaction}
                                onClickReaction={onClickReaction} />                
                </div>            
            </div>
        </div>
               
    </div>
);


export default ChatItem;