import { simpleGet, simplePost } from 'lib/utils'


class ChatServer {
    constructor(chat_server_url) {
        this._chat_server_url = chat_server_url;        
    }

    listRooms() {
        return simpleGet( `${this._chat_server_url}/rooms`);
    }

    getRoomInfo( roomID ) {
        return simpleGet( `${this._chat_server_url}/rooms/${roomID}` );
    }

    listMessages( roomID ) {
        return simpleGet( `${this._chat_server_url}/rooms/${roomID}/messages`);
    }

    commitChatMessage(roomID, name, message) {
        simplePost( `${this._chat_server_url}/rooms/${roomID}/messages`, {name, message})
    }

    setReaction(roomID, name, id, reaction) {
        simplePost( `${this._chat_server_url}/rooms/${roomID}/messages`, {id, reaction})
    }    
}

export default ChatServer;

