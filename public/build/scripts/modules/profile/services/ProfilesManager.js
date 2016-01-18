var profileManager=function($http,$q){var ProfileManager=function(){this.profile=[]};return ProfileManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProfileManager.prototype.getAllProfile=function(){var self=this,deferred=$q.defer();return self.profile=[],$http.get("/api/profile/all").success(function(data){self.profile=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProfileManager.prototype.getMyProfile=function(){var self=this,deferred=$q.defer();return self.profile=[],$http.get("/api/profile/mine").success(function(data){self.profile=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProfileManager.prototype.getProfile=function(profileId,Id){var self=this,deferred=$q.defer();return self.profile=[],$http.get("/api/profile/"+profileId+"//"+Id).success(function(data){self.profile=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProfileManager.prototype.createProfile=function(profileData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/profile/create",data:profileData}).success(function(data){self.profile.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProfileManager.prototype.editProfile=function(profileData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/profileedit",data:profileData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProfileManager};profileManager.$inject=["$http","$q"],angular.module("app.profile").service("ProfileManager",profileManager);