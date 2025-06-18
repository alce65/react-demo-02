import { Component, type JSX } from 'react';

abstract class BaseComponent<P, S> extends Component<P, S> {
  protected log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  abstract getTitle(): string;
}

interface Props {
  tittle: string;
}

interface State {
  count: number;
}

export class InfoBox extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  getTitle(): string {
    this.log(this.props.tittle);
    return this.props.tittle;
  }

  incrementCount = (): void => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  override render(): JSX.Element {
    return (
      <div>
        <h1>{this.getTitle()}</h1>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
