var explorerSectionsSrv = function ($http, $q) {

 var ExplorerSectionsSrv = function () {
 };
 ExplorerSectionsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerSectionsSrv.prototype.getExplorerSections = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questions/3').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.getExplorerSection = function (explorerId, sectionId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/section/' + sectionId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.getSectionAnswersPreview = function (questionId, explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/answers/' + questionId + '/explorer/' + explorerId + '/preview').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.getSectionAnswers = function (questionId, explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/answers/' + questionId + '/explorer/' + explorerId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.createAnswer = function (answerData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/answers/create',
   data: answerData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.getSubSections = function (sectionId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/section/' + sectionId + '/sections').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.createExplorerSection = function (explorerSectionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/section/create',
   data: explorerSectionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.editExplorerSection = function (explorerSectionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/section/edit',
   data: explorerSectionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSectionsSrv.prototype.editExplorerSection = function (explorerSectionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/section/edit',
   data: explorerSectionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerSectionsSrv;
};

explorerSectionsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerSectionsSrv', explorerSectionsSrv);