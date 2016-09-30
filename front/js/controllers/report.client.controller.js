(function () {
  'use strict';

  // Main controller
  angular
    .module('workReportApp')
    .controller('ReportController', ReportController);

  ReportController.$inject = ['$scope', '$state', 'TimeRecords'];

  function ReportController ($scope, $state, TimeRecords) {
    var rc = this;

    rc.groupedReports = [];
    rc.init = init;

    function init()
    {
        TimeRecords.query(function(timeRecords){
            rc.timeRecords = timeRecords;
            rc.groupedReports = getRecordsGroupedByDate(rc.timeRecords);
            rc.loading = false;
        });
    }

    function getRecordsGroupedByDate(timeRecords)
    {
        var groupedRecords = {}, currentTimeRecord, timeRecordDate;
        for(var i = 0; i < timeRecords.length; i++){
            
            currentTimeRecord = timeRecords[i];
            timeRecordDate = new Date(currentTimeRecord.date);
            timeRecordDate.setHours(0,0,0,0);

            var date = timeRecordDate.getTime();

            if(!groupedRecords[date]) groupedRecords[date] = [];
            groupedRecords[date].push(currentTimeRecord);

        }

        var formattedReports = [], totalTime = 0, formattedNotes = '';
        for (var date in groupedRecords) {
            var records = groupedRecords[date];

            totalTime = getTotalTime(records);
            formattedNotes = getFormattedNotes(records);

            formattedReports.push({
                date: date,
                totalTime: totalTime,
                formattedNotes: formattedNotes
            });

            totalTime = 0;
        }
        return formattedReports;
    }

    function getTotalTime(records)
    {
        var total = 0;
        for(var i = 0; i < records.length; i++){
            total += records[i].time;
        }
        return total;
    }

    function getFormattedNotes(notes)
    {
        var formatted = '';

        for(var i = 0; i < notes.length; i++){
            formatted += '\"' + notes[i].description + '\"';

            if(i < notes.length - 1){
                formatted += ', ';
            }
        }

        return formatted;
    }

    function removeTimeRecord(timeRecord, index)
    {
    	var confirm = window.confirm('Are you sure you want to delete this item?');
    	if(confirm){
    		timeRecord.$remove(function(){
    			rc.timeRecords.splice(index, 1);
    		});
    	}
    }
  }
})();
