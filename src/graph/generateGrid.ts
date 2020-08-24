import createGraph from 'ngraph.graph';
import nodeId from './nodeId'

export default function generateGrid<NodeData>(
    startX: number,
    startY: number,
    width: number,
    height: number, 
    data: (x: number, y: number) => NodeData) {
    
    if (height < 1 || width < 1) {
        throw new Error("Invalid number of nodes in grid graph");
    }
    
    var g = createGraph();

    if (height === 1 && width === 1) {
        g.addNode(nodeId(startX, startY), data(startX, startY));
        return g;
    }

    for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
        g.addNode(nodeId(j, i), data(j, i))
        if (i > 0) { g.addLink(nodeId(j, i), nodeId(j, i -1)); }
        if (j > 0) { g.addLink(nodeId(j, i), nodeId(j-1, i)); }
    }
    }

    return g;
}