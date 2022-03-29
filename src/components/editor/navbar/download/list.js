import React, { useContext, useEffect, useState } from 'react';
// import { Dropdown } from 'react-bootstrap';            Shaheer code-refactoring-removing-unused-variables
// import Header from '../../editorBar/Header';           Shaheer code-refactoring-removing-unused-variables
import { Options } from './options';
import Context from '../../../store/store';
import PulseLoader from 'react-spinners/PulseLoader';
import userContext from '../../../../userContext/UserContext';
// import DD from '../../../../icons/'
import { ReactComponent as DDIconEditor } from '../../../../icons/ddIconEditor.svg';

const Download = (props) => {
  const [state] = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  let onloading = () => {
    return setLoaded;
  };
  return (
    <>
      <div className="resizePageDiv downloadList">
        <div className="animationDiv">
          <div
            className={
              userState.isArabic
                ? 'downloadDropDownList arabicMode'
                : 'downloadDropDownList'
            }
          >
            <div>
              <DDIconEditor className="backPageIcon1" />
              <span className="downloadAstxt">Download as</span>
            </div>
            <hr />
            <div onClick={() => setLoaded(true)}>
              {Object.values(Options).map((Option) => {
                return (
                  // eslint-disable-next-line react/jsx-pascal-case
                  <Option.component
                    key={Option.type}
                    extension={Option.ext}
                    type={Option.type}
                    title={Option.title}
                    handler={Option.handler(state.templateTitle, onloading)}
                  />
                );
              })}
            </div>
          </div>
          <div className={loaded ? 'downloaderDivOn' : 'downloaderDiv'}>
            <PulseLoader
              css="position:fixed;display: flex;margin:45vh 45vw;border-color:#4662f0;"
              size={30}
              color={'#4662f0'}
              loading={loaded}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Download;
