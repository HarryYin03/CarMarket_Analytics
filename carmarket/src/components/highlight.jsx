import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import carsData from "../taladrod-cars.json";
import "../index.css";

export default function Highlight() {
    const [highlightedCars, setHighlightedCars] = useLocalStorage('highlightedCars', []);
    const [selectedBrand, setSelectedBrand] = useState("All");

    useEffect(() => {
        console.log("Highlighted Cars:", highlightedCars);
    }, [highlightedCars]);

    const isHighlighted = (Cid) => {
        return highlightedCars.some(car => car.Cid === Cid);
    };

    const highlightCar = (car) => {
        if (!isHighlighted(car.Cid)) {
            setHighlightedCars([...highlightedCars, car]);
        }
    };

    const removeCar = (Cid) => {
        setHighlightedCars(highlightedCars.filter(car => car.Cid !== Cid));
    };

    const handleBrandFilter = (event) => {
        setSelectedBrand(event.target.value);
    };

    const filteredCars = selectedBrand === "All"
        ? carsData.Cars
        : carsData.Cars.filter(car => car.NameMMT.split(' ')[0] === selectedBrand);

    const uniqueBrands = ["All", ...new Set(carsData.Cars.map(car => car.NameMMT.split(' ')[0]))];

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

            <div className="filter-container">
                <label htmlFor="brandFilter">Filter by Brand: </label>
                <select id="brandFilter" value={selectedBrand} onChange={handleBrandFilter}>
                    {uniqueBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="select-cars">
                <div className="grid-container">
                    {filteredCars.map(car => (
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
