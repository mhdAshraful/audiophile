import React from 'react'
import Buttons from '../Buttons'
import ImageLoader from '../ImageLoader'
import { AppData } from '../../Contexts/DataContext';

const FourthBanner = () => {

      let { state, loading } = AppData();
      let { data } = state;
      let product = data.filter((item) => item.slug === "yx1-earphones" ? item : null)[0]
      return (
            loading ? <> <h3>loading data</h3> </> : <>
                  <div className='fourth_elm'>
                        <div className='fourth_img'>
                              <ImageLoader sml={`../assets/home/mobile/image-earphones-yx1.jpg`} mid={"../assets/home/tablet/image-earphones-yx1.jpg"} lrg={"../assets/home/desktop/image-earphones-yx1.jpg"} />
                        </div>

                        <div className='fourth_info'>
                              <h4> {product.name} </h4>
                              <Buttons name={"see product"} where={`${product.category}/${product.slug}`} button_type={"bordered_btn"} />

                        </div>
                  </div>
            </>
      )
}

export default FourthBanner