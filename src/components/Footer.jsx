import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ----left section */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" srcset="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, fuga repellendus. Iusto error ipsa, esse voluptatum veritatis eveniet eligendi? A adipisci vel doloremque veniam sint placeat perspiciatis deserunt fugit. Temporibus!</p>
                </div>
                {/* ---center section---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Private Policy</li>
                    </ul>
                </div>
                {/* ----right section---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>Get in touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>123456789</li>
                        <li>temp@gmail.com</li>
                    </ul>

                </div>
            </div>
            <div>
                {/* -------------copyright text-------- */}
                <hr />
                <p className='py-5text-sm text-center'>
                    copyright 2024@ Mediconnet -All right reserve
                </p>
            </div>
        </div>
    )
}

export default Footer