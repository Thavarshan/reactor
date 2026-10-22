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

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="mx-auto my-10 max-w-3xl rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm"
        >
          <strong className="text-destructive">Something threw an error:</strong>
          <pre className="mt-2 whitespace-pre-wrap">{this.state.error.message}</pre>
          <p className="mt-2 text-muted-foreground">
            Fix it and save. The page reloads by itself.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
