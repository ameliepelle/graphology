import Graph from 'graphology-types';

type PointerArray = Uint8Array | Uint16Array | Uint32Array | Float64Array;

type LouvainIndexOptions = {
  attributes: {
    weight: string;
  };
  keepDendrogram: boolean;
  weighted: boolean;
};

type CommunityMapping = {[key: string]: number};
type NeighborhoodProjection = {[key: string]: Array<string>};

export class UndirectedLouvainIndex {
  constructor(graph: Graph, options?: LouvainIndexOptions);

  M: number;
  C: number;
  E: number;
  level: number;
  graph: Graph;
  neighborhood: PointerArray;
  starts: PointerArray;
  nodes: Array<string>;

  bounds(index: number): [number, number];
  project(): NeighborhoodProjection;
  isolate(index: number, degree: number): number;
  move(index: number, degree: number, targetCommunity: number): void;
  computeNodeDegree(index: number): number;
  expensiveMove(index: number, targetCommunity: number): void;
  expensiveIsolate(index: number): number;
  zoomOut(): {[key: string]: number};
  modularity(): number;
  delta(
    index: number,
    degree: number,
    targetCommunityDegree: number,
    targetCommunity: number
  ): number;
  deltaWithOwnCommunity(
    index: number,
    degree: number,
    targetCommunityDegree: number,
    targetCommunity: number
  ): number;
  fastDelta(
    index: number,
    degree: number,
    targetCommunityDegree: number,
    targetCommunity: number
  ): number;
  fastDeltaWithOwnCommunity(
    index: number,
    degree: number,
    targetCommunityDegree: number,
    targetCommunity: number
  ): number;
  collect(level?: number): CommunityMapping;
  assign(prop: string, level?: number): void;
}

export class DirectedLouvainIndex {
  constructor(graph: Graph, options?: LouvainIndexOptions);

  M: number;
  C: number;
  E: number;
  level: number;
  graph: Graph;
  neighborhood: PointerArray;
  starts: PointerArray;
  offsets: PointerArray;
  nodes: Array<string>;

  bounds(index: number): [number, number];
  inBounds(index: number): [number, number];
  outBounds(index: number): [number, number];
  project(): NeighborhoodProjection;
  projectIn(): NeighborhoodProjection;
  projectOut(): NeighborhoodProjection;
  isolate(index: number, inDegree: number, outDegree: number): number;
  move(
    index: number,
    inDegree: number,
    outDegree: number,
    targetCommunity: number
  ): void;
  computeNodeInDegree(index: number): number;
  computeNodeOutDegree(index: number): number;
  expensiveMove(index: number, targetCommunity: number): void;
  zoomOut(): {[key: string]: number};
  modularity(): number;
  delta(
    index: number,
    inDegree: number,
    outDegree: number,
    targetCommunityDegree: number,
    targetCommunity: number
  ): number;
  deltaWithOwnCommunity(
    index: number,
    inDegree: number,
    outDegree: number,
    targetCommunityDegree: number,
    targetCommunity: number
  ): number;
  collect(level?: number): CommunityMapping;
  assign(prop: string, level?: number): void;
}
