import React from 'react';
import Products from './Products';
const Home = () => {
    return (
        <div className='hero'>
            <div className="card text-bg-dark border-0">
                <img src="/asseNts/R1.jpg" className="card-img" alt="Background" height="650px"/>
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className='container'>
                        <h5 className="card-title display-3 fw-bolder mb-0">Oriyon</h5>
                    </div>
                </div>
            </div>
            <Products/>
        </div>
    );
};

export default Home;
