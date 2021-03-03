// Message component; displays a message under navigation bar
import React from 'react';
import { Button } from 'react-bootstrap';
import './Message.css';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMsg: true};
    }

    hideMsg() {
        this.setState({showMsg: false});
    }

    render() {
        if (this.state.showMsg) {
            return (
                <div className="message">
                    <span className="message-text">Test Message</span>
                    <Button 
                        variant="outline-warning"
                        size="sm"
                        onClick={() => this.hideMsg()}
                    >X</Button>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Message;