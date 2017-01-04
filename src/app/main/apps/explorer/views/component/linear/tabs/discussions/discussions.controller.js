(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearDiscussionsController', ComponentLinearDiscussionsController);

 /** @ngInject */
 function ComponentLinearDiscussionsController(ExplorerComponentService, $rootScope)
 {
  var vm = this;
  //////////

  vm.posts = [];

  vm.posts.push(
          {
           "user": {
            "name": "Andrew Green",
            "avatar": "src/assets/images/avatars/andrew.jpg"
           },
           "message": "Hey, man! Check this, it’s pretty awesome!",
           "time": "June 12, 2015",
           "type": "article",
           "like": 98,
           "share": 6,
           "article": {
            "title": "The Fallout 4 Pip-Boy Edition Is Back In Stock Now",
            "subtitle": "Kotaku",
            "excerpt": "The Fallout 4 Pip-Boy edition is back in stock at Gamestop, for all 3 platforms. Additionally, Walmart also has it in stock for the PS4 and Xbox One as of this writing, as does Best Buy.",
            "media": {
             "type": "image",
             "preview": "src/assets/images/etc/fallout.jpg"
            }
           },
           "comments": [
            {
             "user": {
              "name": "Alice Freeman",
              "avatar": "src/assets/images/avatars/alice.jpg"
             },
             "time": "June 10, 2015",
             "message": "That’s a wonderful place. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et eleifend ligula. Fusce posuere in sapien ac facilisis. Etiam sit amet justo non felis ornare feugiat."
            }
           ]
          });
 }
})();