import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
   <div className="flex h-screen overflow-hidden ">
  <Sidebar/>

      {/* Main Content Area */}
      <div className="flex-1  overflow-auto p-6">
        {children}
      </div>
    </div>
  )
}

export default layout