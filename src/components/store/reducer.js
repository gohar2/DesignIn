import cloneDeep from 'lodash/cloneDeep';
import { act } from 'react-dom/test-utils';
import { createFrame, highestElementid } from '../../utils/index';

export const initialState = {
  loginPopup: false,
  ArabicFont: null,
  rotationAngle: 0,
  isDragging: false,
  templatesPaginationPage: 0,
  iconsPaginationPage: 0,
  categoryID: 0,
  targets: [],
  selectedElements: null,
  zoomPercentage: 100,
  isShortkey: true,
  isElementCopied: false,
  isElementStyleCopied: false,
  copiedTextElementStyle: {},
  isDragElementCopied: false,
  isIconsDetailOpen: false,
  isTemplatesDetailOpen: false,
  templates: [],
  searchedTemplateDesigns: [],
  icons: [],
  userCustomFonts: [],
  initialHeight: null,
  initialWidth: null,
  resizePointer: null,
  WidthforScale: 200,
  HeightforScale: null,
  newScale: 1,
  isDragged: false,
  frameDone: false,
  editorSwitch: false,
  editorRedirection: false,
  elementsPlaced: 0,
  inDesignTemplate: false,
  isSaved: false,
  transformDesign: null,
  LayerColorClass: null,
  LayerColor: null,
  templateTitle: '',
  createdUploadId: null,
  createdUploadUrl: null,
  createdUploadTitle: null,
  photos: [],
  backgrounds: [],
  data: null,
  subfolders: [],
  folderDesigns: [],
  folderUploads: [],
  createdFolderId: null,
  openFolder: false,
  folderToOpen: null,
  folders: [],
  styleToBeCopiedId: null,
  copyStyle: false,
  isFullScreen: false,
  colors: [],
  labelRef: null,
  uploadedImages: [],
  loadedDesignId: null,
  undoArray: [],
  redoArray: [],
  redo: false,
  undo: false,
  sidebarType: 'Photos',
  showEditorbarMenu: false,
  opacityFree: true,
  opacityPaid: false,
  backgroundImage: false,
  showSidebar: false,
  selectedEditorBarBtn: null,
  selectedElementBtns: null,
  deleteBackgroundImage: false,
  objectPosition: null,
  cropzIndexArr: [],
  defaultColors: [
    '#4D4D4D',
    '#999999',
    '#999888',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E',
  ],
  alignmentV: false,
  listV: false,
  horizontalAlignment: null,
  verticalAlignment: null,
  imageRef: null,
  target: null,
  isArabic: JSON.parse(localStorage.getItem('isArabic')),
  currentDesign: null,
  pageWidth: window.screen.width * 0.6,
  pageHeight: window.screen.height * 0.6,
  selectedPage: {
    pageId: 0,
    title: '',
    elements: [],
    backgroundImage: '',
  },
  selectedElement: null,
  selectedFrame: null,
  alignment: {
    types: ['center', 'right', 'left'],
    indexNo: 0,
  },
  pageManagerLoader: true,
  pageCount: 0,
  girdImageId: '',
  singleClick: false,
  doubleClick: false,
  pages: [
    {
      pageId: 0,
      className: 'newPage',
      title: '',
      elements: [],
      backgroundImage: '',
      scaleX: '1',
      scaleY: '1',
      snapshot: '',
      documentColors: ['#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'],
      height: 0,
      width: 0,
      pageColor: '#ffffff',
    },
  ],
  frameImageId: '',
  isFrame: false,
  isGrid: false,
  showTextBar: false,
  showFonts: false,
  frames: {
    circle: {
      type: 'frame',
      id: 0,
      name: 'circle',
      frame: null,
      zndex: 0,
      height: '400px',
      width: '400px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    vertical_rectangle: {
      type: 'frame',
      id: 1,
      name: 'vertical_rectangle',
      zndex: 0,
      height: '360px',
      width: '245px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    rectangle: {
      type: 'frame',
      id: 1,
      name: 'rectangle',
      zndex: 0,
      height: '245px',
      width: '390px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    triangle: {
      type: 'frame',
      id: 1,
      name: 'triangle',
      zndex: 0,
      height: '350px',
      width: '400px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    trapezoid: {
      type: 'frame',
      id: 1,
      name: 'trapezoid',
      zndex: 0,
      height: '330px',
      width: '330px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    parallelogram: {
      type: 'frame',
      id: 1,
      name: 'parallelogram',
      zndex: 0,
      height: '350px',
      width: '400px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    rhombus: {
      type: 'frame',
      id: 1,
      name: 'rhombus',
      zndex: 0,
      height: '360px',
      width: '360px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    pentagon: {
      type: 'frame',
      id: 1,
      name: 'pentagon',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    heptagon: {
      type: 'frame',
      id: 1,
      name: 'heptagon',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    octagon: {
      type: 'frame',
      id: 1,
      name: 'octagon',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    nonagon: {
      type: 'frame',
      id: 1,
      name: 'nonagon',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    bevel: {
      type: 'frame',
      id: 1,
      name: 'bevel',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    leftPoint: {
      type: 'frame',
      id: 1,
      name: 'leftPoint',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    rightPoint: {
      type: 'frame',
      id: 1,
      name: 'rightPoint',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    leftChev: {
      type: 'frame',
      id: 1,
      name: 'leftChev',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    rightChev: {
      type: 'frame',
      id: 1,
      name: 'rightChev',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    star: {
      type: 'frame',
      id: 1,
      name: 'star',
      zndex: 0,
      height: '350px',
      width: '350px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    minus: {
      type: 'frame',
      id: 1,
      name: 'minus',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    frame: {
      type: 'frame',
      id: 1,
      name: 'frame',
      zndex: 0,
      height: '340px',
      width: '340px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    elipse: {
      type: 'frame',
      id: 1,
      name: 'elipse',
      zndex: 0,
      height: '340px',
      width: '200px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
    square: {
      type: 'frame',
      id: 1,
      name: 'square',
      zndex: 0,
      height: '270px',
      width: '300px',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
          imageHeight: 0,
          imageWidth: 0,
        },
      ],
    },
  },
  grids: {
    'full page grid': {
      type: 'grid',
      id: 0,
      name: 'full page grid',
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
      ],
    },
    'half page grid': {
      type: 'grid',
      id: 2,
      name: 'half page grid',
      spacing: 10,
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgVertical gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgVertical gridDiv selectedGridImg',
          id: 1,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
      ],
    },
    '30 70 grid': {
      type: 'grid',
      id: 3,
      name: '30 70 grid',
      spacing: 10,
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 1,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
      ],
    },
    'horizontal half grid': {
      type: 'grid',
      id: 4,
      name: 'horizontal half grid',
      spacing: 10,
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 1,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
      ],
    },
    'horizontal tri grid': {
      type: 'grid',
      id: 5,
      name: 'horizontal tri grid',
      spacing: 10,
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 1,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgHorizontal gridDiv selectedGridImg',
          id: 2,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
      ],
    },
    'vertical tri grid': {
      type: 'grid',
      id: 6,
      name: 'vertical tri grid',
      spacing: 10,
      images: [
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgVertical gridDiv selectedGridImg',
          id: 0,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgVertical gridDiv selectedGridImg',
          id: 1,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
        {
          className: 'gridDiv',
          selectedClassName: 'gridDiv selectedGridImg',
          moveableClassName: 'moveableImgVertical gridDiv selectedGridImg',
          id: 2,
          src: null,
          selected: false,
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: null,
        },
      ],
    },
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_POPUP':
      return { ...state, loginPopup: action.payload };
    case 'ADD_NEW_ELEMENT_IN_ARRAY':
      let ADD_NEW_ELEMENT_IN_ARRAY = state.pages;
      ADD_NEW_ELEMENT_IN_ARRAY[state.selectedPage.pageId].elements.push(
        action.payload,
      );
      return { ...state, pages: ADD_NEW_ELEMENT_IN_ARRAY };
    case 'SET_USER_CUSTOM_FONTS':
      return { ...state, userCustomFonts: action.payload };
    case 'SET_ImagetranslateX0':
      let transformElements1 = state.pages;
      transformElements1[0].elements.forEach((element) => {
        if (element.id === state.selectedElement.id) {
          element.ImagetranslateX = 0;
        }
      });
      return {
        ...state,
        pages: transformElements1,
      };
    case 'SET_ImagetranslateY0':
      let transformElements2 = state.pages;
      transformElements2[0].elements.forEach((element) => {
        if (element.id === state.selectedElement.id) {
          element.ImagetranslateY = 0;
        }
      });
      return {
        ...state,
        pages: transformElements2,
      };
    case 'setLastElementProps':
      let updatedImageElements = state.pages;
      updatedImageElements[0].elements.forEach((element) => {
        if (element.id === action.payload.id) {
          element.ImagetranslateX = action.payload.imageTranslateX;
          element.ImagetranslateY = action.payload.imageTranslateY;
          element.ImageWidth = action.payload.imageWidth;
          element.ImageHeight = action.payload.imageHeight;
          element.frameWidth = action.payload.frameWidth;
          element.frameHeight = action.payload.frameHeight;
        }
      });
      return {
        ...state,
        pages: updatedImageElements,
      };
    case 'set_LastTransform':
      let transformElements = state.pages;
      transformElements[0].elements.forEach((element) => {
        if (element.id === action.payload.id) {
          element.ImagetranslateX = action.payload.translateX;
          element.ImagetranslateY = action.payload.translateY;
          element.ImageWidth = action.payload.width;
          element.ImageHeight = action.payload.height;
        }
      });
      return {
        ...state,
        pages: transformElements,
      };
    case 'SET_WIDTH':
      return {
        ...state,
        initialWidth: action.payload,
      };
    case 'setHeight':
      return {
        ...state,
        initialHeight: action.payload,
      };
    case 'setResizePointer':
      return {
        ...state,
        resizePointer: action.payload,
      };
    case 'SET_newWidth':
      return {
        ...state,
        WidthforScale: action.payload,
      };
    case 'SET_newHeight':
      return {
        ...state,
        HeightforScale: action.payload,
      };
    case 'SET_TARGET':
      return {
        ...state,
        target: document.querySelector(`#${action.payload.id}`),
      };
    case 'SET_FONT_SCALE':
      let font_s = action.payload;
      let SET_FONT_SCALE = state.pages;
      let SelmIndex = state.pages[state.selectedPage.pageId].elements.findIndex(
        (elmIndex) => elmIndex.id === state.selectedElement.id,
      );
      SET_FONT_SCALE[state.selectedPage.pageId].elements[
        SelmIndex
      ].frame.properties.scale[0] = action.payload / 35;
      SET_FONT_SCALE[state.selectedPage.pageId].elements[
        SelmIndex
      ].frame.properties.scale[1] = action.payload / 35;

      return {
        ...state,
        selectedelement:
          SET_FONT_SCALE[state.selectedPage.pageId].elements[SelmIndex],
        pages: SET_FONT_SCALE,
      };
    case 'IS_DRAGGED':
      return { ...state, isDragged: action.payload };
    case 'EMPTY_PAGES':
      return {
        ...state,
        pages: [
          {
            pageId: 0,
            className: 'newPage',
            title: '',
            elements: [],
            backgroundImage: '',
            scaleX: '1',
            scaleY: '1',
            snapshot: '',
            documentColors: [
              '#194D33',
              '#0C797D',
              '#0062B1',
              '#653294',
              '#AB149E',
            ],
          },
        ],
      };
    case 'SET_ICONS_DETAIL':
      return {
        ...state,
        isIconsDetailOpen: action.payload,
      };
    case 'SET_TEMPLATES_DETAIL':
      return {
        ...state,
        isTemplatesDetailOpen: action.payload,
      };
    case 'RETRIVE_DESIGN':
      return {
        ...state,
        pages: action.payload.pages,
        selectedPage: action.payload.selectedPage,
      };
    case 'SET_SEARCHED_TEMPLATE_DESIGNS':
      return {
        ...state,
        searchedTemplateDesigns: action.payload,
      };
    case 'INDESIGNTEMPLATE':
      return {
        ...state,
        inDesignTemplate: action.payload,
      };
    case 'SETisSaved':
      return {
        ...state,
        isSaved: true,
      };
    case 'RESET_SCALE':
      let reset_scale = state.pages;
      reset_scale[0].scaleX = 1;
      reset_scale[0].scaleY = 1;
      return {
        ...state,
        pages: reset_scale,
      };
    case 'EMPTY_EDITOR':
      let empty_elements = state.pages;
      let empty_frames = state.frames;
      empty_elements = [
        {
          pageId: 0,
          className: 'newPage',
          title: '',
          elements: [],
          backgroundImage: '',
          scaleX: state.pages[0].scaleX,
          scaleY: state.pages[0].scaleY,
          snapshot: '',
          documentColors: [
            '#194D33',
            '#0C797D',
            '#0062B1',
            '#653294',
            '#AB149E',
          ],
          pageColor: '#ffffff',
        },
      ];
      empty_frames = {
        circle: {
          type: 'frame',
          id: 0,
          name: 'circle',
          frame: null,
          zndex: 0,
          height: '400px',
          width: '400px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        vertical_rectangle: {
          type: 'frame',
          id: 1,
          name: 'vertical_rectangle',
          zndex: 0,
          height: '360px',
          width: '245px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        rectangle: {
          type: 'frame',
          id: 1,
          name: 'rectangle',
          zndex: 0,
          height: '245px',
          width: '390px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        triangle: {
          type: 'frame',
          id: 1,
          name: 'triangle',
          zndex: 0,
          height: '350px',
          width: '400px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        trapezoid: {
          type: 'frame',
          id: 1,
          name: 'trapezoid',
          zndex: 0,
          height: '330px',
          width: '330px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        parallelogram: {
          type: 'frame',
          id: 1,
          name: 'parallelogram',
          zndex: 0,
          height: '350px',
          width: '400px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        rhombus: {
          type: 'frame',
          id: 1,
          name: 'rhombus',
          zndex: 0,
          height: '360px',
          width: '360px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        pentagon: {
          type: 'frame',
          id: 1,
          name: 'pentagon',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        heptagon: {
          type: 'frame',
          id: 1,
          name: 'heptagon',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        octagon: {
          type: 'frame',
          id: 1,
          name: 'octagon',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        nonagon: {
          type: 'frame',
          id: 1,
          name: 'nonagon',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        bevel: {
          type: 'frame',
          id: 1,
          name: 'bevel',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        leftPoint: {
          type: 'frame',
          id: 1,
          name: 'leftPoint',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        rightPoint: {
          type: 'frame',
          id: 1,
          name: 'rightPoint',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        leftChev: {
          type: 'frame',
          id: 1,
          name: 'leftChev',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        rightChev: {
          type: 'frame',
          id: 1,
          name: 'rightChev',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        star: {
          type: 'frame',
          id: 1,
          name: 'star',
          zndex: 0,
          height: '350px',
          width: '350px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        minus: {
          type: 'frame',
          id: 1,
          name: 'minus',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        frame: {
          type: 'frame',
          id: 1,
          name: 'frame',
          zndex: 0,
          height: '340px',
          width: '340px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        elipse: {
          type: 'frame',
          id: 1,
          name: 'elipse',
          zndex: 0,
          height: '340px',
          width: '200px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
        square: {
          type: 'frame',
          id: 1,
          name: 'square',
          zndex: 0,
          height: '270px',
          width: '300px',
          images: [
            {
              className: 'gridDiv',
              selectedClassName: 'gridDiv selectedGridImg',
              moveableClassName: 'moveableImgFullPage gridDiv selectedGridImg',
              id: 0,
              src: null,
              selected: false,
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              frame: null,
              imageHeight: 0,
              imageWidth: 0,
            },
          ],
        },
      };
      return {
        ...state,
        pages: empty_elements,
        frames: empty_frames,
        undoArray: [],
        redoArray: [],
        redo: false,
        undo: false,
        selectedElement: null,
        selectedFrame: null,
        selectedPage: {
          pageId: 0,
          title: '',
          elements: [],
          backgroundImage: '',
          currentElement: null,
        },
      };
    case 'SET_TEMPLATES':
      return {
        ...state,
        templates: action.payload,
      };
    case 'SET_DRAGGING':
      return {
        ...state,
        isDragging: action.payload,
      };
    case 'SET_ICONS':
      return {
        ...state,
        icons: action.payload,
      };
    case 'SET_ALIGNMENTV':
      return {
        ...state,
        alignmentV: action.payload,
      };
    case 'SET_LISTV':
      return {
        ...state,
        listV: action.payload,
      };
    case 'SET_SHORTCUT_KEY':
      return {
        ...state,
        isShortkey: action.payload,
      };
    case 'SET_COPIED_ELEMENT':
      return {
        ...state,
        isElementCopied: action.payload,
      };
    case 'SET_COPIED_ELEMENT_STYLE':
      return {
        ...state,
        isElementStyleCopied: action.payload,
      };
    case 'COPY_TEXT_STYLE':
      let currentSelectedElement;
      if (action.payload.action === 'COPY_STYLE') {
        currentSelectedElement = action.payload.element;
      }
      return {
        ...state,
        copiedTextElementStyle: currentSelectedElement,
      };
    case 'PASTE_TEXT_STYLE':
      let copiedElementStyle = state.copiedTextElementStyle;
      let newSelectedElement = state.selectedElement;
      newSelectedElement.fontFamily = copiedElementStyle.fontFamily;
      newSelectedElement.fontSize = copiedElementStyle.fontSize;
      newSelectedElement.lineHeight = copiedElementStyle.lineHeight;
      newSelectedElement.letterSpacing = copiedElementStyle.letterSpacing;
      newSelectedElement.letterSpacing = copiedElementStyle.letterSpacing;
      newSelectedElement.isBold = copiedElementStyle.isBold;
      newSelectedElement.isItalic = copiedElementStyle.isItalic;
      newSelectedElement.isUnderline = copiedElementStyle.isUnderline;
      newSelectedElement.color = copiedElementStyle.color;
      newSelectedElement.isUppercase = copiedElementStyle.isUppercase;
      newSelectedElement.isAlignBottom = copiedElementStyle.isAlignBottom;
      newSelectedElement.isAlignCenter = copiedElementStyle.isAlignCenter;
      newSelectedElement.isAlignTop = copiedElementStyle.isAlignTop;
      newSelectedElement.list = copiedElementStyle.list;
      newSelectedElement.textframe = copiedElementStyle.textframe;

      let updatedPage = state.pages;
      updatedPage[state.selectedPage.pageId].elements.map((elem) => {
        if (elem.id === state.selectedElement.id) {
          elem.fontFamily = copiedElementStyle.fontFamily;
          elem.fontSize = copiedElementStyle.fontSize;
          elem.lineHeight = copiedElementStyle.lineHeight;
          elem.letterSpacing = copiedElementStyle.letterSpacing;
          elem.letterSpacing = copiedElementStyle.letterSpacing;
          elem.isBold = copiedElementStyle.isBold;
          elem.isItalic = copiedElementStyle.isItalic;
          elem.isUnderline = copiedElementStyle.isUnderline;
          elem.color = copiedElementStyle.color;
          elem.isUppercase = copiedElementStyle.isUppercase;
          elem.isAlignBottom = copiedElementStyle.isAlignBottom;
          elem.isAlignCenter = copiedElementStyle.isAlignCenter;
          elem.isAlignTop = copiedElementStyle.isAlignTop;
          elem.list = copiedElementStyle.list;
          elem.textframe = copiedElementStyle.textframe;
        }
      });
      let selectedUpdatedPage = state.selectedPage;
      selectedUpdatedPage.elements.map((el) => {
        if (el.id === state.selectedElement.id) {
          el.fontFamily = copiedElementStyle.fontFamily;
          el.fontSize = copiedElementStyle.fontSize;
          el.lineHeight = copiedElementStyle.lineHeight;
          el.letterSpacing = copiedElementStyle.letterSpacing;
          el.letterSpacing = copiedElementStyle.letterSpacing;
          el.isBold = copiedElementStyle.isBold;
          el.isItalic = copiedElementStyle.isItalic;
          el.isUnderline = copiedElementStyle.isUnderline;
          el.color = copiedElementStyle.color;
          el.isUppercase = copiedElementStyle.isUppercase;
          el.isAlignBottom = copiedElementStyle.isAlignBottom;
          el.isAlignCenter = copiedElementStyle.isAlignCenter;
          el.isAlignTop = copiedElementStyle.isAlignTop;
          el.list = copiedElementStyle.list;
          el.textframe = copiedElementStyle.textframe;
        }
      });
      return {
        ...state,
        selectedElement: newSelectedElement,
        selectedPage: selectedUpdatedPage,
        pages: updatedPage,
        target: null,
      };

    case 'SET_ROTATION_ANGLE':
      return {
        ...state,
        rotationAngle: action.payload,
      };
    case 'SET_DRAG_COPIED_ELEMENT':
      return {
        ...state,
        isDragElementCopied: action.payload,
      };
    case 'SET_TEMPLATES_PAGINATION_PAGE':
      return {
        ...state,
        templatesPaginationPage: action.payload,
      };
    case 'SET_ICONS_PAGINATION_PAGE':
      return {
        ...state,
        iconsPaginationPage: action.payload,
      };
    case 'SET_ZOOM_PERCENTAGE':
      return {
        ...state,
        zoomPercentage: action.payload,
      };
    case 'SET_NEW_TEMPLATE':
      let d_temp = state.pages;
      action.payload.page.pageTemplateTitle = action.payload.page.title;
      action.payload.page.title = state.templateTitle;
      d_temp[state.selectedPage.pageId] = JSON.parse(
        JSON.stringify(action.payload.page),
      );
      let scaleByWidth, scaleByHeight, scale;
      if (
        window.screen.width * 0.6 <
        parseFloat(action.payload.cssStyle.width.split('px')[0])
      ) {
        scaleByWidth =
          (window.screen.width * 0.6) /
          parseFloat(action.payload.cssStyle.width.split('px')[0]);
      } else {
        scaleByWidth =
          parseFloat(action.payload.cssStyle.width.split('px')[0]) /
          (window.screen.width * 0.6);
      }
      if (
        window.screen.height * 0.6 <
        parseFloat(action.payload.cssStyle.height.split('px')[0])
      ) {
        scaleByHeight =
          (window.screen.height * 0.6) /
          parseFloat(action.payload.cssStyle.height.split('px')[0]);
      } else {
        scaleByHeight =
          parseFloat(action.payload.cssStyle.height.split('px')[0]) /
          (window.screen.height * 0.6);
      }

      if (scaleByWidth < scaleByHeight) {
        scale = scaleByWidth;
      } else {
        scale = scaleByHeight;
      }
      for (let page of d_temp) {
        page.scaleX = scale;
        page.scaleY = scale;
      }
      d_temp.map((elem) => {
        if (!elem.pageColor) {
          elem.pageColor = '#ffffff';
        }
      });
      // if(!d_temp[0].pageColor){
      //   d_temp[0].pageColor = '#ffffff'
      // }
      return {
        ...state,
        inDesignTemplate: true,
        newScale: scale,
        pages: d_temp,
        pageHeight: parseFloat(action.payload.cssStyle.height.split('px')[0]),
        pageWidth: parseFloat(action.payload.cssStyle.width.split('px')[0]),
      };
    case 'SET_PAGE_COLOR':
      let page = state.pages;
      if (
        page[state.selectedPage.pageId].pageColor &&
        page[state.selectedPage.pageId].pageColor.length
      ) {
        if (page[state.selectedPage.pageId].backgroundImage.length) {
          page[state.selectedPage.pageId].backgroundImage = '';
        }
      }
      page[state.selectedPage.pageId].pageColor = action.payload;
      return { ...state, pages: page };
    case 'SET_DOCUMENT_COLORS':
      let docColors = state.pages;
      docColors[state.selectedPage.pageId].documentColors = action.payload;
      return { ...state, pages: docColors };
    case 'SET_COLOR_CLASS':
      return {
        ...state,
        LayerColorClass: action.payload.class,
        LayerColor: action.payload.color,
      };
    case 'SET_TEMPLATE_TITLE':
      return {
        ...state,
        templateTitle: action.payload,
      };
    case 'SET_ELEMENT_EDITABLE':
      let editableEl = state.pages;
      editableEl[state.selectedPage.pageId].elements.forEach((el) => {
        if (el.id === action.payload) el.dis_Editable = false;
        else el.dis_Editable = true;
      });
      return {
        ...state,
        pages: editableEl,
      };
    case 'ADD_NEW_UPLOAD':
      return {
        ...state,
        folderUploads: [...state.folderUploads, action.payload],
      };
    case 'SET_BACKGROUNDS':
      return {
        ...state,
        backgrounds: action.payload,
      };
    case 'SET_PHOTOS':
      return {
        ...state,
        photos: action.payload,
      };
    case 'PHOTOS_INFO':
      const photoObject = state.photos;
      for (let photo of photoObject) {
        if (photo.id === action.payload) {
          photo.infoV = !photo.infoV;
        } else {
          photo.infoV = false;
        }
      }
      return {
        ...state,
        photos: photoObject,
      };
    case 'BACK_FOLDER':
      return {
        ...state,
        openFolder: false,
      };
    case 'SUBFOLDER_OPTION':
      const subFolderObj = state.subfolders;
      const designFolderObj = state.folderDesigns;
      const uploadsFolderObj = state.folderUploads;
      let sname = '';
      for (let folder of subFolderObj) {
        if (folder.id === parseInt(action.payload)) {
          folder.folderOptions = !folder.folderOptions;
          sname = folder.name;
        } else {
          folder.folderOptions = false;

          for (let uploads of uploadsFolderObj) {
            uploads.uploadOptions = false;
            uploads.uploadFOptions = false;
          }

          for (let design of designFolderObj) {
            design.designOptions = false;
            design.designFOptions = false;
          }
        }
      }
      return {
        ...state,
        subfolders: subFolderObj,
        folderDesigns: designFolderObj,
        folderUploads: uploadsFolderObj,
        selectedFolderName: sname,
      };
    case 'UPLOADS_FOLDER_OPTION':
      const uploadsFolderObj1 = state.folderUploads;
      const designFolderObj1 = state.folderDesigns;
      const subFolderObj1 = state.subfolders;
      for (let uploads of uploadsFolderObj1) {
        if (uploads.id === parseInt(action.payload)) {
          uploads.uploadOptions = !uploads.uploadOptions;
          uploads.uploadFOptions = false;
        } else {
          uploads.uploadOptions = false;
          uploads.uploadFOptions = false;
        }
      }
      for (let design of designFolderObj1) {
        design.designOptions = false;
        design.designFOptions = false;
      }
      for (let folder of subFolderObj1) {
        folder.folderOptions = false;
      }

      return {
        ...state,
        folderDesigns: designFolderObj1,
        folderUploads: uploadsFolderObj1,
        subfolders: subFolderObj1,
      };
    case 'DESIGN_FOLDER_OPTION':
      const designFolderObj2 = state.folderDesigns;
      const subFolderObj2 = state.subfolders;
      const uploadsFolderObj2 = state.folderUploads;
      for (let design of designFolderObj2) {
        if (design.id === parseInt(action.payload)) {
          design.designOptions = !design.designOptions;
          design.designFOptions = false;
        } else {
          design.designOptions = false;
          design.designFOptions = false;
        }
      }
      for (let folder of subFolderObj2) {
        folder.folderOptions = false;
      }
      for (let uploads of uploadsFolderObj2) {
        uploads.uploadOptions = false;
        uploads.uploadFOptions = false;
      }
      return {
        ...state,
        folderDesigns: designFolderObj2,
        folderUploads: uploadsFolderObj2,
        subfolders: subFolderObj2,
      };
    case 'DESIGN_FOLDERMOVE_OPTION':
      const designFolderObj3 = state.folderDesigns;
      let containerObj = null;
      for (let design of designFolderObj3) {
        if (design.id === parseInt(action.payload)) {
          design.designFOptions = !design.designFOptions;
          design.designOptions = false;
          containerObj = design.container.id;
        } else {
          design.designFOptions = false;
        }
      }
      return {
        ...state,
        folderDesigns: designFolderObj3,
        containerId: containerObj,
        ObjectId: action.payload,
      };
    case 'UPLOADS_FOLDERMOVE_OPTION':
      const uploadsFolderObj3 = state.folderUploads;
      let containerID = null;
      for (let uploads of uploadsFolderObj3) {
        if (uploads.id === parseInt(action.payload)) {
          uploads.uploadFOptions = !uploads.uploadFOptions;
          uploads.uploadOptions = false;
          containerID = uploads.container.id;
        } else {
          uploads.uploadFOptions = false;
        }
      }
      return {
        ...state,
        folderUploads: uploadsFolderObj3,
        containerId: containerID,
        ObjectId: action.payload,
      };
    case 'DELETE_FOLDER_DESIGN':
      const folderDesignsObj = state.folderDesigns.filter((design) => {
        return design.id !== parseInt(action.payload);
      });
      return {
        ...state,
        folderDesigns: folderDesignsObj,
      };
    case 'DELETE_FOLDER_UPLOAD':
      const folderUploadsObj = state.folderUploads.filter((upload) => {
        return upload.id !== parseInt(action.payload);
      });
      return {
        ...state,
        folderUploads: folderUploadsObj,
      };
    case 'DELETE_SUBFOLDER':
      const remainingSubFolders = state.subfolders.filter((folder) => {
        return folder.id !== parseInt(action.payload);
      });
      return {
        ...state,
        subfolders: remainingSubFolders,
      };
    case 'SET_DATA':
      action.payload.designs.forEach((design) => {
        design.designOptions = false;
        design.designFOptions = false;
      });
      action.payload.uploads.forEach((uploads) => {
        uploads.uploadOptions = false;
        uploads.uploadFOptions = false;
      });
      return {
        ...state,
        data: action.payload,
        subfolders: action.payload.subfolders,
        folderDesigns: action.payload.designs,
        folderUploads: action.payload.uploads,
      };
    case 'OPEN_FOLDER':
      return {
        ...state,
        openFolder: true,
        folderToOpen: action.payload,
      };
    case 'SET_FOLDERS':
      return {
        ...state,
        folders: action.payload,
      };
    case 'FOLDER_OPTION':
      const folderObj = state.folders;
      let name = '';
      for (let folder of folderObj) {
        if (folder.id === parseInt(action.payload)) {
          folder.folderOptions = !folder.folderOptions;
          name = folder.name;
        } else {
          folder.folderOptions = false;
        }
      }
      return {
        ...state,
        folders: folderObj,
        selectedFolderName: name,
      };
    case 'RENAME_OPTION':
      const renamefolderObj = state.folders;
      for (let folder of renamefolderObj) {
        if (folder.id === parseInt(action.payload)) {
          folder.renameOptions = !folder.renameOptions;
          folder.folderOptions = false;
        } else {
          folder.renameOptions = false;
          folder.folderOptions = false;
        }
      }
      return {
        ...state,
        folders: renamefolderObj,
      };
    case 'RENAME_SUBOPTION':
      const renamesubfolderObj = state.subfolders;
      for (let folder of renamesubfolderObj) {
        if (folder.id === parseInt(action.payload)) {
          folder.renameOptions = !folder.renameOptions;
          folder.folderOptions = false;
        } else {
          folder.renameOptions = false;
          folder.folderOptions = false;
        }
      }
      return {
        ...state,
        subfolders: renamesubfolderObj,
      };
    case 'RENAME_FOLDER':
      const newfoldersObj = state.folders;
      for (let folder of newfoldersObj) {
        if (folder.id === parseInt(action.payload.id)) {
          folder.name = action.payload.name;
          folder.folderOptions = false;
          folder.renameOptions = false;
        }
      }
      return {
        ...state,
        folders: newfoldersObj,
      };
    case 'RENAME_SUBFOLDER':
      const newsubfoldersObj = state.subfolders;
      for (let folder of newsubfoldersObj) {
        if (folder.id === action.payload.id) {
          folder.name = action.payload.name;
          folder.folderOptions = false;
          folder.renameOptions = false;
        }
      }
      return {
        ...state,
        subfolders: newsubfoldersObj,
      };
    case 'DELETE_FOLDER':
      const remainingFolders = state.folders.filter((folder) => {
        return folder.id !== parseInt(action.payload);
      });
      return {
        ...state,
        folders: remainingFolders,
      };
    case 'DELETE_FONT':
      const remainingFonts = state.userCustomFonts.filter((font) => {
        return font.id !== parseInt(action.payload);
      });
      return {
        ...state,
        userCustomFonts: remainingFonts,
      };
    case 'ADD_NEW_FOLDER':
      const newFolderObject = {
        name: action.payload.name,
        id: action.payload.id,
        folderOptions: false,
      };
      return {
        ...state,
        folders: [...state.folders, newFolderObject],
        selectedFolderId: newFolderObject.id,
      };
    case 'setOpacityFree':
      return {
        ...state,
        opacityFree: true,
        opacityPaid: false,
      };
    case 'setOpacityPaid':
      return {
        ...state,
        opacityFree: false,
        opacityPaid: true,
      };
    case 'CLOSE_SIDEBAR':
      const closeSidebarLabelRef = state.labelRef;
      closeSidebarLabelRef.current.style.display = 'none';
      return {
        ...state,
        sidebarType: '',
        target: null,
        labelRef: closeSidebarLabelRef,
      };
    case 'SHOW_SIDEBAR':
      const showSidebarLabelRef = state.labelRef;
      showSidebarLabelRef.current.style.display = 'none';
      return {
        ...state,
        showTextBar: false,
        sidebarType: action.payload,
        target: null,
        labelRef: showSidebarLabelRef,
        // selectedElementBtns: null,
      };
    case 'SET_BACKGROUND_IMAGE':
      let backgroundImage = state.pages;
      backgroundImage[state.selectedPage.pageId].backgroundImage =
        action.payload;
      if (backgroundImage[state.selectedPage.pageId].pageColor.length) {
        backgroundImage[state.selectedPage.pageId].pageColor = '#ffffff';
      }
      return {
        ...state,
        backgroundImage: true,
        pages: backgroundImage,
      };
    case 'ADD_NEW_PAGE':
      const newPageObject = {
        className: 'selectedPage',
        pageId: ++state.pageCount,
        title: '',
        snapshot: '',
        elements: [],
        backgroundImage: state.selectedPage.backgroundImage,
        pageOptions: false,
        scaleX: state.pages[0].scaleX,
        scaleY: state.pages[0].scaleY,
      };
      state.pages.forEach((page) => {
        if (page.pageId !== state.pages.length) {
          page.className = 'newPage';
          page.pageOptions = false;
        } else {
          page.className = 'selectedPage';
          page.pageOptions = false;
        }
      });
      return {
        ...state,
        pages: [...state.pages, newPageObject],
        selectedPage: newPageObject,
      };
    case 'DELETE_PAGE':
      const deletePageLabelRef = state.labelRef;
      deletePageLabelRef.current.style.display = 'none';
      const selectedItem = state.pages.filter((page) => {
        return page.pageId !== parseInt(action.payload);
      });
      return {
        ...state,
        labelRef: deletePageLabelRef,
        pages: selectedItem,
        selectedPage: selectedItem[0],
        selectedElement: selectedItem[0].elements[0]
          ? selectedItem[0].elements[0]
          : null,
        selectedFrame: selectedItem[0].elements[0]
          ? selectedItem[0].elements[0].frame
          : null,
        target: null,
      };
    case 'DELETE_ELEMENT':
      if (state.targets) {
        const deletedElementsIndex = [];
        let deleteMultipleElements = state.pages;
        state.targets.map((el) => {
          state.pages[state.selectedPage.pageId].elements.filter((element) => {
            if (element.id === el.id) {
              deletedElementsIndex.push(element.id);
            }
          });
        });
        const arr = deleteMultipleElements[state.selectedPage.pageId].elements;
        const filteredElements = arr.filter(
          (el) => !deletedElementsIndex.includes(el.id),
        );
        deleteMultipleElements[state.selectedPage.pageId].elements =
          filteredElements;
        return {
          ...state,
          pages: deleteMultipleElements,
          targets: null,
          selectedElementBtns: null,
        };
      } else {
        let deleteFrames = state.frames;
        const deleteElementLabelRef = state.labelRef;
        deleteElementLabelRef.current.style.display = 'none';
        if (state.deleteBackgroundImage) {
          const removebackgroundImage = state.pages;
          const selectedBackgroundImage = state.selectedPage;
          selectedBackgroundImage.backgroundImage = '';
          removebackgroundImage[state.selectedPage.pageId] =
            selectedBackgroundImage;
          return {
            ...state,
            pages: removebackgroundImage,
            deleteBackgroundImage: false,
            selectedElementBtns: null,
            labelRef: deleteElementLabelRef,
          };
        } else {
          let temp = [];
          let id = state.pages[state.selectedPage.pageId].elements.findIndex(
            (el) => el.id === state.selectedElement.id,
          );
          state.pages.forEach((el) => {
            el.elements.forEach((elem) => {
              if (
                elem?.zIndex >
                state.pages[state.selectedPage.pageId].elements[id].zIndex
              ) {
                temp.push(elem);
                elem.zIndex = elem.zIndex - 1;
              }
            });
          });
          const selectedElement = state.pages[
            state.selectedPage.pageId
          ].elements.filter((element) => {
            if (element.type === 'grid') {
              return element.id !== state.girdImageId;
            } else if (element.type === 'frame') {
              if (element.id === state.selectedElement.id) {
                deleteFrames[element.name].images[0].src = null;
              }
              return element.id !== state.selectedElement.id;
            } else {
              return element.id !== state.selectedElement.id;
            }
          });
          const remainingElements = state.pages;
          remainingElements[state.selectedPage.pageId].elements =
            selectedElement;
          const remainingElementPages = state.selectedPage;
          remainingElementPages.elements = selectedElement;
          remainingElementPages.elements.forEach((el) => {
            if (typeof el.frame.properties.width === 'string') {
              el.width = parseFloat(el.frame.properties.width.split('px')[0]);
              el.Textwidth = el.frame.properties.width;
            } else {
              el.width = el.frame.properties.width;
              el.Textwidth = el.frame.properties.width + 'px';
            }
          });
          return {
            ...state,
            frame: deleteFrames,
            pages: remainingElements,
            selectedPage: remainingElementPages,
            target: null,
            selectedElementBtns: null,
            selectedElement: null,
            labelRef: deleteElementLabelRef,
          };
        }
      }
    case 'SET_XY_BOUNDS':
      const boundingClient = state.pages[
        state.selectedPage.pageId
      ].elements.findIndex((el) => el.id === action.payload.elId);
      let pagesBounds = state.pages;
      pagesBounds[state.selectedPage.pageId].elements[boundingClient].xBound =
        action.payload.x;
      pagesBounds[state.selectedPage.pageId].elements[boundingClient].yBound =
        action.payload.y;
      pagesBounds[state.selectedPage.pageId].elements[boundingClient].rotBound =
        action.payload.rot;

      return { ...state, pages: pagesBounds };
    case 'ON_Rotate_TEXT':
      const indRot = state.pages[state.selectedPage.pageId].elements.findIndex(
        (el) => el.id === action.payload.elementId,
      );
      let pagesRot = state.pages;
      pagesRot[state.selectedPage.pageId].elements[indRot].top =
        action.payload.top + 'px';
      pagesRot[state.selectedPage.pageId].elements[indRot].left =
        action.payload.left + 'px';
      pagesRot[state.selectedPage.pageId].elements[indRot].width =
        action.payload.width + 'px';
      pagesRot[state.selectedPage.pageId].elements[indRot].height =
        action.payload.height + 'px';
      pagesRot[state.selectedPage.pageId].elements[indRot].transform =
        action.payload.transform;

      return {
        ...state,
        pages: pagesRot,
      };
    case 'ON_RESIZE_TEXT':
      const indR = state.pages[state.selectedPage.pageId].elements.findIndex(
        (el) => el.id === action.payload.el_id,
      );
      let pages2 = state.pages;
      pages2[state.selectedPage.pageId].elements[indR].top =
        action.payload.top + 'px';
      pages2[state.selectedPage.pageId].elements[indR].left =
        action.payload.left + 'px';
      pages2[state.selectedPage.pageId].elements[indR].width =
        action.payload.width + 'px';
      pages2[state.selectedPage.pageId].elements[indR].height =
        action.payload.height + 'px';
      pages2[state.selectedPage.pageId].elements[indR].rotation =
        action.payload.rot + 'deg';
      pages2[state.selectedPage.pageId].elements[indR].fontSize =
        action.payload.font.split('px')[0];
      return {
        ...state,
        pages: pages2,
      };
    case 'ON_DRAG_TEXT':
      const { left, top, elementId } = action.payload;
      const ind = state.pages[state.selectedPage.pageId].elements.findIndex(
        (el) => el.id === elementId,
      );
      let pagestrans = state.pages;
      pagestrans[state.selectedPage.pageId].elements[ind].top = top + 'px';
      pagestrans[state.selectedPage.pageId].elements[ind].left = left + 'px';
      return { ...state, pages: pagestrans };
    case 'STORE_ELEMENT':
      const { pages, selectedPage, elementsPlaced } = state;
      let highestElementId = highestElementid(pages, selectedPage);
      action.payload.id = `page${selectedPage.pageId}moveable${highestElementId}`;
      action.payload.isflipY = false;
      action.payload.isflipX = false;
      action.payload.isZoomIn = false;
      action.payload.boxShadow = false;
      action.payload.elementId = highestElementid;
      const elementHeight = parseInt(
        action.payload.frame.properties.height.substring(
          0,
          action.payload.frame.properties.height.length - 2,
        ),
      );
      const elementWidth = parseInt(
        action.payload.frame.properties.width.substring(
          0,
          action.payload.frame.properties.width.length - 2,
        ),
      );
      action.payload.left = action.payload.frame.properties.left;
      action.payload.top = action.payload.frame.properties.top;
      action.payload.height = action.payload.frame.properties.height;
      action.payload.width =
        elementWidth * action.payload.frame.properties.transform.scaleX;
      action.payload.deg = action.payload.frame.properties.transform.rotate;
      action.payload.scaleX = 1;
      action.payload.scaleY = 1;
      action.payload.zIndex =
        state.pages[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === action.payload.id,
        ) + 1;
      if (action.payload.type === 'img') {
        action.payload.grayscale = '0';
        action.payload.sepia = '0';
      }
      const currentPage = pages.find((p) => {
        return p.pageId === selectedPage.pageId;
      });
      currentPage.elements.push(action.payload);
      currentPage.elements.forEach((el) => {
        el.cropImage = false;
      });
      if (currentPage.elements.length) {
        let maxVal;
        let value = [];
        currentPage.elements.map((elem) => {
          value.push(elem.zIndex);
          maxVal = Math.max(...value);
        });
        action.payload.zIndex = parseInt(maxVal) + 1;
      } else {
        action.payload.zIndex = 1;
      }
      return {
        ...state,
        elementsPlaced: highestElementId,
        pages: pages,
        selectedPage: currentPage,
        selectedElement: action.payload,
        selectedFrame: action.payload.frame,
        target: document.querySelector(`#${action.payload.id}`),
      };
    case 'UNSELECT_ALL':
      let cropStatus = false;
      state.pages[state.selectedPage.pageId].elements.map((ele) => {
        if (ele.cropImage === true) {
          cropStatus = true;
        }
      });

      if (!state.doubleClick) {
        if (!cropStatus) {
          let unselectedPagesall = state.pages;
          unselectedPagesall.forEach((page) => {
            page.className = 'newPage';
          });
          return {
            ...state,
            // selectedPage: {
            //   pageId: 0,
            //   title: '',
            //   elements: [],
            //   backgroundImage: '',
            // },
            doubleClick: false,
            singleClick: false,
            selectedElementBtns: null,
            selectedElement: null,
            selectedFrame: null,
            pages: unselectedPagesall,
            target: null,
          };
        }
      }
      return {
        ...state,
      };
    case 'SET_SELECTED_PAGE':
      if (!action.payload.pageColor) {
        action.payload.pageColor = '#ffffff';
      }
      if (!state.doubleClick) {
        let photoBtns;
        if (action.payload.backgroundImage !== '') {
          photoBtns = null;
        } else {
          photoBtns = null;
        }
        state.pages.forEach((page) => {
          if (page.pageId !== action.payload.pageId) {
            page.className = 'newPage';
          } else {
            page.className = 'selectedPage';
          }
        });
        return {
          ...state,
          selectedPage: action.payload,
          selectedElementBtns: photoBtns,
          deleteBackgroundImage: true,
          selectedElement: null,
        };
      }
      return {
        ...state,
      };
    case 'SET_UNSELECT_ALL_PAGES':
      let unselectedPages = state.pages;
      unselectedPages.forEach((page) => {
        page.className = 'newPage';
      });
      return {
        ...state,
        pages: unselectedPages,
      };
    case 'SET_SELECTED_ELEMENT':
      if (!state.targets) {
        state.pages.forEach((page) => {
          page.className = 'newPage';
        });
        state.pages[state.selectedPage.pageId].elements.forEach((el) => {
          el.cropImage = false;
        });
        if (action.payload.lock) {
          return {
            ...state,
            selectedElement: action.payload,
            target: null,
            backgroundImage: false,
            deleteBackgroundImage: false,
            undo: false,
            redo: false,
          };
        } else {
          if (state.copyStyle) {
            if (state.styleToBeCopiedId === null) {
              return {
                ...state,
                styleToBeCopiedId: action.payload.id,
                target: document.querySelector(`#${action.payload.id}`),
              };
            } else if (state.styleToBeCopiedId === action.payload.id) {
              return {
                ...state,
                styleToBeCopiedId: action.payload.id,
                target: document.querySelector(`#${action.payload.id}`),
              };
            } else {
              const copyStylePages = state.pages;
              const styleToBeCopied = state.pages[
                state.selectedPage.pageId
              ].elements.filter((el) => {
                return state.styleToBeCopiedId === el.id;
              });
              const styleToBeApplied = state.pages[
                state.selectedPage.pageId
              ].elements.filter((el) => {
                return action.payload.id === el.id;
              });
              copyStylePages[state.selectedPage.pageId].elements[
                state.pages[state.selectedPage.pageId].elements.findIndex(
                  (elmIndex) => elmIndex.id === action.payload.id,
                )
              ] = cloneDeep(styleToBeCopied[0]);
              copyStylePages[state.selectedPage.pageId].elements[
                state.pages[state.selectedPage.pageId].elements.findIndex(
                  (elmIndex) => elmIndex.id === action.payload.id,
                )
              ].id = styleToBeApplied[0].id;
              copyStylePages[state.selectedPage.pageId].elements[
                state.pages[state.selectedPage.pageId].elements.findIndex(
                  (elmIndex) => elmIndex.id === action.payload.id,
                )
              ].src = styleToBeApplied[0].src;
              copyStylePages[state.selectedPage.pageId].elements[
                state.pages[state.selectedPage.pageId].elements.findIndex(
                  (elmIndex) => elmIndex.id === action.payload.id,
                )
              ].frame = styleToBeApplied[0].frame;
              return {
                ...state,
                pages: copyStylePages,
                selectedElement:
                  copyStylePages[state.selectedPage.pageId].elements[
                    copyStylePages[
                      state.selectedPage.pageId
                    ].elements.findIndex((el) => el.id === action.payload.id)
                  ],
                target: document.querySelector(`#${action.payload.id}`),
                deleteBackgroundImage: false,
                backgroundImage: false,
                undo: false,
                redo: false,
                copyStyle: false,
                styleToBeCopiedId: null,
              };
            }
          } else {
            let textBar;
            if (action.payload.type === 'img') {
              textBar = null;
            } else {
              textBar = 'Text';
            }
            return {
              ...state,
              selectedElement: action.payload,
              target: state.doubleClick
                ? document.querySelector(`#${action.payload.id}img0`)
                : document.querySelector(`#${action.payload.id}`),
              backgroundImage: false,
              selectedEditorBarBtn: textBar,
              deleteBackgroundImage: false,
              undo: false,
              redo: false,
            };
          }
        }
      } else {
        return {
          ...state,
        };
      }

    case 'SET_SELECTED_FRAME':
      return {
        ...state,
        selectedFrame: action.payload,
        objectPosition: null,
        horizontalAlignment: null,
        verticalAlignment: null,
      };
    case 'BOLD_TEXT':
      let bold = state.pages;
      bold[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].isBold = action.payload;
      return {
        ...state,
        pages: bold,
      };
    case 'ITALIC_TEXT':
      let italic = state.pages;
      italic[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].isItalic = action.payload;
      return {
        ...state,
        pages: italic,
      };
    case 'UNDERLINE_TEXT':
      let underline = state.pages;
      underline[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].isUnderline = action.payload;
      return {
        ...state,
        pages: underline,
      };
    case 'UPPERCASE_TEXT':
      let uppercase = state.pages;
      uppercase[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].isUppercase = action.payload;
      return {
        ...state,
        pages: uppercase,
      };
    case 'SET_FONTSIZE':
      let fontSize = state.pages;
      fontSize[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].fontSize = action.payload;
      return {
        ...state,
        pages: fontSize,
      };
    case 'SET_OPACITY':
      let opacity = state.pages;
      if (state.selectedElement.type === 'grid') {
        let opacityGrid = state.grids;
        if (
          opacityGrid[state.selectedElement.name].images[
            state.selectedElement.id
          ]
        ) {
          opacityGrid[state.selectedElement.name].images[
            state.selectedElement.id
          ].opacity = action.payload;
        }
        const selectedOpacity = state.selectedElement;
        selectedOpacity.opacity = action.payload;
        return {
          ...state,
          grids: opacityGrid,
          selectedElement: selectedOpacity,
        };
      } else if (state.selectedElement.type === 'frame') {
        let opacityFrame = state.frames;
        if (opacityFrame[state.selectedElement.name].images[0]) {
          opacityFrame[state.selectedElement.name].images[0].opacity =
            action.payload;
        }
        const selectedOpacity = state.selectedElement;
        selectedOpacity.opacity = action.payload;
        return {
          ...state,
          frames: opacityFrame,
          selectedElement: selectedOpacity,
        };
      } else {
        if (
          opacity[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0]
        ) {
          opacity[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].opacity = action.payload;
        }
        return {
          ...state,
          pages: opacity,
        };
      }
    case 'SET_BRIGHTNESS':
      let brightness = state.pages;
      if (state.selectedElement.type === 'grid') {
        const gridBrightness = state.grids;
        gridBrightness[state.selectedElement.name].images[
          state.selectedElement.id
        ].brightness = action.payload;
        const selectedBrightness = state.selectedElement;
        selectedBrightness.brightness = action.payload;
        return {
          ...state,
          grids: gridBrightness,
          selectedElement: selectedBrightness,
        };
      } else if (state.selectedElement.type === 'frame') {
        const frameBrightness = state.frames;
        frameBrightness[state.selectedElement.name].images[0].brightness =
          action.payload;
        const selectedBrightness = state.selectedElement;
        selectedBrightness.brightness = action.payload;
        return {
          ...state,
          frames: frameBrightness,
          selectedElement: selectedBrightness,
        };
      } else {
        brightness[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].brightness = action.payload;
        return {
          ...state,
          pages: brightness,
        };
      }

    case 'SET_CONTRAST':
      let contrast = state.pages;
      if (state.selectedElement.type === 'grid') {
        const gridContrast = state.grids;
        gridContrast[state.selectedElement.name].images[
          state.selectedElement.id
        ].contrast = action.payload;
        const selectedContrast = state.selectedElement;
        selectedContrast.contrast = action.payload;
        return {
          ...state,
          grids: gridContrast,
          selectedElement: selectedContrast,
        };
      } else if (state.selectedElement.type === 'frame') {
        const frameContrast = state.frames;
        frameContrast[state.selectedElement.name].images[0].contrast =
          action.payload;
        const selectedContrast = state.selectedElement;
        selectedContrast.contrast = action.payload;
        return {
          ...state,
          frames: frameContrast,
          selectedElement: selectedContrast,
        };
      } else {
        contrast[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].contrast = action.payload;
        return {
          ...state,
          pages: contrast,
        };
      }

    case 'SET_SATURATE':
      let saturate = state.pages;
      if (state.selectedElement.type === 'grid') {
        const gridSaturate = state.grids;
        gridSaturate[state.selectedElement.name].images[0].saturate =
          action.payload;
        const selectedSaturate = state.selectedElement;
        selectedSaturate.saturate = action.payload;
        return {
          ...state,
          grids: gridSaturate,
          selectedElement: selectedSaturate,
        };
      } else if (state.selectedElement.type === 'frame') {
        const frameSaturate = state.frames;
        frameSaturate[state.selectedElement.name].images[0].saturate =
          action.payload;
        const selectedSaturate = state.selectedElement;
        selectedSaturate.saturate = action.payload;
        return {
          ...state,
          frames: frameSaturate,
          selectedElement: selectedSaturate,
        };
      } else {
        saturate[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].saturate = action.payload;
        return {
          ...state,
          pages: saturate,
        };
      }
    case 'SET_BLUR':
      let blur = state.pages;
      if (state.selectedElement.type === 'grid') {
        let gridBlur = state.grids;
        gridBlur[state.selectedElement.name].images[
          state.selectedElement.id
        ].blur = action.payload;
        if (action.payload === 1.5) {
          gridBlur[state.selectedElement.name].images[
            state.selectedElement.id
          ].padding = '2px';
        } else if (action.payload > 1.5) {
          gridBlur[state.selectedElement.name].images[
            state.selectedElement.id
          ].padding = '3px';
        } else {
          gridBlur[state.selectedElement.name].images[
            state.selectedElement.id
          ].padding = '0px';
        }
        const selectedBlur = state.selectedElement;
        selectedBlur.blur = action.payload;
        return {
          ...state,
          grids: gridBlur,
          selectedElement: selectedBlur,
        };
      } else if (state.selectedElement.type === 'frame') {
        let frameBlur = state.frames;
        frameBlur[state.selectedElement.name].images[0].blur = action.payload;
        if (action.payload === 1.5) {
          frameBlur[state.selectedElement.name].images[0].padding = '2px';
        } else if (action.payload > 1.5) {
          frameBlur[state.selectedElement.name].images[0].padding = '3px';
        } else {
          frameBlur[state.selectedElement.name].images[0].padding = '0px';
        }
        const selectedBlur = state.selectedElement;
        selectedBlur.blur = action.payload;
        return {
          ...state,
          frames: frameBlur,
          selectedElement: selectedBlur,
        };
      } else {
        blur[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].blur = action.payload;
        if (action.payload === 1.5) {
          blur[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].padding = '2px';
        } else if (action.payload > 1.5) {
          blur[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].padding = '3px';
        } else {
          blur[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].padding = '0px';
        }
        return {
          ...state,
          pages: blur,
        };
      }
    case 'PLACE_SHADOW':
      let shadow = state.pages;
      if (
        shadow[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].boxShadow === false
      ) {
        shadow[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].boxShadowX = 3;
        shadow[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].boxShadowY = 3;
        shadow[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].boxShadowColor = '#8E8A8A';
        shadow[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].boxShadowB = 5;
        shadow[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].boxShadow = true;
      }
      return {
        ...state,
        pages: shadow,
      };
    case 'CHANGESHADOWB':
      let shadowB = state.pages;
      shadowB[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].boxShadowB = action.payload;
      return {
        ...state,
        pages: shadowB,
      };
    case 'CHANGESHADOWX':
      let shadowX = state.pages;
      shadowX[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].boxShadowX = action.payload;
      return {
        ...state,
        pages: shadowX,
      };
    case 'CHANGESHADOWY':
      let shadowY = state.pages;
      shadowY[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].boxShadowY = action.payload;
      return {
        ...state,
        pages: shadowY,
      };
    case 'SET_SHADOWCOLOR':
      let shadowcolor = state.pages;
      shadowcolor[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].boxShadowColor = action.payload;
      return {
        ...state,
        pages: shadowcolor,
      };
    case 'SET_EFFECT':
      const content = state.pages;

      if (state.selectedElement.type === 'grid') {
        let gridEffects = state.grids;
        gridEffects[state.selectedElement.name].images[
          state.selectedElement.id
        ].filter = action.payload;
        const selectedEffect = state.selectedElement;
        selectedEffect.filter = action.payload;
        return {
          ...state,
          grids: gridEffects,
          selectedElement: selectedEffect,
        };
      } else if (state.selectedElement.type === 'frame') {
        let frameEffects = state.frames;
        const selectedEffect = state.selectedElement;

        selectedEffect.filter = null;
        selectedEffect.boxShadow = action.payload.value;
        frameEffects[state.selectedElement.name].images[0].boxShadow =
          action.payload.value;
        frameEffects[state.selectedElement.name].images[0].filter = null;

        return {
          ...state,
          frames: frameEffects,
          selectedElement: selectedEffect,
        };
      } else {
        if (action.payload.effect === 'None') {
          content[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].boxShadow = false;
          content[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].sepia = '0';
          content[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].grayscale = '0';
        } else if (action.payload.effect === 'Sepia') {
          content[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].sepia = action.payload.value;
        } else if (action.payload.effect === 'Gray') {
          content[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].grayscale = action.payload.value;
        }
      }
      return {
        ...state,
        pages: content,
      };

    case 'FLIP':
      let rotate = state.pages;
      if (state.selectedElement.type === 'grid') {
        let flip = state.grids;
        if (action.payload === 'flipX') {
          flip[state.selectedElement.name].images[
            state.selectedElement.id
          ].isflipY =
            !state.grids[state.selectedElement.name].images[
              state.selectedElement.id
            ].isflipY;
        } else {
          flip[state.selectedElement.name].images[
            state.selectedElement.id
          ].isflipX =
            !state.grids[state.selectedElement.name].images[
              state.selectedElement.id
            ].isflipX;
        }
        return {
          ...state,
          grids: flip,
        };
      } else if (state.selectedElement.type === 'frame') {
        let flipFrame = state.frames;
        if (action.payload === 'flipX') {
          flipFrame[state.selectedElement.name].images[0].isflipY =
            !state.frames[state.selectedElement.name].images[0].isflipY;
        } else {
          flipFrame[state.selectedElement.name].images[0].isflipX =
            !state.frames[state.selectedElement.name].images[0].isflipX;
        }
        return {
          ...state,
          frames: flipFrame,
        };
      } else {
        if (action.payload === 'flipX') {
          rotate[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].isflipY = !state.selectedElement.isflipY;
        } else {
          rotate[state.selectedPage.pageId].elements.filter(
            (el) => el.id === state.selectedElement.id,
          )[0].isflipX = !state.selectedElement.isflipX;
        }
        return {
          ...state,
          pages: rotate,
        };
      }
    case 'ZOOM':
      let zoom = state.pages;
      if (action.payload === 'ZI') {
        zoom[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].isZoomIn = true;
        zoom[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].frame.properties.transform.scaleX = 2;
        zoom[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].frame.properties.transform.scaleY = 2;
      } else if (action.payload === 'ZO') {
        zoom[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].isZoomIn = false;
        zoom[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].frame.properties.transform.scaleX = 1;
        zoom[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].frame.properties.transform.scaleY = 1;
      }
      return {
        ...state,
        pages: zoom,
      };
    case 'SET_ZOOM':
      let zoomPercentage = state.pages;
      for (let page of zoomPercentage) {
        page.scaleX = action.payload;
        page.scaleY = action.payload;
      }
      return {
        ...state,
        pages: zoomPercentage,
      };
    case 'SET_FONT_FAMILY':
      let fontFamily = state.pages;
      let se = state.selectedElement;
      if (se != null) {
        fontFamily[state.selectedPage.pageId].elements.filter(
          (el) => el.id === state.selectedElement.id,
        )[0].fontFamily = action.payload;
      }
      return {
        ...state,
        pages: fontFamily,
      };
    case 'SET_LINE_HEIGHT':
      let lineHeight = state.pages;
      lineHeight[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].lineHeight = action.payload;
      return {
        ...state,
        pages: lineHeight,
      };
    case 'SET_LETTER_SPACING':
      let letterSpacing = state.pages;
      letterSpacing[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].letterSpacing = action.payload;
      return {
        ...state,
        pages: letterSpacing,
      };
    case 'SET_WORD_SPACING':
      let wordSpacing = state.pages;
      wordSpacing[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].wordSpacing = action.payload;
      return {
        ...state,
        pages: wordSpacing,
      };
    case 'SET_COLOR_PICKER':
      let color1 = state.pages;
      color1[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].isColorPicker = action.payload.isColorPicker;
      return {
        ...state,
        pages: color1,
        showTextBar: false,
        showFonts: false,
      };
    case 'SET_TEXT_COLOR':
      let color = state.pages;
      color[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].color = action.payload.color;
      color[state.selectedPage.pageId].elements.filter(
        (el) => el.id === state.selectedElement.id,
      )[0].isColorPicker = action.payload.isColorPicker;
      return {
        ...state,
        pages: color,
        // showTextBar: false,
        showFonts: false,
      };
    case 'ALIGN_TEXT':
      let currentIndex = action.payload;
      let alignment = state.pages;
      alignment[state.selectedPage.pageId].elements[
        alignment[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].textAlign = state.alignment.types[currentIndex];
      const alignmentArray = state.alignment;
      alignmentArray.indexNo = currentIndex;
      return {
        ...state,
        pages: alignment,
        alignment: alignmentArray,
      };
    case 'LIST_TEXT':
      let currentIndexForBullets = parseInt(action.payload);
      let list = state.pages;
      list[state.selectedPage.pageId].elements[
        list[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].list = currentIndexForBullets;
      return {
        ...state,
        pages: list,
        alignmentV: false,
        listV: false,
        target: null,
      };
    case 'EDIT_TEXT':
      let editText = state.pages;
      editText[state.selectedPage.pageId].elements.filter((el) => {
        return el.id === action.payload.id;
      })[0].text = action.payload.value;
      return {
        ...state,
        pages: editText,
        // target: null,
      };
    case 'EDIT_PAGE_NAME':
      let editPageName = state.pages;
      editPageName.forEach((page) => {
        page.pageOptions = false;
      });
      editPageName[state.selectedPage.pageId].title = action.payload;
      return {
        ...state,
        pages: editPageName,
      };
    case 'COPY_PAGE':
      const copyPages = state.pages.find((p) => {
        return p.pageId === parseInt(action.payload);
      });
      state.pages.forEach((page) => {
        page.pageOptions = false;
      });
      copyPages.elements.map((el) => {
        const h = parseInt(
          el.frame.properties.height.substring(
            0,
            el.frame.properties.height.length - 2,
          ),
        );
        const w = parseInt(
          el.frame.properties.width.substring(
            0,
            el.frame.properties.width.length - 2,
          ),
        );
        el.left = el.frame.properties.left;
        el.top = el.frame.properties.top;
        el.height = h;
        el.width = w;
        el.deg = el.frame.properties.transform.rotate;
        el.scaleX = el.frame.properties.transform.scaleX;
        el.scaleY = el.frame.properties.transform.scaleY;
      });
      const copiedPage = cloneDeep(copyPages);
      copiedPage.elements = cloneDeep(copyPages.elements);
      copiedPage.pageId = state.pages.length;
      copiedPage.elements.map((elements) => {
        elements.id = elements.id.replace(
          `page${copyPages.pageId}`,
          `page${copiedPage.pageId}`,
        );
      });
      return {
        ...state,
        pages: [...state.pages, copiedPage],
        selectedPage: copiedPage,
      };
    case 'DUPLICATE_ELEMENT':
      if (state.selectedElement.type !== 'frame') {
        let maxZindex;
        let values = [];
        let highestElementId = highestElementid(
          state.pages,
          state.selectedPage,
        );
        const duplicatePages = state.pages;
        duplicatePages[state.selectedPage.pageId].elements.map((elem) => {
          values.push(elem.zIndex);
          maxZindex = Math.max(...values);
        });
        let element;
        let elementUpdate = false;
        let heightD = null;
        let widthD = null;
        let copiedElement;
        if (state.selectedPage.elements) {
          const duplicateElement = state.selectedPage.elements.find(
            (element) => {
              return element.id === state.selectedElement.id;
            },
          );
          copiedElement = cloneDeep(duplicateElement);
        }
        if (copiedElement) {
          copiedElement.id = `page${state.selectedPage.pageId}moveable${highestElementId}`;
          copiedElement.elementId = highestElementId;
          if (typeof copiedElement.frame.properties.height === 'string') {
            heightD = parseInt(
              copiedElement.frame.properties.height.substring(
                0,
                copiedElement.frame.properties.height.length - 2,
              ),
            );
          } else {
            heightD = copiedElement.frame.properties.height;
          }
          if (typeof copiedElement.frame.properties.width === 'string') {
            widthD = parseInt(
              copiedElement.frame.properties.width.substring(
                0,
                copiedElement.frame.properties.width.length - 2,
              ),
            );
          } else {
            widthD = copiedElement.frame.properties.width;
          }
          copiedElement.left = copiedElement.frame.properties.left;
          copiedElement.left = copiedElement.frame.properties.left;
          copiedElement.top = copiedElement.frame.properties.top;
          copiedElement.height = heightD;
          copiedElement.width = widthD;
          copiedElement.deg = copiedElement.frame.properties.transform.rotate;
          copiedElement.scaleX =
            copiedElement.frame.properties.transform.scaleX;
          copiedElement.scaleY =
            copiedElement.frame.properties.transform.scaleY;
          copiedElement.zIndex = maxZindex + 1;
          if (action.payload) {
            element = state.selectedElement;
            elementUpdate = true;
            copiedElement.zIndex = state.selectedElement.zIndex;
            state.selectedElement.zIndex = maxZindex + 1;
          }
          duplicatePages[state.selectedPage.pageId].elements.push(
            copiedElement,
          );
        }
        return {
          ...state,
          pages: duplicatePages,
          elementsPlaced: highestElementId,
          selectedElement: copiedElement,
          selectedElement: elementUpdate ? element : state.selectedElement,
        };
      }
    case 'SET_SELECTED_EDITOR_BTN':
      return {
        ...state,
        selectedEditorBarBtn: action.payload,
      };
    case 'SET_SELECTED_ELEMENT_BTN':
      let type;
      if (action.payload.lock) {
        type = null;
      } else if (action.payload.type === 'svg') {
        type = 'icon';
      } else if (action.payload.type === 'img' && state.targets) {
        type = 'group';
      } else if (action.payload.type === 'img') {
        type = 'img';
      } else if (action.payload.type === 'text' && state.targets) {
        type = 'group';
      } else if (action.payload.type === 'text') {
        type = 'text';
      } else if (action.payload === 'icon') {
        type = 'icon';
      } else if (action.payload === 'background') {
        type = 'background';
      } else if (action.payload === 'group') {
        type = 'group';
      } else if (action.payload.type === 'grid') {
        type = 'img';
      } else {
        type = null;
      }
      return {
        ...state,
        selectedElementBtns: type,
      };
    case 'REMOVE_ALIGNMENT':
      const removealign = state.pages;
      const removealignid = state.selectedPage.pageId;
      let rcurrentElement;
      if (state?.selectedElement?.type === 'frame') {
        if (typeof state.selectedElement.id === 'number') {
          rcurrentElement = state.selectedElement.id;
          return {
            ...state,
          };
        } else if (typeof state.selectedElement.id === 'string') {
          rcurrentElement = parseInt(state.selectedElement.id.substring(13));
        }
      } else if (typeof state.selectedElement.id === 'string') {
        rcurrentElement = state.pages[
          state.selectedPage.pageId
        ].elements.findIndex((el) => el.id === state.selectedElement.id);
      }
      const id = removealign[removealignid].elements.findIndex((e) => {
        return parseInt(e.id.substring(13)) === rcurrentElement;
      });

      if (removealign[removealignid].elements[id]) {
        removealign[removealignid].elements[id].right = null;
        delete removealign[removealignid].elements[id].right;
        removealign[removealignid].elements[id].bottom = null;
        delete removealign[removealignid].elements[id].bottom;
      }
      return {
        ...state,
        pages: removealign,
      };
      return { ...state };
    //////////----------///////////////////
    case 'HORIZONTAL_ALIGN':
      if (state.targets) {
        const groupHorizontalAlign = state.pages;
        const pageId = state.selectedPage.pageId;

        let groupableBoundingValues = document
          .getElementsByClassName('moveable-area')[0]
          .getBoundingClientRect();
        let groupableLeft = groupableBoundingValues.left;
        let groupableWidth = groupableBoundingValues.width;
        let groupableHeight = groupableBoundingValues.height;
        let groupableTop = groupableBoundingValues.top;
        const pageScale = document
          .getElementById(`d0`)
          .style.transform.split('scale(')[1]
          .split(')')[0];

        if (action.payload === 'left') {
          groupHorizontalAlign[pageId].elements.forEach((element) => {
            state.targets.map((el) => {
              if (element.id === el.id) {
                const elementBoundLeft = document
                  .getElementById(element.id)
                  .getBoundingClientRect().left;
                const elementLeft = parseFloat(
                  element?.frame?.properties?.left?.substring(
                    0,
                    element?.frame?.properties?.left?.length - 2,
                  ),
                );
                const leftBoundDiff = elementBoundLeft - groupableLeft;
                const scaledLeftBoundDiff = leftBoundDiff / pageScale;
                element.frame.properties.left = `${
                  elementLeft - scaledLeftBoundDiff
                }px`;
              }
            });
          });
        } else if (action.payload === 'center') {
          groupHorizontalAlign[pageId].elements.forEach((element) => {
            state.targets.map((el) => {
              if (element.id === el.id) {
                const elementBoundLeft = document
                  .getElementById(element.id)
                  .getBoundingClientRect().left;
                const elementLeft = parseFloat(
                  element?.frame?.properties?.left?.substring(
                    0,
                    element?.frame?.properties?.left?.length - 2,
                  ),
                );
                const leftBoundDiff =
                  elementBoundLeft - (groupableLeft + groupableWidth / 2);
                const scaledLeftBoundDiff = leftBoundDiff / pageScale;
                const elementHalfWidth =
                  (document.getElementById(element.id).offsetWidth *
                    element.frame.properties.scale[0]) /
                  2;
                const centerValue = elementLeft - scaledLeftBoundDiff;
                element.frame.properties.left = `${
                  centerValue - elementHalfWidth
                }px`;
              }
            });
          });
        } else if (action.payload === 'right') {
          groupHorizontalAlign[pageId].elements.forEach((element) => {
            state.targets.map((el) => {
              if (element.id === el.id) {
                const elementBoundLeft = document
                  .getElementById(element.id)
                  .getBoundingClientRect().left;
                const elementLeft = parseFloat(
                  element?.frame?.properties?.left?.substring(
                    0,
                    element?.frame?.properties?.left?.length - 2,
                  ),
                );
                const leftBoundDiff =
                  elementBoundLeft - (groupableLeft + groupableWidth);
                const scaledLeftBoundDiff = leftBoundDiff / pageScale;
                const rightValue =
                  elementLeft -
                  scaledLeftBoundDiff -
                  document.getElementById(element.id).offsetWidth *
                    element.frame.properties.scale[0];
                element.frame.properties.left = `${rightValue}px`;
              }
            });
          });
        } else if (action.payload === 'tidyUp') {
          if (groupableHeight < groupableWidth) {
            action.payload = action.payload + 'horizontal';
            const leftArray = [];
            groupHorizontalAlign[pageId].elements.forEach((element) => {
              const elementLeft = parseFloat(
                element?.frame?.properties?.left?.substring(
                  0,
                  element?.frame?.properties?.left?.length - 2,
                ),
              );
              leftArray.push({ id: element.id, left: elementLeft });
            });
            leftArray.sort();
            const firstElement = leftArray[0];
            const lastElement = leftArray[leftArray.length - 1];
            // first element align left
            const firstElementBoundLeft = document
              .getElementById(firstElement.id)
              .getBoundingClientRect().left;
            const firstElementt = groupHorizontalAlign[pageId].elements.find(
              (el) => {
                return el.id === firstElement.id;
              },
            );
            const firstElementLeft = parseFloat(
              firstElementt?.frame?.properties?.left?.substring(
                0,
                firstElementt?.frame?.properties?.left?.length - 2,
              ),
            );
            const firstElementleftBoundDiff =
              firstElementBoundLeft - groupableLeft;
            const firstElementScaledLeftBoundDiff =
              firstElementleftBoundDiff / pageScale;
            firstElementt.frame.properties.left = `${
              firstElementLeft - firstElementScaledLeftBoundDiff
            }px`;
            // last element align right
            const lastElementBoundLeft = document
              .getElementById(lastElement.id)
              .getBoundingClientRect().left;
            const lastElementt = groupHorizontalAlign[pageId].elements.find(
              (el) => {
                return el.id === lastElement.id;
              },
            );
            const lastElementLeft = parseFloat(
              lastElementt?.frame?.properties?.left?.substring(
                0,
                lastElementt?.frame?.properties?.left?.length - 2,
              ),
            );
            const leftBoundDiff =
              lastElementBoundLeft - (groupableLeft + groupableWidth);
            const lastElementScaledLeftBoundDiff = leftBoundDiff / pageScale;
            const rightValue =
              lastElementLeft -
              lastElementScaledLeftBoundDiff -
              document.getElementById(lastElementt.id).offsetWidth *
                lastElementt.frame.properties.scale[0];
            lastElementt.frame.properties.left = `${rightValue}px`;
            leftArray.shift();
            leftArray.pop();
            //Remaining elememnts
            const width = groupableWidth / (leftArray.length + 1);
            leftArray.map((element, index) => {
              const elementBoundLeft = document
                .getElementById(element.id)
                .getBoundingClientRect().left;
              const currentElement = groupHorizontalAlign[pageId].elements.find(
                (el) => {
                  return el.id === element.id;
                },
              );
              const elementLeft = parseFloat(
                currentElement?.frame?.properties?.left?.substring(
                  0,
                  currentElement?.frame?.properties?.left?.length - 2,
                ),
              );
              const leftBoundDiff =
                elementBoundLeft - (groupableLeft + width * (index + 1));
              const scaledLeftBoundDiff = leftBoundDiff / pageScale;
              const elementHalfWidth =
                (document.getElementById(currentElement.id).offsetWidth *
                  currentElement.frame.properties.scale[0]) /
                2;
              const centerValue = elementLeft - scaledLeftBoundDiff;
              currentElement.frame.properties.left = `${
                centerValue - elementHalfWidth
              }px`;
            });
            groupHorizontalAlign[pageId].elements.forEach((element) => {
              const elementBoundTop = document
                .getElementById(element.id)
                .getBoundingClientRect().top;
              const elementTop = parseFloat(
                element?.frame?.properties?.top?.substring(
                  0,
                  element?.frame?.properties?.top?.length - 2,
                ),
              );
              const topBoundDiff =
                elementBoundTop - (groupableTop + groupableHeight / 2);
              const pageScale = document
                .getElementById(`d0`)
                .style.transform.split('scale(')[1]
                .split(')')[0];
              const elementHalfWidth =
                (document.getElementById(element.id).offsetHeight *
                  element.frame.properties.scale[1]) /
                2;
              const scaledTopBoundDiff = topBoundDiff / pageScale;
              const middleValue = elementTop - scaledTopBoundDiff;
              element.frame.properties.top = `${
                middleValue - elementHalfWidth
              }px`;
            });
          } else {
            action.payload = action.payload + 'vertical';
            const topArray = [];
            groupHorizontalAlign[pageId].elements.forEach((element) => {
              const elementTop = parseFloat(
                element?.frame?.properties?.top?.substring(
                  0,
                  element?.frame?.properties?.top?.length - 2,
                ),
              );
              topArray.push({ id: element.id, top: elementTop });
            });
            topArray.sort();
            const firstElement = topArray[0];
            const lastElement = topArray[topArray.length - 1];
            // first element align left
            const firstElementBoundTop = document
              .getElementById(firstElement.id)
              .getBoundingClientRect().top;
            const firstElementt = groupHorizontalAlign[pageId].elements.find(
              (el) => {
                return el.id === firstElement.id;
              },
            );
            const firstElementLeft = parseFloat(
              firstElementt?.frame?.properties?.top?.substring(
                0,
                firstElementt?.frame?.properties?.top?.length - 2,
              ),
            );
            const firstElementleftBoundDiff =
              firstElementBoundTop - groupableTop;
            const firstElementScaledLeftBoundDiff =
              firstElementleftBoundDiff / pageScale;
            firstElementt.frame.properties.top = `${
              firstElementLeft - firstElementScaledLeftBoundDiff
            }px`;
            // last element align right
            const lastElementBoundTop = document
              .getElementById(lastElement.id)
              .getBoundingClientRect().top;
            const lastElementt = groupHorizontalAlign[pageId].elements.find(
              (el) => {
                return el.id === lastElement.id;
              },
            );
            const lastElementTop = parseFloat(
              lastElementt?.frame?.properties?.top?.substring(
                0,
                lastElementt?.frame?.properties?.top?.length - 2,
              ),
            );
            const topBoundDiff =
              lastElementBoundTop - (groupableTop + groupableHeight);
            const lastElementScaledTopBoundDiff = topBoundDiff / pageScale;
            const topValue =
              lastElementTop -
              lastElementScaledTopBoundDiff -
              document.getElementById(lastElementt.id).offsetHeight *
                lastElementt.frame.properties.scale[0];
            lastElementt.frame.properties.top = `${topValue}px`;
            topArray.shift();
            topArray.pop();
            //Remaining elememnts
            const height = groupableHeight / (topArray.length + 1);
            topArray.map((element, index) => {
              const elementBoundLeft = document
                .getElementById(element.id)
                .getBoundingClientRect().top;
              const currentElement = groupHorizontalAlign[pageId].elements.find(
                (el) => {
                  return el.id === element.id;
                },
              );
              const elementTop = parseFloat(
                currentElement?.frame?.properties?.top?.substring(
                  0,
                  currentElement?.frame?.properties?.top?.length - 2,
                ),
              );
              const leftBoundDiff =
                elementBoundLeft - (groupableTop + height * (index + 1));
              const scaledLeftBoundDiff = leftBoundDiff / pageScale;
              const elementHalfWidth =
                (document.getElementById(currentElement.id).offsetWidth *
                  currentElement.frame.properties.scale[0]) /
                2;
              const centerValue = elementTop - scaledLeftBoundDiff;
              currentElement.frame.properties.top = `${
                centerValue - elementHalfWidth
              }px`;
            });
            groupHorizontalAlign[pageId].elements.forEach((element) => {
              const elementBoundLeft = document
                .getElementById(element.id)
                .getBoundingClientRect().left;
              const elementLeft = parseFloat(
                element?.frame?.properties?.left?.substring(
                  0,
                  element?.frame?.properties?.left?.length - 2,
                ),
              );
              const leftBoundDiff =
                elementBoundLeft - (groupableLeft + groupableWidth / 2);
              const scaledLeftBoundDiff = leftBoundDiff / pageScale;
              const elementHalfWidth =
                (document.getElementById(element.id).offsetWidth *
                  element.frame.properties.scale[0]) /
                2;
              const centerValue = elementLeft - scaledLeftBoundDiff;
              element.frame.properties.left = `${
                centerValue - elementHalfWidth
              }px`;
            });
          }
        }

        const horizontalAlignLabelRef = state.labelRef;
        horizontalAlignLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: groupHorizontalAlign,
          horizontalAlignment: action.payload,
          target: null,
          labelRef: horizontalAlignLabelRef,
          // targets: null
        };
      } else {
        const horizontalAlign = state.pages;
        const pageId = state.selectedPage.pageId;
        const pageWidth = document.getElementById(
          `page${state.selectedPage.pageId}`,
        ).offsetWidth;
        const currentElement = horizontalAlign[pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        );
        const SelementWidth = document.getElementById(
          state.selectedElement.id,
        ).offsetWidth;
        ///////////////////////
        let el_page = document.getElementById(
          `page${state.selectedPage.pageId}`,
        );
        // let PageBounds = el_page.getBoundingClientRect(); //Shaheer code-refactoring-removing-unused-variables
        let page_scale =
          1 /
          parseFloat(
            document
              .getElementById(`d0`)
              .style.transform.split('scale(')[1]
              .split(')')[0],
          );
        let el = document.getElementById(state.selectedElement.id);
        let el_Bounds = el.getBoundingClientRect();
        let el_transform = el.style.transform;
        let el_translateX = parseFloat(
          el_transform.split('translate(')[1].split(',')[0],
        );
        // let el_translateY = parseFloat( //Shaheer code-refactoring-removing-unused-variables
        //   el_transform
        //     .split('translate(')[1]
        //     .split(',')[1]
        //     .split('px')[0],
        // );
        let el_scale;
        if (el_transform.includes('scaleX')) {
          el_scale = parseFloat(el_transform.split('scaleX(')[1].split(')')[0]);
        } else {
          el_scale = parseFloat(el_transform.split('scale(')[1].split(',')[0]);
        }
        if (action.payload === 'left') {
          let el_scaled_width = el.offsetWidth * el_scale;
          let el_bounds_scaled_width = el_Bounds.width * page_scale;
          let marginOfScale = el_scaled_width - el.offsetWidth;
          let marginOfRotation = el_bounds_scaled_width - el_scaled_width;

          let MarginFromLeft =
            (marginOfScale + marginOfRotation) / 2 - el_translateX;

          horizontalAlign[pageId].elements[
            currentElement
          ].frame.properties.left = `${MarginFromLeft}px`;
        } else if (action.payload === 'right') {
          let el_scaled_width = el.offsetWidth * el_scale;
          let el_bounds_scaled_width = el_Bounds.width * page_scale;

          let marginOfScale = el_scaled_width - el.offsetWidth;
          let marginOfRotation = el_bounds_scaled_width - el_scaled_width;

          let MarginFromLeft =
            (marginOfScale + marginOfRotation) / 2 + el_translateX;

          horizontalAlign[pageId].elements[
            currentElement
          ].frame.properties.left = `${
            el_page.offsetWidth - (MarginFromLeft + el.offsetWidth)
          }px`;
        } else if (action.payload === 'center') {
          horizontalAlign[pageId].elements[
            currentElement
          ].frame.properties.left = `${pageWidth / 2}px`;
          horizontalAlign[pageId].elements[
            currentElement
          ].frame.properties.translate[0] = -SelementWidth / 2;

          horizontalAlign[pageId].elements[currentElement].right = null;
          delete horizontalAlign[pageId].elements[currentElement].right;
        }
        const horizontalAlignLabelRef = state.labelRef;
        horizontalAlignLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: horizontalAlign,
          horizontalAlignment: action.payload,
          target: null,
          labelRef: horizontalAlignLabelRef,
        };
      }
    case 'VERTICAL_ALIGN':
      if (state.targets) {
        const groupVerticalAlign = state.pages;
        const pageId = state.selectedPage.pageId;

        let groupableTop = document
          .getElementsByClassName('moveable-area')[0]
          .getBoundingClientRect().top;
        let groupableHeight = document
          .getElementsByClassName('moveable-area')[0]
          .getBoundingClientRect().height;

        if (action.payload === 'top') {
          groupVerticalAlign[pageId].elements.forEach((element) => {
            state.targets.map((el) => {
              if (element.id === el.id) {
                const elementBoundTop = document
                  .getElementById(element.id)
                  .getBoundingClientRect().top;
                const elementTop = parseFloat(
                  element?.frame?.properties?.top?.substring(
                    0,
                    element?.frame?.properties?.top?.length - 2,
                  ),
                );
                const topBoundDiff = elementBoundTop - groupableTop;
                const pageScale = document
                  .getElementById(`d0`)
                  .style.transform.split('scale(')[1]
                  .split(')')[0];
                const scaledTopBoundDiff = topBoundDiff / pageScale;
                element.frame.properties.top = `${
                  elementTop - scaledTopBoundDiff
                }px`;
              }
            });
          });
        } else if (action.payload === 'bottom') {
          groupVerticalAlign[pageId].elements.forEach((element) => {
            state.targets.map((el) => {
              if (element.id === el.id) {
                const elementBoundTop = document
                  .getElementById(element.id)
                  .getBoundingClientRect().top;
                const elementTop = parseFloat(
                  element?.frame?.properties?.top?.substring(
                    0,
                    element?.frame?.properties?.top?.length - 2,
                  ),
                );
                const topBoundDiff =
                  elementBoundTop - (groupableTop + groupableHeight);
                const pageScale = document
                  .getElementById(`d0`)
                  .style.transform.split('scale(')[1]
                  .split(')')[0];
                const scaledTopBoundDiff = topBoundDiff / pageScale;
                const topValue =
                  elementTop -
                  scaledTopBoundDiff -
                  document.getElementById(element.id).offsetHeight *
                    element.frame.properties.scale[1];
                element.frame.properties.top = `${topValue}px`;
              }
            });
          });
        } else if (action.payload === 'middle') {
          groupVerticalAlign[pageId].elements.forEach((element) => {
            state.targets.map((el) => {
              if (element.id === el.id) {
                const elementBoundTop = document
                  .getElementById(element.id)
                  .getBoundingClientRect().top;
                const elementTop = parseFloat(
                  element?.frame?.properties?.top?.substring(
                    0,
                    element?.frame?.properties?.top?.length - 2,
                  ),
                );
                const topBoundDiff =
                  elementBoundTop - (groupableTop + groupableHeight / 2);
                const pageScale = document
                  .getElementById(`d0`)
                  .style.transform.split('scale(')[1]
                  .split(')')[0];
                const elementHalfWidth =
                  (document.getElementById(element.id).offsetHeight *
                    element.frame.properties.scale[1]) /
                  2;
                const scaledTopBoundDiff = topBoundDiff / pageScale;
                const middleValue = elementTop - scaledTopBoundDiff;
                element.frame.properties.top = `${
                  middleValue - elementHalfWidth
                }px`;
              }
            });
          });
        }

        const verticalAlignLabelRef = state.labelRef;
        verticalAlignLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: groupVerticalAlign,
          verticalAlignment: action.payload,
          target: null,
          labelRef: verticalAlignLabelRef,
        };
      } else {
        const currentPageHeight = document.getElementById(
          `page${state.selectedPage.pageId}`,
        ).offsetHeight;
        const verticalAlign = state.pages;
        const verticalAlignPageId = state.selectedPage.pageId;
        // const pageHeight = document.getElementById(`page${verticalAlignPageId}`)
        //   .offsetHeight; //Shaheer code-refactoring-removing-unused-variables
        const verticalAlignCurrentElement = verticalAlign[
          verticalAlignPageId
        ].elements.findIndex((el) => el.id === state.selectedElement.id);
        const SelementHeight = document.getElementById(
          state.selectedElement.id,
        ).offsetHeight;
        /////////////////////////----------------------/////////////////
        let v_el_page = document.getElementById(
          `page${state.selectedPage.pageId}`,
        );
        // let v_PageBounds = v_el_page.getBoundingClientRect();
        let v_page_scale =
          1 /
          parseFloat(
            document
              .getElementById(`d0`)
              .style.transform.split('scale(')[1]
              .split(')')[0],
          );
        let v_el = document.getElementById(state.selectedElement.id);
        let v_el_Bounds = v_el.getBoundingClientRect();
        let v_el_transform = v_el.style.transform;
        // let v_el_translateX = parseFloat(v_el_transform.split('translate(')[1].split(',')[0])
        let v_el_translateY = parseFloat(
          v_el_transform.split('translate(')[1].split(',')[1].split('px')[0],
        );
        let v_el_scale;
        if (v_el_transform.includes('scaleX')) {
          v_el_scale = parseFloat(
            v_el_transform.split('scaleX(')[1].split(')')[0],
          );
        } else {
          v_el_scale = parseFloat(
            v_el_transform.split('scale(')[1].split(',')[0],
          );
        }
        if (action.payload === 'top') {
          let el_scaled_height = v_el.offsetHeight * v_el_scale;
          let el_bounds_scaled_height = v_el_Bounds.height * v_page_scale;

          let marginOfScale = el_scaled_height - v_el.offsetHeight;
          let marginOfRotation = el_bounds_scaled_height - el_scaled_height;

          let MarginFromTop =
            (marginOfScale + marginOfRotation) / 2 - v_el_translateY;

          verticalAlign[verticalAlignPageId].elements[
            verticalAlignCurrentElement
          ].frame.properties.top = `${parseInt(MarginFromTop)}px`;
        } else if (action.payload === 'bottom') {
          let el_scaled_height = v_el.offsetHeight * v_el_scale;
          let el_bounds_scaled_height = v_el_Bounds.height * v_page_scale;

          let marginOfScale = el_scaled_height - v_el.offsetHeight;
          let marginOfRotation = el_bounds_scaled_height - el_scaled_height;

          let MarginFromTop =
            (marginOfScale + marginOfRotation) / 2 + v_el_translateY;

          verticalAlign[verticalAlignPageId].elements[
            verticalAlignCurrentElement
          ].frame.properties.top = `${parseInt(
            v_el_page.offsetHeight - (MarginFromTop + v_el.offsetHeight),
          )}px`;
        } else if (action.payload === 'middle') {
          verticalAlign[verticalAlignPageId].elements[
            verticalAlignCurrentElement
          ].frame.properties.top = `${currentPageHeight / 2}px`;
          verticalAlign[verticalAlignPageId].elements[
            verticalAlignCurrentElement
          ].frame.properties.translate[1] = -SelementHeight / 2;
          verticalAlign[verticalAlignPageId].elements[
            verticalAlignCurrentElement
          ].bottom = null;
          delete verticalAlign[verticalAlignPageId].elements[
            verticalAlignCurrentElement
          ].bottom;
        }
        // }
        const verticalAlignLabelRef = state.labelRef;
        verticalAlignLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: verticalAlign,
          verticalAlignment: action.payload,
          target: null,
          labelRef: verticalAlignLabelRef,
        };
      }
    ///////////----------///////////////////
    case 'OBJECT_POSITION':
      const objectPosition = state.pages;
      const objectPositionPageId = state.selectedPage.pageId;
      let objectPositionCurrentElement = null;
      let currentElementzIndex;
      if (typeof state.selectedElement.id === 'string') {
        objectPositionCurrentElement = parseInt(
          state.pages[state.selectedPage.pageId].elements.findIndex(
            (el) => el.id === state.selectedElement.id,
          ),
        );
      } else {
        objectPositionCurrentElement = state.selectedElement.id;
      }
      objectPosition[objectPositionPageId].elements.map((elem) => {
        if (elem.id === state.selectedElement.id) {
          currentElementzIndex = elem.zIndex;
        }
      });
      // currentElementzIndex =
      //   objectPosition[objectPositionPageId].elements[
      //     parseInt(state.selectedElement.id.substring(13))
      //   ].zIndex;
      if (action.payload === 'front') {
        let max;
        let values = [];
        objectPosition[objectPositionPageId].elements.map((elem) => {
          values.push(elem.zIndex);
          max = Math.max(...values);
        });
        objectPosition[objectPositionPageId].elements.map((el) => {
          if (
            parseInt(
              document.getElementById(state.selectedElement.id).style.zIndex,
            ) === parseInt(el.zIndex)
          ) {
            el.zIndex = max + 1;
          }
        });
        // let max = objectPosition[objectPositionPageId].elements[0].zIndex;
        // objectPosition[objectPositionPageId].elements.map(el => {
        //   if (el.zIndex > max) {
        //     max = el.zIndex;
        //   }
        // });
        // objectPosition[objectPositionPageId].elements[
        //   objectPositionCurrentElement
        // ].zIndex = ++max;
      } else if (action.payload === 'back') {
        // let min = objectPosition[objectPositionPageId].elements[0].zIndex;
        // objectPosition[objectPositionPageId].elements.map(el => {
        //   // if (el.zIndex < min) {
        //     el.zIndex = el.zIndex + 1;
        //   // }
        // });
        // objectPosition[objectPositionPageId].elements[
        //   objectPositionCurrentElement
        // ].zIndex = min;
        let min = 0;
        objectPosition[objectPositionPageId].elements.map((el) => {
          if (
            parseInt(
              document.getElementById(state.selectedElement.id).style.zIndex,
            ) == parseInt(el.zIndex)
          ) {
            el.zIndex = min;
          } else {
            el.zIndex = el.zIndex + 1;
          }
        });
      } else if (action.payload === 'forward') {
        let nextElementIndex,
          nextElementzIndex,
          maxValues = [],
          indexes = [];
        objectPosition[objectPositionPageId].elements.map((el) => {
          if (el.type == 'img' && el.zIndex > currentElementzIndex) {
            maxValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elIndex) => elIndex.id === el.id,
              ),
            );
          } else if (
            el.type == 'svg' &&
            el.description &&
            el.zIndex > currentElementzIndex
          ) {
            maxValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elIndex) => elIndex.id === el.id,
              ),
            );
          } else if (el.type == 'text' && el.zIndex > currentElementzIndex) {
            maxValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elIndex) => elIndex.id === el.id,
              ),
            );
          } else if (el.type === 'frame' && el.zIndex > currentElementzIndex) {
            maxValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elIndex) => elIndex.id === el.id,
              ),
            );
          }
        });
        nextElementzIndex = maxValues[0];
        maxValues.map((no) => {
          if (no < nextElementzIndex) {
            nextElementzIndex = no;
          }
        });
        nextElementIndex = indexes[maxValues.indexOf(nextElementzIndex)];
        if (
          objectPosition[objectPositionPageId].elements[
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.zIndex === nextElementzIndex,
            )
          ]
        ) {
          objectPosition[objectPositionPageId].elements[
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.zIndex === nextElementzIndex,
            )
          ].zIndex = currentElementzIndex;
          objectPosition[objectPositionPageId].elements[
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.id === state.selectedElement.id,
            )
          ].zIndex = nextElementzIndex;
        }
      } else if (action.payload === 'backward') {
        let previousElementzIndex,
          minValues = [],
          indexes = [];
        let previousElementIndex =
          objectPosition[objectPositionPageId].elements.length;
        objectPosition[objectPositionPageId].elements.map((el) => {
          if (el.type == 'img' && el.zIndex < currentElementzIndex) {
            minValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elm) => elm.id === el.id,
              ),
            );
          } else if (
            el.type == 'svg' &&
            el.description &&
            el.zIndex < currentElementzIndex
          ) {
            minValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elmIndex) => elmIndex.id === el.id,
              ),
            );
          } else if (el.type == 'text' && el.zIndex < currentElementzIndex) {
            minValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elmIndex) => elmIndex.id === el.id,
              ),
            );
          } else if (el.type === 'frame' && el.zIndex < currentElementzIndex) {
            minValues.push(el.zIndex);
            indexes.push(
              state.pages[state.selectedPage.pageId].elements.findIndex(
                (elmIndex) => elmIndex.id === el.id,
              ),
            );
          }
        });
        previousElementzIndex = minValues[0];
        minValues.map((no) => {
          if (no > previousElementzIndex) {
            previousElementzIndex = no;
          }
        });
        previousElementIndex =
          indexes[minValues.indexOf(previousElementzIndex)];
        if (
          objectPosition[objectPositionPageId].elements[
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.zIndex === previousElementzIndex,
            )
          ]
        ) {
          objectPosition[objectPositionPageId].elements[
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.zIndex === previousElementzIndex,
            )
          ].zIndex = currentElementzIndex;
          objectPosition[objectPositionPageId].elements[
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.id === state.selectedElement.id,
            )
          ].zIndex = previousElementzIndex;
        }
      }
      return {
        ...state,
        pages: objectPosition,
        objectPosition: action.payload,
      };
    case 'CROP_IMAGE':
      const cropImage = state.pages;
      const tempArr = [];
      cropImage[state.selectedPage.pageId].elements.map((elem) => {
        if (elem?.id == state?.selectedElement?.id) {
          elem.cropImage = action.payload;
        }
      });
      cropImage[state.selectedPage.pageId].elements.forEach((el) => {
        tempArr.push({ id: el.id, zIndex: el.zIndex });
      });
      let max = cropImage[state.selectedPage.pageId].elements[0].zIndex;
      cropImage[state.selectedPage.pageId].elements.map((el) => {
        if (el.zIndex > max) {
          max = el.zIndex;
        }
      });
      cropImage[state.selectedPage.pageId].elements.map((elem) => {
        if (elem.id == state.selectedElement.id) {
          elem.zIndex = ++max;
        }
      });
      if (cropImage[state.selectedPage.pageId].elements.length > 1) {
        for (
          let i = 0;
          i < cropImage[state.selectedPage.pageId].elements.length;
          i++
        ) {
          if (
            state.pages[state.selectedPage.pageId].elements.findIndex(
              (el) => el.id === state.selectedElement.id,
            ) !== i
          ) {
            cropImage[state.selectedPage.pageId].elements[i].zIndex = -1;
          }
        }
      }
      let showBtns = null;
      if (action.payload) {
        showBtns = null;
      } else {
        showBtns = 'img';
      }
      return {
        ...state,
        pages: cropImage,
        selectedElementBtns: showBtns,
        target: null,
        cropzIndexArr: tempArr,
      };
    case 'CROPPED_IMAGE':
      const cropppedImage = state.pages;
      cropppedImage[state.selectedPage.pageId].elements.forEach((elem) => {
        if (elem.id == state.selectedElement.id) {
          elem.isflipX = action.payload2.scaleY !== 1 ? false : elem.isflipX;
          elem.isflipY = action.payload2.scaleX !== 1 ? false : elem.isflipY;
          elem.src = action.payload;
          elem.ImagetranslateX = '0';
          elem.ImagetranslateY = '0';
          elem.ImageHeight = null;
          elem.ImageWidth = '200px';
          elem.frameHeight = null;
          elem.frameWidth = null;
        }
      });
      let selectedelement = null;
      cropppedImage[state.selectedPage.pageId].elements.map((elem) => {
        if (elem.id == state.selectedElement.id) {
          selectedelement = elem;
        }
      });
      //commenting these few lines to fix the crop image exceed issue
      //https://trello.com/c/HWbJtq2h/267-the-cropped-image-exceeds-outside-the-artboard
      // selectedelement.frame.properties.width = action.payload2.width;
      // selectedelement.frame.properties.height = action.payload2.height;
      // selectedelement.width = action.payload2.width;
      // selectedelement.height = action.payload2.height;
      cropppedImage[state.selectedPage.pageId].elements.map((elem) => {
        if (elem.id == state.selectedElement.id) {
          elem.cropImage = false;
        }
      });
      state.cropzIndexArr.map((cropElement) => {
        cropppedImage[state.selectedPage.pageId].elements.map((el) => {
          if (el.id === cropElement.id) {
            cropppedImage[state.selectedPage.pageId].elements.map((elem) => {
              if (elem.id == state.selectedElement.id) {
                elem.zIndex = cropElement.zIndex + 1;
              } else if (elem.id === cropElement.id) {
                elem.zIndex = cropElement.zIndex;
              }
            });
          }
        });
      });
      return {
        ...state,
        pages: cropppedImage,
        selectedElementBtns: 'img',
        target: null,
      };
    case 'SAVE_REF':
      return {
        ...state,
        imageRef: action.payload,
      };
    case 'SET_PAGE_SIZE':
      let pagewidth = action.payload.width;
      let pageheight = action.payload.height;
      let pageDims = state.pages;
      if (action.payload.measurmentUnit === 'Cm') {
        pagewidth = parseFloat(pagewidth) * 37.795275591;
        pageheight = parseFloat(pageheight) * 37.795275591;
      }
      if (action.payload.measurmentUnit === 'Inch') {
        pagewidth = parseFloat(pagewidth) * 300;
        pageheight = parseFloat(pageheight) * 300;
      }
      pageDims.map((elem) => {
        if (elem.pageId == state.selectedPage.pageId) {
          elem.height = action.payload.height;
          elem.width = action.payload.width;
          elem.extension = action.payload.unit;
          elem.pageTemplateTitle = action.payload.title;
          elem.pageTemplateTitle_ar = action.payload.title_ar;
        }
      });
      return {
        ...state,
        pages: pageDims,
        pageWidth: pagewidth,
        pageHeight: pageheight,
      };
    case 'ARABIC':
      return {
        ...state,
        isArabic: !state.isArabic,
      };
    case 'ARABICFONT':
      return {
        ...state,
        ArabicFont: action.payload,
      };
    case 'SAVE_CURRENT_DESIGN':
      const data = {};
      data.id = action.payload.id;
      data.title = action.payload.title;
      data.description = action.payload.description;
      return {
        ...state,
        currentDesign: data,
        created: true,
      };
    case 'SAVE_DESIGN':
      const design = [];
      const saveFrame = state.frames;
      action.payload.styles.page.elements.forEach((el) => {
        if (el.type === 'frame') {
          saveFrame[el.name].images = cloneDeep(el.images);
          saveFrame[el.name].frame = cloneDeep(el.frame);
        }
      });
      design.push(action.payload.styles.page);

      let scaleByWidthD, scaleByHeightD, scaleD;
      if (
        window.screen.width * 0.6 <
        parseFloat(action.payload.styles.cssStyle.width.split('px')[0])
      ) {
        scaleByWidthD =
          (window.screen.width * 0.6) /
          parseFloat(action.payload.styles.cssStyle.width.split('px')[0]);
      } else {
        scaleByWidthD =
          parseFloat(action.payload.styles.cssStyle.width.split('px')[0]) /
          (window.screen.width * 0.6);
      }
      if (
        window.screen.height * 0.6 <
        parseFloat(action.payload.styles.cssStyle.height.split('px')[0])
      ) {
        scaleByHeightD =
          (window.screen.height * 0.6) /
          parseFloat(action.payload.styles.cssStyle.height.split('px')[0]);
      } else {
        scaleByHeightD =
          parseFloat(action.payload.styles.cssStyle.height.split('px')[0]) /
          (window.screen.height * 0.6);
      }

      if (scaleByWidthD < scaleByHeightD) {
        scaleD = scaleByWidthD;
      } else {
        scaleD = scaleByHeightD;
      }
      for (let page of design) {
        page.scaleX = scaleD;
        page.scaleY = scaleD;
      }
      return {
        ...state,
        categoryID: parseFloat(action.payload.styles.categoryId),
        frames: saveFrame,
        pages: design,
        pageWidth: action.payload.styles.cssStyle
          ? parseInt(
              action.payload.styles.cssStyle.width.substring(
                0,
                action.payload.styles.cssStyle.width.length - 2,
              ),
            )
          : state.pageWidth,
        pageHeight: action.payload.styles.cssStyle
          ? parseInt(
              action.payload.styles.cssStyle.height.substring(
                0,
                action.payload.styles.cssStyle.height.length - 2,
              ),
            )
          : state.pageHeight,
        transformDesign: scaleD,
        selectedPage: action.payload.styles.page,
        loadedDesignId: action.payload.id,
        sidebarType: 'Templates',
      };
    case 'CREATED':
      const createDesign = state.pages;
      createDesign[state.selectedPage.pageId].created = true;
      createDesign[state.selectedPage.pageId].newTemplate = false;
      let sp = state.selectedPage;
      sp.newTemplate = false;
      return {
        ...state,
        pages: createDesign,
        selectedPage: sp,
      };
    case 'CREATE_DESIGN':
      return {
        ...state,
        loadedDesignId: action.payload,
      };
    case 'SAVE_HISTORY':
      let save_text = state.pages[0];
      save_text.elements.forEach((el) => {
        if (el.type === 'text') {
          if (typeof el.frame.properties.width === 'string') {
            el.width = parseFloat(el.frame.properties.width.split('px')[0]);
            el.Textwidth = el.frame.properties.width;
          } else {
            el.width = el.frame.properties.width;
            el.Textwidth = el.frame.properties.width + 'px';
          }
        }
      });
      return {
        ...state,
        undoArray: [...state.undoArray, cloneDeep(state.pages)],
        isSaved: false,
      };
    case 'UNDO':
      const undoTempArray = state.undoArray;
      if (undoTempArray.length !== 0) {
        if (undoTempArray.length > 1) {
          const redoTempArray = state.redoArray;
          let previousState = undoTempArray.pop();
          redoTempArray.push(previousState);
          previousState = undoTempArray[undoTempArray.length - 1];
          previousState[0].elements.forEach((el) => {
            if (el.type === 'text') {
              if (typeof el.frame.properties.width === 'string') {
                el.width = parseFloat(el.frame.properties.width.split('px')[0]);
                el.Textwidth = el.frame.properties.width;
              } else {
                el.width = el.frame.properties.width;
                el.Textwidth = el.frame.properties.width + 'px';
              }
            }
          });

          const undoLabelRef = state.labelRef;
          undoLabelRef.current.style.display = 'none';
          const undoFrames = state.frames;
          previousState[state.selectedPage.pageId].elements.forEach((el) => {
            if (el.type === 'frame') {
              undoFrames[el.name].images[0].src = el.images[0].src;
            }
          });
          return {
            ...state,
            selectedPage: previousState[state.selectedPage.pageId],
            frames: undoFrames,
            pages: previousState,
            target: null,
            labelRef: undoLabelRef,
            redoArray: cloneDeep(redoTempArray),
            undoArray: cloneDeep(undoTempArray),
            selectedElement: null,
          };
        } else {
          const redoTempArray = state.redoArray;
          let previousState = undoTempArray[0];
          redoTempArray.push(previousState);
          // previousState = undoTempArray[0];
          // redoTempArray.push(previousState);
          const undoLabelRef = state.labelRef;
          undoLabelRef.current.style.display = 'none';
          return {
            ...state,
            selectedPage: previousState[state.selectedPage.pageId],
            pages: previousState,
            target: null,
            labelRef: undoLabelRef,
            redoArray: cloneDeep(redoTempArray),
            undoArray: cloneDeep(undoTempArray),
            selectedElement: null,
          };
        }
      }
      return {
        ...state,
        target: null,
      };
    case 'REDO':
      const redoTempArray = state.redoArray;
      if (redoTempArray.length !== 0) {
        if (redoTempArray.length > 1) {
          const undoTempArray = state.undoArray;
          let previousState = redoTempArray.pop();
          undoTempArray.push(previousState);
          const redoLabelRef = state.labelRef;
          redoLabelRef.current.style.display = 'none';
          const redoFrames = state.frames;
          previousState[state.selectedPage.pageId].elements.forEach((el) => {
            if (el.type === 'frame') {
              redoFrames[el.name].images[0].src = el.images[0].src;
            }
          });
          return {
            ...state,
            selectedPage: previousState[state.selectedPage.pageId],
            frames: redoFrames,
            pages: previousState,
            target: null,
            labelRef: redoLabelRef,
            redoArray: cloneDeep(redoTempArray),
            undoArray: cloneDeep(undoTempArray),
          };
        } else {
          const undoTempArray = state.undoArray;
          let previousState = redoTempArray[0];
          undoTempArray.push(previousState);
          // previousState = redoTempArray.pop();
          // undoTempArray.push(previousState);
          const redoLabelRef = state.labelRef;
          redoLabelRef.current.style.display = 'none';
          return {
            ...state,
            selectedPage: previousState[state.selectedPage.pageId],
            pages: previousState,
            target: null,
            labelRef: redoLabelRef,
            redoArray: cloneDeep(redoTempArray),
            undoArray: cloneDeep(undoTempArray),
          };
        }
      }
      return {
        ...state,
      };
    case 'SAVE_LABEL_REF':
      return {
        ...state,
        labelRef: action.payload,
      };
    case 'SAVE_UPLOADED_IMAGES':
      if (action.payload.type === 'create') {
        action.payload.data.imageOptions = false;
        return {
          ...state,
          uploadedImages: [...state.uploadedImages, action.payload.data],
        };
      } else {
        return {
          ...state,
          uploadedImages: action.payload.data,
        };
      }
    case 'UPLOADED_IMAGES_OPTION':
      const imageObj = state.uploadedImages;
      for (let image of imageObj) {
        if (image.id === parseInt(action.payload)) {
          image.imageOptions = !image.imageOptions;
        } else {
          image.imageOptions = false;
        }
      }
      return {
        ...state,
        uploadedImages: imageObj,
      };
    case 'DELETE_UPLOADED_IMAGE':
      const remainingImages = state.uploadedImages.filter((image) => {
        return image.id !== parseInt(action.payload);
      });
      return {
        ...state,
        uploadedImages: remainingImages,
      };
    case 'SET_COLORS':
      return {
        ...state,
        colors: action.payload,
      };
    case 'FULL_SCREEN':
      return {
        ...state,
        isFullScreen: true,
      };
    case 'ON_RESIZE':
      const onResizeLabelRef = state.labelRef;
      onResizeLabelRef.current.style.display = 'none';
      return {
        ...state,
        target: null,
        labelRef: onResizeLabelRef,
      };
    case 'EDIT_MODE':
      return {
        ...state,
        target: action.payload,
      };
    case 'LOCK':
      const lockElement = state.pages;
      if (state.targets) {
        state.targets.map((element) => {
          const el_Id1 = lockElement[
            state.selectedPage.pageId
          ].elements.findIndex((el) => el.id === element.id);
          lockElement[state.selectedPage.pageId].elements[el_Id1].lock = true;
        });
        const lockLabelRef = state.labelRef;
        lockLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: lockElement,
          selectedElementBtns: null,
          labelRef: lockLabelRef,
        };
      } else {
        const el_Id1 = lockElement[
          state.selectedPage.pageId
        ].elements.findIndex((el) => el.id === state.selectedElement.id);
        lockElement[state.selectedPage.pageId].elements[el_Id1].lock = true;
        const lockLabelRef = state.labelRef;
        lockLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: lockElement,
          target: null,
          selectedElementBtns: null,
          labelRef: lockLabelRef,
        };
      }

    case 'UNLOCK':
      const unlockElement = state.pages;
      const lockElementsCount = unlockElement[
        state.selectedPage.pageId
      ].elements.filter((el) => el.lock).length;
      if (lockElementsCount > 1) {
        state.targets.map((element) => {
          const el_Id1 = unlockElement[
            state.selectedPage.pageId
          ].elements.findIndex((el) => el.id === element.id);
          unlockElement[state.selectedPage.pageId].elements[
            el_Id1
          ].lock = false;
        });
        const lockLabelRef = state.labelRef;
        lockLabelRef.current.style.display = 'none';
        return {
          ...state,
          pages: unlockElement,
          selectedElementBtns: null,
          labelRef: lockLabelRef,
          targets: null,
        };
      } else {
        const el_Id = unlockElement[
          state.selectedPage.pageId
        ].elements.findIndex((el) => el.id === state.selectedElement.id);
        unlockElement[state.selectedPage.pageId].elements[el_Id].lock = false;
        return {
          ...state,
          pages: unlockElement,
          selectedElementBtns: 'img',
        };
      }

    case 'SET_COLOR_TO_ICON':
      const allPages = state.pages;
      allPages[state.selectedPage.pageId].elements.map((el) => {
        if (el.id === state.selectedElement.id) {
          el.selectedColor = action.payload;
        }
      });
      const newColorObj = state.selectedElement;
      newColorObj.colors.forEach((element) => {
        if (element.class === state.LayerColorClass) {
          element.color = action.payload;
        }
      });

      const newColorLayerElement = state.pages;
      let desc_svg;
      newColorLayerElement[state.selectedPage.pageId].elements.map((elem) => {
        if (elem.id === state.selectedElement.id) {
          desc_svg = elem.description;
        }
      });
      // let desc_svg =
      //   newColorLayerElement[state.selectedPage.pageId].elements[
      //     parseInt(state.selectedElement.id.substring(13))
      //   ].description;
      let pathArray = desc_svg.split('><');
      let newsvg = '';
      pathArray.forEach((str, index) => {
        let temp = str;
        if (str.includes(state.LayerColorClass)) {
          temp = str.replaceAll(
            `fill="${state.LayerColor}"`,
            `fill="${action.payload}"`,
          );
        }
        pathArray[index] = temp + '><';
      });
      newsvg = pathArray.join('$').replaceAll('$', '');
      newsvg = newsvg.split('</svg>')[0] + '</svg>';
      newColorLayerElement[state.selectedPage.pageId].elements.map((elem) => {
        if (elem.id === state.selectedElement.id) elem.description = newsvg;
      });
      // newColorLayerElement[state.selectedPage.pageId].elements[
      //   parseInt(state.selectedElement.id.substring(13))
      // ].description = newsvg;
      return {
        ...state,
        selectedElement: newColorObj,
        pages: newColorLayerElement,
        LayerColor: action.payload,
      };
    case 'SET_SELECTED_ELEMENT_DIMENSIONS':
      const { width, height, LFW, LFH, LIW, LIH } = action.payload;
      const pagesFromStore = state.pages;
      pagesFromStore[state.selectedPage.pageId].elements[
        pagesFromStore[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].width = width;
      pagesFromStore[state.selectedPage.pageId].elements[
        pagesFromStore[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].height = height;
      pagesFromStore[state.selectedPage.pageId].elements[
        pagesFromStore[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].lastFrameWidth = LFW;
      pagesFromStore[state.selectedPage.pageId].elements[
        pagesFromStore[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].lastFrameHeight = LFH;
      pagesFromStore[state.selectedPage.pageId].elements[
        pagesFromStore[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].lastImageWidth = LIW;
      pagesFromStore[state.selectedPage.pageId].elements[
        pagesFromStore[state.selectedPage.pageId].elements.findIndex(
          (el) => el.id === state.selectedElement.id,
        )
      ].lastImageHeight = LIH;
      return {
        ...state,
        pages: pagesFromStore,
      };
    case 'COPY_STYLE':
      return {
        ...state,
        copyStyle: true,
      };
    case 'PAGE_OPTION':
      const pagesObj = state.pages;
      for (let page of pagesObj) {
        if (page.pageId === parseInt(action.payload)) {
          page.pageOptions = !page.pageOptions;
        } else {
          page.pageOptions = false;
        }
      }
      return {
        ...state,
        pages: pagesObj,
      };
    case 'REORDER':
      return {
        ...state,
        pages: action.payload,
      };
    case 'REMOVE_OPTIONS':
      const removeOptions = state.pages;
      removeOptions.forEach((page) => {
        page.pageOptions = false;
      });
      return {
        ...state,
        pages: removeOptions,
      };
    case 'ARABIC_MODE':
      localStorage.setItem('isArabic', !state.isArabic);
      return {
        ...state,
        isArabic: !state.isArabic,
      };
    case 'STORE_GRID':
      const gridPages = state.pages;
      let highestElementIdG = highestElementid(state.pages, state.selectedPage);
      const gridSelectedPage = state.selectedPage;
      action.payload.elementId = highestElementIdG;
      action.payload.id = `page${gridSelectedPage.pageId}moveable${highestElementIdG}`;
      const gridCurrentPage = gridPages.find((p) => {
        return p.pageId === gridSelectedPage.pageId;
      });
      gridCurrentPage.elements.push(action.payload);
      return {
        ...state,
        elementsPlaced: highestElementIdG,
        pages: gridPages,
        selectedPage: gridCurrentPage,
        selectedElement: action.payload,
        selectedFrame: action.payload.frame,
        target: document.querySelector(`#${action.payload.id}`),
        girdImageId: action.payload.id,
        isGrid: true,
      };
    case 'STORE_FRAME':
      const framePages = state.pages;
      let highestElementIdF = highestElementid(state.pages, state.selectedPage);
      const frameSelectedPage = state.selectedPage;
      action.payload.elementId = highestElementIdF;
      action.payload.id = `page${frameSelectedPage.pageId}moveable${highestElementIdF}`;
      const frameCurrentPage = framePages.find((p) => {
        return p.pageId === frameSelectedPage.pageId;
      });
      action.payload.zIndex = parseInt(action.payload.id.substring(13));
      let maxFrameZindex;
      let remainingZindexes = [];
      if (frameCurrentPage.elements.length) {
        frameCurrentPage.elements.map((elem) => {
          remainingZindexes.push(elem.zIndex);
          maxFrameZindex = Math.max(...remainingZindexes);
        });
        action.payload.zIndex = parseInt(maxFrameZindex) + 1;
      } else {
        action.payload.zIndex = 1;
      }
      frameCurrentPage.elements.push(action.payload);
      return {
        ...state,
        pages: framePages,
        elementsPlaced: highestElementIdF,
        selectedPage: frameCurrentPage,
        selectedElement: action.payload,
        selectedFrame: action.payload.frame,
        target: document.querySelector(`#${action.payload.id}`),
        frameImageId: action.payload.id,
      };
    case 'SET_BCK_IMG':
      const grids = state.grids;
      const selectedElementGrid = state.selectedElement;
      grids[action.payload.name].images[action.payload.id].src =
        action.payload.src;
      grids[action.payload.name].images[action.payload.id].frame =
        action.payload.frame;
      selectedElementGrid.images = grids[action.payload.name].images;
      return {
        ...state,
        grids: grids,
        selectedElement: selectedElementGrid,
      };
    case 'SET_BCK_IMG_FRAME':
      const frames = state.frames;
      const pagesFrames = state.pages;
      const selectedElementFrame = state.selectedElement;
      if (state.selectedElement) {
        pagesFrames[state.selectedPage.pageId].elements[
          state.pages[state.selectedPage.pageId].elements.findIndex((el) => {
            return el.id === action.payload.id;
          })
        ].images[0].src = action.payload.src;
        pagesFrames[state.selectedPage.pageId].elements[
          state.pages[state.selectedPage.pageId].elements.findIndex((el) => {
            return el.id === action.payload.id;
          })
        ].images[0].frame = action.payload.frame;
        pagesFrames[state.selectedPage.pageId].elements[
          state.pages[state.selectedPage.pageId].elements.findIndex((el) => {
            return el.id === action.payload.id;
          })
        ].images[0].imageHeight = action.payload.height;
        pagesFrames[state.selectedPage.pageId].elements[
          state.pages[state.selectedPage.pageId].elements.findIndex((el) => {
            return el.id === action.payload.id;
          })
        ].images[0].imageWidth = action.payload.width;
        frames[action.payload.name].images[0].src = action.payload.src;
        frames[action.payload.name].images[0].frame = action.payload.frame;
        frames[action.payload.name].images[0].imageHeight =
          action.payload.height;
        frames[action.payload.name].images[0].imageWidth = action.payload.width;
        selectedElementFrame.images = frames[action.payload.name].images;
        return {
          ...state,
          frames: frames,
          selectedElement: selectedElementFrame,
        };
      }
      return {
        ...state,
      };
    case 'SHOW_TEXT_BAR':
      const hideColorPicker = state.pages;
      if (hideColorPicker[state.selectedPage.pageId].elements.length > 0) {
        if (state.selectedElement) {
          if (state.selectedElement.type === 'grid') {
            hideColorPicker[state.selectedPage.pageId].elements.filter(
              (el) => el.id === state.selectedElement.id,
            ).isColorPicker = false;
            return {
              ...state,
              showTextBar: action.payload,
              pages: hideColorPicker,
            };
          } else {
            hideColorPicker[state.selectedPage.pageId].elements.filter(
              (el) => el.id === state.selectedElement.id,
            ).isColorPicker = false;
            return {
              ...state,
              showTextBar: action.payload,
              pages: hideColorPicker,
            };
          }
        }
      }
      return {
        ...state,
        showTextBar: action.payload,
      };
    case 'SHOW_FONTS':
      return {
        ...state,
        showFonts: action.payload,
      };
    case 'REMOVE_SELECTION':
      if (!state.targets) {
        const unSelectSubFolderObj = state.subfolders;
        const unSelectDesignFolderObj = state.folderDesigns;
        const unSelectUploadsFolderObj = state.folderUploads;
        const unSelectFolderObj = state.folders;
        const unSelectImageObj = state.uploadedImages;

        for (let folder of unSelectSubFolderObj) {
          folder.folderOptions = false;
        }
        for (let uploads of unSelectUploadsFolderObj) {
          uploads.uploadOptions = false;
          uploads.uploadFOptions = false;
        }
        for (let design of unSelectDesignFolderObj) {
          design.designOptions = false;
          design.designFOptions = false;
        }
        for (let folder of unSelectFolderObj) {
          folder.folderOptions = false;
        }
        for (let image of unSelectImageObj) {
          image.imageOptions = false;
        }
        return {
          ...state,
          folders: unSelectFolderObj,
          subfolders: unSelectSubFolderObj,
          folderDesigns: unSelectDesignFolderObj,
          folderUploads: unSelectUploadsFolderObj,
          uploadedImages: unSelectImageObj,
          target: state.selectedElement?.type === 'text' ? state.target : null,
          selectedElementBtns: null,
          // selectedElement: null,
        };
      }
      return {
        ...state,
      };
    case 'SET_TARGET_NULL':
      return {
        ...state,
        target: null,
      };
    case 'REMOVE_SELECTIONN':
      const unSelectSubFolderObj1 = state.subfolders;
      const unSelectDesignFolderObj1 = state.folderDesigns;
      const unSelectUploadsFolderObj1 = state.folderUploads;
      const unSelectFolderObj1 = state.folders;
      const unSelectImageObj1 = state.uploadedImages;
      for (let image of unSelectImageObj1) {
        image.imageOptions = false;
      }
      for (let folder of unSelectSubFolderObj1) {
        folder.folderOptions = false;
      }
      for (let uploads of unSelectUploadsFolderObj1) {
        uploads.uploadOptions = false;
        uploads.uploadFOptions = false;
      }
      for (let design of unSelectDesignFolderObj1) {
        design.designOptions = false;
        design.designFOptions = false;
      }
      for (let folder of unSelectFolderObj1) {
        folder.folderOptions = false;
      }
      return {
        ...state,
        folders: unSelectFolderObj1,
        subfolders: unSelectSubFolderObj1,
        folderDesigns: unSelectDesignFolderObj1,
        folderUploads: unSelectUploadsFolderObj1,
        uploadedImages: unSelectImageObj1,
        // target: null,
        // selectedElement: null,
      };
    case 'GET_SNAPSHOT':
      const snapshotPages = state.pages;
      snapshotPages[
        state.pages.findIndex((pg) => {
          return pg.pageId === action.payload.pageId;
        })
      ].snapshot = action.payload.src;
      return {
        ...state,
        pages: snapshotPages,
      };
    case 'SET_LOADER':
      return {
        ...state,
        pageManagerLoader: action.payload,
      };
    case 'SELECT_GRID_IMG':
      const doubleClickGridObj = state.grids;
      doubleClickGridObj[action.payload.name].images.map((img) => {
        if (img.id !== action.payload.id) {
          img.opacity = 0.5;
          img.selected = false;
        }
      });
      doubleClickGridObj[action.payload.name].images[
        action.payload.id
      ].selected = true;
      doubleClickGridObj[action.payload.name].images[
        action.payload.id
      ].selected = true;
      return {
        ...state,
        grids: doubleClickGridObj,
        doubleClick: true,
        singleClick: false,
        selectedElementBtns: null,
        selectedElement: action.payload,
        selectedFrame: action.payload.frame,
        target: document.querySelector(`#${state.girdImageId}`),
      };
    case 'SELECT_GRID':
      const onClickGridObj = state.grids;
      if (action.payload.name !== 'full page grid') {
        onClickGridObj[action.payload.name].images.map((img) => {
          if (img.id !== action.payload.id) {
            img.selected = false;
            img.moveableId = '';
            img.opacity = 1;
          }
        });
        onClickGridObj[action.payload.name].images[
          action.payload.id
        ].selected = true;
        onClickGridObj[action.payload.name].images[
          action.payload.id
        ].moveableId = state.girdImageId;
        return {
          ...state,
          grids: onClickGridObj,
          selectedFrame: action.payload.frame,
          target: document.querySelector(`#${state.girdImageId}`),
          selectedElement: action.payload,
          selectedElementBtns: 'grid',
          singleClick: true,
          doubleClick: false,
        };
      } else {
        return {
          ...state,
          selectedFrame: action.payload.frame,
          target: document.querySelector(`#${state.girdImageId}`),
          selectedElement: action.payload,
          selectedElementBtns: 'grid',
          singleClick: true,
          doubleClick: false,
        };
      }
    case 'SELECT_FRAME':
      if (!state.doubleClick) {
        const onClickFrameObj = state.frames;
        onClickFrameObj[action.payload.single.name].images[0].selected = true;
        return {
          ...state,
          frames: onClickFrameObj,
          selectedFrame: action.payload.single.frame,
          target: document.querySelector(`#${action.payload.single.id}`),
          selectedElement: action.payload.single,
          selectedElementBtns: 'grid',
          singleClick: true,
          doubleClick: false,
        };
      }
      return {
        ...state,
        doubleClick: true,
        singleClick: false,
        selectedElementBtns: null,
        selectedElement: action.payload.double,
        selectedFrame: action.payload.double.frame,
        target: document.querySelector(`#${action.payload.double.id}img0`),
      };
    case 'SELECT_FRAME_IMG':
      const doubleClickFrameObj = state.frames;
      doubleClickFrameObj[action.payload.name].images[0].selected = true;
      return {
        ...state,
        frames: doubleClickFrameObj,
        doubleClick: true,
        singleClick: false,
        selectedElementBtns: null,
        selectedElement: action.payload,
        selectedFrame: action.payload.frame,
        target: document.querySelector(`#${action.payload.id}img0`),
      };
    case 'CANCEL_GRID':
      const cancelObj = state.grids;
      if (state.selectedElement.id === 0) {
        cancelObj[state.selectedElement.name].images[1].opacity = 1;
      } else {
        cancelObj[state.selectedElement.name].images[0].opacity = 1;
      }
      return {
        ...state,
        grids: cancelObj,
        doubleClick: false,
        singleClick: false,
        selectedElementBtns: null,
        selectedElement: null,
        selectedFrame: null,
        target: null,
      };
    case 'CANCEL_FRAME':
      return {
        ...state,
        doubleClick: false,
        singleClick: false,
        selectedElementBtns: null,
        selectedElement: null,
        selectedFrame: null,
        target: null,
      };
    case 'DONE_GRID':
      const done = state.grids;
      done[state.selectedElement.name].images.map((img) => {
        img.opacity = 1;
      });
      if (
        action.payload.name === 'horizontal half grid' ||
        action.payload.name === 'horizontal tri grid'
      ) {
        document.getElementById(`${state.girdImageId}`).style.position =
          'absolute';
        document.getElementById(`${state.girdImageId}`).style.objectFit =
          'unset';
        document.getElementById(`${state.girdImageId}`).style.height = 'auto';
      } else {
        document.getElementById(`${state.girdImageId}`).style.position =
          'absolut';
        document.getElementById(`${state.girdImageId}`).style.objectFit =
          'unset';
        document.getElementById(`${state.girdImageId}`).style.width = 'auto';
      }
      return {
        ...state,
        grids: done,
      };
    case 'DONE_FRAME':
      const doneFramesPages = state.pages;
      doneFramesPages[state.selectedPage.pageId].elements.forEach((el) => {
        if (el.name === action.payload.name) {
          el.images = cloneDeep(state.frames[action.payload.name].images);
        }
      });
      if (document.getElementById(`${action.payload.moveableId}img0`)) {
        document.getElementById(
          `${action.payload.moveableId}img0`,
        ).style.position = 'relative';
        return {
          ...state,
          doubleClick: false,
          singleClick: false,
          selectedElementBtns: null,
          selectedElement: null,
          selectedFrame: null,
          target: null,
          frameDone: true,
        };
      }
      return {
        ...state,
        pages: doneFramesPages,
        doubleClick: false,
        singleClick: false,
        selectedElementBtns: null,
        selectedElement: null,
        selectedFrame: null,
        target: null,
      };

    case 'SET_SPACING':
      const spacing = state.grids;
      const spacingSelectedElement = state.selectedElement;
      spacing[state.selectedElement.name].spacing = action.payload;
      spacingSelectedElement.spacing = action.payload;
      return {
        ...state,
        grids: spacing,
        selectedElement: spacingSelectedElement,
      };
    case 'SAVE_GRID':
      const saveGrid = state.grids;
      const grid =
        action.payload.styles.page.elements[
          action.payload.styles.page.elements.length - 1
        ];
      for (let i = 0; i <= saveGrid[grid.name].images.length - 1; i++) {
        saveGrid[grid.name].images[i] = cloneDeep(grid.images[i]);
        saveGrid[grid.name].images[i].frame = createFrame(
          `${state.pageWidth}`,
          `auto`,
        );
      }
      return {
        ...state,
        grids: saveGrid,
        selectedPage: action.payload.styles.page,
        loadedDesignId: action.payload.id,
        sidebarType: 'Templates',
        girdImageId: grid.id,
        selectedElement: grid,
        isGrid: true,
      };
    case 'IS_FRAME':
      return {
        ...state,
        isFrame: action.payload,
      };
    case 'SET_EDITOR_SWITCH':
      return {
        ...state,
        editorSwitch: action.payload,
      };
    case 'SET_EDITOR_REDIRECTION':
      return {
        ...state,
        editorRedirection: action.payload,
      };
    case 'DELETE_EMPTY_TEXT':
      const deletedTextsPage = state.pages;
      let remainingElem;
      if (action.payload.length) {
        action.payload.forEach((elem) => {
          remainingElem = deletedTextsPage[
            state.selectedPage.pageId
          ].elements.filter((el) => {
            return el.id !== elem.id;
          });
        });
        deletedTextsPage[state.selectedPage.pageId].elements = remainingElem;
      }
      return {
        ...state,
        pages: deletedTextsPage,
        selectedPage: deletedTextsPage[state.selectedPage.pageId],
      };
    case 'SELECTION':
      const selectedElms = action.payload;
      const tempSelected = [];
      state.pages[state.selectedPage.pageId].elements.forEach((el, i) => {
        selectedElms.forEach((el2, i2) => {
          if (el.id === selectedElms[i2]?.id) {
            tempSelected.push(el);
          }
        });
      });
      return {
        ...state,
        targets: action.payload,
        selectedElements: tempSelected,
        target: null,
        selectedElementBtns: 'group',
        selectedElement: null,
      };
    case 'UNGROUP':
      return {
        ...state,
        targets: null,
        target: null,
        selectedElementBtns: null,
        selectedElement: null,
      };
    case 'SET_GROUP_BUTTONS':
      return {
        ...state,
        selectedElementBtns: 'group',
      };
    default: {
      return null;
    }
  }
};
