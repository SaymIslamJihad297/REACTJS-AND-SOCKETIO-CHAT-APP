import React from 'react'

function SearchBar() {
    return (
        <div className='bg-white w-full p-3 rounded-2xl  shadow shadow-black mt-5'>
            <i class="fa-solid fa-magnifying-glass text-2xl"></i>
            <input type="text" placeholder='Search' />
        </div>
    )
}

export default SearchBar