/**
 * @ngdoc factory
 * @name app.login.LoginApi
 * @description
 * Factory. Api for login.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.login')
    .factory('LoginApi', LoginApi);

  function LoginApi ($httpBackend, $localStorage, $resource) {
    // User logging in
    $httpBackend
      .when('POST', '/signin-user').respond(function (method, url, user) {
        var users = $localStorage.users || [], isError = true;
        user = angular.fromJson(user);

        for (var i = 0; i < users.length; ++i) {
          if ((user.name === users[i].name) && (user.pwd === users[i].pwd)) {
            isError = false;
            user = users[i];
            break;
          }
        }
        if (isError) {
          return [403, {}, {}];
        } else {
          return [200, user, {}];
        }
      });

    // Register
    $httpBackend
      .when('POST', '/signup-user').respond(function (method, url, user) {
        user = angular.fromJson(user);

        // add to fake db
        $localStorage.users instanceof Array ? $localStorage.users.push(user) : $localStorage.users = [user];

        return [200, user, {}];
      });

    return $resource('/', {}, {
      // Check user access
      signinUser: {
        method: 'POST',
        url: '/signin-user/:user',
        params: { user: '@user' }
      },
      // Add user credentials to fake database
      signupUser: {
        method: 'POST',
        url: '/signup-user/:user',
        params: { user: '@user' }
      }

    });
  }
  LoginApi.$inject = ['$httpBackend', '$localStorage', '$resource'];
})();
