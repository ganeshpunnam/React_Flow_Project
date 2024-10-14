import React, { useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import 'tailwindcss/tailwind.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <div className="bg-white p-2 rounded shadow-md">
          <h3 className="font-bold">Request Card</h3>
          <input 
            type="text" 
            placeholder="Context Name"
            className="border p-1 rounded w-full"
          />
        </div>
      ),
    },
    position: { x: 250, y: 100 },
  },
  {
    id: '2',
    type: 'output',
    data: {
      label: (
        <div className="bg-white p-2 rounded shadow-md">
          <h3 className="font-bold">Response Card</h3>
          <input 
            type="text" 
            placeholder="Status" 
            className="border p-1 rounded w-full"
          />
          <input 
            type="text" 
            placeholder="Data" 
            className="border p-1 rounded w-full mt-2"
          />
        </div>
      ),
    },
    position: { x: 600, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#000' } },
];

function RuleEngine() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showCardOptions, setShowCardOptions] = useState(false);

  // Function to handle adding a new card (rule)
  const addNewCard = (label) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((prev) => [...prev, newNode]);
    setShowCardOptions(false);
  };

  return (
    <div className="h-screen p-4 bg-gray-100 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={() => setShowCardOptions(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Rule
        </button>

        <div className="flex space-x-2">
          <button className="bg-green-500 px-4 py-2 rounded text-white">Test Rule</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Refresh</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Help</button>
        </div>
      </div>

      {/* Render card options when 'Add Rule' button is clicked */}
      {showCardOptions && (
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h3 className="font-bold text-lg mb-2">Select a Card to Add:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => addNewCard('Request Card')}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Request Card
            </button>
            <button
              onClick={() => addNewCard('Response Card')}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Response Card
            </button>
          </div>
        </div>
      )}

      {/* React Flow graph for visualization */}
      <div className="w-full h-full bg-white border rounded shadow-lg p-4">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
          onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default RuleEngine;
