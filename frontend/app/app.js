var myApp = angular.module('githubApp', ['ngRoute','jlareau.pnotify', 'ngSanitize', 'angularMoment']);

//protecting auth routes

myApp.run(['$rootScope', '$location', 'Auth', 'notificationService', function ($rootScope, $location, Auth, notificationService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
    	if (next.$$route.protected === true) {
	        if (!Auth.isLoggedIn()) {
	        	if ($location.path() !=='/') {
		        	notificationService.notify({
						title: 'Unauthorized Entry',
						text: 'Please Login To Continue',
						hide: true,
						type:'notice'
					});

					$location.path('/');
				}
	            
	        }
	    }   
    });
}]); 