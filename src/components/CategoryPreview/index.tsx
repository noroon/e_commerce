import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../@types';
import ProductCard from '../ProductCard';

import './index.scss';

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
