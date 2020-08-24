import { Graph, Node } from "ngraph.graph";
import nodeIdFunction from './nodeId';

export default function getNodeByPoint<NodeData, LinkData>(graph: Graph<NodeData, LinkData>, x: number, y: number) {
    const nodeId = nodeIdFunction(x, y);
    const nodes: Node<NodeData>[] = [];
    graph.forEachNode(n => { nodes.push(n); });
    return nodes.filter(n => n.id === nodeId)[0];
}