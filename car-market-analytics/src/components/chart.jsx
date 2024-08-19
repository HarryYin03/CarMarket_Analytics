import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import carsData from '../taladrod-cars.min.json';

const MyChartComponent = () => {
    const pieRef = useRef(null);
    const barRef = useRef(null);

    // Data processing for charts
    const brandModelCount = carsData.Cars.reduce((acc, car) => {
        const brand = car.NameMMT.split(' ')[0];
        if (!acc[brand]) {
            acc[brand] = { totalValue: 0, modelCount: 0 };
        }
        acc[brand].totalValue += parseInt(car.Prc.replace(/,/g, ''));
        acc[brand].modelCount += 1; // Counting models under each brand
        return acc;
    }, {});

    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'
    ];

    const pieData = {
        labels: Object.keys(brandModelCount),
        datasets: [
            {
                label: '# of Cars',
                data: Object.keys(brandModelCount).map(brand => brandModelCount[brand].modelCount),
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    };

    const barData = {
        labels: Object.keys(brandModelCount),
        datasets: [
            {
                label: '# of Models',
                data: Object.keys(brandModelCount).map(brand => brandModelCount[brand].modelCount),
                backgroundColor: colors,
                barThickness: 20, // Increased bar thickness
            }
        ],
    };

    useEffect(() => {
        let pieChartInstance;
        let barChartInstance;

        if (pieRef.current) {
            pieChartInstance = new Chart(pieRef.current.getContext('2d'), {
                type: 'pie',
                data: pieData,
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                    },
                },
            });
        }
        if (barRef.current) {
            barChartInstance = new Chart(barRef.current.getContext('2d'), {
                type: 'bar',
                data: barData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false, // remove legend on bar chart
                        },
                    },
                },
            });
        }

        // Cleanup on unmount
        return () => {
            if (pieChartInstance) pieChartInstance.destroy();
            if (barChartInstance) barChartInstance.destroy();
        };
    }, [pieData, barData]);

    return (
        <div className="charts">
            <div className="chart-container" style={{ width: '500px', height: '500px' }}> {/* Increased size */}
                <h2>Cars by Brand</h2>
                <canvas id="myPieChart" ref={pieRef} width="500" height="500" /> {/* Increased size */}
            </div>

            <div className="chart-container" style={{ width: '500px', height: '500px' }}> {/* Increased size */}
                <h2>Models of Each Brand</h2>
                <canvas id="myBarChart" ref={barRef} width="500" height="500" /> {/* Increased size */}
            </div>
        </div>
    );
};

export default MyChartComponent;
