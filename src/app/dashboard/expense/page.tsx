import React from 'react'
import ExpenseCard from '@/components/ExpenseCard'
import ExpenseTable from '@/components/ExpenseTable'
import CategoryAnalytics from '@/components/CategoryAnalytics'

const ExpensePage = () => {
  return (
    <div>
      <ExpenseCard/>
      <ExpenseTable/>
      <CategoryAnalytics/>
    </div>
  )
}

export default ExpensePage