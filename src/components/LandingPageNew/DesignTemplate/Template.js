import React, { useContext, useState } from 'react';
import Advertise from './../../../icons/Advertise.jpg';
import Business from './../../../icons/Business.jpg';
import Education from './../../../icons/Education.jpg';
import Resturent from './../../../icons/Resturent.jpg';
import './../Navbar.css';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import UserContext from '../../../userContext/UserContext';

const Template = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      <div className=" py-5 containerWidthFeature ">
        <Tab.Container id="left-tabs-example2" defaultActiveKey="first">
          <Row
            className={
              'templateDes align-items-center justify-content-center text-center my-5 py-5'
            }
          >
            <Col sm={8}>
              <h2 className={' txtFeature'}>
                <FormattedMessage
                  id="designT"
                  defaultMessage="Design templates"
                />
              </h2>
              <p
                className={
                  userState.isArabic
                    ? 'txtFeatureSubheading_Ar'
                    : 'txtFeatureSubheading'
                }
              >
                <FormattedMessage
                  id="subdesignText"
                  defaultMessage="Create stunning designs from creative templates"
                />
              </p>
              <Nav
                variant="pills"
                className={
                  userState.isArabic
                    ? 'flex-column  templeteSection_Ar'
                    : 'flex-column  templeteSection'
                }
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="advertise"
                      defaultMessage="Advertising"
                    />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="restaurent"
                      defaultMessage="Restaurants"
                    />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="smallB"
                      defaultMessage=" Small / Medium business"
                    />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="forth"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="education"
                      defaultMessage="Education"
                    />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default Template;
