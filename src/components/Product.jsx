import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found!</div>;

    return (
        <div className="product-detail container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid" alt={product.title} />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                    <p className="card-text"><strong>Category:</strong> {product.category}</p>
                </div>
            </div>
        </div>
    );
};

export default Product;
