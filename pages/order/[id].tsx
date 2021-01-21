import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Link from 'next/link'

import QUERY_ORDERS from '../../graphs/queryOrderDetail.graphql';


export default function Order(props) {
  console.debug('detail props', props);
  const { data, loading, error } = useQuery(QUERY_ORDERS, {
    variables: { id: props.id },
  });

  // make sure all data is loaded
  if (loading) {
    return <p>loading...</p>;
  }

  // check for errors
  if (error) {
    return <div className="alert alert-danger" role="alert">
      {error.message}
    </div>
  }

  const rows = data.orders.map((order) => {
    return <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.recipient_name}</td>
      <td>{order.created_at}</td>
      <td>{order.sales_total}</td>
      <td>{order.state}</td>
    </tr>
  });

  const count = data.ordersConnection.aggregate.count;
  const pageCount = Math.floor(count / limit);
  
  console.debug('data', data, count);
  return (
    <div >
      <Head>
        <title>Order Detail</title>
      </Head>
      <h1>Order Detail</h1>
      <div className="container">
        TODO
      </div>
      
    </div>
  );
}

