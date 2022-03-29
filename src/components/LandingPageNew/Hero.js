import React from 'react';
import poster_gif from '../../images/landingHero.gif';
import video from '../../images/5V.mp4';
import './Navbar.css';
import './../LandingPageNew/Navbar.css';
import fb from './../../icons/SocialFBL.svg';

import './../../index.css';
import { FormattedMessage } from 'react-intl';
import 'react-toastify/dist/ReactToastify.css';
import Gettarted from './GetStarted';

const Hero = (props) => {
  return (
    <>
      <div className={'containerWidth'}>
        <div
          className={
            'd-md-flex d-block align-items-center heroSection mt-md-5 pt-5'
          }
        >
          <div>
            <div className={'topText'}>
              <FormattedMessage
                id="unlimited"
                defaultMessage="Free Graphics for everyone."
              />
            </div>
            <div className={'topTxtBold mb-md-5 mb-4 pb-md-4'}>
              <h1>
                <FormattedMessage
                  id="unlimited2"
                  defaultMessage="No design experience needed."
                />
              </h1>
            </div>
            <p className={'topsubHeading'}>
              <FormattedMessage
                id="unlimited33"
                defaultMessage="Use the easiest designing tool. Even with no design experience,"
              />
              <br />
              <FormattedMessage
                id="unlimited3b"
                defaultMessage="You can create graphics in minutes."
              />
            </p>
            <div className="row m-0 my-md-5 pt-md-5">
              <div className={'col-md-11 p-0'}>
                <div className={'row align-items-center'}>
                  <div className="col-md-8 col-12 pl-0 p-0 pr-md-3">
                    <Gettarted
                      img={fb}
                      title="Facebook"
                      parent="parentClassBtn"
                      clas="colorTxtfb"
                    />
                  </div>
                  <div className="col-md-4 col-12 text-center">
                    <div
                      className={
                        'd-flex align-items-center justify-content-center h-100'
                      }
                    >
                      <span className={'font-small mx-4'}>
                        <FormattedMessage
                          id="moreInfo"
                          defaultMessage="more information"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <video
              className={'vedioGifnew'}
              autoPlay
              loop
              poster={poster_gif}
              muted="muted"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
