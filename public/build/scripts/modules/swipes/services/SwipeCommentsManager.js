var swipeCommentsManager=function($http,$q){var SwipeCommentsManager=function(){this.swipeComments=[]};return SwipeCommentsManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SwipeCommentsManager.prototype.getSwipeComments=function(swipeId){var self=this,deferred=$q.defer();return self.swipeComments=[],$http.get("/api/swipe/"+swipeId+"/comments").success(function(data){self.swipeComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeCommentsManager.prototype.getSwipeComment=function(swipeId,commentId){var self=this,deferred=$q.defer();return self.swipeComments=[],$http.get("/api/swipe/"+swipeId+"/comment/"+commentId).success(function(data){self.swipeComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeCommentsManager.prototype.createSwipeComment=function(swipeCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/comment/create",data:swipeCommentData}).success(function(data){self.swipeComments.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeCommentsManager.prototype.editSwipeComment=function(swipeCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/comment/edit",data:swipeCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeCommentsManager};swipeCommentsManager.$inject=["$http","$q"],angular.module("app.swipe").service("SwipeCommentsManager",swipeCommentsManager);