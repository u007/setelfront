import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Pagination } from 'react-bootstrap';

import QUERY_ORDERS from '../graphs/queryOrders.graphql';

export default function Order(props) {
  const router = useRouter()
  const navPage = (e) => {
    // e.preventDefault()
    // console.debug('e', e.currentTarget.dataset)
    // console.debug('navpage', e, e.currentTarget);
    router.push("/order?page=" + e.currentTarget.dataset.page);
  }

  let page: Int = 'page' in router.query ? router.query.page : 1;
  const limit = 5;
  const { data, loading, error } = useQuery(QUERY_ORDERS, {
    variables: { limit, start: (page - 1) * limit },
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
      <td><Link href={"order/" + order.id}>{order.order_id}</Link></td>
      <td>{order.recipient_name}</td>
      <td>{order.created_at}</td>
      <td>{order.sales_total}</td>
      <td>{order.state}</td>
    </tr>
  });

  const count = data.ordersConnection.aggregate.count;
  const pageCount = Math.floor(count / limit);
  const pages = [];
  console.debug('data', data, count);

  const pagesNav = []
  for (let number = 1; number <= pageCount; number++) {
    pagesNav.push(
      <Pagination.Item key={number} active={number === page} data-page={number} onClick={navPage}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="container">
        <h1>Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Date</th>
              <th>Amount</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <Pagination>{pagesNav}</Pagination>

      </div>

    </div>
  );
}

