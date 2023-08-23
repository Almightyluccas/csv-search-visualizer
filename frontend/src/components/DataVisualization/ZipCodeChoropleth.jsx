import React from 'react';
import Plot from 'react-plotly.js';

const ZipCodeChoropleth = ({ data }) => { // Destructure the 'data' prop

  // Process the data for Plotly
  const mapData = data.state_data.map(state => ({
    type: 'choropleth',
    locationmode: 'USA-zip codes', // Set the location mode to zip codes
    locations: state.zip_data.map(zip => zip.zip), // Use zip codes as locations
    z: state.zip_data.map(zip => zip.user_count),
    text: state.zip_data.map(zip => `Zip: ${zip.zip}<br>User Count: ${zip.user_count}`),
    hoverinfo: 'text',
    showscale: true
  }));

  const layout = {
    title: 'User Density by Zip Code',
    geo: {
      scope: 'usa',
      showlakes: true,
      lakecolor: 'rgb(255, 255, 255)'
    }
  };

  return (
    <Plot
      data={mapData}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ZipCodeChoropleth;
