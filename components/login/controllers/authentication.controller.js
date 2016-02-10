/**
 * @ngdoc controller
 * @name AuthenticationController
 * @description
 * Controller. Describes authentication logic.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.login')
    .controller('AuthenticationController', AuthenticationController);

  function AuthenticationController ($rootScope, $sessionStorage, $state, LoginApi) {
    var vm = this;
    // If user is signed in then redirect back home
    if ($rootScope.user.name) {
      $state.go('home');
    }

    // Wrong name or password
    vm.authError = false;

    vm.userModel = {
      name: '',
      pwd: '',
      email: ''
    };

    vm.signin = function () {
      vm.authError = true;
      LoginApi.signinUser(vm.userModel)
        .$promise
        .then(function (user) {
          // If successful we assign the response to the global user model
          $rootScope.user = user;
          $sessionStorage.user = user;

          vm.authError = false;

          // redirect to the application
          $state.go('home');
        })
        .catch(function (data) {
          // failed authorization
        });
    };

    vm.signup = function () {
      LoginApi.signupUser(vm.userModel)
        .$promise
        .then(function (user) {
          // Assign the response to the global user model
          $rootScope.user = user;
          $sessionStorage.user = user;

          // redirect to the application
          $state.go('home');
        });
    };
  }
  AuthenticationController.$inject = ['$rootScope', '$sessionStorage', '$state', 'LoginApi'];
})();
