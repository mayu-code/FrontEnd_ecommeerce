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
      <div className='mt-4'>
        <p className="px-4 py-2">{order.orderId}</p>
        <p className="px-4 py-2">{order.orderStatus}</p>
        <p className="px-4 py-2">{order.orderDate}</p>
        <p className="px-4 py-2">{order.paymentMethod}</p>
        <p className="px-4 py-2">{order.shippingAddress}</p>
        <p className="px-4 py-2">₹{order.totalPaid}</p>
        <p className="px-4 py-2">{order.transitionId}</p>
      </div>
      <div className="mt-4">
        {stack?.mycart?.length > 0 ? (
          <div className="mt-4">
            {stack.mycart.map((item, index) => (
              <OrderItem key={index} item={item} id={stack.stackId} />
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  )
}

export default OrderProductView;