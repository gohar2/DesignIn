import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import Context from '../../store/store';
import userContext from '../../../userContext/UserContext.js';
import { FormattedMessage } from 'react-intl';
import { removeTextFrame } from '../../../utils/index';
import { useHistory } from 'react-router';

const DropdownButton = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant coment var from this
  let history = useHistory();
  const onToggle = (e) => {
    if (e) {
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: props.btnName,
      });
    }
  };

  return (
    <>
      <Dropdown
        show={props.btnName === state.selectedEditorBarBtn}
        onToggle={onToggle}
      >
        <Dropdown.Toggle className={props.className}>
          <span
            className={userState.isArabic ? 'downloadSpan_Ar' : 'downloadSpan'}
          >
            <FormattedMessage id={props.id} defaultMessage={props.btnName} />
          </span>
          {/* </button> */}
        </Dropdown.Toggle>
        <Dropdown.Menu
          className={
            props.btnName === 'Flip'
              ? 'editorBarDropdownMenu flipDropdownWidth'
              : props.btnName === 'Align'
              ? 'editorBarDropdownMenu AlignDropdownWidth'
              : 'editorBarDropdownMenu dropdownWidth'
          }
          show={props.btnName === state.selectedEditorBarBtn}
        >
          {props.component}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default DropdownButton;
