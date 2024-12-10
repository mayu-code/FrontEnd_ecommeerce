import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';
import OrderItem from '../../conponents/product/OrderItem';

function OrderProductView() {

  const jwt = localStorage.getItem("jwt")
  const [stack, setStack] = useState([]);
  const { state } = useLocation(); // Access additional data passed via state
  const order = state?.order;

  useEffect(() => {
    loadStack();
  }, [])

  const loadStack = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/orderStack/${order.orderId}`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
    );
    setStack(result.data.data);
  };

  return (
    <>
      <div className='max-w-7xl mx-auto'>

        <section className='mt-10 p-10 flex flex-col gap-4 border border-gray-200 shadow-md'>

          <div className='flex flex-col gap-6'>
            <h3 className='text-3xl font-semibold'>Order Details</h3>
            <p className="text-xl font-semibold">Order id: <span className='font-normal'>{order.orderId}</span></p>
            <p className="text-xl font-semibold">Status: <span className='font-normal'>{order.orderStatus}</span></p>
            <p className="text-xl font-semibold">Order Date: <span className='font-normal'>{order.orderDate}</span></p>
            <p className="text-xl font-semibold">Payment Method: <span className='font-normal'>{order.paymentMethod}</span></p>
            <p className="text-xl font-semibold">Delivered Address: <span className='font-normal'>{order.shippingAddress}</span></p>
            <p className="text-xl font-semibold">Transition id: <span className='font-normal'>{order.transitionId}</span></p>
          </div>
          <div>
            {stack?.mycart?.length > 0 ? (
              <div className="mt-4">
                <h3 className='text-2xl font-semibold'>Ordered Products</h3>
                {stack.mycart.map((item, index) => (
                  <OrderItem key={index} item={item} id={stack.stackId} />
                ))}
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <p className="text-2xl font-semibold">Total Amount Paid: <span className='font-normal text-green-600 text-3xl'>₹{order.totalPaid}</span></p>
        </section>
      </div>
    </>
  )
}

export default OrderProductView;