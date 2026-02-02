import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
   <div className="flex h-screen ">
  <Sidebar/>

      {/* Main Content Area */}
      <div className="flex-1  p-6">
        {children}
      </div>
    </div>
  )
}

export default layout