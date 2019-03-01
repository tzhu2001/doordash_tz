const drawerWidth = 240;
const appMainStyles = theme => ({
    root: {
        display: 'flex',
    },    
    rootLoggedOut: {
        display: 'none'
    },
    smallAvatar: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4
    },
    avatarContainer: {
        display:'flex', 
        flexDirection: 'column', 
        justifyContent:'flex-end',        
        marginRight: theme.spacing.unit
    },
    msgContainer: {
        marginBottom: theme.spacing.unit * 2
    },
    myMessage: {
        paddingLeft: "25%",
    },
    chatInput: {
        flexGrow: 1,
    },
    othersMessage: {
        paddingRight: "25%",
    },
    msgBubble: {
        background: 'rgba(0,0,0,0.05)',
        borderRadius: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    appBarBottom: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        },
        top: 'auto',
        background: theme.palette.background.default,
        bottom: 0,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,        
    },
    grow: {
        flexGrow: 1,
    },
    loginCaption: {
        position:'absolute', 
        bottom:'0px', 
        right:'0px',
        paddingRight:theme.spacing.unit
    },
    popover: {
       // pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing.unit,
    },    
});

export default appMainStyles;