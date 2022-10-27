import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/CategoryPreview';
import Spinner from '../../components/Spinner';

import {
  selectCategories,
  selectCategoriesIsLoading,
} from '../../reducers/categories/selector';

const CategoriesPreview = () => {
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(categories).map(([categoryName, products]) => (
          <CategoryPreview
            key={categoryName}
            title={categoryName}
            products={products}
          />
        ))
      )}
    </>
  );
};

export default CategoriesPreview;
