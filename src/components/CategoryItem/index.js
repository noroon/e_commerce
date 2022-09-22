import './index.scss';
import { useNavigate } from 'react-router-dom';

export default function CategoryItem({ category: { imageUrl, title, path } }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <div className="category-item-container" onClick={handleNavigate}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-item-body-container">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  );
}
