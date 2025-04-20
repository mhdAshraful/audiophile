import React from 'react'
import Buttons from './Buttons';




const CatagoryThumb = () => {

    let head = "image-category-thumbnail-headphones.png"
    let ear = "image-category-thumbnail-earphones.png"
    let speak = "image-category-thumbnail-speakers.png"

    return (
        <div className='thumb_catagory' >
            <div className='catagories'>
                <img className='catagory_image' src={`../assets/thumbnail/${head}`} alt='headphone' />
                <div className='catagory_text'>
                    <h6>Headphones</h6>
                    <Buttons name={"shop"} button_type={"borderless_btn"} where={"/headphones"} />
                </div>
            </div>
            <div className='catagories'>
                <img className='catagory_image' src={`../assets/thumbnail/${speak}`} alt='speakers' />
                <div className='catagory_text'>
                    <h6>Speakers</h6>
                    <Buttons name={"shop"} button_type={"borderless_btn"} where={"/speakers"} />
                </div>
            </div>
            <div className='catagories'>
                <img className='catagory_image' src={`../assets/thumbnail/${ear}`} alt='earphone' />
                <div className='catagory_text'>
                    <h6>Earphone</h6>
                    <Buttons name={"shop"} button_type={"borderless_btn"} where={"/earphones"} />
                </div>
            </div>
        </div>
    )
}

export default CatagoryThumb