import React from "react";
import { Chart } from "@esri/cedar";

// this component can render any valid Cedar chart definition
// it will re-render whenever passed a new definition
// see https://esri.github.io/cedar/api/interfaces/idefinition.html
// this is just one way to wrap a Cedar chart in a React component
export default class CedarChart extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the chart DOM element
    this.chartDiv = React.createRef();
  }

  componentDidMount() {
    // read the definition that was passed in and create a new cedar chart
    const { definition } = this.props;
    this.chart = new Chart(this.chartDiv.current, definition);
    this.chart.show();
  }

  render() {
    // the chart will be rendered in this div
    // NOTE: app-wide styles for this are in styles.css
    return <div ref={this.chartDiv} className="cedar-chart" />;
  }
}
