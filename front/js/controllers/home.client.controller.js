(function () {
  'use strict';

  // Main controller
  angular
    .module('workReportApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'TimeRecords', 'Auth'];

  function HomeController ($scope, $state, TimeRecords, Auth) {
    var hc = this;

    hc.loading = true;
    hc.init = init;
    hc.timeRecords = [];
    hc.removeTimeRecord = removeTimeRecord;

    function init()
    {
    	TimeRecords.query(function(timeRecords){
    		hc.timeRecords = timeRecords;
    		hc.loading = false;
    	});
    }

    function removeTimeRecord(timeRecord, index)
    {
    	var confirm = window.confirm('Are you sure you want to delete this item?');
    	if(confirm){
    		timeRecord.$remove(function(){
    			hc.timeRecords.splice(index, 1);
    		});
    	}
    }
  }
})();
