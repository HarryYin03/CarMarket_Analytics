import MyChartComponent from './chart';
import carsData from '../taladrod-cars.json';
import '../index.css';

export default function Dashboard() {
    // Data processing for the table
    const brandModelData = carsData.Cars.reduce((acc, car) => {
        const brand = car.NameMMT.split(' ')[0]; // Assuming the brand is the first word in NameMMT
        const model = car.Model;
        const price = parseInt(car.Prc.replace(/,/g, '')); // Convert price to an integer

        // Initialize brand if not already present
        if (!acc[brand]) {
            acc[brand] = { totalValue: 0, totalCars: 0, models: {} };
        }

        // Initialize model under the brand if not already present
        if (!acc[brand].models[model]) {
            acc[brand].models[model] = { totalValue: 0, count: 0 };
        }

        // Accumulate total value and count for the brand and model
        acc[brand].models[model].totalValue += price;
        acc[brand].models[model].count += 1;
        acc[brand].totalValue += price;
        acc[brand].totalCars += 1;

        return acc;
    }, {});

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <h2>Car Counts and Values by Brand and Model</h2>
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Number of Cars</th>
                        <th>Total Value (Baht)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(brandModelData).map(brand => (
                        Object.keys(brandModelData[brand].models).map(model => (
                            <tr key={`${brand}-${model}`}>
                                <td>{brand}</td>
                                <td>{model}</td>
                                <td>{brandModelData[brand].models[model].count}</td>
                                <td>{brandModelData[brand].models[model].totalValue.toLocaleString()}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>

            <h2>Total Cars and Values by Brand</h2>
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Total Number of Cars</th>
                        <th>Total Value (Baht)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(brandModelData).map(brand => (
                        <tr key={brand}>
                            <td>{brand}</td>
                            <td>{brandModelData[brand].totalCars}</td>
                            <td>{brandModelData[brand].totalValue.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Include the MyChartComponent here */}
            <MyChartComponent />
        </div>
    );
}
