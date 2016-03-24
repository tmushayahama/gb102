var swipesSrv=function($http,$q){var SwipesSrv=function(){this.swipes=[]};return SwipesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SwipesSrv.prototype.getAllSwipes=function(){var self=this,deferred=$q.defer();return self.swipes=[],$http.get("/api/swipes/all").success(function(data){self.swipes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesSrv.prototype.getMySwipes=function(){var self=this,deferred=$q.defer();return self.swipes=[],$http.get("/api/swipes/mine").success(function(data){self.swipes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesSrv.prototype.getSwipe=function(swipeId,Id){var self=this,deferred=$q.defer();return self.swipe=[],$http.get("/api/swipe/"+swipeId+"//"+Id).success(function(data){self.swipe=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesSrv.prototype.createSwipe=function(swipeData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/create",data:swipeData}).success(function(data){self.swipes.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesSrv.prototype.editSwipe=function(swipeData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipeedit",data:swipeData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipesSrv};swipesSrv.$inject=["$http","$q"],angular.module("app.swipe").service("SwipesSrv",swipesSrv);