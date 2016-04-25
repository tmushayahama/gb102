var explorerNotesSrv = function ($http, $q) {

 var ExplorerNotesSrv = function () {
  this.explorerNotes = [];
 };
 ExplorerNotesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerNotesSrv.prototype.getExplorerNotes = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerNotes = [];
  $http.get('/api/explorer/' + explorerId + '/notes').success(function (data) {
   self.explorerNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerNotesSrv.prototype.getExplorerNote = function (explorerId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerNotes = [];
  $http.get('/api/explorer/' + explorerId + '/note/' + noteId).success(function (data) {
   self.explorerNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerNotesSrv.prototype.createExplorerNote = function (explorerNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/note/create',
   data: explorerNoteData
  }).success(function (data) {
   self.explorerNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerNotesSrv.prototype.editExplorerNote = function (explorerNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/note/edit',
   data: explorerNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerNotesSrv.prototype.editExplorerNote = function (explorerNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/note/edit',
   data: explorerNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerNotesSrv;
};

explorerNotesSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerNotesSrv', explorerNotesSrv);