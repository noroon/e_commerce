import { useSelector } from 'react-redux';

import CategoryPreview from './../../components/CategoryPreview';

import { selectCategories } from '../../reducer/categories/selector';

export default function CategoriesPreview() {
  const categories = useSelector(selectCategories);

  return (
    <>
      {Object.entries(categories).map(([categoryName, products]) => (
        <CategoryPreview
          key={categoryName}
          title={categoryName}
          products={products}
        />
      ))}
    </>
  );
}
