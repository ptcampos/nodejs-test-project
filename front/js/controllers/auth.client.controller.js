(function () {
  'use strict';

  // Home controller
  angular
    .module('workReportApp')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$state', 'Auth', '$http', '$location'];

  function AuthController ($scope, $state, Auth, $http, $location) {
    var ac = this;

    ac.error = null;
    ac.user = {};
    ac.signin = signin;
    ac.signup = signup;
    ac.authenticating = false;
    ac.credentials = {};

    // If user is signed in then redirect back home
    if (Auth.getAuthentication().username) {
      $location.path('/');
    }

    function signin(isValid)
    {
      ac.error = null;
      ac.authenticating = true;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'signinForm');
        ac.authenticating = false;
        return false;
      }

      $http.post('/api/auth/signin', ac.credentials).success(function (response) {
        // If successful we assign the response to the Auth service and store on local storage.
        Auth.authenticate(response);

        // And redirect to the home page
        $state.go('main.home').then(function(){
          ac.authenticating = false;
        });
      }).error(function (response) {
        // If error, show to user.
        ac.error = response.message;
        ac.authenticating = false;
      });
    }

    function signup(isValid)
    {
      ac.error = null;
      ac.authenticating = true;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'signupForm');
        ac.authenticating = false;
        return false;
      }

      $http.post('/api/auth/signup', ac.credentials).success(function (response) {
        // If successful we assign the response to the Auth service and store on local storage.
        Auth.authenticate(response);

        // And redirect to the home page
        $state.go('main.home').then(function(){
          ac.authenticating = false;
        });
      }).error(function (response) {
        ac.error = response.message || '';
        ac.authenticating = false;
      });
    }
  }
})();
