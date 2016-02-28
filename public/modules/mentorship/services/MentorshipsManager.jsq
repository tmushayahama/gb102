var mentorshipsSrv = function ($http, $q) {

 var MentorshipsSrv = function () {
  this.mentorships = [];
 };
 MentorshipsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipsSrv.prototype.getAllMentorships = function () {
  var self = this;
  var deferred = $q.defer();
  //self.mentorships = [];
  $http.get('/api/mentorships/all').success(function (data) {
   //self.mentorships = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipsSrv.prototype.getAppMentorships = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.mentorships = [];
  $http.get('/api/mentorships/all/' + appName).success(function (data) {
   //self.mentorships = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipsSrv.prototype.getMyMentorships = function () {
  var self = this;
  var deferred = $q.defer();
  //self.mentorships = [];
  $http.get('/api/mentorships/mine').success(function (data) {
   //self.mentorships = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipsSrv.prototype.getMentorship = function (mentorshipId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.mentorship = [];
  $http.get('/api/mentorship/' + mentorshipId + '//' + Id).success(function (data) {
   self.mentorship = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipsSrv.prototype.createMentorship = function (mentorshipData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/create',
   data: mentorshipData
  }).success(function (data) {
   self.mentorships.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipsSrv.prototype.editMentorship = function (mentorshipData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorshipedit',
   data: mentorshipData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return MentorshipsSrv;
};

mentorshipsSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipsSrv', mentorshipsSrv);

