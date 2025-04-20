import { useEffect, useState } from 'react';
import gsap, { Elastic } from 'gsap';

/**
 *  This Funcation will recieve three urls for same image and will retun 
 *  three image for different viewport.
 * @param { String } sml - url for small screen 
 * @param { String } mid - url for midium screen 
 * @param { String } lrg - url for large screen 
 * @returns  an image element className="loadedImage" for different viewport sizes.
 */

const ImageLoader = ({ sml, mid, lrg  }) => {
    let [width, setWW] = useState(window.innerWidth);
    let resize = () => {
        window.addEventListener('resize', () => {
            setWW(window.innerWidth);
        })
    }

    useEffect(() => {
        resize()
        gsap.fromTo(".loadedImage", { width: "90%" }, {
            width: "100%",
            duration: .4, ease: Elastic
        });
    }, [width])

    return (
        width <= 767 ? (
            <img key={sml} className='loadedImage' src={`${sml}`} alt="of url" />
        ) : width <= 1199 ? (
            <img key={mid} className='loadedImage' src={`${mid}`} alt="of url" />
        ) : (
            <img key={lrg} className='loadedImage' src={`${lrg}`} alt="of url" />
        )
    )

}

export default ImageLoader