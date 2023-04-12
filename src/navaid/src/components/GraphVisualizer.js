import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre); // Register the dagre layout with cytoscape

const GraphVisualizer = (props) => {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cytoscape({
        container: cyRef.current,

        elements: getElementsFromMatrix(
          props.mapInput.adjMatrix,
          props.mapInput.nodeNames
        ),

        style: [
          {
            selector: "node",
            style: {
              "background-color": "#5cc48a",
              width: 40,
              height: 40,
              label: "data(label)",
              "text-valign": "bottom",
              "text-halign": "center",
              "font-size": "16px",
              "font-weight": "bold",
              color: "#181c1d",
            },
          },
          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              width: 2,
              "line-color": "#898f8a",
              "target-arrow-shape": "triangle",
              "target-arrow-color": "#2a2a2a",
              label: "data(weight)",
              "font-size": "14px",
              "font-weight": "bold",
              "text-margin-y": "-10px",
              "text-margin-x": "-5px",
              "text-outline-color": "#FFFFFF",
              "text-outline-width": "2px",
              "text-outline-opacity": 1,
              "text-background-color": "#FFFFFF",
              "text-background-opacity": 1,
              "text-background-padding": "1px",
              color: "#000000",
            },
          },
          {
            selector: (edge) => props.path.includes(edge.data("id")),
            style: {
              "line-color": "red",
            },
          },
        ],

        layout: {
          name: "dagre",
          rankDir: "LR",
        },
      });

      cy.fit();
    }
  }, [props.path]);

  return <div ref={cyRef} className="bg-light-primary" style={{ height: "40vh", width: "100%" }} />;
};

function getElementsFromMatrix(matrix, nodeNames) {
  const nodes = nodeNames.map((name, id) => ({
    data: { id: `${id}`, label: name },
  }));

  const edges = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] > 0) {
        edges.push({
          data: {
            id: `${i}-${j}`,
            source: `${i}`,
            target: `${j}`,
            weight: matrix[i][j],
          },
        });
      }
    }
  }

  return [...nodes, ...edges];
}

export default GraphVisualizer;
