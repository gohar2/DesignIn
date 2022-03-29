import React from 'react';
import './Navbar.css';
import './../../index.css';
import Hero from './Hero';
import Index from './Feature/Index';
import Step from './Stepper/Step';
import Navbar from './Navbar';
import Footer from './Footer';

const IndexLanding = (props) => {
  return (
    <>
      <Navbar />
      <Hero />
      <Index />
      <Step />
      <Footer />
    </>
  );
};

export default IndexLanding;
