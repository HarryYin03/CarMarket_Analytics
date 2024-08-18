import { useLocalStorage } from "react-use";
import carsData from "../taladrod-cars.min.json";
import "../index.css";


export default function Highlight() {
    // Replace useState with useLocalStorage
    const [highlightedCars, setHighlightedCars] = useLocalStorage('highlightedCars', []);

    // Check if a car is already highlighted
    const isHighlighted = (Cid) => {
        return highlightedCars.some(car => car.Cid === Cid);
    };

    // Function to highlight a car
    const highlightCar = (car) => {
        if (!isHighlighted(car.Cid)) {
            setHighlightedCars([...highlightedCars, car]);
        }
    };

    // Function to remove a car from highlights
    const removeCar = (Cid) => {
        setHighlightedCars(highlightedCars.filter(car => car.Cid !== Cid));
    };

    return (
        <div className="container">
            <h1>Highlighted Cars</h1>

            <div className="highlighted-cars">
                <div className="grid-container">
                    {highlightedCars.map(car => (
                        <div className="grid-item" key={car.Cid}>
                            <img src={car.Img100} alt={car.NameMMT} />
                            <span>{car.NameMMT}</span>
                            <button onClick={() => removeCar(car.Cid)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>

            <h2>Select Cars to Highlight</h2>
            <div className="select-cars">
                <div className="grid-container">
                    {carsData.Cars.map(car => (
                        <div className="grid-item" key={car.Cid}>
                            {isHighlighted(car.Cid) && <div className="check-mark">✔</div>}
                            <img src={car.Img100} alt={car.NameMMT} />
                            <span>{car.NameMMT}</span>
                            <button onClick={() => highlightCar(car)}>Highlight</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}