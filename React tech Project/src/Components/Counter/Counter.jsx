import { useState, useEffect } from 'react';
import './Counter.css';

function Counter({ quantity, reset, onQuantityChange }) {
    let [counter, setCounter] = useState(1); 
    let [color, setColor] = useState("#DB4444");
  

    function increment() {
        if (counter < quantity && counter < 5) {
            setCounter(prevCounter => prevCounter + 1);
            setColor("#DB4444");
            if (counter === quantity - 1 || counter === 4)
                setColor("grey");
        }
        else {
            setColor("grey");
        }
    }

    useEffect(() => {
        setCounter(1); 
        setColor("#DB4444");
    }, [reset]);

    function decrement() {
        if (counter > 1) {
            setCounter(prevCounter => prevCounter - 1);
            setColor("#DB4444");
        }
    }

    useEffect(() => {
        if (onQuantityChange) {
            onQuantityChange(counter);
        }
    }, [counter]);

    return (
        <div id='CounterContainer'>
            <div className='counter'>
                <span onClick={decrement}>-</span>
                <p>{counter}</p>
                <span style={{ backgroundColor: color, borderColor: color }} onClick={increment}>+</span>
            </div>
        </div>
    );
}

export default Counter;
