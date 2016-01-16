var swipeTodoManager=function($http,$q){var SwipeTodoManager=function(){this.swipeTodos=[]};return SwipeTodoManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SwipeTodoManager.prototype.getSwipeTodo=function(swipeId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/swipe/"+swipeId+"/todo/"+todoId).success(function(data){self.swipeTodo=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeTodoManager.prototype.editSwipeTodo=function(swipeTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/todo/edit",data:swipeTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeTodoManager};swipeTodoManager.$inject=["$http","$q"],angular.module("app.swipe").service("SwipeTodoManager",swipeTodoManager);