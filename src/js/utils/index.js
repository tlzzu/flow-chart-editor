export default {
  /**
   * 去除空格
   * @param {String} str 需要去除空格的字符串
   */
  trim(str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
  }
};