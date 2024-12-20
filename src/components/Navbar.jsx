import React from 'react'

import logoOxxo from '../assets/oxxo-logo.webp'

const Navbar = () => {
    return (
        <div className='bg-red-800 py-2 md:block justify-center flex '>
            <div className="">
                <div className="flex h-[44px] items-center overflow-hidden px-6 space-x-4">
                    <img src={logoOxxo} className='h-full object-cover' alt="" />
                    <h1 className="text-white font-extrabold font-sans text-xl">LITTELFUSE</h1>
                </div>
            </div>
        </div>
    )
}

export default Navbar