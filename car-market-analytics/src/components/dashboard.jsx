import MyChartComponent from './chart';
import carsData from '../taladrod-cars.min.json';
import '../index.css';

export default function Dashboard() {
    // Data processing for the table
    const brandModelCount = carsData.Cars.reduce((acc, car) => {
        const brand = car.NameMMT.split(' ')[0]; // Assuming the brand is the first word in NameMMT
        if (!acc[brand]) {
            acc[brand] = { totalValue: 0, models: {} };
        }
        acc[brand].totalValue += parseInt(car.Prc.replace(/,/g, ''));
        acc[brand].models[car.Model] = (acc[brand].models[car.Model] || 0) + 1;
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
                    {Object.keys(brandModelCount).map(brand => (
                        Object.keys(brandModelCount[brand].models).map(model => (
                            <tr key={`${brand}-${model}`}>
                                <td>{brand}</td>
                                <td>{model}</td>
                                <td>{brandModelCount[brand].models[model]}</td>
                                <td>{brandModelCount[brand].totalValue.toLocaleString()}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>

            {/* Include the MyChartComponent here */}
            <MyChartComponent />
        </div>
    );
}
