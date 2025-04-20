import React from 'react';
import ImageLoader from './ImageLoader';

const BestGears = () => {

    let imgs = [
        "../assets/best-gare/image-best-gear-375.jpg",
        "../assets/best-gare/image-best-gear-768.jpg",
        "../assets/best-gare/image-best-gear-1200.jpg"
    ]
    return (
        <div className='best_gears_container'>

            <div className='image'>
                <ImageLoader sml={`${imgs[0]}`} mid={`${imgs[1]}`} lrg={`${imgs[2]}`} />
            </div>
            <div className='info'>
                <h2>Bringing you the <span className='color_secondary'>best</span> audio gear</h2>
                <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
            </div>
        </div>
    )
}

export default BestGears