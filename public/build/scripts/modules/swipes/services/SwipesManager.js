var swipesManager=function($http,$q){var SwipesManager=function(){this.swipes=[]};return SwipesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SwipesManager.prototype.getAllSwipes=function(){var self=this,deferred=$q.defer();return self.swipes=[],$http.get("/api/swipes/all").success(function(data){self.swipes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesManager.prototype.getMySwipes=function(){var self=this,deferred=$q.defer();return self.swipes=[],$http.get("/api/swipes/mine").success(function(data){self.swipes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesManager.prototype.getSwipe=function(swipeId,Id){var self=this,deferred=$q.defer();return self.swipe=[],$http.get("/api/swipe/"+swipeId+"//"+Id).success(function(data){self.swipe=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesManager.prototype.createSwipe=function(swipeData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/create",data:swipeData}).success(function(data){self.swipes.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesManager.prototype.editSwipe=function(swipeData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipeedit",data:swipeData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesManager};swipesManager.$inject=["$http","$q"],angular.module("app.swipes").service("SwipesManager",swipesManager);