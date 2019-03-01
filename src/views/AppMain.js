import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import PeopleIcon from '@material-ui/icons/People';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getUserSetting, setUserSetting } from 'lib/utils';

import { chatServerUrl, chatPullFrequency } from 'config'
import ChatServer from 'lib/ChatServer';
import LoginPane from 'components/LoginPane';
import ChatItem from 'components/ChatItem'
import appMainStyles from 'views/styles.js'

import { maxHeaderSize } from 'http';
import { Icon, Badge } from '../../node_modules/@material-ui/core';

class ChatInput extends React.Component {
    constructor(props) {
        super(props); 
        this._textbox  = React.createRef();  

        this.state = {
            chatInput: '',
        }
    }

    getMessage = () => {
        return this.state.chatInput;
    }

    clearMessage = () => {
        this.setState({chatInput:''})
    }

    setFocus = () => {        
        this._textbox.current.focus()
    }

    render() {
        const {classes} = this.props;
        const {chatInput} = this.state;

        return <InputBase 
                    autoFocus
                    inputRef={this._textbox}                    
                    id="standard-textarea"                                
                    placeholder="Type a message..."
                    multiline
                    className={classes.chatInput}                                
                    onChange={(e)=>this.setState({chatInput:e.target.value})}
                    value={chatInput}
                    />
    }
}

class AppMain extends React.Component {
    constructor(props) {
        super(props);    
        
        this._chatServer = new ChatServer(chatServerUrl)
        this._chatMsgEnd = React.createRef();
        this._chatInput  = React.createRef();

        this.state = {
            rooms : [],
            selectedRoomId: -1,
            allRoomUsers: [],

            messages: [],
            chatInput: '',

            loginName: '', 
            loggedIn: true, 
            loginTime: -1,
            loginElapsedString: '',

            mobileOpen: false,
            chatPullTimer: undefined,

            roomUserMenuAnchor: null,
        };

        this.pullMessage = this.pullMessage.bind(this)
    }

    async componentDidMount() {        
        const rooms     = await this._chatServer.listRooms();
        
        const selectedRoomId = parseInt( getUserSetting("selectedRoomId", rooms[0].id ) )
        const loginName = getUserSetting("loginName", '' )
        const loggedIn = getUserSetting("loggedIn", false )        
        const loginTime = parseInt( getUserSetting("loginTime", new Date().getTime() ) )
        
        this.setState( {rooms, selectedRoomId, loginName, loginTime, loggedIn} )
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loggedIn!==this.state.loggedIn) {
            const { chatPullTimer, loggedIn } = this.state;  
            this.toggleMessageSync({...this.state});
            
        } 
        
        if (prevState.messages!=this.state.messages) {            
            this._chatMsgEnd.current.scrollIntoView()//{behavior:'smooth'})
        } 

    }

    async pullMessage () {        
        const { selectedRoomId, messages, allRoomUsers, loginTime, loginElapsedString } = this.state
        const latest = await this._chatServer.listMessages(selectedRoomId) 
        const roomInfo  = await this._chatServer.getRoomInfo(selectedRoomId) 

        if (messages.length===0 || latest[latest.length-1].id !== messages[messages.length-1].id) { // only update state if there are new messages            
            this.setState( {messages: latest} ) ;    
        } 
        
        // check if there are any new users
        const updatedUserList = new Set(roomInfo.users);
        const oriUserList = new Set(roomInfo.users);
        
        const addUserList = [...updatedUserList].filter(x => !oriUserList.has(x))
        const minusUserList = [...oriUserList].filter(x => !updatedUserList.has(x))

        if (addUserList.length !==0 || minusUserList!==0){            
            this.setState( {allRoomUsers: roomInfo.users} ) ;    
        }

        // udpate the login time
        const elapsedSec = (new Date() - new Date(loginTime))/1000;
        const date = new Date(null);
        date.setSeconds(elapsedSec); 
        const newLoginElapsedString = date.toISOString().substr(11, 8);  
        if (newLoginElapsedString!==loginElapsedString){
            this.setState({loginElapsedString:newLoginElapsedString})
        }
        
    }

    toggleMessageSync = ({chatPullTimer, loggedIn, selectedRoomId}) => {
        console.log('sync message pull timer')
        if (!loggedIn && chatPullTimer) {
            clearInterval(chatPullTimer)
            this.setState({chatPullTimer: undefined})
        } else {
            const newTimer = setInterval( this.pullMessage, 1000/chatPullFrequency, selectedRoomId )
            this.setState({chatPullTimer: newTimer})    
        }        
    }

    setLoginName = (loginName) => {        
        this.setState({loginName})
        setUserSetting('loginName', loginName)
    }

    setSelectedRoomId = (selectedRoomId) => {        
        this.setState({mobileOpen:false, selectedRoomId})
        setUserSetting('selectedRoomId', selectedRoomId)
        
        this.pullMessage()        
    } 

    handleEnterChat = () => {
        const loginTime = new Date().getTime();
        const {selectedRoomId, loginName, allRoomUsers} = this.state;

        this.setState({loggedIn: true, loginTime})

        setUserSetting('loggedIn', true)        
        setUserSetting('loginTime', loginTime )        
        
    }

    handleExitChat = () => {
        this.setState({mobileOpen: false, loggedIn: false, messages:[]})
        setUserSetting('loggedIn', false)        
    }

    _renderToolbar = () => {
        const { classes, theme } = this.props;
        const { loginName, rooms, selectedRoomId, allRoomUsers, roomUserMenuAnchor } = this.state;
        const room = rooms.filter(x=>x.id==selectedRoomId)
        const roomName = (room.length>0)? room[0].name : ''
        
        return (
                <Toolbar>
                    <IconButton
                        color="inherit"                        
                        onClick={this.handleDrawerToggle}
                        className={classes.menuButton}
                        >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {roomName}
                    </Typography> 
                    <IconButton color="inherit"                              
                            onClick={(e)=>{this.setState({roomUserMenuAnchor:e.currentTarget})} }>
                        <Badge badgeContent={allRoomUsers.length}>
                            <PeopleIcon/>
                        </Badge>    
                    </IconButton> 
                    <Menu                                                
                        anchorEl={roomUserMenuAnchor}                       
                        open={Boolean(roomUserMenuAnchor)} 
                        onClose={()=>{this.setState({ roomUserMenuAnchor: null })}}
                        >                        
                        {allRoomUsers.map((user) => (
                                <MenuItem key={user}>{user}</MenuItem>
                            ))}                                                
                    </Menu>                    
                </Toolbar>    
        )
    }
    

    _renderDrawer = () => {
        const { rooms, loginName, selectedRoomId, loginElapsedString } = this.state;
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} style={{position:'relative'}}>
                    <Typography>DoorDash Chat</Typography>
                    <Typography variant={'caption'} className={classes.loginCaption}>{loginName} logged in {loginElapsedString} </Typography>
                </div>
                <Divider />
                <Typography variant='subtitle2'>Chatrooms</Typography>
                <List>
                    {rooms.map((room) => (
                    <ListItem button key={room.id} onClick={(e)=>this.setSelectedRoomId(room.id) }
                        style={{background: (selectedRoomId===room.id)? theme.palette.action.selected:theme.palette.background.paper  }}
                        >                    
                        <ListItemText primary={room.name}  />
                    </ListItem>
                    ))}
                </List>    
                <Divider />
                <List>
                    <ListItem button key='logout' onClick={this.handleExitChat}>                    
                        <ListItemText primary="Log out" />
                    </ListItem>
                </List>
            </div>
          );

        return (
                <div>
                    <Hidden smUp implementation="css">
                        <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        >
                        {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                        >
                        {drawer}
                        </Drawer>
                    </Hidden>
                </div>
        )
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    render() {        
        const { classes, theme } = this.props;
        const { loggedIn, rooms, messages, selectedRoomId, loginName, chatInput } = this.state;        
        return (
                <div>
                    <div className={ loggedIn? classes.root : classes.rootLoggedOut } >
                        <CssBaseline />
                        <AppBar position="fixed" className={classes.appBar}>
                            { this._renderToolbar() }
                        </AppBar>
                        <nav className={classes.drawer}>

                            { this._renderDrawer() }
                        </nav>>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            {messages.map(m => (
                                    <ChatItem classes={classes} key={m.id} 
                                    login={loginName}
                                    name={m.name} message={m.message} reaction={m.reaction} />                                    
                                ))}
                            <div className={classes.toolbar} ref={this._chatMsgEnd}/>
                        </main> 


                        <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                            <Toolbar>
                                <ChatInput ref={this._chatInput} classes={classes} />
                                <IconButton onClick={(e)=>{ this._chatServer.commitChatMessage(selectedRoomId, loginName, this._chatInput.current.getMessage() );
                                                            this._chatInput.current.clearMessage()
                                                            this.setState({chatInput:'',
                                                                            messages:[...messages, {name:loginName, message:chatInput, id:'_sending_', reaction:[]}]})
                                                            
                                                            }}>
                                    <SendIcon/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>                                                            
                    </div>
                    <LoginPane show={!loggedIn} 
                                rooms={rooms} 
                                selectedRoomId={selectedRoomId} 
                                loginName={loginName}
                                setLoginName={this.setLoginName}
                                setSelectedRoomId={this.setSelectedRoomId}
                                onEnterClick={this.handleEnterChat}
                    />                           
                </div>
                )
    }
}

AppMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appMainStyles, {withTheme: true})(AppMain);
