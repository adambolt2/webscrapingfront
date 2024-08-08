import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import chartjs-plugin-datalabels
import './Indeed.css'; // Import the CSS file

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const Indeed = () => {
  const [data, setData] = useState([]);
  const [jobTitleChartData, setJobTitleChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Job Title Count',
      data: [],
      backgroundColor: '#FFA726',
      borderColor: '#FB8C00',
      borderWidth: 1,
    }],
  });

  const [contractTypeChartData, setContractTypeChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Contract Type Count',
      data: [],
      backgroundColor: '#66BB6A',
      borderColor: '#43A047',
      borderWidth: 1,
    }],
  });

  const [cityChartData, setCityChartData] = useState({
    labels: [],
    datasets: [{
      label: 'City Count',
      data: [],
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7270/api/IndeedModels/fdtjgz8r');
        const data = response.data;
        setData(data);
        processJobTitleChartData(data);
        processContractTypeChartData(data);
        processCityChartData(data);
      } catch (error) {
        console.error('Error fetching Indeed data:', error);
      }
    };

    fetchData();
  }, []);

  const processJobTitleChartData = (data) => {
    const jobTitleCounts = data.reduce((acc, item) => {
      const { jobTitle } = item;
      let category = 'Other'; // Default category

      if (jobTitle) {
        const normalizedTitle = jobTitle.toLowerCase().replace(/[-\s]/g, '');
        if (normalizedTitle.includes('frontend')) {
          category = 'FrontEnd';
        } else if (normalizedTitle.includes('backend')) {
          category = 'BackEnd';
        } else if (normalizedTitle.includes('fullstack')) {
          category = 'Fullstack';
        }
        acc[category] = (acc[category] || 0) + 1;
      }

      return acc;
    }, {});

    // Sort by count descending
    const sortedJobTitles = Object.entries(jobTitleCounts)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [key, value]) => {
        acc.labels.push(key);
        acc.data.push(value);
        return acc;
      }, { labels: [], data: [] });

    setJobTitleChartData({
      labels: sortedJobTitles.labels,
      datasets: [{
        label: 'Job Title Count',
        data: sortedJobTitles.data,
        backgroundColor: '#FFA726',
        borderColor: '#FB8C00',
        borderWidth: 1,
      }],
    });
  };

  const processContractTypeChartData = (data) => {
    const contractTypeCounts = data.reduce((acc, item) => {
      const { contractType } = item;
      let category = 'Other'; // Default category

      if (contractType) {
        const normalizedType = contractType.toLowerCase();
        if (normalizedType.includes('full time')) {
          category = 'Full Time';
        } else if (normalizedType.includes('part time')) {
          category = 'Part Time';
        } else if (normalizedType.includes('apprenticeship')) {
          category = 'Apprenticeship';
        } else if (normalizedType.includes('graduate')) {
          category = 'Graduate';
        } else if (normalizedType.includes('contract')) {
          category = 'Contract';
        } else if (normalizedType.includes('temp') || normalizedType.includes('temporary')) {
          category = 'Temporary';
        }
        acc[category] = (acc[category] || 0) + 1;
      }

      return acc;
    }, {});

    // Sort by count descending
    const sortedContractTypes = Object.entries(contractTypeCounts)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [key, value]) => {
        acc.labels.push(key);
        acc.data.push(value);
        return acc;
      }, { labels: [], data: [] });

    setContractTypeChartData({
      labels: sortedContractTypes.labels,
      datasets: [{
        label: 'Contract Type Count',
        data: sortedContractTypes.data,
        backgroundColor: '#66BB6A',
        borderColor: '#43A047',
        borderWidth: 1,
      }],
    });
  };

 
  const processCityChartData = (data) => {
    const cityCounts = data.reduce((acc, item) => {
      if (!item.city) {
        return acc;
      }
  
      // Extract and clean up city name
      let city = item.city.split(/[\s•*]/)[0].toLowerCase().trim();
      city = city.replace(/[,]*$/, '').trim();
  
      // Normalize city names by removing special characters and ensuring consistency
      city = city.replace(/[\s•*]/g, '').toLowerCase().trim();
  
  
      // Accumulate city counts
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
  
    // Sort by count descending
    const sortedCities = Object.entries(cityCounts)
      .sort(([, a], [, b]) => b - a);
  
    // Take the top 4 cities
    const topCities = sortedCities.slice(0, 4);
    // Combine the rest into 'Other'
    const otherCount = sortedCities.slice(4).reduce((acc, [, count]) => acc + count, 0);
  
    // Prepare data for chart
    const cityLabels = topCities.map(([city]) => city.charAt(0).toUpperCase() + city.slice(1));
    const cityData = topCities.map(([, count]) => count);
  
    if (otherCount > 0) {
      cityLabels.push('Other');
      cityData.push(otherCount);
    }
  
    setCityChartData({
      labels: cityLabels,
      datasets: [{
        label: 'City Count',
        data: cityData,
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      }],
    });
  };
  return (
    <div className="indeed-container">
      <h1>Indeed Stats</h1>
      <div className="chart-container">
        <Bar 
          data={jobTitleChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Job Titles Distribution', // Title for the job title chart
                padding: {
                  top: 20,
                  bottom: 20
                },
                font: {
                  size: 20 // Font size of the title
                }
              },
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: (value) => value, // Show the value of each bar
              }
            },
            maintainAspectRatio: false, // Allow the chart to be responsive
          }}
        />
      </div>
      <div className="chart-container">
        <Bar 
          data={contractTypeChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Contract Types Distribution', // Title for the contract type chart
                padding: {
                  top: 20,
                  bottom: 20
                },
                font: {
                  size: 20 // Font size of the title
                }
              },
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: (value) => value, // Show the value of each bar
              }
            },
            maintainAspectRatio: false, // Allow the chart to be responsive
          }}
        />
      </div>
      <div className="chart-container">
        <Bar 
          data={cityChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'City Distribution', // Title for the city chart
                padding: {
                  top: 20,
                  bottom: 20
                },
                font: {
                  size: 20 // Font size of the title
                }
              },
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: (value) => value, // Show the value of each bar
              }
            },
            maintainAspectRatio: false, // Allow the chart to be responsive
          }}
        />
      </div>
    </div>
  );
}

export default Indeed;
