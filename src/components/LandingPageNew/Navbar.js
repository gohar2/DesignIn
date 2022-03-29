import React from 'react';
import LogoTesm from '../../icons/DesignInLogo1.png';
import { ReactComponent as Arrowicon } from '../../icons/ArrowIcon.svg';
import './Navbar.css';
import './../../index.css';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Navbar = (props) => {
  const history = useHistory();
  const redirect = () => {
    history.push('/login');
  };
  return (
    <>
      <nav className="navbar d-block">
        <Row>
          <Col lg={4}>
            <div className="d-flex align-items-center justify-content-between">
              <img src={LogoTesm} className="timagNew" alt="logo" />
            </div>
          </Col>
          <Col lg={8}>
            <button
              className="getStarted position-relative w-30"
              onClick={redirect}
            >
              <span className={'txtGetStarted'}>Register For Free</span>
            </button>
          </Col>
        </Row>
      </nav>
    </>
  );
};

export default Navbar;
