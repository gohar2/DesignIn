export const initialState = {
  userName: '',
  userId: '',
  userToken: '',
  isArabic: false,
  fromDesigns: false,
  fromTemplates: false,
  pageWidth: null,
  pageHeight: null,
  pageUnit: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('userData', JSON.stringify(action.payload.data));
      document.cookie = `userData=${JSON.stringify(action.payload.data)}`;
      // document.cookie = `CookieConsent=${true}`
      return {
        ...state,
        state: action.payload,
      };
    case 'LOGOUT':
      localStorage.clear();
      document.cookie = `userData=`;
      return {
        ...state,
        state: initialState,
      };
    case 'ARABIC_MODE':
      localStorage.setItem('isArabic', !state.isArabic);
      document.cookie = `isArabic=${!state.isArabic}`;
      return {
        ...state,
        isArabic: !state.isArabic,
      };
    case 'EMPTYDESIGN':
      return {
        ...state,
        fromDesigns: false,
        fromTemplates: false,
      };
    case 'SET_FROM_DESIGNS':
      return {
        ...state,
        fromDesigns: true,
        fromTemplates: false,
      };
    case 'SET_PAGE_SIZE':
      if (action.payload.unit.match(/cm/i)) {
        return {
          ...state,
          pageHeight: parseFloat(action.payload.height) * 37.795275591,
          pageWidth: parseFloat(action.payload.width) * 37.795275591,
          pageUnit: action.payload.unit,
          fromTemplates: true,
          fromDesigns: false,
        };
      } else if (action.payload.unit.match(/inch/i)) {
        return {
          ...state,
          pageHeight: parseFloat(action.payload.height) * 300,
          pageWidth: parseFloat(action.payload.width) * 300,
          pageUnit: action.payload.unit,
          fromTemplates: true,
          fromDesigns: false,
        };
      } else if (action.payload.unit.match(/px/i)) {
        return {
          ...state,
          pageHeight: action.payload.height,
          pageWidth: action.payload.width,
          pageUnit: action.payload.unit,
          fromTemplates: true,
          fromDesigns: false,
        };
      }
      return {
        ...state,
      };
    default:
      return null;
  }
};
