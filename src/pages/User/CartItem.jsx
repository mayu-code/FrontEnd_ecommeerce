import React from 'react';

const CartItem = ({ item }) => {
    return (
        <div className="border-b py-4 flex flex-row justify-between">
            <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
            </div>

            <div className=''>
                <button
                    // onClick={handleAddToCart}
                    className="ml-4 bg-blue-500 text-white p-2 rounded"
                >
                    Proceed To Buy
                </button>
            </div>

        </div>
    );
};

export default CartItem;
