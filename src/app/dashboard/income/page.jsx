import React from 'react'
import BalanceCard from '@/components/Income/BalanceCard'
import IncomeTable from '@/components/Income/IncomeTable'


const IncomePage = () => {
  return (
    <div className='bg-primary'>
        <BalanceCard  />
        <IncomeTable />

    </div>
  )
}

export default IncomePage