import React from 'react';
import Plotly from 'react-plotly.js';
import customGeoJSON from '../../utils/gz_2010_us_outline_5m.json'; // Import the GeoJSON data

const StateChoropleth = ({ stateData }) => {
  // Find the GeoJSON feature corresponding to the stateData
  const stateGeoJSON = customGeoJSON.features.find(
    feature => feature.properties.name === stateData[0].state
  );

  const choroplethTrace = {
    type: 'choropleth',
    locations: stateData.map(entry => entry.zip),
    z: stateData.map(entry => entry.user_count),
    geojson: stateGeoJSON, // Use the GeoJSON data for the specific state
    featureidkey: 'properties.name',
    colorscale: 'Viridis',
    colorbar: { title: 'User Count' }
  };

  return (
    <Plotly
      data={[choroplethTrace]}
      layout={{
        title: `User Density in ${stateData[0].state}`,
        geo: {
          center: { lat: 37.0902, lon: -95.7129 },
          fitbounds: 'locations',
          scope: 'usa'
        }
      }}
    />
  );
};

export default StateChoropleth;
