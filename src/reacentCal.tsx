import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalulatorBody from './main';

function ReacentCal(props: { queue: string[]; }) {
    return (
        <div className="recentCal">
            {props.queue.slice().reverse().map((item, index) => (
                <div key={index} >{item}</div>
            ))}
        </div>
    );
}


export default ReacentCal;