/* eslint-disable no-param-reassign */
import navStyleSet from '../constants';


export default (currentFormat, navData) => navData.map((item, index) => {
  item.navItemStyle = navStyleSet.dormantStyle;
  if (currentFormat[index] === 1) {
    item.navItemStyle = navStyleSet.activeStyle;
  }

  return item;
});
