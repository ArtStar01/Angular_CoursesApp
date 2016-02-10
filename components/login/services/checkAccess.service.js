/**
 * @ngdoc service
 * @name app.login
 * @description
 * Service. Describes check credentials process.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.login')
    .service('CheckAccess', CheckAccess);

  function CheckAccess ($rootScope, $state) {
    this.process = function (event, toState) {
      if ($rootScope.user.name) {
        // correct authorization
      } else if (['signin', 'signup'].indexOf(toState.name) === -1) {
        // redirect not authorized person
        event.preventDefault();
        $state.go('signin');
      }
    };
  }
  CheckAccess.$inject = ['$rootScope', '$state'];
})();
