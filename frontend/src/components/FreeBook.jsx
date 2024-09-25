import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import Cards from './Cards';

function FreeBook() {
    const [book, setBook] = useState([])

    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get("http://localhost:3000/book")
                const data = res.data.filter((data) => data.category === "Free")
                setBook(data)
            } catch (error) {
                console.log(error);
            }
        }
        getBook();
    }, [])
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
                <div>
                    <h1 className='font-semibold text-xl pb-2'>Free Offered Courses</h1>
                    <p className="text-gray-700 mb-4">
                        Explore our selection of free courses designed to help you enhance your skills and knowledge in various fields.
                        Whether you're looking to advance your career, learn a new hobby, or simply satisfy your curiosity, our free offerings
                        provide high-quality education accessible to everyone. Dive into engaging materials and interactive learning experiences
                        at no cost!
                    </p>
                </div>
                <div>
                    <Slider {...settings}>
                        {book.map((item) => (
                            <Cards item={item} key={item.id} />
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default FreeBook