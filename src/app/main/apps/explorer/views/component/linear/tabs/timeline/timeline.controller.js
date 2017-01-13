(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearTimelineController', ComponentLinearTimelineController);

 /** @ngInject */
 function ComponentLinearTimelineController(ComponentService, msApi, $q, $stateParams, $rootScope)
 {
  var vm = this;

  // Data
  vm.timeline = [];
  vm.timelineOptions = {
   scrollEl: '#content'
  };
  vm.currentPage = 1;
  vm.totalPages = 3;
  vm.pauseScroll = false;

  // Methods
  vm.loadNextPage = loadNextPage;
  //////////

  init();

  /**
   * Load next page
   * @returns promise
   */
  function loadNextPage()
  {
   // Create a new deferred object
   var deferred = $q.defer();

   // Increase the current page number
   vm.currentPage = vm.currentPage + 1;

   // Check if we still have pages that we can load
   if (vm.currentPage > vm.totalPages)
   {
    // Reject the promise
    deferred.reject('No more pages');
   } else
   {
    // Emulate the api call and load new timeline items in
    var pageName = 'timeline.page' + vm.currentPage + '@get';

    msApi.request(pageName, {},
            function (response)
            {
             for (var i = 0; i < response.data.length; i++)
             {
              // vm.timeline.push(response.data[i]);
             }

             // Resolve the promise
             deferred.resolve(response);
            },
            function (response)
            {
             // Reject the promise
             deferred.reject(response);
            }
    );
   }

   return deferred.promise;
  }

  /**
   * Initialize
   */
  function init()
  {
   ComponentService.getComponent($stateParams.id, 4).then(function (data) {
    vm.timeline = [];
    angular.forEach(data.components, function (component) {
     vm.timeline.push({
      "card": {
       "template": "src/app/core/directives/ms-card/templates/template-10/template-10.html",
       "title": component.type.title,
       "subtitle": component.title,
       "media": {
        "image": {
         "src": "src/assets/images/profile_pic/" + component.creator.avatar_url,
         "alt": component.creator.firstname
        }
       },
       "text": component.description
      },
      "icon": "icon-gb-" + component.type.title.toLowerCase(),
      "time": "July 22, 2015, 12:33AM",
      "event": "Alice Freeman shared an article with public"
     });
    });
    // vm.timeline.newComponentData = angular.copy(vm.defaultComponentData);
   });
  }
 }
})();