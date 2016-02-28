var communitySrv = function ($http, $q) {

 var CommunitySrv = function () {
  this.community = [];
 };
 CommunitySrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunitySrv.prototype.getCommunity = function (communityId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId).success(function (data) {
   self.community = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunitySrv.prototype.editCommunity = function (communityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/edit',
   data: communityData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CommunitySrv;
};

communitySrv.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunitySrv', communitySrv);
