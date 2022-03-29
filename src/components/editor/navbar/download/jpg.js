import React, { useContext } from 'react';
import Context from '../../../store/store';
import domtoimage from 'dom-to-image';
import { Dropdown } from 'react-bootstrap';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import UserContext from '../../../../userContext/UserContext';

const JPG = (props) => {
  const [state] = useContext(Context);
  const [userState, userDispatch] = useContext(UserContext);

  const { pages } = state;
  const { handler } = props;
  const pageIds = pages.map((page) => page.pageId);

  return (
    <>
      <Dropdown.Item onClick={handler(domtoimage.toJpeg, pageIds, 'page')}>
        {props.title}{' '}
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

export default JPG;
