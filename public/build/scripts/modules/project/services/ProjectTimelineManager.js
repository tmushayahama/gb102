var projectTimelineManager=function($http,$q){var ProjectTimelineManager=function(){this.projectTimelines=[]};return ProjectTimelineManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProjectTimelineManager.prototype.getProjectTimeline=function(projectId,timelineId){var self=this,deferred=$q.defer();return $http.get("/api/project/"+projectId+"/timeline/"+timelineId).success(function(data){self.projectTimeline=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectTimelineManager.prototype.editProjectTimeline=function(projectTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/timeline/edit",data:projectTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectTimelineManager};projectTimelineManager.$inject=["$http","$q"],angular.module("app.project").service("ProjectTimelineManager",projectTimelineManager);