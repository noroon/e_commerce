import SHOP_DATA from '../data/shop-data.json';
import { addCollectionAndDocs } from './firebase/index.js';

addCollectionAndDocs('categories', SHOP_DATA);
