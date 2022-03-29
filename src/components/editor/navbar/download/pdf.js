import React, { useContext } from 'react';
import Context from '../../../store/store';
import { Dropdown } from 'react-bootstrap';

const PDF = (props) => {
  const [state] = useContext(Context);
  const { pages } = state;
  const { handler } = props;
  const pageIds = pages.map((page) => page.pageId);

  return (
    <>
      <Dropdown.Item onClick={handler(pageIds, 'page')}>
        {props.title}
      </Dropdown.Item>
    </>
  );
};

export default PDF;
