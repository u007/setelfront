import Head from 'next/head';
import { useRouter } from 'next/router'
import { useQuery, ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link'
import QUERY_ORDER from '../../graphs/queryOrderDetail.graphql';
import ItemsComp from 'components/order/items';

const saveOrder = () => {
  console.debug('save');
}


export default function Order(props) {
  const router = useRouter()
  const { id } = router.query;
  const [order, setOrder] = useState("");
  let [loading, setLoading] = useState(true);

  let { data, error } = useQuery(QUERY_ORDER, {
    variables: { id },
    onCompleted: (res) => {
      console.debug('completed!', data.order.items);
      // const dataOrder = Object.assign({}, data.order, { items: data.order.items.map(()=>) })
      setOrder(data.order);
      setLoading(false);
    }
  });

  if (loading) {
    return <p>loading...</p>;
  }

  if (order == null) {
    error = new ApolloError({ errorMessage: 'Invalid order' })
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">
      {error.message}
    </div>
  }

  const useOrderInput = (field, valueKey = 'value') => {
    // let initialState = order[field];
    // const [value, setValue] = useState(initialState);
    function setValueFromEvent(e) {
      console.debug('changed', e.target);
      const update = { [field]: e.target[valueKey] };
      const updating = Object.assign({}, order, update);
      // console.debug('updating', update);
      setOrder(updating);
      // setValue(event.target[valueKey]);
    }

    const res = { onChange: setValueFromEvent }
    res[valueKey] = order[field];
    return res;
  }

  const addItem = () => {
    const items = [...order.items];
    items.push({ sku: 'CURRMEE', quantity: 5, name: 'Curry Mee', selling_price: 10.0, sales_total: 10.0 * 5 });
    const newOrder = Object.assign({}, order, { items });
    console.debug('newitems', newOrder.items);
    setOrder(newOrder);
  }

  return (
    <div >
      <Head>
        <title>Order Detail</title>
      </Head>
      <Container>
        <h1>Order Detail</h1>
        <div className="toolbar">
          <Link href="/order"><a>Back to list</a></Link>
        </div>

        <Row>
          <Col md={6} sm={12}>
            {order.id && <Form.Group controlId="orderForm.orderID">
              <Form.Label>Order ID</Form.Label>
              <div>{order.order_id}</div>
            </Form.Group>}

            <Form.Group controlId="orderForm.recipient_name">
              <Form.Label>Recipient</Form.Label>
              <Form.Control value={order.recipient_name} placeholder="name" {...useOrderInput('recipient_name')} />
              <Form.Control as="select" value={order.recipient_country} {...useOrderInput('recipient_address')} >
                <option value=""></option>
                <option value="MY">Malaysia</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="orderForm.recipient_name">
              <Form.Label>Recipient address</Form.Label>
              <Form.Control value={order.recipient_address} placeholder="address" {...useOrderInput('recipient_address')} />

              <Form.Control value={order.recipient_address2} placeholder="address2" {...useOrderInput('recipient_address2')} />

              <Form.Control value={order.recipient_city} placeholder="city" {...useOrderInput('recipient_city')} />

              <Form.Control value={order.recipient_state} placeholder="state" {...useOrderInput('recipient_state')} />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
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

          </Col>
        </Row>

        <Row className="full">
          <Col sm={12}>
            <h2>Items</h2>
            <div>
              <Button variant="secondary" onClick={addItem}>Add Item</Button>
            </div>
            <ItemsComp items={order.items} styleName="full" />
          </Col>
        </Row>
        <br /><br />
        <Row className=" actions">
          <Col sm={12}>
            <Button type="button" variant="primary" onClick={saveOrder}>Save</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

