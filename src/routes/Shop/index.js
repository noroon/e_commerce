import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../CategoriesPreview';
import Category from './../Category';

import { setCategories } from '../../reducer/categories/action';
import { getCategoriesDocs } from '../../utils/firebase';

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const categories = await getCategoriesDocs();
      console.log(categories);
      dispatch(setCategories(categories));
    })();

  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
