/**
 * @ngdoc directive
 * @name app.course.filterCourses
 * @description
 * Filter course duration to needed format.
 */
(function () {
  'use strict';

  angular
    .module('app.course')
    .directive('authorsDirective', authorsDirective);

  function authorsDirective () {
    return {
      restrict: 'AEC',
      link: function ($scope, $elem) {
        $elem.on('click', function () {
          $('.authors-holder').find('li').removeClass('active');
          $elem.addClass('active');
        });
      }
    };
  }
  authorsDirective.$inject = [];
})();
