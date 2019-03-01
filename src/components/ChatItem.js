import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import { MenuItem, Typography } from '@material-ui/core';

class MsgBubble extends React.Component {
    constructor(props) {
        super(props);   

        this.state = {
            anchorEl: null,
        };        
    }

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };    

    render() {        
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const {classes, message, id, reaction} = this.props

        return (
            <div className={classes.msgBubble} style={{position:'relative'}}
                onMouseEnter={this.handlePopoverOpen}
                onMouseLeave={this.handlePopoverClose}
            >   
                <Typography>{message}</Typography>
                <Typography style={{whiteSpace:'nowrap', position:'absolute', bottom:'-10px', right:'5px'}}>h</Typography>
                <Popover                    
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}                    
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                    >
                    
                    <Typography>I use Popover.</Typography>
                    
                </Popover>                
            </div>
            )
    }
}

const ChatItem = ({classes, name, login, message, id, reaction}) => (          
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
                    <MsgBubble classes={classes} message={message} id={id} reaction={reaction} />                
                </div>            
            </div>
        </div>
               
    </div>
);


export default ChatItem;