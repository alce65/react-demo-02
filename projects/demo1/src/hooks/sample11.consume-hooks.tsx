import { useLocalStorage, useToggle } from "./sample11.hooks";

export const Sample11ConsumeHooks = () => {
  const [value, toggle] = useToggle();
  
  const handleClick = (): void => {
    toggle();
  };

  return (
    <div>
      <h2>Sample11 Consume Hooks</h2>
      <p>Count: {value}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
}
export const Sample11 = () => {

    const initialState = {
        currentUser: "Pepe",
        values: [1,2,4,5]
    }

    const [userState, setUserState] = useLocalStorage('store1', initialState);


    setUserState({
        ...userState,
        currentUser: "Juan",
    });
}




