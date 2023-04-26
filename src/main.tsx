import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function calulate(lastOp: string, vala: number, valb: number) {
    if (lastOp == '+') {
        return valb + vala
    }
    else if (lastOp == '-') {
        return valb - vala
    }
    else if (lastOp == '*') {
        return valb * vala
    }
    else if (lastOp == '/') {
        return valb / vala
    }
    else if (lastOp == 'mod') {
        return valb % vala
    }
    return 0
}

function calulateStack(stack: string[]) {
    stack = stack.reverse()
    while (stack.length > 1) {
        const val = stack.pop()
        const op = stack.pop()
        const val2 = stack.pop()
        if (op && val && val2)
            stack.push(calulate(op, parseFloat(val2), parseFloat(val)).toString())
    }
    return stack[0]
}


function CalulatorBody(props: { onDataChange: (data: string) => void; }) {
    const [vals, setvals] = useState('0');
    const [vala, setvala] = useState('0');
    const [stack, setStack] = useState<string[]>([]);

    function handleClick(curOP: string) {
        if (vala == '')
            return
        stack.push(vala)
        if (['*', '/'].includes(stack[stack.length - 2])) {
            const b = stack.pop()
            const op = stack.pop()
            const a = stack.pop()
            if (a && b && op) {
                const newval = calulate(op, parseFloat(b), parseFloat(a))
                stack.push(newval.toString())
            }
        }
        stack.push(curOP)
        setvals((vals + curOP))
        setvala('')
        setStack(stack)
    }


    function onNumberbuttonclick(val: string) {
        setvals(vals == '0' ? val : vals + val)
        setvala(vala == '0' ? val : vala + val)
    }

    return <div className="calulator">
        <div className="valueDiv">
            <label className="col-sm-2 col-form-label">{vals}</label>
        </div>
        <button onClick={function () {
            setvals('0');
            setStack([])
            setvala('0')
        }} type="button" className="btn btn-dark">AC</button>
        <button onClick={() => handleClick('mod')} type="button" className="btn btn-dark">mod</button>
        <button type="button" className="btn btn-dark">%</button>
        <button onClick={() => handleClick('/')} type="button" className="btn btn-dark">/</button>

        <button onClick={() => onNumberbuttonclick('7')} type="button" className="btn btn-dark">7</button>
        <button onClick={() => onNumberbuttonclick('8')} type="button" className="btn btn-dark">8</button>
        <button onClick={() => onNumberbuttonclick('9')} type="button" className="btn btn-dark">9</button>
        <button onClick={() => handleClick('*')} type="button" className="btn btn-dark">*</button>


        <button onClick={() => onNumberbuttonclick('4')} type="button" className="btn btn-dark">4</button>
        <button onClick={() => onNumberbuttonclick('5')} type="button" className="btn btn-dark">5</button>
        <button onClick={() => onNumberbuttonclick('6')} type="button" className="btn btn-dark">6</button>
        <button onClick={() => handleClick('-')} type="button" className="btn btn-dark">-</button>

        <button onClick={() => onNumberbuttonclick('1')} type="button" className="btn btn-dark">1</button>
        <button onClick={() => onNumberbuttonclick('2')} type="button" className="btn btn-dark">2</button>
        <button onClick={() => onNumberbuttonclick('3')} type="button" className="btn btn-dark">3</button>
        <button onClick={() => handleClick('+')} type="button" className="btn btn-dark">+</button>

        <button onClick={() => onNumberbuttonclick('0')} type="button" className="btn btn-dark big">0</button>
        <button onClick={() => onNumberbuttonclick('.')} type="button" className="btn btn-dark">.</button>
        <button onClick={function () {
            if (vala != '') {
                stack.push(vala)
            }
            console.log(stack)
            const answer = calulateStack(stack)
            if (answer == undefined)
                return
            setStack([])
            setvala(answer)
            setvals(answer)
            console.log(answer)
            props.onDataChange(vals + ' = ' + answer);
        }} type="button" className="btn btn-dark">=</button>
    </div >
}
export default CalulatorBody;