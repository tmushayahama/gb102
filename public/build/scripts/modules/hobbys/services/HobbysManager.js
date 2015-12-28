var hobbysManager=function($http,$q){var HobbysManager=function(){this.hobbys=[]};return HobbysManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},HobbysManager.prototype.getAllHobbys=function(){var self=this,deferred=$q.defer();return self.hobbys=[],$http.get("/api/hobbys/all").success(function(data){self.hobbys=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbysManager.prototype.getMyHobbys=function(){var self=this,deferred=$q.defer();return self.hobbys=[],$http.get("/api/hobbys/mine").success(function(data){self.hobbys=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbysManager.prototype.getHobby=function(hobbyId,Id){var self=this,deferred=$q.defer();return self.hobby=[],$http.get("/api/hobby/"+hobbyId+"//"+Id).success(function(data){self.hobby=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbysManager.prototype.createHobby=function(hobbyData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/hobby/create",data:hobbyData}).success(function(data){self.hobbys.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbysManager.prototype.editHobby=function(hobbyData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/hobbyedit",data:hobbyData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbysManager};hobbysManager.$inject=["$http","$q"],angular.module("app.hobbys").service("HobbysManager",hobbysManager);