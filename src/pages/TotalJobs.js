import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import chartjs-plugin-datalabels
import './TotalJobs.css'; // Import the CSS file

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const TotalJobs = () => {
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

  const [salaryRangeChartData, setSalaryRangeChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Salary Range Count',
      data: [],
      backgroundColor: '#FF7043',
      borderColor: '#F4511E',
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
        const response = await axios.get('https://adamswebscrapers-hhg8djg9dcd8bqem.ukwest-01.azurewebsites.net/api/TotalJobsModels/fdtjgz8r');
        const data = response.data;
        setData(data);
        console.log(data);
        processJobTitleChartData(data);
        processSalaryRangeChartData(data); // Replace contract type chart data processing with salary range
        processCityChartData(data);
      } catch (error) {
        console.error('Error fetching TotalJobs data:', error);
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

  const processSalaryRangeChartData = (data) => {
    const salaryRanges = {
      '£10,000 - £20,000': 0,
      '£20,000 - £30,000': 0,
      '£30,000 - £40,000': 0,
      '£40,000 - £50,000': 0,
      '£50,000 - £60,000': 0,
      '£60,000 - £70,000': 0,
      '£70,000 - £80,000': 0,
      '£80,000 - £90,000': 0,
      '£90,000 - £100,000': 0,
      '£100,000+': 0,
      'Not Mentioned': 0
    };

    data.forEach(item => {
      const { salaryRange } = item;
      let value = 0;

      if (salaryRange) {
        // Extract the numeric part
        const match = salaryRange.match(/£(\d+(?:,\d+)*)/);
        if (match) {
          value = parseInt(match[1].replace(/,/g, ''));
        }

        // Determine the range
        if (value >= 10000 && value < 20000) {
          salaryRanges['£10,000 - £20,000']++;
        } else if (value >= 20000 && value < 30000) {
          salaryRanges['£20,000 - £30,000']++;
        } else if (value >= 30000 && value < 40000) {
          salaryRanges['£30,000 - £40,000']++;
        } else if (value >= 40000 && value < 50000) {
          salaryRanges['£40,000 - £50,000']++;
        } else if (value >= 50000 && value < 60000) {
          salaryRanges['£50,000 - £60,000']++;
        } else if (value >= 60000 && value < 70000) {
          salaryRanges['£60,000 - £70,000']++;
        } else if (value >= 70000 && value < 80000) {
          salaryRanges['£70,000 - £80,000']++;
        } else if (value >= 80000 && value < 90000) {
          salaryRanges['£80,000 - £90,000']++;
        } else if (value >= 90000 && value < 100000) {
          salaryRanges['£90,000 - £100,000']++;
        } else if (value >= 100000) {
          salaryRanges['£100,000+']++;
        } else {
          salaryRanges['Not Mentioned']++;
        }
      } else {
        salaryRanges['Not Mentioned']++;
      }
    });

    const sortedSalaryRanges = Object.entries(salaryRanges)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [key, value]) => {
        acc.labels.push(key);
        acc.data.push(value);
        return acc;
      }, { labels: [], data: [] });

    setSalaryRangeChartData({
      labels: sortedSalaryRanges.labels,
      datasets: [{
        label: 'Salary Range Count',
        data: sortedSalaryRanges.data,
        backgroundColor: '#FF7043',
        borderColor: '#F4511E',
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
    <div className="totaljobs-container">
      <h1>TotalJobs Stats</h1>
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
                text: 'Job Titles Distribution',
                padding: {
                  top: 20,
                  bottom: 20
                },
                font: {
                  size: 20
                }
              },
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: (value) => value,
              }
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="chart-container">
        <Bar 
          data={salaryRangeChartData} // Updated to use salaryRangeChartData
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Salary Ranges Distribution',
                padding: {
                  top: 20,
                  bottom: 20
                },
                font: {
                  size: 20
                }
              },
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: (value) => value,
              }
            },
            maintainAspectRatio: false,
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
                text: 'City Distribution',
                padding: {
                  top: 20,
                  bottom: 20
                },
                font: {
                  size: 20
                }
              },
              datalabels: {
                display: true,
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: (value) => value,
              }
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default TotalJobs;
