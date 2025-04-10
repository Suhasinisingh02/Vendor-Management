import React, { useState } from 'react';
import ProductList from './ProductList';
import Billing from './billing';
import './PosSystem.css';

const PosSystem = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <div className="pos-system">
      <div className="product-list-container">
        <ProductList products={products} setProducts={setProducts} />
      </div>
      <div className="billing-container">
        <Billing 
          products={products} 
          setProducts={setProducts} 
          cart={cart}
          setCart={setCart}
        />
      </div>
    </div>
  );
};

export default PosSystem;