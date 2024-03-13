import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://finanzas.visssible.com/backend/NEWchartTotals.php');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('myChart').getContext('2d');
      const labels = Object.keys(chartData).reverse();
      const expensesData = Object.values(chartData).map(item => parseFloat(item.expenses)).reverse();
      const incomesData = Object.values(chartData).map(item => parseFloat(item.incomes)).reverse();
  
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Expenses',
              data: expensesData,
              pointRadius: 5,
              pointHitRadius: 20,
              pointBackgroundColor: '#f44336',
              pointHoverRadius: 8,
              pointHoverBackgroundColor: '#f44336',
              borderColor: '#f44336',
              backgroundColor: 'transparent',
              fill: true
            },
            {
              label: 'Incomes',
              data: incomesData,
              pointRadius: 5,
              pointHitRadius: 20,
              pointBackgroundColor: '#4caf50',
              pointHoverRadius: 8,
              pointHoverBackgroundColor: '#4caf50',
              borderColor: '#4caf50',
              backgroundColor: 'transparent',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white',
                maxTicksLimit: 7
              },
              grid: {
                color: '#555555'
              }
            },
            x: {
              grid: {
                display: false // Hide the vertical grid lines
              },
              ticks: {
                color: 'white'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }, [chartData]);
  

  return (
    <div style={{ width: '100%', height: '90%' }}>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default LineChart;