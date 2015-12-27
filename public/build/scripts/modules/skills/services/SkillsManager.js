angular.module("app.skills").service("SkillsManager",["$http","$q",function(a,b){var c=function(){this.skills=[]};return c.prototype.deferredHandler=function(a,b,c){return a&&"object"==typeof a||(this.error="Error"),!this.error&&a.result&&a.result.error&&(this.error=a.result.error),!this.error&&a.error&&(this.error=a.error.message),!this.error&&c&&(this.error=c),this.error?b.reject(a):b.resolve(a)},c.prototype.getAllSkills=function(){var c=this,d=b.defer();return c.skills=[],a.get("/api/skills/all").success(function(a){c.skills=a,c.deferredHandler(a,d)}).error(function(a){c.deferredHandler(a,d,"Unknown error")}),d.promise},c.prototype.getMySkills=function(){var c=this,d=b.defer();return c.skills=[],a.get("/api/skills/mine").success(function(a){c.skills=a,c.deferredHandler(a,d)}).error(function(a){c.deferredHandler(a,d,"Unknown error")}),d.promise},c.prototype.getSkill=function(c,d){var e=this,f=b.defer();return e.skill=[],a.get("/api/skill/"+c+"//"+d).success(function(a){e.skill=a,e.deferredHandler(a,f)}).error(function(a){e.deferredHandler(a,f,"Unknown error")}),f.promise},c.prototype.createSkill=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/skill/create",data:c}).success(function(a){d.skills.unshift(a),d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c.prototype.editSkill=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/skilledit",data:c}).success(function(a){d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c}]);