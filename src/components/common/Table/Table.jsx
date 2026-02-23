import React from 'react'

import './Table.css'

const Table = ({heading, children}) => {
  return (
    <table className='common_table'>
        <thead>
            <tr>
            {
                heading.map((item, i) => {
                    return <th key={i}>{item}</th>
                })
            }
            </tr>
        </thead>
        {children}
    </table>
  )
}

export default Table