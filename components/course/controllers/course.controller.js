/**
 * @ngdoc controller
 * @name CoursesController
 * @description
 * Controller. Describes logic for specific course.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.course')
    .controller('CoursesController', CoursesController);

  function CoursesController ($state, CourseApi, course, isEditMode) {
    var vm = this;

    // Check is this edit mode
    vm.isEditMode = isEditMode;

    // Course from state resolve
    vm.course = course;

    // All possible authors
    vm.allAuthors = [];

    // Get all possible authors
    CourseApi.getAllUsers()
      .$promise
      .then(function (authors) {
        vm.allAuthors = authors;
        var index;
        for (var i = 0; i < course.authors.length; ++i) {
          index = vm.allAuthors.indexOf(course.authors[i]);
          if (index >= 0) {
            vm.allAuthors.splice(index, 1);
          }
        }
      });

    // Active author
    vm.activeAuthor = '';

    // Add author to course
    vm.addAuthor = function () {
      if (vm.activeAuthor && vm.activeAuthor && vm.courseModel.authors.indexOf(vm.activeAuthor) === -1) {
        vm.courseModel.authors.push(vm.activeAuthor);
        vm.allAuthors.splice(vm.allAuthors.indexOf(vm.activeAuthor), 1);
        vm.activeAuthor = '';
      }
    };

    // Remove author to course
    vm.removeAuthor = function () {
      if (vm.activeAuthor && vm.allAuthors.indexOf(vm.activeAuthor) === -1) {
        vm.allAuthors.push(vm.activeAuthor);
        vm.courseModel.authors.splice(vm.courseModel.authors.indexOf(vm.activeAuthor), 1);
        vm.activeAuthor = '';
      }
    };

    // Course model
    vm.courseModel = course;

    // To all courses
    vm.returnToHome = function () {
      $state.go('home');
    };

    // Process request
    vm.handleSubmit = function () {
      var requestFn = vm.isEditMode ? CourseApi.updateCourse : CourseApi.addCourse;

      requestFn(vm.courseModel)
        .$promise
        .then(function () {
          vm.returnToHome();
        })
        .catch(function () {
          // do something
        });
    };

    // TODO: make course validation
    // TODO: make correct date format
  }
  CoursesController.$inject = ['$state', 'CourseApi', 'course', 'isEditMode'];
})();
