import React from 'react';

const Sidebar = ({ nodes }) => {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('node-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ width: 200, background: '#f0f0f0', padding: 10 }}>
      <div
        style={{ marginBottom: 10, padding: 10, border: '1px solid #ccc', borderRadius: 5, cursor: 'grab' }}
      >
        Nodes Panel
      </div>
      {nodes.map((node) => (
        <div
          key={node.id}
          style={{ marginBottom: 10, padding: 10, border: '1px solid #ccc', borderRadius: 5, cursor: 'grab',overflow:'hidden' }}
          onDragStart={(event) => onDragStart(event, node.type, node.data.label)}
          draggable
        >
          {node.data.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
