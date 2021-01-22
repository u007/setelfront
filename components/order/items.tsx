
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useQuery, ApolloError } from '@apollo/client';
import Link from 'next/link'
import { Form } from 'react-bootstrap';
import QUERY_ORDER from '../../graphs/queryOrderDetail.graphql';
import ItemRow from './item';
import classnames from 'classnames';

export default function OrderItems(props) {
  let totalAmount = 0.0;
  const items = props.items.map((item) => {
    totalAmount += item.sales_total;
    return (
      <tr>
        <td>{item.sku}</td>
        <td>{item.quantity}</td>
        <td>{item.sales_total}</td>
      </tr>
    )
  })
  return (
    <table className={classnames('pill', props.styleName)}>
      <thead>
        <th>SKU</th>
        <th>Quantity</th>
        <th>Amount</th>
      </thead>
      <tbody>

      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3" style={{ float: 'right' }}>
            {totalAmount}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}