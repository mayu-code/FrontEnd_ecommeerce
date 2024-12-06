import React from 'react';

const CartItem = ({ item }) => {

    const addOrderHandler = async () => {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/user/ordered/${product.id}`, 
            {},  // You can pass an empty object if no body data is required
            {
              headers: {
                "Authorization": `Bearer ${jwt}`, // JWT token for authentication
              },
            }
          );
          navigate('/user/profile');
        } catch (error) {
          console.error("Error adding to cart:", error.response?.data || error.message);
          alert("Failed to add product to the cart. Please try again.");
        }
      };
      
    return (
        <div className="border-b py-4 flex flex-row justify-between">
            <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Quantity: {item.brand}</p>
                <p>Price: ${item.price}</p>
            </div>

            <div className='flex flex-col space-y-2'>
                <button
                    // onClick={handleAddToCart}
                    className="ml-4 bg-blue-500 text-white p-2 rounded"
                >
                    Proceed To Buy
                </button>
                <button
                    // onClick={handleAddToCart}
                    className="ml-4 bg-blue-500 text-white p-2 rounded"
                >
                    remove
                </button>
            </div>

        </div>
    );
};

export default CartItem;
