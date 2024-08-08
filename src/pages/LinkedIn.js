import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import chartjs-plugin-datalabels
import './LinkedIn.css'; // Import the CSS file

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const LinkedIn = () => {
  const [data, setData] = useState([]);
  const [seniorityChartData, setSeniorityChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Seniority Level Count',
      data: [],
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 1,
    }],
  });

  const [employmentChartData, setEmploymentChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Employment Type Count',
      data: [],
      backgroundColor: '#66BB6A',
      borderColor: '#43A047',
      borderWidth: 1,
    }],
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adamswebscrapers-hhg8djg9dcd8bqem.ukwest-01.azurewebsites.net/api/LinkedInModels/fdtjgz8r');
        const data = response.data;
        setData(data);
        processSeniorityChartData(data);
        processEmploymentChartData(data);
        processJobTitleChartData(data);
      } catch (error) {
        console.error('Error fetching LinkedIn data:', error);
      }
    };

    fetchData();
  }, []);

  const processSeniorityChartData = (data) => {
    const seniorityCounts = data.reduce((acc, item) => {
      const { seniorityLevel } = item;
      if (seniorityLevel) {
        acc[seniorityLevel] = (acc[seniorityLevel] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort by count descending
    const sortedSeniority = Object.entries(seniorityCounts)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [key, value]) => {
        acc.labels.push(key);
        acc.data.push(value);
        return acc;
      }, { labels: [], data: [] });

    setSeniorityChartData({
      labels: sortedSeniority.labels,
      datasets: [{
        label: 'Seniority Level Count',
        data: sortedSeniority.data,
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      }],
    });
  };

  const processEmploymentChartData = (data) => {
    const employmentCounts = data.reduce((acc, item) => {
      const { employmentType } = item;
      if (employmentType) {
        acc[employmentType] = (acc[employmentType] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort by count descending
    const sortedEmployment = Object.entries(employmentCounts)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [key, value]) => {
        acc.labels.push(key);
        acc.data.push(value);
        return acc;
      }, { labels: [], data: [] });

    setEmploymentChartData({
      labels: sortedEmployment.labels,
      datasets: [{
        label: 'Employment Type Count',
        data: sortedEmployment.data,
        backgroundColor: '#66BB6A',
        borderColor: '#43A047',
        borderWidth: 1,
      }],
    });
  };

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

  return (
    <div className="linkedin-container">
      <h1>LinkedIn Stats</h1>
      <div className="chart-container">
        <Bar 
          data={seniorityChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Jobs and Seniority Levels', // Title for the first chart
                padding: {
                  top: 10,
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
          data={employmentChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Employment Types Distribution', // Title for the second chart
                padding: {
                  top: 10,
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
          data={jobTitleChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Job Titles Distribution', // Title for the third chart
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

export default LinkedIn;
