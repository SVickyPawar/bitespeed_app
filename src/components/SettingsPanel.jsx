import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ node, setSelectedNode, handleSaveSettings }) => {
  const [label, setLabel] = useState(node.data.label);
  const [sequence, setSequence] = useState(node.data.sequence);

  useEffect(() => {
    setLabel(node.data.label);
    setSequence(node.data.sequence);
  }, [node]);

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleSequenceChange = (event) => {
    setSequence(Number(event.target.value));
  };

  const handleSave = () => {
    handleSaveSettings({
      ...node,
      data: {
        ...node.data,
        label,
        sequence,
      },
    });
    setSelectedNode(null);
  };

  return (
    <aside style={{ width: 200, background: '#f0f0f0', padding: 10 }}>
      <div>
        <label>Text:</label>
        <input
          placeholder="Enter text here"
          type="text"
          value={label}
          onChange={handleLabelChange}
          style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
        />
      </div>
      <div>
        <label>Sequence:</label>
        <input
          type="number"
          value={sequence}
          onChange={handleSequenceChange}
          style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
        />
      </div>
      <button onClick={handleSave} style={{ width: '100%', padding: '5px' }}>
        Save
      </button>
    </aside>
  );
};

export default SettingsPanel;
