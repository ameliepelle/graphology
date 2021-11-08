import Graph from 'graphology-types';

export function connectedComponents(graph: Graph): Array<Array<string>>;
export function largestConnectedComponent(graph: Graph): Array<string>;
export function stronglyConnectedComponents(graph: Graph): Array<Array<string>>;
export function largestConnectedComponentSubgraph<G extends Graph>(graph: G): G;
export function cropToLargestConnectedComponent<G extends Graph>(graph: G): G;
