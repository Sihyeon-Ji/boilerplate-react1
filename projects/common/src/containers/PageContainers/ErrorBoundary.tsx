import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
	children?: ReactNode;
	errorFallback(props: {
		error: Error;
		resetBoundary: () => void;
	}): JSX.Element;
	resetHandler: () => void;
	setError: () => void;
}

interface State {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			this.props.setError();
			return this.props.errorFallback({
				error: this.state.error as Error,
				resetBoundary: this.props.resetHandler,
			});
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
