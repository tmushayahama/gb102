var skillWeblinksManager=function($http,$q){var SkillWeblinksManager=function(){this.skillWeblinks=[]};return SkillWeblinksManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SkillWeblinksManager.prototype.getSkillWeblinks=function(skillId){var self=this,deferred=$q.defer();return self.skillWeblinks=[],$http.get("/api/skill/"+skillId+"/weblinks").success(function(data){self.skillWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillWeblinksManager.prototype.getSkillWeblink=function(skillId,weblinkId){var self=this,deferred=$q.defer();return self.skillWeblinks=[],$http.get("/api/skill/"+skillId+"/weblink/"+weblinkId).success(function(data){self.skillWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillWeblinksManager.prototype.createSkillWeblink=function(skillWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/skill/weblink/create",data:skillWeblinkData}).success(function(data){self.skillWeblinks.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillWeblinksManager.prototype.editSkillWeblink=function(skillWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/skill/weblink/edit",data:skillWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillWeblinksManager};skillWeblinksManager.$inject=["$http","$q"],angular.module("app.skills").service("SkillWeblinksManager",skillWeblinksManager);