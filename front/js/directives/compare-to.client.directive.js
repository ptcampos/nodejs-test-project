(function () {
  'use strict';

  // Compare To
  angular
    .module('workReportApp')
    .directive('compareTo', CompareTo);

  CompareTo.$inject = [];

  function CompareTo () {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    };
  }
})();
