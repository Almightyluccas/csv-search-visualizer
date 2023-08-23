import React from 'react';
import Plotly from 'react-plotly.js';

const CountryChoropleth = ({ jsonData }) => {

  const data = jsonData.state_data.map(stateEntry => {
    const state = stateEntry.state;
    const stateUserCount = stateEntry.zip_data.reduce((total, zipEntry) => total + zipEntry.user_count, 0);
    return { state, user_count: stateUserCount };
  });

  const choroplethTrace = {
    type: 'choropleth',
    locations: data.map(entry => entry.state),
    locationmode: 'USA-states',
    z: data.map(entry => entry.user_count),
    colorscale: 'Viridis',
    colorbar: { title: 'User Count' }
  };

 return (
    <Plotly
      data={[choroplethTrace]}
      layout={{
        title: 'User Density by State',
        geo: {
          scope: 'usa',
        },
      }}
    />
  );
};

export default CountryChoropleth;
