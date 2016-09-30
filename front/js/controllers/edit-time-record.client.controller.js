(function () {
  'use strict';

  // Main controller
  angular
    .module('workReportApp')
    .controller('EditTimeRecordController', EditTimeRecordController);

  EditTimeRecordController.$inject = ['$scope', '$stateParams', 'TimeRecords'];

  function EditTimeRecordController ($scope, $stateParams, TimeRecords) {
    var tc = this;

    tc.error = null;
    tc.message = '';
    tc.saving = false;
    tc.timeRecord = {};
    tc.save = save;
    tc.findOne = findOne;
    tc.loading = true;

    function save(isValid)
    {
      tc.error = null;
      tc.message = null;
      tc.saving = true;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'editTimeRecordForm');
        tc.saving = false;
        return false;
      }

      // Create new TimeRecords object
      var timeRecord = new TimeRecords(tc.timeRecord);

      timeRecord.$update(function (response) {
        tc.message = 'Time Record Updated!';
      }, function (errorResponse) {
        tc.error = errorResponse.data.message;
      });
    }

    function findOne()
    {
      TimeRecords.get({
        timeRecordId: $stateParams.timeRecordId
      }, function(timeRecord){
        tc.timeRecord = timeRecord;
        tc.loading = false;
      });
    }
  }
})();
