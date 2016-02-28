var mentorshipWeblinksSrv = function ($http, $q) {

 var MentorshipWeblinksSrv = function () {
  this.mentorshipWeblinks = [];
 };
 MentorshipWeblinksSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipWeblinksSrv.prototype.getMentorshipWeblinks = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipWeblinks = [];
  $http.get('/api/mentorship/' + mentorshipId + '/weblinks').success(function (data) {
   self.mentorshipWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipWeblinksSrv.prototype.getMentorshipWeblink = function (mentorshipId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipWeblinks = [];
  $http.get('/api/mentorship/' + mentorshipId + '/weblink/' + weblinkId).success(function (data) {
   self.mentorshipWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipWeblinksSrv.prototype.createMentorshipWeblink = function (mentorshipWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/weblink/create',
   data: mentorshipWeblinkData
  }).success(function (data) {
   self.mentorshipWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipWeblinksSrv.prototype.editMentorshipWeblink = function (mentorshipWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/weblink/edit',
   data: mentorshipWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipWeblinksSrv;
};


mentorshipWeblinksSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipWeblinksSrv', mentorshipWeblinksSrv);