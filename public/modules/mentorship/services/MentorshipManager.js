var mentorshipManager = function ($http, $q) {

 var MentorshipManager = function () {
  this.mentorship = [];
 };
 MentorshipManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
  if (!data || typeof data !== 'object') {
   this.error = 'Error';
  }
  if (!this.error && data.result && data.result.error) {
   this.error = data.result.error;
  }
  if (!this.error && data.error) {
   this.error = data.error.message;
  }
  if (!this.error && defaultMsg) {
   this.error = defaultMsg;
  }
  if (this.error) {
   return deferred.reject(data);
  }
  return deferred.resolve(data);
 };

 MentorshipManager.prototype.getMentorship = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId).success(function (data) {
   //self.mentorship = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipManager.prototype.getSubMentorships = function (parentExploreId) {
  var self = this;
  var deferred = $q.defer();
  //self.mentorships = [];
  $http.get('/api/mentorships/submentorships/' + parentExploreId).success(function (data) {
   //self.mentorships = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipManager.prototype.editMentorship = function (mentorshipData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/edit',
   data: mentorshipData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return MentorshipManager;
};

mentorshipManager.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipManager', mentorshipManager);
