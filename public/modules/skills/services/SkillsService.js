angular.module('app.skills').service('SkillsService', ['$http', function ($http) {
  return {
   // get all the comments
   get: function () {
    return $http.get('/api/skills');
   },
   // destroy a comment
   destroy: function (id) {
    return $http.delete('/api/comments/' + id);
   }
  }

 }
]);