import React, { useContext, useState } from 'react';
import './../Navbar.css';
import RightArrow from '../../../icons/step.png';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../../userContext/UserContext';

const Step = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      <div className=" py-5 my-5 stepper text-center">
        <p
          className={
            userState.isArabic
              ? 'stepperHeading_Ar mt-5 pt-5'
              : 'mt-5 pt-5 stepperHeading'
          }
        >
          <FormattedMessage
            id="stepperHss"
            defaultMessage=" How to create a design ?"
          />
        </p>
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div
              className={
                userState.isArabic
                  ? 'row justify-content-center flex-row-reverse'
                  : 'row justify-content-center '
              }
            >
              <div
                className={
                  userState.isArabic ? 'col-md-3 step1_Ar' : 'col-md-3 step1'
                }
              >
                <h3 className="my-3">
                  <FormattedMessage id="step1" defaultMessage="Step 01" />
                </h3>
                <div className="my-3">
                  <FormattedMessage
                    id="ChooseTt"
                    defaultMessage="Create a Design"
                  />
                </div>
                <p className="my-3">
                  <FormattedMessage
                    id="subchooseTText"
                    defaultMessage="Start by picking any template from the editor for your graphics."
                  />
                </p>
              </div>
              <div
                className={
                  userState.isArabic
                    ? 'col-md-1 d-md-flex d-none align-items-center justify-content-center rotateArrow'
                    : 'col-md-1 d-md-flex d-none align-items-center justify-content-center '
                }
              >
                <img src={RightArrow} style={{ width: '30px' }} />
              </div>
              <div
                className={
                  userState.isArabic
                    ? 'col-md-3 step2_Ar p-md-0'
                    : 'col-md-3 step2 p-md-0'
                }
              >
                <h3 className="my-3">
                  <FormattedMessage id="step2" defaultMessage="Step 02" />
                </h3>
                <div className="my-3">
                  <FormattedMessage
                    id="customizeE"
                    defaultMessage="Customize using editor"
                  />
                </div>
                <p className="my-3">
                  <FormattedMessage
                    id="subcustomizeEText"
                    defaultMessage=" Customize any template in your way with a super easy editor with just a few clicks"
                  />
                </p>
              </div>
              <div
                className={
                  userState.isArabic
                    ? 'col-md-1 d-md-flex d-none align-items-center justify-content-center rotateArrow'
                    : 'col-md-1 d-md-flex d-none align-items-center justify-content-center '
                }
              >
                <img src={RightArrow} style={{ width: '30px' }} />
              </div>
              <div
                className={
                  userState.isArabic ? 'col-md-3 step3_Ar' : 'col-md-3 step3'
                }
              >
                <h3 className="my-3">
                  <FormattedMessage id="step3" defaultMessage="Step 03" />
                </h3>
                <div className="my-3">
                  <FormattedMessage
                    id="downloadTs"
                    defaultMessage="Download design"
                  />
                </div>
                <p className="my-3">
                  <FormattedMessage
                    id="subdownloadtText"
                    defaultMessage="Download your design in JPEG, PNG, and PDF to use it anywhere you want."
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step;
