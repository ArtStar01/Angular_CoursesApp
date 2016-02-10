/**
 * @ngdoc controller
 * @name AllCoursesController
 * @description
 * Controller. Describes logic for list of courses.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.all-courses')
    .controller('AllCoursesController', AllCoursesController);

  function AllCoursesController ($localStorage, $modal, $state, AllCoursesApi, NgTableParams) {
    var vm = this;

    // list of courses
    vm.courses;

    // Get existing courses
    vm.updateCourses = function () {
      AllCoursesApi.getAllCourses()
        .$promise
        .then(function (courses) {
          vm.courses = courses || [];
          vm.tableParams = new NgTableParams({}, { dataset: vm.courses });
        });
    };
    vm.updateCourses();

    // Add course
    vm.addCourse = function () {
      $state.go('course');
    };

    // Open course
    vm.openCourse = function (courseId) {
      $state.go('course', { id: courseId });
    };

    // Delete course by id
    vm.deleteCourse = function (id) {
      $modal.open({
        templateUrl: 'myModal.html',
        controller: 'ModalCoursesController'
      })
        .result
        .then(function () {
          // Delete course
          AllCoursesApi.deleteCourseById(id)
            .$promise
            .then(function () {
              vm.updateCourses();
            })
            .catch(function () {
              // course not deleted actions
            });
        })
        .catch(
        function () {

        }
      );
    };

    // reset courses to default
    vm.resetMockCourses = function () {
      $localStorage.courses = [
        {
          id: 1,
          name: 'Course 1',
          description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          date: 'some date1',
          duration: 183,
          authors: []
        },
        {
          id: 2,
          name: 'Course 2',
          description: 'Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
          date: 'some date2',
          duration: 246,
          authors: []
        },
        {
          id: 3,
          name: 'Course 3',
          description: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          date: 'some date3',
          duration: 98,
          authors: []
        }
      ];
      vm.updateCourses();
    };
  }
  AllCoursesController.$inject = ['$localStorage', '$modal', '$state', 'AllCoursesApi', 'NgTableParams'];
})();
