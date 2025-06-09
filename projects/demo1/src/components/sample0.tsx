import { useEffect, useState } from "react";

export const Sample = () => {
  
    const [state, setState] = useState<number | undefined>(undefined)

    useEffect(() => {
        setState(22)
    }, []); // Empty dependency array means this effect runs once after the initial render
        // Simulating an API call or some asynchronous operation}
  
    return (
    <div>
      <h1>Sample Component {state}</h1>
      <p>This is a sample component demonstrating TypeScript usage.</p>
    </div>
  );
}
