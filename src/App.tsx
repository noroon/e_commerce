import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navigation from './components/Navigation';
import { routes } from './routes/routes.config';
import { checkUserSession } from './reducers/user/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

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
};

export default App;
