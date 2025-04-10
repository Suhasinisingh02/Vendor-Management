import React, { useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, 
         IconButton, Select, MenuItem, InputAdornment } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, 
         CurrencyRupee as RupeeIcon, Print as PrintIcon } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import './Billing.css';

const Billing = ({ products, setProducts, cart, setCart }) => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [priceInput, setPriceInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [printBill, setPrintBill] = useState(false);
  const printRef = useRef();

  const PRODUCT_TYPES = ['All', ...new Set(products.map(p => p.type))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleEditPrice = (product) => {
    setCurrentProduct(product);
    setPriceInput(product.price.toString());
    setEditMode(true);
  };

  const handleSavePrice = () => {
    if (!currentProduct || !priceInput) return;

    const updatedPrice = parseFloat(priceInput);
    if (isNaN(updatedPrice)) return;

    const updatedProduct = { ...currentProduct, price: updatedPrice };
    
    setProducts(products.map(product =>
      product.id === currentProduct.id ? updatedProduct : product
    ));
    
    // Update cart if this product is in cart
    setCart(cart.map(item => 
      item.id === currentProduct.id ? { ...item, price: updatedPrice } : item
    ));
    
    setEditMode(false);
    setCurrentProduct(null);
    setPriceInput('');
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleCheckout = () => {
    setPrintBill(true);
    setTimeout(() => {
      handlePrint();
      setPrintBill(false);
      // Clear cart after printing
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
    }, 100);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'type', headerName: 'Category', width: 130 },
    {
      field: 'price',
      headerName: 'Price (₹)',
      width: 130,
      renderCell: (params) => formatPrice(params.value)
    },
    { field: 'stock', headerName: 'Stock', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => handleEditPrice(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleAddToCart(params.row)}
            style={{ marginLeft: '8px' }}
          >
            Add
          </Button>
        </>
      )
    }
  ];

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h1>Point of Sale System</h1>
      </div>

      <div className="billing-layout">
        {/* Product List Section */}
        <div className="product-list-section">
          <div className="controls-container">
            <TextField
              label="Search Products"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px', marginRight: '20px' }}
            />

            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ width: '150px', marginRight: '20px' }}
            >
              {PRODUCT_TYPES.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </div>

          <div style={{ height: 500, width: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={filteredProducts}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              loading={loading}
              disableSelectionOnClick
            />
          </div>
        </div>

        {/* Cart Section */}
        <div className="cart-section">
          <h2>Current Bill</h2>
          
          <div className="customer-details">
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
            />
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">No items in cart</p>
            ) : (
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                          className="quantity-input"
                        />
                      </td>
                      <td>{formatPrice(item.price * item.quantity)}</td>
                      <td>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="cart-summary">
            <div className="total-amount">
              <span>Total:</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>

            <Button
              variant="contained"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handleCheckout}
              disabled={cart.length === 0}
              fullWidth
              size="large"
            >
              Print Bill
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Price Dialog */}
      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogTitle>Update Product Price</DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          {currentProduct && (
            <div className="edit-dialog-content">
              <p><strong>Product:</strong> {currentProduct.name}</p>
              <p><strong>Current Price:</strong> {formatPrice(currentProduct.price)}</p>

              <TextField
                label="New Price (₹)"
                type="number"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RupeeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  inputProps: { step: "0.01" }
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditMode(false)}
            color="secondary"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSavePrice}
            color="primary"
            startIcon={<SaveIcon />}
            disabled={!priceInput || isNaN(parseFloat(priceInput))}
          >
            Save Price
          </Button>
        </DialogActions>
      </Dialog>

      {/* Printable Bill (hidden) */}
      <div style={{ display: 'none' }}>
        <div ref={printRef} className="printable-bill">
          <div className="bill-header">
            <h2>Your Shop Name</h2>
            <p>123 Shop Address, City - 123456</p>
            <p>GSTIN: 12ABCDE1234F1Z1</p>
          </div>

          <div className="bill-info">
            <p><strong>Bill No:</strong> {Math.floor(Math.random() * 1000)}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Customer:</strong> {customerName || 'Walk-in Customer'}</p>
            <p><strong>Phone:</strong> {customerPhone || 'N/A'}</p>
          </div>

          <table className="bill-items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bill-total">
            <p><strong>Total:</strong> {formatPrice(calculateTotal())}</p>
          </div>

          <div className="bill-footer">
            <p>Thank you for your purchase!</p>
            <p>Terms: Goods once sold will not be taken back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;