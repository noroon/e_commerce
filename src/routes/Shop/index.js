import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../CategoriesPreview';
import Category from './../Category';

import { requestGetCategories } from '../../reducers/categories/actions';

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetCategories());    
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
