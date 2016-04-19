var explorerNoteSrv = function ($http, $q) {

 var ExplorerNoteSrv = function () {
  this.explorerNotes = [];
 };
 ExplorerNoteSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerNoteSrv.prototype.getExplorerNote = function (explorerId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/note/' + noteId).success(function (data) {
   self.explorerNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerNoteSrv.prototype.editExplorerNote = function (explorerNoteData) {
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

 return ExplorerNoteSrv;
};

explorerNoteSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerNoteSrv', explorerNoteSrv);