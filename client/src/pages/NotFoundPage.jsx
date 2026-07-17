import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="not-found"><p>404</p><h1>This page drifted out of your notes.</h1><Link to="/">Return home</Link></section>;
}
