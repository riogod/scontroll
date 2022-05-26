import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import App from './presentation/App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
