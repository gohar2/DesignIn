import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import './../../Category.css';
import API from '../../../api/Api';
import { dashboardUrl } from '../../../api/constants';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ReactComponent as Previous } from '../../../icons/Previous.svg';
import { ReactComponent as Next } from '../../../icons/Next.svg';
import userContext from '../../../userContext/UserContext';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';

const Category = (props) => {
  const [key, setKey] = useState('home');
  const [category, setCategory] = useState([]);
  const [loader, setloader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  let history = useHistory();

  useEffect(() => {
    API.get(`${process.env.REACT_APP_BASE_URL}${dashboardUrl}`).then(
      (result) => {
        result.data.length = 8;
        setCategory(result.data);
        setSelectedCategory(result.data[0]);
        setloader(false);
      },
    );
  }, []);
  useEffect(() => {}, [selectedCategory]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1624 },
      items: 6,
      slidesToSlide: 1,
    },
    mimidesktop: {
      breakpoint: { max: 1624, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 4,
    },
    largemobile: {
      breakpoint: { max: 767, min: 440 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 440, min: 300 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        <button className="carouselBtn previousBtn" onClick={() => previous()}>
          <Previous className="previousIcon carouselIcon" />
        </button>
        <button className="carouselBtn  nextBtn" onClick={() => next()}>
          <Next className="nextIcon carouselIcon" />
        </button>
      </div>
    );
  };
  const handleRedirect = (cat) => {
    userDispatch({ type: 'SET_PAGE_SIZE', payload: cat });
    history.push(`/editor/Template/${cat.id}`);
  };
  return (
    <>
      <Tabs
        className={
          userState.isArabic
            ? 'justify-content-center border-0 my-5 pt-md-5 letterSpace0 flex-row-reverse'
            : 'justify-content-center border-0 my-5 pt-md-5'
        }
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab
          eventKey="home"
          className={userState.isArabic ? 'border-0 letterSpace0' : 'border-0'}
          title={userState.isArabic ? ' التواصل الاجتماعي' : 'Social media'}
        >
          {loader ? (
            <></>
          ) : (
            <div className="categoryContainerr">
              {selectedCategory.intermediate_categories.length === 0 ? (
                <div></div>
              ) : (
                <div className="categoryImage">
                  <Carousel
                    arrows={false}
                    customButtonGroup={<ButtonGroup />}
                    swipeable={true}
                    draggable={true}
                    centerMode={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all 1s"
                    transitionDuration={1000}
                    containerClass="carousel-container categoryCarouselContainer"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px categoryCarouselItem"
                  >
                    {selectedCategory.intermediate_categories.map((obj) => {
                      return (
                        <>
                          <div
                            className="categoryImageItem"
                            onClick={() => handleRedirect(obj)}
                          >
                            {/* <Link
                          to={{
                            pathname: `editor/${obj.id}`,
                          }}
                          target="_blank"
                        > */}
                            <img
                              id={obj.id}
                              className="catImage"
                              src={obj.image.url}
                              alt="img"
                            />
                            {/* </Link> */}
                            <div
                              className={
                                userState.isArabic
                                  ? 'catNameLanding_Ar'
                                  : 'catNameLanding'
                              }
                            >
                              {userState.isArabic ? obj.title_ar : obj.title}
                            </div>
                            <div className="imageSizeLanging">
                              {obj.width} x {obj.height}
                              {obj.unit}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Carousel>
                </div>
              )}
            </div>
          )}
        </Tab>
        <Tab
          eventKey="profile"
          title={userState.isArabic ? 'تسويق' : 'Marketing'}
          disabled
        >
          dsc
        </Tab>
        <Tab
          eventKey="contact"
          title={userState.isArabic ? 'مستندات' : 'Documents'}
          disabled
        >
          sdcd
        </Tab>
      </Tabs>
    </>
  );
};

export default Category;
