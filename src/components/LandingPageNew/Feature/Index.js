import React, { useContext } from 'react';
import Design from './../../../images/landingDesign.gif';
import DesignElements from './../../../images/landingDesignElements.gif';
import Photos from './../../../images/HeroPhoto.gif';
import './../Navbar.css';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import Template from '../DesignTemplate/Template';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../../userContext/UserContext';

const Index = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      <div className=" py-5 containerWidthFeature ">
        <Tab.Container
          id="left-tabs-example"
          className="ddd"
          defaultActiveKey="first"
        >
          <Row
            className={
              userState.isArabic
                ? 'align-items-center flex-row-reverse'
                : 'align-items-center'
            }
          >
            <Col sm={5}>
              <h2
                className={
                  userState.isArabic
                    ? 'text-right txtFeature_Ar'
                    : 'text-left txtFeature'
                }
              >
                <FormattedMessage
                  id="amazingfeature"
                  defaultMessage="Amazing Features"
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
                  id="subfeatureText"
                  defaultMessage="Explore our built-in custom elements & features."
                />
              </p>
              <Nav
                variant="pills"
                className={
                  userState.isArabic
                    ? 'flex-column sidenavTabFsection_Ar '
                    : 'flex-column sidenavTabFsection'
                }
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="designE"
                      defaultMessage="Design elements"
                    />
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="arabicF"
                      defaultMessage="Arabic & English fonts"
                    />
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="easyT"
                      defaultMessage="Easy handy tools"
                    />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="forth"
                    className={userState.isArabic ? 'ml-0' : ''}
                  >
                    <FormattedMessage
                      id="photoL"
                      defaultMessage="Extensive photo library"
                    />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className={userState.isArabic ? 'mr-auto' : 'ml-auto'} sm={6}>
              <Tab.Content className="">
                <Tab.Pane eventKey="first">
                  <img src={DesignElements} style={{ width: '100%' }} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <img src={Design} style={{ width: '100%' }} />
                </Tab.Pane>
                <Tab.Pane eventKey="forth">
                  <img src={Photos} style={{ width: '100%' }} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <Template />
    </>
  );
};

export default Index;
