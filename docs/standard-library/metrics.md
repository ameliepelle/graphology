---
layout: default
title: metrics
nav_order: 11
parent: Standard library
---

# Graphology metrics

Miscellaneous metrics to be used with [`graphology`](..).

## Installation

```
npm install graphology-metrics
```

## Usage

_Graph metrics_

- [Density](#density)
- [Diameter](#diameter)
- [Extent](#extent)
- [Modularity](#modularity)
- [Weighted size](#weighted-size)

_Node metrics_

- [Centrality](#centrality)
  - [Betweenness centrality](#betweenness-centrality)
  - [Degree centrality](#degree-centrality)
  - [HITS](#hits)
  - [Pagerank](#pagerank)
- [Degree](#degree)
- [Eccentricity](#eccentricity)
- [Weighted degree](#weighted-degree)

_Attributes metrics_

- [Modalities](#modalities)

_Layout quality metrics_

- [Edge Uniformity](#edge-uniformity)
- [Neighborhood Preservation](#neighborhood-preservation)
- [Stress](#stress)

### Density

Computes the density of the given graph.

```js
import {density} from 'graphology-metrics';
import density from 'graphology-metrics/density';

// Passing a graph instance
const d = density(graph);

// Passing the graph's order & size
const d = density(order, size);

// Or to force the kind of density being computed
import {
  mixedDensity,
  directedDensity,
  undirectedDensity,
  multiMixedDensity,
  multiDirectedDensity,
  multiUndirectedDensity
} from 'graphology-metric/density';

const d = undirectedDensity(mixedGraph);
```

_Arguments_

Either:

- **graph** _Graph_: target graph.

Or:

- **order** _number_: number of nodes in the graph.
- **size** _number_: number of edges in the graph.

### Diameter

Computes the diameter, i.e the maximum eccentricity of any node of the given graph.

```js
import {diameter} from 'graphology-metrics';
// Alternatively, to load only the relevant code:
import diameter from 'graphology-metrics/diameter';

const graph = new Graph();
graph.addNode('1');
graph.addNode('2');
graph.addNode('3');
graph.addUndirectedEdge(1, 2);
graph.addUndirectedEdge(2, 3);

diameter(graph);
>>> 2

```

_Arguments_

- **graph** _Graph_: target graph.

### Extent

Computes the extent - min, max - of a node or edge's attribute.

```js
import extent from 'graphology-metrics/extent';

// Retrieving a single node attribute's extent
extent(graph, 'size');
>>> [1, 34]

// Retrieving multiple node attributes' extents
extent(graph, ['x', 'y']);
>>> {x: [-4, 3], y: [-34, 56]}

// For edges
extent.edgeExtent(graph, 'weight');
>>> [0, 5.7]
```

_Arguments_

- **graph** _Graph_: target graph.
- **attributes** _string|array_: single attribute names or array of attribute names.

### Modularity

Computes the modularity, given the graph and a node partition. It works on both directed & undirected networks and will return the relevant modularity.

```js
import {modularity} from 'graphology-metrics';
// Alternatively, to load only the relevant code:
import modularity from 'graphology-metrics/modularity';

// Simplest way
const Q = modularity(graph);

// If the partition is not given by node attributes
const Q = modularity(graph, {
  communities: {1: 0, 2: 0, 3: 1, 4: 1, 5: 1}
});
```

_Arguments_

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options:
  - **attributes** <span class="code">?object</span>: attributes' names:
    - **community** <span class="code">?string</span> <span class="default">community</span>: name of the nodes' community attribute in case we need to read them from the graph itself.
    - **weight** <span class="code">?string</span> <span class="default">weight</span>: name of the edges' weight attribute.
  - **communities** <span class="code">?object</span>: object mapping nodes to their respective communities.
  - **resolution** <span class="code">?number</span>: resolution parameter (`γ`).
  - **weighted** <span class="code">?boolean</span> <span class="default">true</span>: whether to compute weighted modularity or not.

### Weighted size

Computes the weighted size, i.e. the sum of the graph's edges' weight, of the given graph.

```js
import {weightedSize} from 'graphology-metrics';
// Alternatively, to load only the relevant code:
import weightedSize from 'graphology-metrics/weighted-size';

const graph = new Graph();
graph.mergeEdge(1, 2, {weight: 3});
graph.mergeEdge(1, 2, {weight: 1});

// Simplest way
weightedSize(graph);
>>> 4

// With custom weight attribute
weightedSize(graph, 'myWeightAttribute');
>>> 4
```

_Arguments_

- **graph** _Graph_: target graph.
- **weightAttribute** <span class="code">?string</span> <span class="default">weight</span>: name of the weight attribute.

### Centrality

#### Betweenness centrality

Computes the betweenness centrality for every node.

```js
import betweennessCentrality from 'graphology-metrics/centrality/betweenness';

// To compute centrality for every node:
const centrality = betweennessCentrality(graph);

// To compute weighted betweenness centrality
const centrality = betweennessCentrality(graph, {weighted: true});

// To directly map the result onto nodes' attributes (`betweennessCentrality`):
betweennessCentrality.assign(graph);

// To directly map the result onto a custom attribute:
betweennessCentrality.assign(graph, {attributes: {centrality: 'myCentrality'}});
```

_Arguments_

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options:
  - **attributes** <span class="code">?object</span>: Custom attribute names:
    - **centrality** <span class="code">?string</span> <span class="default">betweennessCentrality</span>: Name of the centrality attribute to assign.
    - **weight** <span class="code">?string</span>: Name of the weight attribute.
  - **normalized** <span class="code">?boolean</span> <span class="default">true</span>: should the result be normalized?
  - **weighted** <span class="code">?boolean</span> <span class="default">false</span>: should we compute the weighted betweenness centrality?

#### Degree centrality

Computes the degree centrality for every node.

```js
import degreeCentrality from 'graphology-metrics/centrality/degree';
// Or to load more specific functions:
import {
  degreeCentrality,
  inDegreeCentrality,
  outDegreeCentrality
} from 'graphology-metrics/centrality/degree';

// To compute degree centrality for every node:
const centrality = degreeCentrality(graph);

// To directly map the result onto nodes' attributes (`degreeCentrality`):
degreeCentrality.assign(graph);

// To directly map the result onto a custom attribute:
degreeCentrality.assign(graph, {attributes: {centrality: 'myCentrality'}});
```

_Arguments_

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options:
  - **attributes** <span class="code">?object</span>: custom attribute names:
    - **centrality** <span class="code">?string</span> <span class="default">degreeCentrality</span>: name of the centrality attribute to assign.

### HITS

Computes the hub/authority metrics for each node using the HITS algorithm.

```js
import hits from 'graphology-metrics/centrality/hits';

// To compute and return the result as 'hubs' & 'authorities':
const {hubs, authorities} = hits(graph);

// To directly map the result to nodes' attributes:
hits.assign(graph);

// Note that you can also pass options to customize the algorithm:
const {hubs, authorities} = hits(graph, {normalize: false});
```

_Arguments_

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options:
  - **attributes** <span class="code">?object</span>: attributes' names:
    - **weight** <span class="code">?string</span> <span class="default">weight</span>: name of the edges' weight attribute.
    - **hub** <span class="code">?string</span> <span class="default">hub</span>: name of the node attribute holding hub information.
    - **authority** <span class="code">?string</span> <span class="default">authority</span>: name of the node attribute holding authority information.
  - **maxIterations** <span class="code">?number</span> <span class="default">100</span>: maximum number of iterations to perform.
  - **normalize** <span class="code">?boolean</span> <span class="default">true</span>: should the result be normalized by the sum of values.
  - **tolerance** <span class="code">?number</span> <span class="default">1.e-8</span>: convergence error tolerance.

### Pagerank

Computes the pagerank metrics for each node.


```js
import pagerank from 'graphology-metrics/centrality/pagerank';

// To compute pagerank and return the score per node:
const scores = pagerank(graph);

// To directly map the result to nodes' attributes:
pagerank.assign(graph);

// Note that you can also pass options to customize the algorithm:
const p = pagerank(graph, {alpha: 0.9, weighted: false});
```

_Arguments_

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options:
  - **attributes** <span class="code">?object</span>: attributes' names:
    - **pagerank** <span class="code">?string</span> <span class="default">pagerank</span>: name of the node attribute that will be assigned the pagerank score.
    - **weight** <span class="code">?string</span> <span class="default">weight</span>: name of the edges' weight attribute.
  - **alpha** <span class="code">?number</span> <span class="default">0.85</span>: damping parameter of the algorithm.
  - **maxIterations** <span class="code">?number</span> <span class="default">100</span>: maximum number of iterations to perform.
  - **tolerance** <span class="code">?number</span> <span class="default">1.e-6</span>: convergence error tolerance.
  - **weighted** <span class="code">?boolean</span> <span class="default">false</span>: whether to use available weights or not.

### Weighted degree

Computes the weighted degree of nodes. The weighted degree of a node is the sum of its edges' weights.

```js
import weightedDegree from 'graphology-metrics/weighted-degree';
// Or to load more specific functions:
import {
  weightedDegree,
  weightedInDegree,
  weightedOutDegree
} from 'graphology-metrics/weighted-degree';

// To compute weighted degree of a single node
weightedDegree(graph, 'A');

// To compute weighted degree of every node
const weightedDegrees = weightedDegree(graph);

// To compute normalized weighted degree, i.e. weighted degree will be
// divided by the node's relevant degree
weightedDegree(graph, 'A', {normalized: true});

// To directly map the result onto node attributes
weightedDegree.assign(graph);
```

_Arguments_

To compute the weighted degree of a single node:

- **graph** _Graph_: target graph.
- **node** _any_: desired node.
- **options** <span class="code">?object</span>: options. See below.

To compute the weighted degree of every node:

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options. See below.

_Options_

- **attributes** <span class="code">?object</span>: custom attribute names:
  - **weight** <span class="code">?string</span> <span class="default">weight</span>: name of the weight attribute.
  - **weightedDegree** <span class="code">?string</span> <span class="default">weightedDegree</span>: name of the attribute to assign.

### Degree

Returns degree information for every node in the graph. Note that [`graphology`](https://graphology.github.io)'s API already gives you access to this information through `#.degree` etc. So only consider this function as a convenience to extract/assign all degrees at once.

```js
import degree from 'graphology-metrics/degree';

import degree, {
  inDegree,
  outDegree,
  undirectedDegree,
  directedDegree,
  allDegree
} from 'graphology-metrics/degree';

// To extract degree information for every node
const degrees = degree(graph);
>>> {node1: 34, node2: 45, ...}

// To extract only in degree information for every node
const inDegrees = inDegree(graph);

// To extract full degree breakdown for every node
const degrees = allDegree(graph);
>>> { // Assuming the graph is directed
  node1: {
    inDegree: 2,
    outDegree: 36
  },
  ...
}

// To map degree information to node attributes
degree.assign(graph);
graph.getNodeAttribute(node, 'degree');
>>> 45

// To map only degree & in degree to node attributes
allDegree.assign(graph, {types: ['degree', 'inDegree']});

// To map only degree & in degree with different names
allDegree(
  graph,
  {
    attributes: {
      inDegree: 'in',
      outDegree: 'out'
    },
    types: ['inDegree', 'outDegree']
  }
)
>>> {
  1: {in: 1, out: 1},
  ...
}
```

_Arguments_

- **graph** _Graph_: target graph.
- **options** <span class="code">?object</span>: options:
  - **attributes** <span class="code">?object</span>: Custom attribute names:
    - **degree** <span class="code">?string</span>: Name of the mixed degree attribute.
    - **inDegree** <span class="code">?string</span>: Name of the mixed inDegree attribute.
    - **outDegree** <span class="code">?string</span>: Name of the mixed outDegree attribute.
    - **undirectedDegree** <span class="code">?string</span>: Name of the mixed undirectedDegree attribute.
    - **directedDegree** <span class="code">?string</span>: Name of the mixed directedDegree attribute.
  - **types** <span class="code">?array</span>: List of degree types to extract.

### Eccentricity

Computes the eccentricity which is the maximum of the shortest paths between the given node and any other node.

```js
import {eccentricity} from 'graphology-metrics';
// Alternatively, to load only the relevant code:
import eccentricity from 'graphology-metrics/eccentricity';

graph.addNode('1');
graph.addNode('2');
graph.addNode('3');
graph.addNode('4');
graph.addUndirectedEdge(1, 2);
graph.addUndirectedEdge(2, 3);
graph.addUndirectedEdge(3, 1);
graph.addUndirectedEdge(3, 4);

eccentricity(graph, 3) >> 1;
```

_Arguments_

- **graph** _Graph_: target graph.
- **node** _any_: desired node.

### Modalities

Method returning a node categorical attribute's modalities and related statistics.

```js
import modalities from 'graphology-metrics/modalities';

// Retrieving the 'type' attribute's modalities
const info = modalities(graph, 'type');
>>> {
  value1: {
    nodes: 34,
    internalEdges: 277,
    internalDensity: 0.03,
    externalEdges: 45,
    externalDensity: 0.05,
    inboundEdges: 67,
    inboundDensity: 0.07,
    outboundEdges: 124,
    outboundDensity: 0.003
  },
  ...
}

// Retrieving modalities info for several attributes at once
const info = modalities(graph, ['type', 'lang']);
>>> {
  type: {...},
  lang: {...}
}
```

_Arguments_

- **graph** _Graph_: target graph.
- **attribute** _string|array_: target categorical attribute or array of categorical attributes.

### Edge Uniformity

Computes the edge uniformity layout quality metric from the given graph having `x` and `y` positions attached to its nodes. Edge uniformity is the normalized standard deviation of edge length of the graph. Lower values should be synonym of better layout according to this particular metric.

Runs in `O(E)`.

```js
import edgeUniformity from 'graphology-metrics/layout-quality/edge-uniformity';

edgeUniformity(graph);
>>> ~1.132
```

### Neighborhood preservation

Computes the "neighborhood preservation" layout quality metric from the given graph having `x` and `y` positions attached to its nodes. Neighborhood preservation is the average proportion of node neighborhood being the same both in the graph's topology and its 2d layout space. The metric is therefore comprised between `0` and `1`, `1` being the best, meaning that every node keeps its neighborhood perfectly intact within the layout space.

Runs in approximately `O(N * log(N))`.

```js
import neighborhoodPreservation from 'graphology-metrics/layout-quality/neighborhood-preservation';

neighborhoodPreservation(graph);
// >>> 0.456
```

### Stress

Computes the "stress" layout quality metric from the given graph having `x` and `y` positions attached to its nodes. Stress is the sum of normalized delta between node topology distances and their layout space distances. Lower values should be synonym of better layout according to this particular metric.

Note that this metric does not work very well when the graph has multiple connected components.

Note also that this metric traverses any given graph as an undirected one.

Runs in `O(N^2)`.

```js
import stress from 'graphology-metrics/layout-quality/stress';

stress(graph);
// >>> ~24510.2914
```

