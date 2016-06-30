var explorerExercisesSrv=function($http,$q){var ExplorerExercisesSrv=function(){this.explorerExercises=[]};return ExplorerExercisesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorerExercisesSrv.prototype.getExplorerExercises=function(explorerId){var self=this,deferred=$q.defer();return self.explorerExercises=[],$http.get("/api/explorer/"+explorerId+"/exercises").success(function(data){self.explorerExercises=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerExercisesSrv.prototype.getExplorerExercise=function(explorerId,exerciseId){var self=this,deferred=$q.defer();return self.explorerExercises=[],$http.get("/api/explorer/"+explorerId+"/exercise/"+exerciseId).success(function(data){self.explorerExercises=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerExercisesSrv.prototype.createExplorerExercise=function(explorerExerciseData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/exercise/create",data:explorerExerciseData}).success(function(data){self.explorerExercises.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerExercisesSrv.prototype.editExplorerExercise=function(explorerExerciseData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/exercise/edit",data:explorerExerciseData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerExercisesSrv.prototype.editExplorerExercise=function(explorerExerciseData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/exercise/edit",data:explorerExerciseData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerExercisesSrv};explorerExercisesSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorerExercisesSrv",explorerExercisesSrv);