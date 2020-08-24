import createGraph, { Graph, Node, Link } from 'ngraph.graph';

export function nodeId(x: number, y: number) {
    return `${x}-${y}`;
}

export function getNodeByPoint<NodeData, LinkData>(graph: Graph<NodeData, LinkData>, x: number, y: number) {
    const id = nodeId(x, y);
    const nodes: Node<NodeData>[] = getNodes<NodeData, LinkData>(graph);
    return nodes.filter(n => n.id === id)[0];
}

export function getNodes<NodeData, LinkData>(graph: Graph<NodeData, LinkData>) {
    const nodes: Node<NodeData>[] = [];
    graph.forEachNode(n => { nodes.push(n); });
    return nodes;
}

export function getLinks<NodeData, LinkData>(graph: Graph<NodeData, LinkData>) {
    const links: Link<LinkData>[] = [];
    graph.forEachLink(l => { links.push(l); });
    return links;
}

export function generateGrid<NodeData, LinkData>(
    startX: number,
    startY: number,
    width: number,
    height: number, 
    data: (x: number, y: number) => NodeData,
    graph: Graph<NodeData, LinkData> = createGraph<NodeData, LinkData>()) {

    const links: Link<LinkData>[] = [];
    const nodes: Node<NodeData>[] = [];
    const lastX = startX + width - 1;
    const lastY = startY + height - 1;
    
    if (height < 1 || width < 1) {
        throw new Error("Invalid number of nodes in grid graph");
    }

    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            const y = i + startY;
            const x = j + startX;
            if (getNodeByPoint(graph, x, y)) {
                continue;
            }
            const node = graph.addNode(nodeId(x, y), data(x, y))
            nodes.push(node);
            if (y > startY || getNodeByPoint(graph, x, y - 1)) { 
                const link = graph.addLink(nodeId(x, y), nodeId(x, y -1));
                links.push(link);
            }
            if (y === lastY && getNodeByPoint(graph, x, y + 1)) {
                const link = graph.addLink(nodeId(x, y + 1), nodeId(x, y));
                links.push(link);
            }
            if (x > startX || getNodeByPoint(graph, x - 1, y)) {
                const link = graph.addLink(nodeId(x, y), nodeId(x-1, y));
                links.push(link);
            }
            if (x === lastX && getNodeByPoint(graph, x + 1, y)) {
                const link = graph.addLink(nodeId(x + 1, y), nodeId(x, y));
                links.push(link);
            }
        }
    }

    return { graph, nodes, links };
}