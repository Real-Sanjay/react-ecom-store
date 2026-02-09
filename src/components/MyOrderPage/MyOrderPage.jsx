import React from 'react'

import './MyOrderPage.css'
import Table from '../common/Table/Table'

const MyOrderPage = () => {
  return (
<section className="align-items order_page">
        <Table heading={["order", "products", "total", "status"]}>
        <tbody>
            <tr>
                <td>orders</td>
                <td>products</td>
                <td>total</td>
                <td>status</td>
            </tr>
        </tbody>
        </Table>
</section>
  )
}

export default MyOrderPage