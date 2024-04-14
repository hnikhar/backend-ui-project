const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

let treeData = [
    {
        label: 'Server Root',
        children: [
            {
                label: 'Parent A',
                children: [
                    { label: 'Child A1' },
                    {
                        label: 'Child Parent A2',
                        children: [
                            { label: 'Child A21' },
                            { label: 'Child A22' }
                        ]
                    }
                ]
            },
            {
                label: 'Parent B',
                children: [
                    { label: 'Child B1' },
                    { label: 'Child B2' },
                    { label: 'Child Parent B3' }
                ]
            }
        ]
    }
];

// API endpoints
app.get('/api/treeData', (req, res) => {
    res.json(treeData);
});


// Helper function to find a node in treeData
function findNode(tree, label) {
    for (const node of tree) {
        if (node.label === label) {
            return node;
        }
        if (node.children) {
            const foundNode = findNode(node.children, label);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null; // Node not found
}

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});