import React, { useState } from 'react';

const CartProduct = ({ item, onUpdateQuantity, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    // Handle the change in quantity
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);
        onUpdateQuantity(item.id, newQuantity); // Notify the parent to update the cart state
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between ">
            <div className="flex items-center space-x-4">
                <div className='flex flex-col justify-between'>
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.price} each</div>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 text-center border p-2 rounded"
                />
                <button
                    onClick={() => onRemove(item.id)}
                    className="bg-red-500 text-white p-2 rounded-full"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartProduct;
