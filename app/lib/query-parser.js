'use strict';

exports.parseObject = function (jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
};

exports.parseArray = function (jsonArray) {
  if (undefined === jsonArray) return [];

  if (Array.isArray(jsonArray)) {
    return jsonArray.map(function (json) {
      return exports.parseObject(json);
    });
  } else {
    return [exports.parseObject(jsonArray)];
  }
};
