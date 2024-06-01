// TextNode.jsx
import React from 'react';
import { Handle } from 'reactflow';
import { FaCog } from 'react-icons/fa';

const TextNode = ({ data, id, onSettingsClick }) => {
  const handleClick = () => {
    onSettingsClick(data.label);
  };

  return (
    <div style={{border: '1px solid #777', borderRadius: 5, position: 'relative',minWidth:'9rem',height:'2.5rem',padding:'0 0 15px 0' }}>
      <Handle type="target" position="left" />
      <div style={{width:'100%',display:'flex',height:'1rem',fontSize:'0.65rem',textAlign:'center',justifyContent:'space-around',padding:'5px 0',backgroundColor:'#d8f3dc'}}>
       
          <p style={{marginTop:'0'}}>Send Message</p>
      
        <FaCog
          onClick={handleClick}
          style={{ cursor: 'pointer', width: '12px' }}
        />
      </div>
      <div style={{padding:'2px 5px'}}>{data.label}</div>
      <Handle type="source" position="right" />
    </div>
  );
};

export default TextNode;
