import { getNodeByPoint, generate as generate, getNodeIdFromPoint, getPointFromNodeId } from "./graph";
import { Graph } from "ngraph.graph";

describe('graph', () => {
    describe('ids', () => {
        it ('should create id', () => {
            const result = getNodeIdFromPoint(1, 1);
            expect(result).toBe('1-1');
        })
        it('should get point', () => {
            const { x, y } = getPointFromNodeId('1-2')
            expect(x).toBe(1);
            expect(y).toBe(2);
        })
    })
    describe('generate', () => {
        it ('should offset', () => {
            const { nodes } = generate(-1, -1, 1, 1, () => {});
            expect(nodes[0].id).toBe('-1--1');
        });
        it ('should create node and no link', () => {
            const { links, nodes} = generate(0, 0, 1, 1, () => {});
            expect(nodes.length).toBe(1);
            expect(links.length).toBe(0);
        })
        it ('should set x in id', () => {
            const { graph } = generate(0, 0, 2, 1, () => true);
            const node = getNodeByPoint(graph, 1, 0);
            expect(node).not.toBeUndefined();
        });
        it ('should set y in id', () => {
            const { graph } = generate(0, 0, 1, 2, () => true);
            const node = getNodeByPoint(graph, 0, 1);
            expect(node).not.toBeUndefined();
        });
        it ('should create nodes and links', () => {
            const { links, nodes} = generate(0, 0, 2, 2, () => {});
            expect(nodes.length).toBe(4);
            expect(links.length).toBe(4);
        });
        it ('should set data', () => {
            const { graph } = generate(0, 0, 2, 2, () => ({ something: true}));
            graph.forEachNode(n => {
                expect(n).toHaveProperty("data");
                expect(n.data).toHaveProperty('something');
                expect(n.data.something).toBeTruthy();
            });
        });
    })

    describe('join', () => {
        let graph: Graph;
        beforeEach(() => {
            graph = generate(0, 0, 2, 2, () => {}).graph;
        })
        it('should block overlapping', () => {
            const { links, nodes } = generate(0, 0, 1, 1, () => {}, graph);
            expect(nodes.length).toBe(0);
            expect(links.length).toBe(0);
        })
        describe('when top', () => {            
            it('should create nodes and links', () => {
                const { nodes, links } = generate(0, -1, 2, 1, () => {}, graph);
                expect(nodes.length).toBe(2);
                expect(links.length).toBe(3);
            })
        })
        describe('when left', () => {            
            it('should create nodes and links', () => {
                const { nodes, links } = generate(-1, 0, 1, 2, () => {}, graph);
                expect(nodes.length).toBe(2);
                expect(links.length).toBe(3);
            })
        })
        describe('when right', () => {            
            it('should create nodes and links', () => {
                const { nodes, links } = generate(2, 0, 1, 2, () => {}, graph);
                expect(nodes.length).toBe(2);
                expect(links.length).toBe(3);
            })
        })
        describe('when bottom', () => {            
            it('should create nodes and links', () => {
                const { nodes, links } = generate(0, 2, 2, 1, () => {}, graph);
                expect(nodes.length).toBe(2);
                expect(links.length).toBe(3);
            })
        })
    })
});