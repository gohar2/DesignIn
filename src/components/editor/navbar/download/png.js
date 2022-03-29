import React, { useContext, useEffect } from 'react';
import Context from '../../../store/store';
import { Dropdown } from 'react-bootstrap';
import domtoimage from 'dom-to-image';
import './download.css';
import Api from '../../../../api/Api';
import { templateUrl, verifyTokenUrl } from '../../../../api/constants';
import UserContext from '../../../../userContext/UserContext';
const PNG = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(UserContext);
  const { pages } = state;
  const { handler } = props;
  const pageIds = pages.map((page) => page.pageId);
  return (
    <>
      <Dropdown.Item onClick={handler(domtoimage.toPng, pageIds, 'page')}>
        {props.title}
        <span
          className={userState.isArabic ? 'designDownDim_ar' : 'designDownDim'}
        >
          {state.pages[state.selectedPage.pageId].width} x{' '}
          {state.pages[state.selectedPage.pageId].height}{' '}
          {state.pages[state.selectedPage.pageId].extension}
        </span>
      </Dropdown.Item>
    </>
  );
};

export default PNG;
