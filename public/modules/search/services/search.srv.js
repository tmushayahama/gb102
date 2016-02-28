var searchSrv = function ($http, $q) {

 var SearchSrv = function () {
  this.search = [];
 };
 SearchSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SearchSrv.prototype.simpleSearch = function (searchData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/search/simple',
   data: searchData
  }).success(function (data) {
   self.search.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SearchSrv.prototype.simpleSearchSuggestion = function (searchData) {
  var self = this;
  return $http({
   method: 'POST',
   url: '/api/search/suggestion',
   data: searchData
  });
 };

 return SearchSrv;
};

searchSrv.$inject = ['$http', '$q'];

angular.module('app').service('SearchSrv', searchSrv);

