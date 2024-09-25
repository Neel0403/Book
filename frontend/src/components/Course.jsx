import React, { useEffect, useState } from 'react'
import Cards from "./Cards"
import { Link } from "react-router-dom"
import axios from "axios"

function Course() {
    const [book, setBook] = useState([]);

    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get("http://localhost:3000/book");
                // console.log(res.data);
                setBook(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getBook();
    }, []);

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 pt-12'>
                <div className='mt-16 items-center justify-center text-center'>
                    <h1 className='text-2xl md:text-4xl'>We're delighted to have you
                        <span className='text-pink-500'> Here! :)</span>
                    </h1>
                    <p className='mt-6 text-gray-700'>
                        Discover our extensive range of courses designed to enhance your skills and knowledge. 
                        Whether you are looking to advance your career or explore new interests, we have something for everyone. 
                        Join our community of learners and start your journey today!
                    </p>
                    <Link to="/">
                        <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
                    </Link>
                </div>
                <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
                    {
                        book.map((item) => (
                            <Cards item={item} key={item.id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Course