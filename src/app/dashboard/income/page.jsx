import React from 'react'
import BalanceCard from '@/components/BalanceCard'
import IncomeTable from '@/components/IncomeTable'


const IncomePage = () => {
  return (
    <div className='bg-primary'>
        <BalanceCard  />
        <IncomeTable />

    </div>
  )
}

export default IncomePage