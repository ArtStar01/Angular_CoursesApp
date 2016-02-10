/**
 * @ngdoc module
 * @name app.login
 * @description
 * Login module. Describes login/logout process.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.login', [
      'ui.router'
    ])
    .config(configFn);

  function configFn ($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'components/login/views/signin.html',
        pageTitle: 'Login'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'components/login/views/signup.html',
        pageTitle: 'Registration'
      });
  }
  configFn.$inject = ['$stateProvider'];
})();
