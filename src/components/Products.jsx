import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const responseData = await response.json();
            setData(responseData);
            setFilter(responseData);
            setLoading(false);
            const max = Math.max(...responseData.map(p => p.price));
            setMaxPrice(max.toString());
            setMinPrice('0');
        };

        getProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [category, minPrice, maxPrice, data]);

    const handlePriceInput = (value, setter) => {
        if (/^\d*$/.test(value)) {  // Регулярное выражение, проверяющее наличие только цифр
            setter(value);
        }
    };

    const filterProducts = () => {
        const min = parseFloat(minPrice) || 0; // Установить минимальное значение, если minPrice пустое или не число
        const max = parseFloat(maxPrice) || Number.POSITIVE_INFINITY; // Установить максимальное значение, если maxPrice пустое или не число
        const filtered = data.filter(product =>
            (category === 'all' || product.category === category) &&
            product.price >= min && product.price <= max
        );
        setFilter(filtered);
    };

    const ShowProducts = () => (
        <div className="container my-5 py-5">
            <div className="filter-controls mb-4 d-flex justify-content-between align-items-center">
                <select value={category} onChange={e => setCategory(e.target.value)} className="form-select">
                    <option value="all">All Categories</option>
                    {[...new Set(data.map(item => item.category))].map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={minPrice} 
                    onChange={e => handlePriceInput(e.target.value, setMinPrice)} 
                    className="form-control"
                    placeholder="Min Price"
                />
                <input 
                    type="text" 
                    value={maxPrice} 
                    onChange={e => handlePriceInput(e.target.value, setMaxPrice)} 
                    className="form-control"
                    placeholder="Max Price"
                />
            </div>
            <div className="row justify-content-center">
                {filter.map((product) => (
                    <div className="col-md-3 mt-4" key={product.id}>
                        <div className="card h-100 text-center p-4">
                            <img src={product.image} className="card-img-top" alt={product.title} height="300px"/>
                            <div className="card-body">
                                <h5 className="card-title">{product.title.substring(0, 12)}</h5>
                                <p className="card-text">${product.price}</p>
                                <Link to={`/products/${product.id}`} className="btn btn-outline-dark">View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        loading ? <div>Loading...</div> : <ShowProducts />
    );
};

export default Products;
