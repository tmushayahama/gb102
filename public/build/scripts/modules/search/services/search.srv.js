var searchSrv=function($http,$q){var SearchSrv=function(){this.search=[]};return SearchSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SearchSrv.prototype.simpleSearch=function(searchData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/search/simple",data:searchData}).success(function(data){self.search.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SearchSrv.prototype.simpleSearchSuggestion=function(searchData){return $http({method:"POST",url:"/api/search/suggestion",data:searchData})},SearchSrv};searchSrv.$inject=["$http","$q"],angular.module("app").service("SearchSrv",searchSrv);