import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // Keep it simple and visible in DevTools.
    console.error('App crashed:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Une erreur a empêché le rendu de l’application.</h1>
        <p style={{ marginBottom: 12, opacity: 0.8 }}>
          Ouvre la console (F12) pour voir les détails.
        </p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>
          {this.state.error?.message ?? 'Unknown error'}
        </pre>
      </div>
    );
  }
}
