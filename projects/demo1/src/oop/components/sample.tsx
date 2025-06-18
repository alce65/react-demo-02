import { Component, type JSX } from "react";

interface Props {
    name: string;
}

interface State {
    count: number;
}


export class SampleComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementCount = (): void => {
    this.setState((prevState) => ({
        ...prevState,
      count: prevState.count + 1,
    }));
  };

  componentDidMount(): void {
    console.log(`Component ${this.props.name} mounted with initial count: ${this.state.count}`);
  }

  componentWillUnmount(): void {
    console.log(`Component ${this.props.name} will unmount`);
  }

  override render(): JSX.Element {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
