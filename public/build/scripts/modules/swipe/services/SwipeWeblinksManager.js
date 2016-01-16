var swipeWeblinksManager=function($http,$q){var SwipeWeblinksManager=function(){this.swipeWeblinks=[]};return SwipeWeblinksManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SwipeWeblinksManager.prototype.getSwipeWeblinks=function(swipeId){var self=this,deferred=$q.defer();return self.swipeWeblinks=[],$http.get("/api/swipe/"+swipeId+"/weblinks").success(function(data){self.swipeWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeWeblinksManager.prototype.getSwipeWeblink=function(swipeId,weblinkId){var self=this,deferred=$q.defer();return self.swipeWeblinks=[],$http.get("/api/swipe/"+swipeId+"/weblink/"+weblinkId).success(function(data){self.swipeWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeWeblinksManager.prototype.createSwipeWeblink=function(swipeWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/weblink/create",data:swipeWeblinkData}).success(function(data){self.swipeWeblinks.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeWeblinksManager.prototype.editSwipeWeblink=function(swipeWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/weblink/edit",data:swipeWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeWeblinksManager};swipeWeblinksManager.$inject=["$http","$q"],angular.module("app.swipe").service("SwipeWeblinksManager",swipeWeblinksManager);