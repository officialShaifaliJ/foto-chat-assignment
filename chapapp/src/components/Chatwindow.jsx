import React, { useState } from "react";

const ChatWindow = ({ contact,messages, onSendMessage  }) => {
//   const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  if (!contact) {
    return (
      <div className="chat-window">Select a contact to start chatting!</div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage) {
      const message = {
        contactId: contact.id,
        text: newMessage,
        sender: "me",
        timestamp: Date.now()
      };
      onSendMessage([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-window">
      <h2>Chat with {contact.name}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "me" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
