var goalNoteManager = function ($http, $q) {

 var GoalNoteManager = function () {
  this.goalNotes = [];
 };
 GoalNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GoalNoteManager.prototype.getGoalNote = function (goalId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId + '/note/' + noteId).success(function (data) {
   self.goalNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GoalNoteManager.prototype.editGoalNote = function (goalNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/note/edit',
   data: goalNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return GoalNoteManager;
};

goalNoteManager.$inject = ['$http', '$q'];

angular.module('app.goals').service('GoalNoteManager', goalNoteManager);