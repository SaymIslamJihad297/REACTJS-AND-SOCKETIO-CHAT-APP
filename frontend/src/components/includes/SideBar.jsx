import React from 'react'

function SideBar() {
    return (
        <div className='h-screen bg-[#6E00FF] w-1/15 m-2 rounded-2xl flex flex-col justify-between items-center py-5'>
            <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" className='rounded-full h-14 relative' alt="" />
            <div className='flex flex-col gap-5'>
                <i class="fa-solid fa-house text-3xl hover:border-b-2 text-center border-white"></i>
                <i class="fa-solid fa-comments text-3xl hover:border-b-2 text-center border-white"></i>
                <i class="fa-solid fa-bell text-3xl hover:border-b-2 text-center border-white"></i>
                <i class="fa-solid fa-gear text-3xl hover:border-b-2 text-center border-white"></i>
            </div>
            <i class="fa-solid fa-right-from-bracket text-3xl"></i>
        </div>
    )
}

export default SideBar