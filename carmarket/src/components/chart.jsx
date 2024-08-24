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
        const model = car.NameMMT.split(' ')[1] || 'Unknown Model';
        if (!acc[brand]) {
            acc[brand] = {};
        }
        if (!acc[brand][model]) {
            acc[brand][model] = { count: 0, totalValue: 0 };
        }
        acc[brand][model].count += 1;
        acc[brand][model].totalValue += parseInt(car.Prc.replace(/,/g, ''));
        return acc;
    }, {});

    // Pie chart data
    const pieData = {
        labels: Object.keys(brandModelCount),
        datasets: [
            {
                label: '# of Cars',
                data: Object.keys(brandModelCount).map(brand => 
                    Object.values(brandModelCount[brand]).reduce((sum, model) => sum + model.count, 0)
                ),
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    };

    // Generate data for stacked bar chart
    const barData = {
        labels: Object.keys(brandModelCount),
        datasets: []
    };

    // Assign a unique color for each model
    Object.keys(brandModelCount).forEach((brand, index) => {
        Object.keys(brandModelCount[brand]).forEach((model, modelIndex) => {
            const color = getRandomColor();
            barData.datasets.push({
                label: `${brand} ${model}`,
                data: Object.keys(brandModelCount).map(b => (b === brand ? brandModelCount[brand][model]?.count || 0 : 0)),
                backgroundColor: color
            });
        });
    });

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
                        x: {
                            stacked: true,
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true,
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                            position: 'bottom',
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
        <div className="">
            <div className="chart-container" style={{ marginLeft: 25 + "%", width: 500}}>
                <h2>Cars by Brand</h2>,
                <canvas id="myPieChart" ref={pieRef}  />
            </div>

            <div className="chart-container" style={{ }}>
                <h2>Models of Each Brand</h2>
                <canvas id="myBarChart" ref={barRef}
                 />
            </div>
        </div>
    );
};

export default MyChartComponent;
