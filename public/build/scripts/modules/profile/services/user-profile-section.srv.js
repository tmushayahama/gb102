var userProfileSectionSrv=function($http,$q){var UserProfileSectionSrv=function(){this.userProfileSections=[]};return UserProfileSectionSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},UserProfileSectionSrv.prototype.getUserProfileSection=function(userId){var self=this,deferred=$q.defer();return $http.get("/api/profile/"+userId+"/sections").success(function(data){self.userProfileSections=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},UserProfileSectionSrv.prototype.editProfile=function(profileData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/profile/edit",data:profileData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},UserProfileSectionSrv};userProfileSectionSrv.$inject=["$http","$q"],angular.module("app.profile").service("UserProfileSectionSrv",userProfileSectionSrv);