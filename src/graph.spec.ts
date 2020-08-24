import { getNodeByPoint, generateGrid } from "./graph";

describe('generateGrid', () => {
    describe('generate', () => {
        it ('should set x in id', () => {
            const { graph } = generateGrid(0, 0, 2, 1, () => true);
            const node = getNodeByPoint(graph, 1, 0);
            expect(node).not.toBeUndefined();
        });
        it ('should set y in id', () => {
            const { graph } = generateGrid(0, 0, 1, 2, () => true);
            const node = getNodeByPoint(graph, 0, 1);
            expect(node).not.toBeUndefined();
        });
        it ('should set data', () => {
            const { graph } = generateGrid(0, 0, 2, 2, () => ({ something: true}));
            graph.forEachNode(n => {
                expect(n).toHaveProperty("data");
                expect(n.data).toHaveProperty('something');
                expect(n.data.something).toBeTruthy();
            });
        });
    })

    describe('join', () => {
        describe('when above', () => {
            it ('should create links', () => {

            })
        })
    })
});