import React from "react";
// load requred AmCharts libraries
import "amcharts3/amcharts/amcharts";
import "amcharts3/amcharts/serial";
// load Cedar's AmChart theme (optional)
import "@esri/cedar/dist/umd/themes/amCharts/calcite.js";
// load app resources and components
import "./styles.css";
import CedarChart from "./CedarChart";
// fetch a pre-defined Cedar line chart definition (optional)
import lineChart from "./definitions/line.json";
import WebMapView from './WebMap'

export default function App() {
  // we can either fetch pre-defined Cedar chart definition JSON (see above)
  // or dynamically create a definition in JavaScript (below)
  // see https://esri.github.io/cedar/ for examples of other valid Cedar definitions
  const barChart = {
    type: "bar",
    datasets: [
      {
        url:
          "https://services.arcgis.com/uDTUpUPbk8X8mXwl/arcgis/rest/services/Public_Schools_in_Onondaga_County/FeatureServer/0",
        name: "Number_of_SUM",
        query: {
          orderByFields: "Number_of_SUM DESC",
          groupByFieldsForStatistics: "Type",
          outStatistics: [
            {
              statisticType: "sum",
              onStatisticField: "Number_of",
              outStatisticFieldName: "Number_of_SUM"
            }
          ]
        }
      }
    ],
    series: [
      {
        category: { field: "Type", label: "Type" },
        value: { field: "Number_of_SUM", label: "Number of Students" },
        source: "Number_of_SUM"
      }
    ]
  };

  return (
    <div className="App">
      <h1>Esri Cedar in React</h1>
      <p>Bar Chart</p>
      <CedarChart definition={barChart} />
      <p>Line Chart</p>
      <CedarChart definition={lineChart} />
      <WebMapView />
    </div>
  );
}
