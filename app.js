/**
 * @ngdoc module
 * @name app
 * @description
 * App module.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app', [
      'ngResource',
      'app.all-courses',
      'app.course',
      'app.login',
      'ngMockE2E',
      'ngStorage',
      'ui.bootstrap',
      'ui.router'
    ])
    .config(configApp)
    .run(runApp);

  function configApp ($stateProvider, $urlRouterProvider) {
    // Not existing url redirect
    $urlRouterProvider.otherwise('/undefined');

    $stateProvider
      .state('undefined', {
        url: '/undefined',
        templateUrl: 'components/common/views/404.html',
        pageTitle: 'Wrong page'
      })
      .state('home', {
        url: '/',
        templateUrl: 'components/all-courses/views/all-courses.html',
        pageTitle: 'All courses'
      });
  }
  configApp.$inject = ['$stateProvider', '$urlRouterProvider'];

  function runApp ($httpBackend, $rootScope, $sessionStorage, $state, CheckAccess) {
    // Make mock for the mock :)
    $httpBackend.whenGET(/\.html$/).passThrough();

    // Check is user have authorization credentials
    $rootScope.user = $sessionStorage.user || {};

    // Clear credentials
    $rootScope.logout = function () {
      $rootScope.user = {};
      $sessionStorage.user = null;
      $state.go('signin');
    };

    // Watch state changes
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.pageTitle = toState.pageTitle;
      // Check user access
      CheckAccess.process(event, toState);
    });
  }
  runApp.$inject = ['$httpBackend', '$rootScope', '$sessionStorage', '$state', 'CheckAccess'];
})();
