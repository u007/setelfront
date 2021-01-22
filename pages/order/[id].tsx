import Head from 'next/head';
import { useRouter } from 'next/router'
import { useQuery, ApolloError } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link'
import { Form } from 'react-bootstrap';
import QUERY_ORDER from '../../graphs/queryOrderDetail.graphql';
import ItemsComp from 'components/order/items';

const saveOrder = () => {
  console.debug('save');
}
export default function Order(props) {
  const router = useRouter()
  const { id } = router.query;
  console.debug('query', router.query);
  let { data, loading, error } = useQuery(QUERY_ORDER, {
    variables: { id },
  });

  // make sure all data is loaded
  if (loading) {
    return <p>loading...</p>;
  }

  const orderData = data.order;
  if (orderData == null) {
    error = new ApolloError({ errorMessage: 'Invalid order' })
  }

  const [order, setOrder] = useState(Object.assign({}, orderData));

  // check for errors
  if (error) {
    return <div className="alert alert-danger" role="alert">
      {error.message}
    </div>
  }

  console.debug('data', order);
  return (
    <div >
      <Head>
        <title>Order Detail</title>
      </Head>
      <div className="container">
        <h1>Order Detail</h1>
        <div className="toolbar">
          <Link href="/order"><a>Back to list</a></Link>
        </div>


        <div className="row">
          <div className="col-6">
            {order.id && <Form.Group controlId="orderForm.orderID">
              <Form.Label>Order ID</Form.Label>
              <div>{order.order_id}</div>
            </Form.Group>}

            <Form.Group controlId="orderForm.recipient_name">
              <Form.Label>Recipient</Form.Label>
              <Form.Control value={order.recipient_name} placeholder="name" onChange={(e) => setOrder(Object.assign({}, order, { recipient_name: e.target.value }))} />
              <Form.Control value={order.recipient_address} placeholder="address" onChange={(e) => setOrder(Object.assign({}, order, { recipient_address: e.target.value }))} />
              <Form.Control value={order.recipient_address2} placeholder="address2" onChange={(e) => setOrder(Object.assign({}, order, { recipient_address2: e.target.value }))} />
              <Form.Control value={order.recipient_city} placeholder="city" onChange={(e) => setOrder(Object.assign({}, order, { recipient_city: e.target.value }))} />
              <Form.Control value={order.recipient_state} placeholder="state" onChange={(e) => setOrder(Object.assign({}, order, { recipient_country: e.target.value }))} />
              <Form.Control value={order.recipient_country} placeholder="country" />
            </Form.Group>
          </div>
          <div className="col-6">
            {order.id && <Form.Group controlId="orderForm.orderID">
              <Form.Label>Order Date</Form.Label>
              <div>{order.order_at}</div>
            </Form.Group>}

            <Form.Group controlId="orderForm.recipient_name">
              <Form.Label>Order status</Form.Label>
              <Form.Control as="select" value={order.state}>
                <option value="created">Created</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Form.Control>
            </Form.Group>

            {order.id && <Form.Group controlId="orderForm.orderID">
              <Form.Label>Order amount</Form.Label>
              <div>{order.sales_total}</div>
            </Form.Group>}

          </div>
        </div>

        <div>
          <h2>Items</h2>
          <ItemsComp items={order.items} className="full" />
        </div>

        <div className="actions">
          <button type="button" className="btn btn-primary" onClick="saveOrder">Save</button>
        </div>

      </div>
    </div>
  );
}

