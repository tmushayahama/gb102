var profileTodoChecklistSrv = function ($http, $q) {

 var ProfileTodoChecklistSrv = function () {
  this.profileTodoChecklist = [];
 };
 ProfileTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileTodoChecklistSrv.prototype.getProfileTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.profileTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.profileTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTodoChecklistSrv.prototype.getProfileTodoChecklistItem = function (profileId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTodoChecklistSrv.prototype.createProfileTodoChecklistItem = function (profileTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: profileTodoChecklistData
  }).success(function (data) {
   self.profileTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTodoChecklistSrv.prototype.editProfileTodoChecklistItem = function (profileTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: profileTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProfileTodoChecklistSrv;
};

profileTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileTodoChecklistSrv', profileTodoChecklistSrv);