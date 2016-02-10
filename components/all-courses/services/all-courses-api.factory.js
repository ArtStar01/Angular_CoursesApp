/**
 * @ngdoc factory
 * @name all-courses.AllCoursesApi
 * @description
 * Factory. Api for all courses list.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.all-courses')
    .factory('AllCoursesApi', AllCoursesApi);

  function AllCoursesApi ($httpBackend, $localStorage, $resource) {
    // Get courses
    $httpBackend
      .when('GET', '/all-courses').respond(function () {
        return [200, $localStorage.courses, {}];
      });

    // Delete course
    $httpBackend
      .when('POST', '/all-courses/delete').respond(function (method, url, id) {
        var isError = true;

        for (var i = 0; i < $localStorage.courses.length; ++i) {
          if ($localStorage.courses[i].id === id) {
            // Delete element form fake bd
            $localStorage.courses.splice(i, 1);

            isError = false;
            break;
          }
        }

        if (isError) {
          return [500, {}, {}];
        } else {
          return [200, {}, {}];
        }
      });

    return $resource('/', {}, {
      // Get all courses
      getAllCourses: {
        method: 'GET',
        url: '/all-courses',
        isArray: true
      },
      // Delete specific course
      deleteCourseById: {
        method: 'POST',
        url: '/all-courses/delete/:id',
        params: { id: '@id' }
      }

    });
  }
  AllCoursesApi.$inject = ['$httpBackend', '$localStorage', '$resource'];
})();
