import React from 'react'
import { AppData } from '../../Contexts/DataContext'
import ImageLoader from '../ImageLoader';
import Buttons from '../Buttons';

const ThiredBanner = () => {
      let { state, loading } = AppData();
      let { data } = state;
      let product = data.filter((item) => item.slug === "zx7-speaker" ? item : null)[0]
      return (
            loading ? <> <h3>loading data</h3> </> : <>
                  <div className='thired_elm'>
                        <div className='thired_banner'>
                              <div className='thired_image'>
                                    <ImageLoader sml={`../assets/home/mobile/image-speaker-zx7.jpg`} mid={"../assets/home/tablet/image-speaker-zx7.jpg"} lrg={"../assets/home/desktop/image-speaker-zx7.jpg"} />
                              </div>
                              <div className='new_info'>
                                    {product.new ? <p className='over_line'>New product</p> : <></>}
                                    <h4>{product.name}</h4>
                                    <Buttons where={`${product.category}/${product.slug}`} name={"see prdouct"} button_type={"bordered_btn"} />
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default ThiredBanner