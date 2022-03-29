import React from 'react';
import WLogoTesm from '../../icons/DesignInLogo1-removebg-preview.png';
import LoginVideo from '../../images/LoginVideo2.gif';
import './Navbar.css';
import './../../index.css';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const LoginNavbar = (props) => {
  return (
    <>
      <nav className="navbar d-block">
        <div className="d-flex align-items-center justify-content-between">
          <>
            <>
              <Row>
                <Col lg={12}>
                  <Link to="/" className="d-none d-md-block ">
                    <img src={WLogoTesm} className="timagNew mt-5" />
                  </Link>
                </Col>
                <Col lg={12}>
                  <img src={LoginVideo} className="timagNew mt-5" />
                </Col>
              </Row>
            </>
          </>
        </div>
      </nav>
    </>
  );
};

export default LoginNavbar;
