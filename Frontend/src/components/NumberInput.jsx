import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const NumberInput = ({ name,ref ,value = 1, min = 1, max = 100, step = 1, onChange }) => {
    const [number, setNumber] = useState(value);

    const handleIncrement = (e) => {
        e.preventDefault();
        if (number < max) {
            setNumber(prev => prev + step);
            onChange && onChange(number + step);
        }
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        if (number > min) {
            setNumber(prev => prev - step);
            onChange && onChange(number - step);
        }
    };

    const handleChange = (e) => {
        let newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setNumber(newValue);
            onChange && onChange(newValue);
        }
    };

    return (
        <div className="flex items-center rounded-md w-28 mx-auto">
            <button 
                onClick={handleDecrement} 
                className="btn btn-sm hover:bg-neutral-500 rounded-none border-2  border-neutral-400 rounded-l-lg bg-neutral-400 px-2"
                disabled={number <= min}
            >
                <Minus size={16} />
            </button>
            <input
                type="text"
                ref={ref}
                className="text-center h-8 border-neutral-400 border-y-2  w-full outline-none bg-transparent"
                value={number}
                onChange={handleChange}
                min={min}
                max={max}
                name={name}
                id={name}
            />
            <button 
                onClick={handleIncrement} 
                className="btn btn-sm hover:bg-neutral-500 rounded-none border-2 border-neutral-400 rounded-r-lg bg-neutral-400 px-2"
                disabled={number >= max}
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default NumberInput;
