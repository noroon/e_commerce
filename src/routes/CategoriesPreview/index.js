import { useContext } from 'react';

import CategoryPreview from './../../components/CategoryPreview';
import { CategoriesContext } from './../../context/CategoriesContext';

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {Object.entries(categoriesMap).map(([categoryName, products]) => (
        <CategoryPreview
          key={categoryName}
          title={categoryName}
          products={products}
        />
      ))}
    </>
  );
}
