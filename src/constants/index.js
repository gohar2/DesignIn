import React from 'react';
// import { ReactComponent as Templates } from '../icons/Templates.svg';
// import { ReactComponent as Gallery } from '../icons/Gallery.svg';
// import { ReactComponent as Background } from '../icons/Background.svg';
// import { ReactComponent as Elements } from '../icons/Elements.svg';
// import { ReactComponent as Text } from '../icons/Text.svg';
import { ReactComponent as Folders } from '../icons/Folders.svg';
// import { ReactComponent as Upload } from '../icons/Upload.svg';
import { ReactComponent as HomePage } from '../icons/HomePage.svg';
// import { ReactComponent as Photos } from '../icons/Photos.svg'; //Shaheer code-refactoring-removing-unused-variables
import { ReactComponent as AllYourDesigns } from '../icons/AllYourDesigns.svg';
import { ReactComponent as Trash } from '../icons/Trash.svg';
import none from '../images/none.png';
import shadow from '../images/shadow.png';
import gray from '../images/gray.png';
import sepia from '../images/sepia.png';
export const design =
  "Design Better provides unprecidented access to the insights that power the world's best design teams.";
export const forgotPassword =
  "Enter you email address below and We'll send you a link to reset you password.";
export const validEmail = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
export const BuyDesignH = 'Tesmem Features for Pro Plan';
export const BuyDesignT = [
  { text: 'Unlimited folders storage' },
  { text: 'Free access to unlimited photos and icons' },
  { text: 'Custom dimensions at one click' },
  { text: 'Save unlimited design layouts' },
  { text: 'One click design resize option available' },
  { text: 'Freedom to create unlimited designs' },
  { text: 'Save direct designs as animated GIFs' },
  { text: 'Easy editing tools' },
  { text: 'Customer support' },
  { text: 'Save, download and printable files. PDF,JPEG, PNG' },
];
export const TesmemPricingCard = [
  {
    time: '1 month',
    price: '$9',
    detail1: 'Billed every month.',
    detail2: 'Cancel anytime.',
  },
  {
    time: '1 year',
    price: '$58',
    detail1: 'You save 27%.',
    detail2: 'Cancel anytime.',
  },
];
export const required = 'field is required';
export const insta = '../images/instagram.png';
export const linkedin = '../images/linkedin.png';
export const snapchat = '../images/snapchat.png';
export const twitter = '../images/twitter.png';
export const text =
  ' Arab first design platform, learn more about resmem click us';
export const folderNames = ['Folders', 'Uploads', 'All your designes', 'Trash'];
// export const menuItems = [
//   { name: 'Templates', icon: <Templates className="sidebarIcon" /> },
//   { name: 'Photos', icon: <Gallery className="sidebarIcon" /> },
//   { name: 'Background', icon: <Background className="sidebarIcon" /> },
//   { name: 'Elements', icon: <Elements className="sidebarIcon" /> },
//   { name: 'Text', icon: <Text className="sidebarIcon" /> },
//   { name: 'Folders', icon: <Folders className="sidebarIcon" /> },
//   { name: 'Uploads', icon: <Upload className="sidebarIcon" /> },
// ];
export const sidebarMenuItems = [
  {
    name: 'Home',
    arabicName: 'home',
    path: '',
    icon: <HomePage className="sidebarMenuListIcon" />,
  },
  // {
  //   name: 'Images',
  //   arabicName: 'images',
  //   path: 'photos',
  //   icon: <Photos className="sidebarMenuListIcon" />,
  // },
  {
    name: 'Your designs',
    arabicName: 'yourDesigns',
    path: 'your-designs',
    icon: <AllYourDesigns className="sidebarMenuListIcon" />,
  },
  {
    name: 'Folders',
    arabicName: 'folders',
    path: 'folders',
    icon: <Folders className="sidebarMenuListIcon" />,
  },
  {
    name: 'Trash',
    arabicName: 'trash',
    path: 'trash',
    icon: <Trash className="sidebarMenuListIcon" />,
  },
];
export const imageEffects = {
  shadow: {
    effect: 'Shadow',
    action: '3px 3px 10px #888888',
    image: shadow,
  },
  gray: { effect: 'Gray', action: 'grayscale(100%)', image: gray },
  sepia: { effect: 'Sepia', action: 'sepia(100%)', image: sepia },
  none: { effect: 'None', action: null, image: none },
};
export const englishFonts = [
  'Anton-Regular',
  'Bangers-Regular',
  'BebasNeue-Regular',
  'BlackHanSans-Regular',
  'BubblegumSans-Regular',
  'Chewy-Regular',
  'Cinzel-VariableFont',
  'FjallaOne-Regular',
  'GloriaHallelujah-Regular',
  'GreatVibes-Regular',
  'Gruppo-Regular',
  'IndieFlower-Regular',
  'JockeyOne-Regular',
  'Lobster-Regular',
  'NanumPenScript-Regular',
  'Orienta-Regular',
  'PlayfairDisplaySC-Regular',
  'Righteous-Regular',
  'Sacramento-Regular',
  'Staatliches-Regular',
];

export const arabicFonts = [
  'Almarai-Regular',
  'Amiri-Regular',
  'ArefRuqaa-Regular',
  'Cairo-Regular',
  'Changa-VariableFont',
  'ElMessiri-Regular',
  'Harmattan-Regular',
  'Jomhuria-Regular',
  'Katibeh-Regular',
  'Kufam-VariableFont',
  'Lalezar-Regular',
  'Lateef-Regular',
  'Lemonada-VariableFont',
  'Mada-Regular',
  'MarkaziText-VariableFont',
  'Mirza-Regular',
  'Rakkas-Regular',
  'ReemKufi-Regular',
  'Scheherazade-Regular',
  'Tajawal-Regular',
  'Vibes-Regular',
];

export const textHeadings = [
  { heading: 'Add a heading', className: 'textBtn1', id: 'heading' },
  { heading: 'Add a subheading', className: 'textBtn2', id: 'subheading' },
  {
    heading: 'Add a little bit of body text',
    className: 'textBtn3',
    id: 'body',
  },
];
export const arabicTextHeadings = [
  { heading: 'أضف عنوان', className: 'arabicTextBtn1', id: 'heading_Ar' },
  {
    heading: 'أضف عنوان فرعي',
    className: 'arabicTextBtn2',
    id: 'subheading_Ar',
  },
  {
    heading: 'أضف القليل من النص الأساسي',
    className: 'arabicTextBtn3',
    id: 'body_Ar',
  },
];
