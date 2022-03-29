export const gloginUrl = '/api/v1/sessions/google_sign_in';
export const floginUrl = '/api/v1/sessions/facebook_sign_in';
export const loginUrl = '/api/v1/sessions/sign_in';
export const signupUrl = '/api/v1/sessions/sign_up';
export const dashboardUrl = '/api/v1/supercategories';
export const templateShortUrl =
  '/api/v1/supercategories?for_create_design=true';
export const getFolderUrl = '/api/v1/folders';
export const getFolderBreadcrumbs = '/api/v1/folders/breadcrumbs';
export const createFolderUrl = '/api/v1/folders/create';
export const trashUrl = '/api/v1/trash';
export const backgroundUrl = '/api/v1/backgrounds?search=';
export const getIconsUrl = '/api/v1/icons?search=&with_categories=true';
export const saveDesignUrl = '/api/v1/designs/create';
export const getDesignUrl = '/api/v1/designs';
export const createUploadUrl = '/api/v1/uploads';
export const createContainerUrl = '/api/v1/containers/create';
export const UploadProfilePicture = '/api/v1/users';
export const searchUrl = '/api/v1/categories?search=';
export const unsplashSearchUrl = '/api/v1/unsplash?search=';
export const fontsUploadUrl = 'api/v1/custom_fonts';
export const getUploadedFonts = 'api/v1/custom_fonts';

export const photosUrl = '/api/v1/unsplash';
export const passwordResetUrl = '/api/v1/sessions/reset_password?email=';
export const searchIconsUrl = (locale, id) =>
  `/api/v1/icons?locale=${locale}&search=${id}`;
export const getSelectedIcon = (id) => `/api/v1/stocks/${id}`;

export const triggerUnsplashDownload = (id) => `/api/v1/Triggers?photoid=${id}`;
export const templateUrl = (id) => {
  return `/api/v1/categories/intermediate/${id}`;
};
export const updateContainerUrl = (id) => {
  return `/api/v1/containers/${id}`;
};
export const getDesignByIdUrl = (id) => {
  return `/api/v1/designs/${id}`;
};
export const getSelectedDesignById = (id) => {
  return `/api/v1/designs/designers/${id}`;
};
export const updateDesignUrl = (id) => {
  return `/api/v1/designs/${id}`;
};
export const deleteDesignUrl = (id) => {
  return `/api/v1/designs/${id}`;
};
export const deleteUploadUrl = (id) => {
  return `/api/v1/uploads/${id}`;
};
//needs to be refactored remove page and per page validation from this call
export const templatesUrl = (id) => {
  return `/api/v1/templates?category_id=${id}&search=`;
};
export const deleteFontUrl = (id) => {
  return `/api/v1/custom_fonts/${id}`;
};
export const deleteFolderUrl = (id) => {
  return `/api/v1/folders/${id}`;
};

//get images directly
export const getAllImages = (pageNum, itemsPerPage) =>
  `https://api.unsplash.com/photos/?client_id=prepFvvxxIu-puC8H2uT6W6-7UhmAQ95V9bZ8LCisqg&page=${pageNum}&per_page=${itemsPerPage}`;
export const getAllSeachedImages = (pageNum, itemsPerPage, searchvalue) =>
  `https://api.unsplash.com/search/photos/?client_id=prepFvvxxIu-puC8H2uT6W6-7UhmAQ95V9bZ8LCisqg&page=${pageNum}&per_page=${itemsPerPage}&query=${searchvalue}`;
export const getAllBackgroundImages = (pageNum, itemsPerPage) =>
  `https://api.unsplash.com/search/photos/?client_id=prepFvvxxIu-puC8H2uT6W6-7UhmAQ95V9bZ8LCisqg&page=${pageNum}&per_page=${itemsPerPage}&query=landscape`;
export const getAllSearchedBackgroundImages = (
  pageNum,
  itemsPerPage,
  searchvalue,
) =>
  `https://api.unsplash.com/search/photos/?client_id=prepFvvxxIu-puC8H2uT6W6-7UhmAQ95V9bZ8LCisqg&page=${pageNum}&per_page=${itemsPerPage}&query=${searchvalue}`;
