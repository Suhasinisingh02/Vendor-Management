import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCards';
import JsBarcode from 'jsbarcode';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputAdornment } from '@mui/material';
import { CurrencyRupee } from '@mui/icons-material';
import './ProductList.css';

const PRODUCT_TYPES = ['All', 'Grains', 'Spices', 'Oils', 'Snacks', 'Beverages'];

const productDataBank = {
  Grains: [
    {
      name: 'Basmati Rice',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Basmati_rice.jpg',
      description: 'Premium quality, 5kg pack'
    },
    {
      name: 'Whole Wheat Flour',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Whole_wheat_flour.jpg',
      description: '100% whole grain, 10kg pack'
    }
  ],
  Spices: [
    {
      name: 'Turmeric Powder',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Turmeric_powder.jpg',
      description: 'Pure haldi, 200g pack'
    },
    {
      name: 'Red Chilli Powder',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Red_Chili_Powder.jpg',
      description: 'Kashmiri lal mirch, 100g'
    }
  ],
  Oils: [
    {
      name: 'Mustard Oil',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Mustard_oil.jpg',
      description: 'Pure kachi ghani, 1 liter'
    },
    {
      name: 'Ghee',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Ghee.jpg',
      description: 'Desi cow ghee, 500ml'
    }
  ],
  Snacks: [
    {
      name: 'Namkeen Mix',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Indian_snacks.jpg',
      description: 'Assorted salty snacks, 250g'
    },
    {
      name: 'Biscuit Pack',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Assorted_biscuits.jpg',
      description: 'Assorted cookies, 500g'
    }
  ],
  Beverages: [
    {
      name: 'Tea Leaves',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Assam_tea_leaves.jpg',
      description: 'Premium Assam tea, 250g'
    },
    {
      name: 'Instant Coffee',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
      description: '100% pure, 200g jar'
    }
  ]
};

const ProductList = ({ products = [], setProducts = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [scannedProduct, setScannedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    setLoading(true);
    const generateProducts = () => {
      const result = [];
      let id = 1;

      const generateBarcode = (id) => {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, `PROD${id.toString().padStart(8, '0')}`, {
          format: 'CODE128',
          lineColor: '#000',
          width: 2,
          height: 60,
          displayValue: true,
        });
        return canvas.toDataURL();
      };

      Object.entries(productDataBank).forEach(([type, items]) => {
        items.forEach(product => {
          result.push({
            id: id++,
            name: product.name,
            description: product.description,
            image: product.image,
            type,
            barcode: generateBarcode(id),
            price: parseFloat((Math.random() * 500 + 50).toFixed(2)),
            stock: Math.floor(Math.random() * 100) + 10
          });
        });
      });
      return result;
    };

    setTimeout(() => {
      const generatedProducts = generateProducts();
      setProducts(generatedProducts);
      setLoading(false);
    }, 500);
  }, [setProducts]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleScan = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setScannedProduct(product);
      setDialogOpen(true);
    }
  };

  const handleDelete = () => {
    setProducts(products.filter(p => p.id !== scannedProduct.id));
    setDialogOpen(false);
  };

  const handleEdit = () => {
    setEditedProduct({ ...scannedProduct });
    setEditMode(true);
  };

  const handleUpdate = () => {
    setProducts(products.map(p => 
      p.id === editedProduct.id ? editedProduct : p
    ));
    setEditMode(false);
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? parseFloat(value) : value 
    }));
  };

  const filteredProducts = (products || []).filter((product) => {
    if (!product) return false;
    const matchesType = filterType === 'All' || product.type === filterType;
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    return matchesType && matchesSearch;
  });

  return (
    <div className="product-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {PRODUCT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            product={product} 
            onScan={handleScan}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="no-results">No products found.</div>
      )}

      {loading && <div className="loading">Loading products...</div>}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {editMode ? 'Edit Product' : 'Scanned Product'}
        </DialogTitle>
        <DialogContent>
          {editMode ? (
            <div className="edit-form">
              <TextField
                label="Product Name"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                label="Price"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <div className="barcode-preview">
                <img src={editedProduct.barcode} alt="Barcode" />
              </div>
            </div>
          ) : (
            <div className="product-details">
              <img src={scannedProduct?.image} alt={scannedProduct?.name} className="dialog-image" />
              <h3>{scannedProduct?.name}</h3>
              <p>{scannedProduct?.description}</p>
              <p>Type: {scannedProduct?.type}</p>
              <p>Price: {formatPrice(scannedProduct?.price)}</p>
              <div className="barcode-preview">
                <img src={scannedProduct?.barcode} alt="Barcode" />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button onClick={handleUpdate} color="primary">Save</Button>
            </>
          ) : (
            <>
              <Button onClick={handleDelete} color="secondary">Delete</Button>
              <Button onClick={handleEdit} color="primary">Edit</Button>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;