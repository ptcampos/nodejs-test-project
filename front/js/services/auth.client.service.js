(function () {
  'use strict';

  // materias primas factory
  angular
    .module('workReportApp')
    .factory('Auth', Auth);

  Auth.$inject = [];

  function Auth () {
    var obj = {};

    obj.authenticate = function(userData){
      window.localStorage.workReportUser = JSON.stringify(userData);
    };

    obj.getAuthentication = function(){
      return JSON.parse(window.localStorage.workReportUser || '{}');
    };

    obj.logout = function(){
      window.localStorage.workReportUser = JSON.stringify({});
    };

    return obj;
  }
})();
