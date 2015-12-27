var mentorshipTodoChecklistManager = function ($http, $q) {

 var MentorshipTodoChecklistManager = function () {
  this.mentorshipTodoChecklist = [];
 };
 MentorshipTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipTodoChecklistManager.prototype.getMentorshipTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.mentorshipTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipTodoChecklistManager.prototype.getMentorshipTodoChecklistItem = function (mentorshipId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipTodoChecklistManager.prototype.createMentorshipTodoChecklistItem = function (mentorshipTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: mentorshipTodoChecklistData
  }).success(function (data) {
   self.mentorshipTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipTodoChecklistManager.prototype.editMentorshipTodoChecklistItem = function (mentorshipTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: mentorshipTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipTodoChecklistManager;
};

mentorshipTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.mentorships').service('MentorshipTodoChecklistManager', mentorshipTodoChecklistManager);