import React from 'react';
// import PDF from "./pdf";
import PNG from './png';
import JPG from './jpg';
import { downloadImagewithname } from './handlers';
import { FormattedMessage } from 'react-intl';

export const Options = {
  jpg: {
    title: <FormattedMessage id="JPGPrint" defaultMessage="JPG Print" />,
    ext: 'jpg',
    type: 'jpg',
    component: JPG,
    handler: (name, loading, isLoggedIn) =>
      downloadImagewithname('jpeg', name, loading),
  },
};
