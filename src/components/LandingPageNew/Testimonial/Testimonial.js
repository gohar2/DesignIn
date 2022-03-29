import React, { useContext, useState } from 'react';
import './../Navbar.css';
import testimonial from '../../../icons/Testimonial1.png';
import testimonial2 from '../../../icons/Testimonial2.png';
import testimonial3 from '../../../icons/Testimonial3.png';
import Gettarted from '../GetStarted';
import NavTab from '../Template/NavTab';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../../userContext/UserContext';
import Helmet from 'react-helmet';

const Testimonial = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        />
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
      </Helmet>
      <div className="testimonial">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div
              class="carousel"
              data-flickity='{ "wrapAround": true , "autoPlay": 5000 }'
            >
              <div class="carousel-cell">
                <div className="bg">
                  <div
                    className={
                      userState.isArabic
                        ? 'd-md-flex pt-5 flex-row-reverse'
                        : 'd-md-flex pt-5'
                    }
                  >
                    <div className="position-relative" style={{ flex: '.75' }}>
                      <img
                        src={testimonial}
                        className={
                          userState.isArabic
                            ? 'testimonialImg'
                            : 'testimonialImg'
                        }
                      />
                    </div>
                    <div
                      style={{ flex: '1' }}
                      className={
                        userState.isArabic
                          ? 'mx-5 py-5 mobileTestimonial text-right mb-md-5 '
                          : 'mb-md-5 mx-5 py-5 mobileTestimonial'
                      }
                    >
                      <div
                        className={
                          userState.isArabic
                            ? 'txttestimonial_Ar mb-4 '
                            : 'txttestimonial mb-4 '
                        }
                      >
                        <FormattedMessage
                          id="testimonial1"
                          defaultMessage=" tësmem.com is very friendly and time-saving. Templates are awesome with nopremium restrictions. You don’t have tobe a designer to create beautiful graphics on this platform. It’s really fun using tësmem. "
                        />
                      </div>
                      <div
                        className={
                          userState.isArabic
                            ? 'mb-4 txttestimonialName_Ar'
                            : 'mb-4 txttestimonialName'
                        }
                      >
                        <FormattedMessage
                          id="testimonialName1"
                          defaultMessage="Fatime Amin"
                        />
                      </div>
                      <Gettarted />
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-cell">
                <div className="bg3">
                  <div
                    className={
                      userState.isArabic
                        ? 'd-md-flex pt-5 flex-row-reverse'
                        : 'd-md-flex pt-5'
                    }
                  >
                    <div className="position-relative" style={{ flex: '.75' }}>
                      <img
                        src={testimonial3}
                        className={
                          userState.isArabic
                            ? 'testimonialImg'
                            : 'testimonialImg'
                        }
                      />
                    </div>
                    <div
                      style={{ flex: '1' }}
                      className={
                        userState.isArabic
                          ? 'mx-5 py-5 mobileTestimonial mb-md-5 text-right '
                          : 'mb-md-5 mx-5 py-5 mobileTestimonial'
                      }
                    >
                      <div
                        className={
                          userState.isArabic
                            ? 'txttestimonial_Ar mb-4 '
                            : 'txttestimonial mb-4 '
                        }
                      >
                        <FormattedMessage
                          id="testimonial2"
                          defaultMessage="I am obsessed with tësmem. It just took few minutes to create my beautiful design with the tools on the editor. The platform has an extensive photo library so the hassle to find images on another website is no more!"
                        />
                      </div>
                      <div
                        className={
                          userState.isArabic
                            ? 'mb-4 txttestimonialName_Ar'
                            : 'mb-4 txttestimonialName'
                        }
                      >
                        <FormattedMessage
                          id="testimonialName2"
                          defaultMessage=" Aisha Yousuf"
                        />
                      </div>
                      <Gettarted />
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-cell">
                <div className="bg2">
                  <div
                    className={
                      userState.isArabic
                        ? 'd-md-flex pt-5 flex-row-reverse'
                        : 'd-md-flex pt-5'
                    }
                  >
                    <div className="position-relative" style={{ flex: '.75' }}>
                      <img
                        src={testimonial2}
                        className={
                          userState.isArabic
                            ? 'testimonialImg'
                            : 'testimonialImg'
                        }
                      />
                    </div>
                    <div
                      style={{ flex: '1' }}
                      className={
                        userState.isArabic
                          ? 'mx-5 py-5 mobileTestimonial  mb-md-5 text-right '
                          : 'mb-md-5 mx-5 py-5 mobileTestimonial'
                      }
                    >
                      <div
                        className={
                          userState.isArabic
                            ? 'txttestimonial_Ar mb-4 '
                            : 'txttestimonial mb-4 '
                        }
                      >
                        <FormattedMessage
                          id="testimonial3"
                          defaultMessage="Tesmem is a very fast and easy-to-use platform that anyone can use it. The software has so much to offer in its freeversion. I had the best experience usingtësmem for my Instagram food page."
                        />
                      </div>
                      <div
                        className={
                          userState.isArabic
                            ? 'mb-4 txttestimonialName_Ar'
                            : 'mb-4 txttestimonialName'
                        }
                      >
                        <FormattedMessage
                          id="testimonialName3"
                          defaultMessage="Ahmed Nashed"
                        />
                      </div>
                      <Gettarted />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
