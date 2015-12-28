var skillCommentsManager=function($http,$q){var SkillCommentsManager=function(){this.skillComments=[]};return SkillCommentsManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SkillCommentsManager.prototype.getSkillComments=function(skillId){var self=this,deferred=$q.defer();return self.skillComments=[],$http.get("/api/skill/"+skillId+"/comments").success(function(data){self.skillComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillCommentsManager.prototype.getSkillComment=function(skillId,commentId){var self=this,deferred=$q.defer();return self.skillComments=[],$http.get("/api/skill/"+skillId+"/comment/"+commentId).success(function(data){self.skillComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillCommentsManager.prototype.createSkillComment=function(skillCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/skill/comment/create",data:skillCommentData}).success(function(data){self.skillComments.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillCommentsManager.prototype.editSkillComment=function(skillCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/skill/comment/edit",data:skillCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillCommentsManager};skillCommentsManager.$inject=["$http","$q"],angular.module("app.skills").service("SkillCommentsManager",skillCommentsManager);