var workReportAppAPP = angular.module('workReportApp', ['ngResource', 'ui.router', 'ngMessages', 'tableSort', 'ui.utils.masks'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // For any unmatched url, redirect to /main
  $urlRouterProvider.otherwise('/main/home');

  $stateProvider
    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: '/views/auth/auth.client.view.html'
    })
    .state('auth.signin', {
      url: '/signin',
      views: {
          'authView': {
            templateUrl: '/views/auth/signin.client.view.html',
            controller: 'AuthController',
            controllerAs: 'ac'
          }
      },
    })
    .state('auth.signup', {
      url: '/signup',
      views: {
          'authView': {
            templateUrl: '/views/auth/signup.client.view.html',
            controller: 'AuthController',
            controllerAs: 'ac'
          }
      },
    })
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: '/views/main/main.client.view.html',
      controller: 'MainController',
      controllerAs: 'mc'
    })
    .state('main.home', {
        url: '/home',
          views: {
          'mainView': {
            templateUrl: '/views/main/home.client.view.html',
            controller: 'HomeController',
                controllerAs: 'hc'
          }
      },
    })
    .state('main.addTimeRecord', {
        url: '/add-time-record',
          views: {
          'mainView': {
            templateUrl: '/views/main/add-time-record.client.view.html',
            controller: 'AddTimeRecordController',
                controllerAs: 'tc'
          }
      },
    })
    .state('main.report', {
      url: '/report',
      views: {
          'mainView': {
            templateUrl: '/views/main/report.client.view.html',
            controller: 'ReportController',
            controllerAs: 'rc'
          }
      },
    });
});

workReportAppAPP.run(['$rootScope', '$state', 'Auth', '$window', function($rootScope, $state, Auth, $window) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    var currentUser = Auth.getAuthentication();

    if ( !currentUser.username && toState.name !== 'auth.signin' && toState.name !== 'auth.signup' ) {
      event.preventDefault();
      $state.go('auth.signin');

      return false;
    }

    $state.previous = fromState;
    $state.previousParams = fromParams;

    $rootScope.$broadcast('changed-url', { toUrl: toState.url, toStateName: toState.name });

    window.scrollTo(0,0);

  });
}]);