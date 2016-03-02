var mentorshipWeblinkSrv=function($http,$q){var MentorshipWeblinkSrv=function(){this.mentorshipWeblinks=[]};return MentorshipWeblinkSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},MentorshipWeblinkSrv.prototype.getMentorshipWeblink=function(mentorshipId,weblinkId){var self=this,deferred=$q.defer();return $http.get("/api/mentorship/"+mentorshipId+"/weblink/"+weblinkId).success(function(data){self.mentorshipWeblink=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipWeblinkSrv.prototype.editMentorshipWeblink=function(mentorshipWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/mentorship/weblink/edit",data:mentorshipWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipWeblinkSrv};mentorshipWeblinkSrv.$inject=["$http","$q"],angular.module("app.mentorship").service("MentorshipWeblinkSrv",mentorshipWeblinkSrv);