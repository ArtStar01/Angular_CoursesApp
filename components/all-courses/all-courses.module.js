/**
 * @ngdoc module
 * @name app.all-courses
 * @description
 * All courses module. Describes a full list of courses.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.all-courses', [
      'ngTable',
      'ui.bootstrap',
      'ui.router'
    ])
    .config(configFn);

  function configFn ($stateProvider) {
    $stateProvider
      .state('all-courses', {
        url: '/all-courses',
        templateUrl: 'components/all-courses/views/all-courses.html',
        pageTitle: 'All courses'
      });
  }
  configFn.$inject = ['$stateProvider'];
})();
