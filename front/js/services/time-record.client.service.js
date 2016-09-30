(function () {
  'use strict';

  // materias primas factory
  angular
    .module('workReportApp')
    .factory('TimeRecords', TimeRecords);

  TimeRecords.$inject = ['$resource'];

  function TimeRecords ($resource) {
    return $resource('api/time-records/:timeRecordId', {
      timeRecordId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
