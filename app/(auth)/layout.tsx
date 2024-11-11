import React from 'react'
import Image from 'next/image'

const Layout = ({ children }:{children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
      <section className='bg-dark-200 p-10'>
        <div>
            <Image 
              src="/favicon.ico"
              alt='logo'
              width={32}
              height={32}
              className='h-auto'
            />
            <div className='space-y-5 text-brand-100'>
              <h1 className='h1'>Manage your files the best way</h1>
              <p className='body-1'>This is the place where you store all your data</p>
            </div>
        </div>
      </section>
      {children}
    </div>
  )
}

export default Layout