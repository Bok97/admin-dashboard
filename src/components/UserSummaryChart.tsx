import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchUsersByGender, GenderChartData, fetchUsersByAge, AgeChartData, fetchUsersByState, StateChartData } from '../services/DashboardService';

interface UserSummaryChartProps {
    year: string;
    month: number | '';
}

export const UserSummaryChart: React.FC<UserSummaryChartProps> = ({ year, month }) => {
  const [genderData, setGenderData] = useState<GenderChartData[]>([]);
  const [stateData, setStateData] = useState<StateChartData | null>(null);
  const [ageData, setAgeData] = useState<AgeChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
    const fetchedGenderData = await fetchUsersByGender(year, month);
    const fetchedStateData = await fetchUsersByState(year, month);
    const fetchedAgeData = await fetchUsersByAge(year, month);
    setGenderData(fetchedGenderData);
    setStateData(fetchedStateData);
    setAgeData(fetchedAgeData);
    // console.log("Fetched Gender Data:", year, month);
    //   console.log("Fetched State Data:", fetchedStateData);
    //   console.log("Fetched Age Data:", fetchedAgeData);
    };

    fetchData();
  }, [year, month]);
    const doughnutOptions = {
      chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          height: '300px',
      },
      title: {
          text: 'User Genders Chart',
      },
      legend:{
        enabled:false,
      },
      credits:{
        enabled:false,
      },
      series: [{
          name: 'User Gender Data',
          colorByPoint: true,
          data: genderData,
          innerSize: '50%',
      }],
  };

    const barOptions = {
        chart: {
            type: 'bar',
            height: '300px',
        },
        title: {
            text: 'User Ages Chart',
        },
        xAxis: {
          categories: ageData?.categories || [],
        },
        legend:{
          enabled:false,
        },
        credits:{
          enabled:false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Data',
            },
        },
        series: [{
            name: 'User Age Data',
            data: ageData?.results || [],
          }],
    };

    const lineOptions = {
        chart: {
            type: 'line',
            height: '300px',
        },
        title: {
            text: 'User States Chart',
        },
        xAxis: {
            categories: stateData?.categories || [],
        },
        legend:{
            enabled:false,
        },
        credits:{
            enabled:false,
        },
        series: [{
            name: 'User State Data',
            data: stateData?.results || [],
        }],
    };

    const chartContainerStyle = {
        flexBasis: '33.33%',
        padding: '10px',
        border: '1px solid #dcdcdc',
        borderRadius: '8px',
        marginRight: '1%',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)',
    };

  return (
   <div style={{ display: 'flex', rowGap: '4', justifyContent: 'space-around', marginBottom: '20px', padding: '1rem' }}>
      <div style={chartContainerStyle}>
          <HighchartsReact highcharts={Highcharts} options={doughnutOptions} />
      </div>
      <div style={chartContainerStyle}>
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
      </div>
      <div style={{ ...chartContainerStyle, marginRight: '0' }}>
          <HighchartsReact highcharts={Highcharts} options={lineOptions} />
      </div>
  </div>
  );
};
