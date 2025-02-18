import React from 'react'

export default function PageLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className='px-4 pl-6 pt-5'>
      {children}
    </div>
  )
}
