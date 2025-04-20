import React from 'react'
import Buttons from './Buttons'

import { GrFacebook, GrInstagram, GrTwitter } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import Logo from './Logo';

const Footer = () => {
    return (
        <div className='footer_container'>
            <div className='footer_links'>
                <Logo />
                <div className='footer_buttons'>
                    <Buttons name={"Home"} button_type={"nav_btn"} where={"/"} />
                    <Buttons name={"Headphones"} button_type={"nav_btn"} where={"/headphones"} />
                    <Buttons name={"Speakers"} button_type={"nav_btn"} where={"/speakers"} />
                    <Buttons name={"Earphones"} button_type={"nav_btn"} where={"/earphones"} />
                </div>
            </div>
            <div className='footer_details comm_width'>
                <p className='footer_inner_text'>
                    Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                </p>
            </div>
            <div className='footer_details_bottoms'>
                <p>Copyright 2021. All Rights Reserved</p>
                <div>
                    <IconContext.Provider value={{ style: { className: "footer_icon_each" } }} >
                        <GrFacebook className='icon_each' />
                        <GrTwitter className='icon_each' />
                        <GrInstagram className='icon_each' />
                    </IconContext.Provider>
                </div>
            </div>

        </div >
    )
}

export default Footer