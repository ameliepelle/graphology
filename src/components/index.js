/**
 * Graphology Components
 * ======================
 *
 * Basic connected components-related functions.
 */
var isGraph = require('graphology-utils/is-graph');
var copyNode = require('graphology-utils/add-node').copyNode;
var copyEdge = require('graphology-utils/add-edge').copyEdge;
var extend = require('@yomguithereal/helpers/extend');

/**
 * Function returning a list of a graph's connected components as arrays
 * of node keys.
 *
 * @param  {Graph} graph - Target graph.
 * @return {array}
 */
function connectedComponents(graph) {
  if (!isGraph(graph))
    throw new Error(
      'graphology-components: the given graph is not a valid graphology instance.'
    );

  if (!graph.order) return [];

  if (!graph.size)
    return graph.mapNodes(function (node) {
      return [node];
    });

  var seen = new Set();
  var components = [];
  var stack = [];
  var component;

  var nodes = graph.nodes();

  var i, l, node, n1;

  for (i = 0, l = nodes.length; i < l; i++) {
    node = nodes[i];

    if (seen.has(node)) continue;

    component = [];
    stack.push(node);

    while (stack.length !== 0) {
      n1 = stack.pop();

      if (seen.has(n1)) continue;

      seen.add(n1);
      component.push(n1);

      extend(stack, graph.neighbors(n1));
    }

    components.push(component);
  }

  return components;
}

/**
 * Function returning the largest component of the given graph.
 *
 * @param  {Graph} graph - Target graph.
 * @return {array}
 */
function largestConnectedComponent(graph) {
  if (!isGraph(graph))
    throw new Error(
      'graphology-components: the given graph is not a valid graphology instance.'
    );

  if (!graph.order) return [];

  if (!graph.size)
    return [
      graph.findNode(function () {
        return true;
      })
    ];

  var order = graph.order;
  var remaining;

  var seen = new Set();
  var largestComponent = [];
  var stack = [];
  var component;

  var nodes = graph.nodes();

  var i, l, node, n1;

  for (i = 0, l = nodes.length; i < l; i++) {
    node = nodes[i];

    if (seen.has(node)) continue;

    component = [];
    stack.push(node);

    while (stack.length !== 0) {
      n1 = stack.pop();

      if (seen.has(n1)) continue;

      seen.add(n1);
      component.push(n1);

      extend(stack, graph.neighbors(n1));
    }

    if (component.length > largestComponent.length)
      largestComponent = component;

    // Early exit condition
    // NOTE: could be done each time we traverse a node but would complexify
    remaining = order - seen.size;
    if (largestComponent.length > remaining) return largestComponent;
  }

  return largestComponent;
}

/**
 * Function returning a subgraph composed of the largest component of the given graph.
 *
 * @param  {Graph} graph - Target graph.
 * @return {Graph}
 */
function largestConnectedComponentSubgraph(graph) {
  var component = largestConnectedComponent(graph);

  var S = graph.nullCopy();

  component.forEach(function (key) {
    copyNode(S, key, graph.getNodeAttributes(key));
  });

  graph.forEachEdge(function (
    key,
    attr,
    source,
    target,
    sourceAttr,
    targetAttr,
    undirected
  ) {
    if (S.hasNode(source)) {
      copyEdge(S, undirected, key, source, target, attr);
    }
  });

  return S;
}

function cropToLargestConnectedComponent(graph) {
  var component = new Set(largestConnectedComponent(graph));

  var nodes = graph.nodes();

  nodes.forEach(function (key) {
    if (!component.has(key)) {
      graph.dropNode(key);
    }
  });
}

/**
 * Function returning a list of strongly connected components.
 *
 * @param  {Graph} graph - Target directed graph.
 * @return {array}
 */
function stronglyConnectedComponents(graph) {
  if (!isGraph(graph))
    throw new Error(
      'graphology-components: the given graph is not a valid graphology instance.'
    );

  if (!graph.order) return [];

  if (graph.type === 'undirected')
    throw new Error('graphology-components: the given graph is undirected');

  var nodes = graph.nodes(),
    components = [],
    i,
    l;

  if (!graph.size) {
    for (i = 0, l = nodes.length; i < l; i++) components.push([nodes[i]]);
    return components;
  }

  var count = 1,
    P = [],
    S = [],
    preorder = new Map(),
    assigned = new Set(),
    component,
    pop,
    vertex;

  var DFS = function (node) {
    var neighbor;
    var neighbors = graph.outboundNeighbors(node);
    var neighborOrder;

    preorder.set(node, count++);
    P.push(node);
    S.push(node);

    for (var k = 0, n = neighbors.length; k < n; k++) {
      neighbor = neighbors[k];

      if (preorder.has(neighbor)) {
        neighborOrder = preorder.get(neighbor);
        if (!assigned.has(neighbor))
          while (preorder.get(P[P.length - 1]) > neighborOrder) P.pop();
      } else {
        DFS(neighbor);
      }
    }

    if (preorder.get(P[P.length - 1]) === preorder.get(node)) {
      component = [];
      do {
        pop = S.pop();
        component.push(pop);
        assigned.add(pop);
      } while (pop !== node);
      components.push(component);
      P.pop();
    }
  };

  for (i = 0, l = nodes.length; i < l; i++) {
    vertex = nodes[i];
    if (!assigned.has(vertex)) DFS(vertex);
  }

  return components;
}

/**
 * Exporting.
 */
exports.connectedComponents = connectedComponents;
exports.largestConnectedComponent = largestConnectedComponent;
exports.largestConnectedComponentSubgraph = largestConnectedComponentSubgraph;
exports.cropToLargestConnectedComponent = cropToLargestConnectedComponent;
exports.stronglyConnectedComponents = stronglyConnectedComponents;
