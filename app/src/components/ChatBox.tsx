import React, {useEffect, useState} from "react";
import socket from "../util/socket";

const ChatBox = () => {
    const [content, setContent] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);

    const profile = JSON.parse(localStorage.getItem("profile") as string);

    useEffect(() => {
        socket.auth = {
            user_id: profile.user_id
        }
        socket.connect()
        socket.on('receive_private-message', (data) => {
            setMessages((messages) => [...messages, {
                content: data.content,
                isSender: false
            }]);
        })
        return () => {
            socket.disconnect()
        }
    },[])

    const handleSubmit = (evemt: React.FormEvent<HTMLFormElement>) => {
        evemt.preventDefault()
        setContent('');
        socket.emit("private-message", {
            content,
            to: "1"
        })
    }

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index} className='message-container'>
                        <div className={message.isSender? 'message-content_sender': ''}>{message.content}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
                <input type='submit' value='Send' />
            </form>
        </div>
    )
}

export default ChatBox;