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
    
    if (height < 1 || width < 1) {
        throw new Error("Invalid number of nodes in grid graph");
    }

    if (height === 1 && width === 1) {
        const node = graph.addNode(nodeId(startX, startY), data(startX, startY));
        nodes.push(node);
        return { graph, nodes, links };
    }

    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            const node = graph.addNode(nodeId(j, i), data(j, i))
            nodes.push(node);
            if (i > 0) { 
                const link = graph.addLink(nodeId(j, i), nodeId(j, i -1));
                links.push(link);
            }
            if (j > 0) {
                const link = graph.addLink(nodeId(j, i), nodeId(j-1, i));
                links.push(link);
            }
        }
    }

    return { graph, nodes, links };
}