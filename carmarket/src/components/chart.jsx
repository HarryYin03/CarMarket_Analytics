import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import carsData from "../taladrod-cars.json";

const MyChartComponent = () => {
    const pieRef = useRef(null);
    const barRef = useRef(null);

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Generate colors for the pie chart
    const colors = Object.keys(carsData.Cars.reduce((acc, car) => {
        acc[car.NameMMT.split(' ')[0]] = true;
        return acc;
    }, {})).map(() => getRandomColor());

    // Data processing for charts
    const brandModelCount = carsData.Cars.reduce((acc, car) => {
        const brand = car.NameMMT.split(' ')[0];
        if (!acc[brand]) {
            acc[brand] = { totalValue: 0, modelCount: 0 };
        }
        acc[brand].totalValue += parseInt(car.Prc.replace(/,/g, ''));
        acc[brand].modelCount += 1;
        return acc;
    }, {});

    // Pie chart data
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

    // Bar chart data
    const barData = {
        labels: Object.keys(brandModelCount),
        datasets: [
            {
                label: '# of Models',
                data: Object.keys(brandModelCount).map(brand => brandModelCount[brand].modelCount),
                backgroundColor: colors,
                barThickness: 20,
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
                            display: false,
                        },
                    },
                },
            });
        }

        return () => {
            if (pieChartInstance) pieChartInstance.destroy();
            if (barChartInstance) barChartInstance.destroy();
        };
    }, [pieData, barData]);

    return (
        <div className="charts">
            <div className="chart-container" style={{ width: '600px', height: '600px' }}>
                <h2>Cars by Brand</h2>
                <canvas id="myPieChart" ref={pieRef} width="600" height="600" />
            </div>

            <div className="chart-container" style={{ width: '600px', height: '600px' }}>
                <h2>Models of Each Brand</h2>
                <canvas id="myBarChart" ref={barRef} width="600" height="600" />
            </div>
        </div>
    );
};

export default MyChartComponent;
