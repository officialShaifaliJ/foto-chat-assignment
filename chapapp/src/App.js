import React, { useEffect, useState } from "react";
import ChatWindow from "./components/Chatwindow";
import ContactList from "./components/ContactList";
import './index.css';
const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [
    { id: 1, name: "Momo" },
    { id: 2, name: "Will" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Hama" },
    { id: 5, name: "Nami" },
    { id: 6, name: "John" },
  ];
  const [messages, setMessages] = useState([]);
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    const socket = new WebSocket("wss://instantdb.mock");

    socket.onopen = () => {
      console.log("Connected to InstantDB");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => socket.close();
  }, []);
 

  const sendMessage = (message) => {
    const ws = new WebSocket("ws://instantdb.com");

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    ws.onopen = () => {
      ws.send(JSON.stringify(message));
    };
  };


  return (
    <div className="app">
      <ContactList contacts={contacts} onSelectContact={handleSelectContact} />
      {/* <ChatWindow contact={selectedContact} /> */}
      <ChatWindow
        contact={selectedContact}
        messages={messages.filter(
          (msg) => msg.contactId === selectedContact?.id
        )}
        onSendMessage={sendMessage}
      />
    </div>
  );
};

export default App;
