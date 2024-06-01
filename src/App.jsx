import React, { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';
import TextNode from './components/TextNode';
import SettingsPanel from './components/SettingsPanel';
import AddMessage from './components/AddMessage';

const initialNodes = [];
const initialEdges = [];

let id = 1;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  textNode: TextNode,
};
const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [sidebarNodes, setSidebarNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  const updateNode = (id, message) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: message,
            },
          };
        }
        return node;
      })
    );
    setCurrentNode(null);
  };

  const onSettingsClick = (label) => {
    const node = nodes.find((node) => node.data.label === label);
    setSelectedNode(node);
    setCurrentNode(node);
  };
  


  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const label = event.dataTransfer.getData('node-label');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label, sequence: nodes.length + 1, messages: [] },
    };

    setNodes((nds) => nds.concat(newNode));
    setSidebarNodes((prevSidebarNodes) => prevSidebarNodes.filter(node => node.data.label !== label));
  };

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const saveFlow = () => {
    const emptyTargetNodes = nodes.filter(node => {
      const isTarget = edges.find(edge => edge.target === node.id);
      return !isTarget;
    });

    if (nodes.length > 1 && emptyTargetNodes.length > 1) {
      alert('Error: More than one node has empty target handles.');
    } else {
      console.log('Flow saved:', { nodes, edges });
    }
  };

  const addMessageToNodes = (message) => {
    const newNode = {
      id: getId(),
      type: 'textNode',
      data: { label: message, sequence: sidebarNodes.length + 1, messages: [] },
    };
    setSidebarNodes((nds) => nds.concat(newNode));
  };

  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            node.data = { ...node.data, ...selectedNode.data };
          }
          return node;
        })
      );
    }
  }, [selectedNode]);

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <ReactFlowProvider>
        <Sidebar nodes={sidebarNodes} />
        <div style={{ flex: 1 }} onDragOver={onDragOver} onDrop={onDrop}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={(_, node) => setSelectedNode(node)}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
          <button onClick={saveFlow} style={{ position: 'absolute', top: 5, right: 220 }}>
            Save Flow
          </button>
        </div>
        <AddMessage addMessageToNodes={addMessageToNodes} />
        {selectedNode && (
          <SettingsPanel node={selectedNode} setSelectedNode={setSelectedNode} />
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default App;
