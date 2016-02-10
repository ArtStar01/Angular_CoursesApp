/**
 * @ngdoc module
 * @name app.course
 * @description
 * Course module. Describes some course.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.course', [
      'ui.router'
    ])
    .config(configFn);

  function configFn ($stateProvider) {
    var courseMock = {
      name: '',
      description: '',
      date: '',
      duration: '',
      authors: []
    };

    var courseResolve = function ($state, $stateParams, CourseApi) {
      if ($stateParams.id) {
        return CourseApi.getCourse($stateParams.id)
          .$promise
          .then(function (course) {
            return course;
          })
          .catch(function () {
            // course not exist actions
            $state.go('home');
          });
      } else {
        return courseMock;
      }
    };
    courseResolve.$inject = ['$state', '$stateParams', 'CourseApi'];

    var isEdit = function ($stateParams) {
      return !!$stateParams.id;
    };
    isEdit.$inject = ['$stateParams'];

    $stateProvider
      .state('course', {
        url: '/course/:id',
        templateUrl: 'components/course/views/course.html',
        pageTitle: 'Course',
        controller: 'CoursesController as cc',
        resolve: {
          course: courseResolve,
          isEditMode: isEdit
        }
      });
  }
  configFn.$inject = ['$stateProvider'];
})();
