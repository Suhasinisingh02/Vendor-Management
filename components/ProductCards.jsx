import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './ProductCard.css';

const ProductCard = ({ product, onScan, formatPrice }) => {
  return (
    <Card className="product-card">
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" className="product-price">
          {formatPrice(product.price)}
        </Typography>
        <Typography variant="caption" display="block">
          Stock: {product.stock}
        </Typography>
      </CardContent>
      <Button 
        size="small" 
        color="primary"
        onClick={() => onScan(product.id)}
      >
        Scan
      </Button>
    </Card>
  );
};

export default ProductCard;