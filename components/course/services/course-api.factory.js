/**
 * @ngdoc factory
 * @name course.CourseApi
 * @description
 * Factory. Api for all courses list.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.course')
    .factory('CourseApi', CourseApi);

  function CourseApi ($httpBackend, $localStorage, $resource) {
    // Get course
    $httpBackend
      .when('POST', '/course').respond(function (method, url, id) {
        var neededCourse = null;

        for (var i = 0; i < $localStorage.courses.length; ++i) {
          if ($localStorage.courses[i].id === parseInt(id, 10)) {
            // Founded
            neededCourse = $localStorage.courses[i];
            break;
          }
        }
        if (!neededCourse) {
          return [500, null, {}];
        } else {
          return [200, neededCourse, {}];
        }
      });

    // Add course
    $httpBackend
      .when('POST', '/course/add').respond(function (method, url, course) {
        course = angular.fromJson(course);

        // set id for course
        course.id = $localStorage.courses.length + 1;

        // add course to fake db
        $localStorage.courses ? $localStorage.courses.push(course) : $localStorage.courses = [course];

        return [200, {}, {}];
      });

    // Edit course
    $httpBackend
      .when('PUT', '/course/edit').respond(function (method, url, course) {
        course = angular.fromJson(course);
        for (var i = 0; i < $localStorage.courses.length; ++i) {
          if ($localStorage.courses[i].id === course.id) {
            // Replace needed course
            $localStorage.courses[i] = course;
            break;
          }
        }

        return [200, {}, {}];
      });

    // Get all users
    $httpBackend
      .when('GET', '/course-authors').respond(function () {
        var possibleAuthors = [];
        for (var i = 0; i < $localStorage.users.length; ++i) {
          possibleAuthors.push($localStorage.users[i].name);
        }
        return [200, possibleAuthors, {}];
      });

    return $resource('/', {}, {
      // Get course
      getCourse: {
        method: 'POST',
        url: '/course/:id',
        params: { id: '@id' }
      },

      // Add course
      addCourse: {
        method: 'POST',
        url: '/course/add/:course',
        params: { course: '@course' }
      },

      // Update course
      updateCourse: {
        method: 'PUT',
        url: '/course/edit/:course',
        params: { course: '@course' }
      },

      // Get all users
      getAllUsers: {
        method: 'GET',
        url: '/course-authors',
        isArray: true
      }
    });
  }
  CourseApi.$inject = ['$httpBackend', '$localStorage', '$resource'];
})();
