/**
 * @ngdoc filter
 * @name app.all-courses.filterCourses
 * @description
 * Filter course duration to needed format.
 */
/* global angular:true */
(function () {
  'use strict';

  angular.module('app.all-courses')
    .filter('filterCourses', filterCourses);

  function filterCourses () {
    return function (input) {
      if (isNaN(parseInt(input, 10))) { return 0; }
      return parseInt(input / 60, 10) + ' Hour(s) ' + parseInt(input % 60, 10) + ' min';
    };
  }
  filterCourses.$inject = [];
})();
