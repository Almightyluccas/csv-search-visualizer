import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { getChoroplethData } from '../utils/api';
import CountryChoropleth from '../components/DataVisualization/CountryChoropleth';
import StateDropdown from "../components/DataVisualization/StateDropdown";
import StateChoropleth from "../components/DataVisualization/StateChoropleth";
import ZipCodeChoropleth from "../components/DataVisualization/ZipCodeChoropleth";


const DataVisualizationPage = ({ darkMode }) => {
  const [mapData, setMapData] = useState(null);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChoroplethData(
          'https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/us-500.csv'
        );
        setMapData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const states = mapData?.state_data.map(stateEntry => stateEntry.state);

  const handleSelectState = event => {
    setSelectedState(event.target.value);
  };

  return (
    <div >
      {/*<div>*/}
      {/*  {mapData && <StateDropdown states={states} onSelectState={handleSelectState} />}*/}
      {/*</div>*/}
      <div className={'flex justify-center'}>
        {mapData && <CountryChoropleth jsonData={mapData} />}
      </div>


      {/* Conditional rendering to prevent errors */}
      {/*{mapData && (*/}
      {/*  <div>*/}
      {/*    <ZipCodeChoropleth data={mapData} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default DataVisualizationPage;
