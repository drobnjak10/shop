import React, { useEffect, useState } from 'react'
import { MdDangerous } from 'react-icons/md';

function ProductCard({ product }) {
    const { name, price, avatar, category, stock, sale, description } = product;

    return (
        <div className="card mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`/images/products/${avatar}`} alt="slika"
                        // src="/images/products/20221231642111881879-pc.jpg"
                        style={{ maxWidth: '100%', width: '100%' }}
                    />
                </div>
                <div className="col-md-5 mt-5">
                    <h2>{name}</h2>
                    <span className='bg-danger text-white p-1 rounded '>bestseller</span>
                    {/* {isAvaliable ? <span className='bg-success text-white p-1 rounded '>avaliable</span>
                        : ''} */}
                    {  stock === 0 ?  <span className='bg-danger text-white ms-2 p-1 rounded '>selled</span> :
                     <span className='bg-success text-white p-1 rounded ms-2 '>avaliable</span> }
                   
                    <p className='mt-3 h5 text-danger'>${price}</p>
                    <p className="mt-3 h4">{category}</p>
                    <div className="card-body mt-4">
                        <h4 className='mb-3'>Description</h4>
                        <p>
                            {description}
                        </p>
                    </div>
                    <button className="btn btn-primary rounded">Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard