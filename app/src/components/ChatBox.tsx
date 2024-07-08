import React, {useEffect, useState} from "react";
import socket from "../util/socket";
import '../assets/css/styleChatBox.scss'

const ChatBox = () => {
    const [content, setContent] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);

    const profile = JSON.parse(localStorage.getItem("profile") as string);

    useEffect(() => {
        socket.auth = {
            user_id: profile.user_id
        }
        socket.connect()
        socket.on('receive-private-message', (data) => {
            setMessages((messages) => [...messages, {
                content: data.content,
                isSender: false
            }]);
        })
        return () => {
            socket.off('receive-private-message');
            socket.disconnect()
        }
    },[])

    const handleSend = (evemt: React.FormEvent<HTMLFormElement>) => {
        evemt.preventDefault()
        socket.emit("private-message", {
            content,
            to: "1"
        })
        setMessages((messages) => [...messages, {
            content,
            isSender: true
        }])
        setContent('');
    }

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index} className='message-container mb-2'>
                        <div className={message.isSender ? 'message-sender message': 'message'}>{message.content}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className='d-flex justify-content-center'>
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