var mentorshipContributionSrv=function($http,$q){var MentorshipContributionSrv=function(){this.mentorshipContributions=[]};return MentorshipContributionSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},MentorshipContributionSrv.prototype.getMentorshipContribution=function(mentorshipId,contributionId){var self=this,deferred=$q.defer();return $http.get("/api/mentorship/"+mentorshipId+"/contribution/"+contributionId).success(function(data){self.mentorshipContribution=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipContributionSrv.prototype.editMentorshipContribution=function(mentorshipContributionData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/mentorship/contribution/edit",data:mentorshipContributionData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipContributionSrv};mentorshipContributionSrv.$inject=["$http","$q"],angular.module("app.mentorship").service("MentorshipContributionSrv",mentorshipContributionSrv);