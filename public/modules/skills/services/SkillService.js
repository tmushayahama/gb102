'use strict';
define([
 'angular',
], function (angular) {
 angular.module('app.skills')
         .factory('SkillService', ['$http', function ($http) {

           return {
            // get all the comments
            get: function () {
             return $http.post('/api/skills');
            },
            // save a comment (pass in comment data)
            save: function (commentData) {
             return $http({
              method: 'POST',
              url: '/api/comments',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: $.param(commentData)
             });
            },
            // destroy a comment
            destroy: function (id) {
             return $http.delete('/api/comments/' + id);
            }
           }

          }]);
});