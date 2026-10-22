import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

// Shows a readable message instead of a blank page when a component throws,
// for example an exercise that still says "Not implemented".
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="playground-error">
          <strong>Something threw an error:</strong>
          <pre>{this.state.error.message}</pre>
          <p>Fix it and save. The page reloads by itself.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
