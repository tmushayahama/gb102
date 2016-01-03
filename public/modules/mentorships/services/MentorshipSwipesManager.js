var mentorshipSwipesManager = function ($http, $q) {

 var MentorshipSwipesManager = function () {
  this.mentorshipSwipes = [];
 };
 MentorshipSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipSwipesManager.prototype.getMentorshipSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipSwipes = [];
  $http.get('/api/mentorships/swipes').success(function (data) {
   self.mentorshipSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 MentorshipSwipesManager.prototype.getMentorshipSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.mentorship = [];
  $http.get('/api/mentorships/swipe').success(function (data) {
   self.mentorship = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipSwipesManager.prototype.createMentorshipSwipe = function (mentorshipSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorships/swipe/create',
   data: mentorshipSwipeData
  }).success(function (data) {
   self.mentorshipSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipSwipesManager.prototype.editMentorship = function (mentorshipData) {
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
 return MentorshipSwipesManager;
};

mentorshipSwipesManager.$inject = ['$http', '$q'];

angular.module('app.mentorships').service('MentorshipSwipesManager', mentorshipSwipesManager);

