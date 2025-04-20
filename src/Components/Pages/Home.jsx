import React from 'react';
import CatagoryThumb from '../Utils/CatagoryThumb';

import { TopBanner } from '../Utils/Banners/TopBanner';
import { CuirculedBanner } from '../Utils/Banners/CuirculedBanner';
import ThiredBanner from '../Utils/Banners/ThiredBanner';
import FourthBanner from '../Utils/Banners/FourthBanner';
import BestGears from '../Utils/BestGears';
import Footer from '../Utils/Footer';

const Home = () => {

      return (
            <>
                  <TopBanner />
                  <CatagoryThumb />
                  <CuirculedBanner />
                  <ThiredBanner />
                  <FourthBanner />
                  <BestGears />
                  <Footer />

            </>
      )
}

export default Home