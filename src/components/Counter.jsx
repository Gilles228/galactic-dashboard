import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Valeur : <span data-testid="count-value">{count}</span></h1>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
    </div>
  );
}