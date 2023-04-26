import React, { useState } from 'react';
import CalulatorBody from './main';
import ReacentCal from './reacentCal';

function App() {
  const [queue, setQueue] = useState<string[]>([]);
  const handleDataChange = (data: string) => {
    if (queue.length == 3) {
      queue.shift()
    }
    setQueue([...queue, data])
  };

  return (
    <div className="App">
      <div className="main">
        <div className="heading">Calculator</div>
        <CalulatorBody onDataChange={handleDataChange} />
        <div className="recentCalHeading">Recent Calculations</div>
        <ReacentCal queue={queue} />
      </div>
    </div>
  );
}

export default App;
