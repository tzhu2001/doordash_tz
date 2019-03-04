import React from 'react';
import InputBase from '@material-ui/core/InputBase';

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

export default ChatInput;