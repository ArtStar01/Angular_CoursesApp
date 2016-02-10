/**
 * @ngdoc controller
 * @name ModalCoursesController
 * @description
 * Controller. Describes logic for the modal dialog.
 *
 * @author Artem Starushko
 */

/* global angular: true */
'use strict';

(function () {
  angular
    .module('app.all-courses')
    .controller('ModalCoursesController', ModalCoursesController);

  function ModalCoursesController ($modalInstance, $scope) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
  ModalCoursesController.$inject = ['$modalInstance', '$scope'];
})();
