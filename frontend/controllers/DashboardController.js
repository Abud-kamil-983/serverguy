myApp.controller('DashboardController',['Auth','AuthToken', '$route', '$location','pnotifyService','requestService', 'urlService' , function(Auth, AuthToken, $route, $location, pnotifyService, requestService, urlService){
	var main = this;
  
	this.logout = function(){
		Auth.logout();
		pnotifyService.success('Logout', 'You successfully logout !')
		$location.path('/');
	}

  this.submitGithubForm = function(form){
    if(form.$invalid) {
      // error notification
      pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
      return false;
    }
     main.loading = true;
    // http request for saving user data to database
    requestService.getData('https://api.github.com/search/repositories?q=topic:'+main.topic)
    .then(function successCallback(response){
              //console.log(response);
              main.loading = false;
              main.githubDatas = response.data.items;
              main.searchData = {
                no_of_results : response.data.total_count,
                keyword:main.topic
              };
               // http request for saving user data to database
               requestService.postData(main.searchData, urlService.baseUrl+'search/save?token='+AuthToken.getToken())
               .then(function successCallback(response){
                console.log(response);
              },function errorCallback(response){
               console.log(response);
             });
              // success notification
              console.log(response);
          },function errorCallback(response){
              //console.log(response);
              main.loading = false;
              console.log(response);
              // error notification
              pnotifyService.error('Error', response.data.message.message);
        });
   
  }

  this.latestSearch = function(){
    // http request for saving user data to database
    requestService.getData(urlService.baseUrl+'search/fetch?token='+AuthToken.getToken())
    .then(function successCallback(response){
              main.showSearch = true;
              main.searchDatas = response.data;
              console.log(response);
          },function errorCallback(response){
              //console.log(response);
              console.log(response);
              
        });
  }

}]);