import { FC, useState } from 'react';
import Timer from './Timer';

const App: FC = () => {
  const [timers, setTimers] = useState<number[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  const addTimer = () => {
    setTimers([...timers, nextId]);
    setNextId(nextId + 1);
  };

  const removeTimer = () => {
    setTimers(timers.slice(0, -1));
  };

  return (
    <div>
      <button onClick={addTimer}>Add timer</button>
      <button onClick={removeTimer}>Remove</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {timers.map((id) => (
          <Timer key={id} />
        ))}
      </div>
    </div>
  );
};

export default App;
