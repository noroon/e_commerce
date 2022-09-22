import { routes } from './routes/routes.config.js';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Route>
    </Routes>
  );
}
