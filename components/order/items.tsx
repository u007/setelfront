
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useQuery, ApolloError } from '@apollo/client';
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Form } from 'react-bootstrap';
import QUERY_ORDER from '../../graphs/queryOrderDetail.graphql';
import ItemRow from './item';
import classnames from 'classnames';

function OrderItems(props) {
  let totalAmount = 0.0;
  console.debug("items", props.items.length);
  const items = props.items.map((item, i) => {
    totalAmount += item.sales_total;
    return (
      <tr key={i}>
        <td>{item.sku}</td>
        <td>{item.quantity}</td>
        <td>{item.sales_total}</td>
      </tr>
    )
  })
  return (
    <table className={classnames('', props.styleName)}>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} ></td>
          <td style={{}}>
            {totalAmount}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}


OrderItems.propTypes = {
  items: PropTypes.Array
}

export default OrderItems;