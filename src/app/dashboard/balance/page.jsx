import React from 'react'
import BalanceCard from '@/components/BalanceCard'
import BalanceTable from '@/components/BalanceTable'


const BalancePage = () => {
  return (
    <div className='bg-primary'>
        <BalanceCard  />
        <BalanceTable />

    </div>
  )
}

export default BalancePage