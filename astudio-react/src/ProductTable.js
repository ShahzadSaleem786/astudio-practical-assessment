import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div className="table-responsive">
    <table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>DESCRIPTION</th>
          <th>PRICE</th>
          <th>DISCOUNT PERCENTAGE</th>
          <th>RATING</th>
          <th>STOCK</th>
          <th>BRAND</th>
          <th>CATEGORY</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.discountPercentage}</td>
                <td>{product.rating}</td>
                <td>{product.stock}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default ProductTable;
