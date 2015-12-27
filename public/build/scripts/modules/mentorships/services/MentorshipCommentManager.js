var mentorshipCommentManager=function($http,$q){var MentorshipCommentManager=function(){this.mentorshipComments=[]};return MentorshipCommentManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},MentorshipCommentManager.prototype.getMentorshipComment=function(mentorshipId,commentId){var self=this,deferred=$q.defer();return $http.get("/api/mentorship/"+mentorshipId+"/comment/"+commentId).success(function(data){self.mentorshipComment=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipCommentManager.prototype.editMentorshipComment=function(mentorshipCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/mentorship/comment/edit",data:mentorshipCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipCommentManager};mentorshipCommentManager.$inject=["$http","$q"],angular.module("app.mentorships").service("MentorshipCommentManager",mentorshipCommentManager);