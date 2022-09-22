import { createContext, useState, useEffect } from 'react';

import { getCategoriesDocs } from '../utils/firebase';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    (async function () {
      const categoryMap = await getCategoriesDocs();
      setCategoriesMap(categoryMap)
    })();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
