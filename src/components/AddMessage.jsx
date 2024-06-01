// AddMessage.jsx
import React, { useState, useEffect } from 'react';

const AddMessage = ({ addMessageToNodes, updateNode, currentNode }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentNode) {
      setMessage(currentNode.label);
    }
  }, [currentNode]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddMessage = () => {
    if (message.trim()) {
      if (currentNode) {
        updateNode(currentNode.id, message);
      } else {
        addMessageToNodes(message);
      }
      setMessage('');
    }
  };

  return (
    <aside style={{ width: 200, background: '#f0f0f0', padding: 10, position: 'absolute', right: 0, top: 0 }}>
      <div>
        <h3>{currentNode ? 'Edit Message' : 'Add Message'}</h3>
        <input
          style={{ height: '2.5rem', width: '100%' }}
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Enter text"
        />
      </div>
      <button onClick={handleAddMessage}>{currentNode ? 'Save Changes' : 'Add Message'}</button>
    </aside>
  );
};

export default AddMessage;
