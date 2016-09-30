(function () {
  'use strict';

  // Main controller
  angular
    .module('workReportApp')
    .controller('AddTimeRecordController', AddTimeRecordController);

  AddTimeRecordController.$inject = ['$scope', '$state', 'TimeRecords'];

  function AddTimeRecordController ($scope, $state, TimeRecords) {
    var tc = this;

    tc.error = null;
    tc.message = null;
    tc.saving = false;
    tc.timeRecord = {};
    tc.timeRecord.date = tc.timeRecord.date || new Date();
    tc.save = save;

    function save(isValid)
    {
      tc.error = null;
      tc.message = null;
      tc.saving = true;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'addTimeRecordForm');
        tc.saving = false;
        return false;
      }

      // Create new TimeRecords object
      var timeRecord = new TimeRecords(tc.timeRecord);

      timeRecord.$save(function (response) {
        tc.message = 'Time Record Added!';
      }, function (errorResponse) {
        tc.error = errorResponse.data.message;
      });
    }
  }
})();
