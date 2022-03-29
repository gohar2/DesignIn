import React, { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../../../store/store';
import { englishFonts, arabicFonts } from '../../../../constants/index';
import { ReactComponent as CrossIconEditor } from '../../../../icons/CrossIconEditor.svg';
import { ReactComponent as SearchIconEditor } from '../../../../icons/SearchIconFonts.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import userContext from '../../../../userContext/UserContext';
import './Fonts.css';
import Api from '../../../../api/Api';
import {
  deleteFolderUrl,
  deleteFontUrl,
  fontsUploadUrl,
  getUploadedFonts,
} from '../../../../api/constants';
import { toast } from 'react-toastify';
import { ReactComponent as FolderOptions } from '../../../../icons/FolderOption.svg';
import { ReactComponent as Delete } from '../../../../icons/DeleteFolder.svg';
import { Spinner } from '../../../../utils';
import { debounce } from 'lodash';

const Fonts = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant coment var from this
  const placeholder = useIntl().formatMessage({ id: 'SearchFonts' });
  const [isSearched, setIsSearched] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchedResult, setSearchedResult] = useState([]);

  const notify = (message) => toast(message);
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_BASE_URL}${getUploadedFonts}`)
      .then((res) => {
        if (res.meta.code === 200) {
          if (res.data.length) {
            let updateFonts = new Promise((onSuccess) => {
              dispatch({
                type: 'SET_USER_CUSTOM_FONTS',
                payload: res.data,
              });
              onSuccess(true);
            });
            updateFonts.then((result) => {
              let head =
                  document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');
              head.appendChild(style);
              style.type = 'text/css';
              let css = res.data
                .map(
                  (v) => `@font-face {
            font-family: "${v.name.split('.')[0]}";
            src:  url(${v.file.url});
            font-weight: normal;
            font-style: normal;
        }`,
                )
                .join('');
              if (style.styleSheet) {
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onClickFontFamily = (e) => {
    dispatch({ type: 'REMOVE_SELECTION' });
    dispatch({
      type: 'SET_FONT_FAMILY',
      payload: e.currentTarget.textContent,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickArabicText = () => {
    dispatch({
      type: 'ARABICFONT',
      payload: true,
    });
  };
  const onClickEnglishText = () => {
    dispatch({
      type: 'ARABICFONT',
      payload: false,
    });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const uploadFile = async (e) => {
    if (e.target.files.length) {
      setLoader(true);
      if (
        e.target.files[0].name.split('.')[1] === 'ttf' ||
        e.target.files[0].name.split('.')[1] === 'otf' ||
        e.target.files[0].name.split('.')[1] === 'woff'
      ) {
        let name = e.target.files[0].name;
        let convertedFile = await toBase64(e.target.files[0]);
        let data = {
          file: convertedFile,
          name: name,
        };
        Api.post(
          `${process.env.REACT_APP_BASE_URL}${fontsUploadUrl}`,
          data,
        ).then((res) => {
          if (res.meta.code === 200) {
            setLoader(false);
            let fonts = {
              file: { url: res.data.file.url },
              id: res.data.id,
              name: res.data.name,
            };
            let temp = state.userCustomFonts;
            temp.push(fonts);
            dispatch({
              type: 'SET_USER_CUSTOM_FONTS',
              payload: temp,
            });
            let head =
                document.head || document.getElementsByTagName('head')[0],
              style = document.createElement('style');
            head.appendChild(style);
            style.type = 'text/css';
            let css = state.userCustomFonts
              .map(
                (v) => `@font-face {
            font-family: "${v.name.split('.')[0]}";
            src:  url(${v.file.url});
            font-weight: normal;
            font-style: normal;
        }`,
              )
              .join('');
            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }
            notify('Font uploaded successfully');
          } else if (res.meta.code === 401) {
            notify('Kindly register to upload fonts');
          } else {
            notify(res.meta.message);
          }
        });
      } else {
        setLoader(false);
        notify('Invalid file type');
      }
    }
  };

  const showFonts = (val) => {
    dispatch({
      type: 'SHOW_FONTS',
      payload: val,
    });
  };
  const getSearchedFonts = (val) => {
    if (!userState.isArabic) {
      let newEnglishFonts = [];
      englishFonts.forEach((elem) => {
        newEnglishFonts.push({ name: elem });
      });
      const temp = [...state.userCustomFonts, ...newEnglishFonts];
      const filtered = temp.filter((font) => {
        return font.name.toLowerCase().includes(val.toLowerCase());
      });
      setSearchedResult(filtered);
    } else {
      let newArabicFonts = [];
      arabicFonts.forEach((elem) => {
        newArabicFonts.push({ name: elem });
      });
      const temp = [...state.userCustomFonts, ...newArabicFonts];
      const filtered = temp.filter((font) => {
        return font.name.toLowerCase().includes(val.toLowerCase());
      });
      setSearchedResult(filtered);
    }
  };
  const debouncedSearchFonts = (searchValue) => {
    getSearchedFonts(searchValue);
  };
  const handleFontSearch = (e) => {
    if (e.target.value.length && e.target.value.length !== '') {
      debouncedSearchFonts(e.target.value);
      setIsSearched(true);
    } else {
      setSearchedResult([]);
      setIsSearched(false);
    }
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
  };
  const handleFontDelete = (e, name) => {
    setLoader(true);
    const delId = e.currentTarget.id;
    Api.del(`${process.env.REACT_APP_BASE_URL}${deleteFontUrl(delId)}`).then(
      (result) => {
        if (result.meta.code === 200) {
          if (state.selectedElement.fontFamily === name) {
            dispatch({
              type: 'SET_FONT_FAMILY',
              payload: state.selectedElement.isArabic
                ? 'NeoSans-Arabic'
                : 'NeoSans',
            });
          }
          dispatch({ type: 'DELETE_FONT', payload: delId });
          notify('Succesfully deleted font');
          setLoader(false);
        } else {
          notify(result.meta.message);
        }
      },
    );
  };
  return (
    <>
      <div className="fontMainDiv">
        <div className="textHeader">
          <div
            className={
              userState.isArabic ? 'createPageDiv arabicMode' : 'createPageDiv'
            }
          >
            <CrossIconEditor
              className="createFolderIcon mt-4 "
              onClick={() => showFonts(false)}
            />
          </div>
        </div>
        <div
          className={
            userState.isArabic ? 'fontSearchBarDivN' : 'fontSearchBarDivN'
          }
        >
          {!state.selectedElement.isArabic ? (
            <div class="input-group w-100 mb-5 pb-4">
              <div className="headingTextSidebarName w-65">
                <input
                  className="border-0 fontInputCustom "
                  placeholder="Search fonts"
                  onChange={handleFontSearch}
                />
                <SearchIconEditor className="position-absolute " />
              </div>
              <div class="input-group-append w-35" onClick={onClickEnglishText}>
                <div class="tickFolderIconDiv w-100">
                  <span className="txtEngFont">English Fonts</span>
                </div>
              </div>
            </div>
          ) : (
            state.selectedElement.isArabic && (
              <div class="input-group w-100 mb-5 pb-4">
                <div
                  class="input-group-append w-35"
                  onClick={onClickArabicText}
                >
                  <div class="tickFolderIconDiv w-100">
                    <span className="txtEngFont_Ar">خطوط البحث</span>
                  </div>
                </div>
                <div className="headingTextSidebarName w-65">
                  <input
                    className="border-0  fontInputCustom_Ar "
                    placeholder="البحث الخطوط"
                    onChange={handleFontSearch}
                  />
                  <SearchIconEditor
                    className=""
                    style={{ transform: 'rotate(90deg)' }}
                  />
                </div>
              </div>
            )
          )}
        </div>
        <div className="wraperDivText">
          <div className="directionDiv">
            {state.selectedElement.isArabic ? (
              <div className="fontsDiv">
                {!isSearched ? (
                  <div>
                    <div
                      className={
                        userState.isArabic
                          ? 'createFolderHeading_Ar mb-5 text-right'
                          : 'createFolderHeading mb-5'
                      }
                    >
                      <FormattedMessage
                        id="myFonts"
                        defaultMessage="My Fonts"
                      />
                    </div>
                    {!loader ? (
                      state.userCustomFonts.length ? (
                        state.userCustomFonts.map((font) => {
                          return (
                            <div
                              className={
                                state.selectedElement?.fontFamily ===
                                font.name.split('.')[0]
                                  ? 'selectedfont d-flex justify-content-between p-3 customFontDiv'
                                  : 'd-flex justify-content-between p-3 customFontDiv'
                              }
                            >
                              <p
                                className="w-75 userCustomFontText"
                                style={{ fontFamily: font.name.split('.')[0] }}
                                onClick={(e) =>
                                  onClickFontFamily(e, true, font.id)
                                }
                              >
                                {font.name.split('.')[0]}
                              </p>
                              <span className="w-25 d-flex justify-content-end align-items-start">
                                <Delete
                                  className="customnFontDeleteIcon"
                                  id={font.id}
                                  onClick={(e) =>
                                    handleFontDelete(e, font.name.split('.')[0])
                                  }
                                />
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <p>No font available</p>
                      )
                    ) : (
                      <Spinner />
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      className={
                        userState.isArabic
                          ? 'createFolderHeading_Ar mb-5 text-right'
                          : 'createFolderHeading mb-5'
                      }
                    >
                      Searched Fonts
                    </div>
                    <div>
                      {searchedResult.map((elem) => {
                        return (
                          <p
                            className={
                              state.selectedElement?.fontFamily ===
                              elem.name.split('.')[0]
                                ? 'selectedfont p-3'
                                : 'p-3'
                            }
                            style={{ fontFamily: elem.name.split('.')[0] }}
                            onClick={(e) => onClickFontFamily(e, false)}
                          >
                            {elem.name.split('.')[0]}
                          </p>
                        );
                      })}
                    </div>
                  </>
                )}
                {!isSearched && (
                  <>
                    <hr className="customHrEditor" />
                    <div>
                      <div
                        className={
                          userState.isArabic
                            ? 'createFolderHeading_Ar mb-5 text-right'
                            : 'createFolderHeading mb-5'
                        }
                      >
                        <FormattedMessage
                          id="defaultFonts"
                          defaultMessage="Default Fonts"
                        />
                      </div>
                      {arabicFonts.map((font) => {
                        return (
                          <p
                            className={
                              state.selectedElement?.fontFamily === font
                                ? 'selectedfont p-3'
                                : 'p-3'
                            }
                            style={{ fontFamily: font }}
                            onClick={(e) => onClickFontFamily(e, false)}
                          >
                            {font}
                          </p>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ) : (
              !state.selectedElement.isArabic && (
                <div className="fontsDiv">
                  {!isSearched ? (
                    <div>
                      <div
                        className={
                          userState.isArabic
                            ? 'createFolderHeading_Ar mb-5 text-right'
                            : 'createFolderHeading mb-5'
                        }
                      >
                        <FormattedMessage
                          id="myFonts"
                          defaultMessage="My Fonts"
                        />
                      </div>
                      {!loader ? (
                        state.userCustomFonts.length ? (
                          state.userCustomFonts.map((font) => {
                            return (
                              <div
                                className={
                                  state.selectedElement?.fontFamily ===
                                  font.name.split('.')[0]
                                    ? 'selectedfont d-flex justify-content-between p-3 customFontDiv'
                                    : 'd-flex justify-content-between p-3 customFontDiv'
                                }
                              >
                                <p
                                  className="w-75 userCustomFontText"
                                  style={{
                                    fontFamily: font.name.split('.')[0],
                                  }}
                                  onClick={(e) =>
                                    onClickFontFamily(e, true, font.id)
                                  }
                                >
                                  {font.name.split('.')[0]}
                                </p>
                                <span className="w-25 d-flex justify-content-end align-items-start">
                                  <Delete
                                    className="customnFontDeleteIcon"
                                    id={font.id}
                                    onClick={(e) =>
                                      handleFontDelete(
                                        e,
                                        font.name.split('.')[0],
                                      )
                                    }
                                  />
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p>No font available</p>
                        )
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  ) : (
                    <>
                      <div
                        className={
                          userState.isArabic
                            ? 'createFolderHeading_Ar mb-5 text-right'
                            : 'createFolderHeading mb-5'
                        }
                      >
                        Searched Fonts
                      </div>
                      <div>
                        {searchedResult.map((elem) => {
                          return (
                            <p
                              className={
                                state.selectedElement?.fontFamily ===
                                elem.name.split('.')[0]
                                  ? 'selectedfont p-3'
                                  : 'p-3'
                              }
                              style={{ fontFamily: elem.name.split('.')[0] }}
                              onClick={(e) => onClickFontFamily(e, false)}
                            >
                              {elem.name.split('.')[0]}
                            </p>
                          );
                        })}
                      </div>
                    </>
                  )}
                  {!isSearched && (
                    <>
                      <hr className="customHrEditor" />
                      <div
                        className={
                          userState.isArabic
                            ? 'createFolderHeading_Ar mb-5 text-right'
                            : 'createFolderHeading mb-5'
                        }
                      >
                        <FormattedMessage
                          id="defaultFonts"
                          defaultMessage="Default Fonts"
                        />
                      </div>
                      {englishFonts.map((font) => {
                        return (
                          <p
                            className={
                              state.selectedElement?.fontFamily === font
                                ? 'selectedfont p-3'
                                : 'p-3'
                            }
                            style={{ fontFamily: font }}
                            onClick={(e) => onClickFontFamily(e, false)}
                          >
                            {font}
                          </p>
                        );
                      })}
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className="btnUploadFonts">
          <label>
            <input
              type="file"
              style={{
                display: `none`,
              }}
              accept=".otf,.ttf,.woof"
              onChange={uploadFile}
            />
            Upload Fonts
          </label>
        </div>
      </div>
    </>
  );
};

export default Fonts;
