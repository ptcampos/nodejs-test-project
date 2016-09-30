(function () {
  'use strict';

  // Main controller
  angular
    .module('workReportApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$state', 'Auth', '$http'];

  function MainController ($scope, $state, Auth, $http) {
    var mc = this;

    mc.locationName = $state.current.name;
    mc.logout = logout;
    mc.user = Auth.getAuthentication();

    function logout()
    {
      $http.get('/api/auth/signout');
      Auth.logout();
        window.location.reload();
    }

    $scope.$on('changed-url', function(event, args) {
      mc.locationName = args.toStateName;
    });
  }
})();
