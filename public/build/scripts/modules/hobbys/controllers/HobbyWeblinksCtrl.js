angular.module("app.hobbys").controller("HobbyWeblinksCtrl",["HobbyWeblinksManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.hobbyId=d.hobbyId,k.hobbyWeblinksCopy,k.hobbyWeblinksManager=new a,k.weblinkFormDisplay=!1,k.defaultHobbyWeblinkData={hobbyId:d.hobbyId,privacy:0},k.newHobbyWeblinkData=angular.copy(k.defaultHobbyWeblinkData),k.showWeblinkForm=function(){k.weblinkFormDisplay=!0},k.createHobbyWeblink=function(a){k.hobbyWeblinksManager.createHobbyWeblink(a).then(function(a){k.weblinkFormDisplay=!1,k.newHobbyWeblinkData=angular.copy(k.defaultHobbyWeblinkData),k.hobbyWeblinksCopy=angular.copy(k.hobbyWeblinksManager.hobbyWeblinks)},function(a){console.log(a)})},k.editHobbyWeblink=function(a){k.hobbyWeblinksManager.editHobbyWeblink(a).then(function(a){k.weblinkFormDisplay=!1,k.newHobbyWeblinkData=angular.copy(k.defaultHobbyWeblinkData),k.hobbyWeblinksCopy=angular.copy(k.hobbyWeblinksManager.hobbyWeblinks)},function(a){console.log(a)})},k.editHobbyWeblinkSections={details:function(a,b){var c={hobbyWeblinkId:a,title:b.title,description:b.description};k.editHobbyWeblink(c)}},k.cancelHobbyWeblink=function(a){k.weblinkFormDisplay=!1,k.newHobbyWeblinkData=angular.copy(k.defaultHobbyWeblinkData),a&&(a.$setPristine(),a.$setUntouched())},k.revertHobbyWeblink=function(a,b){a=b},k.editedWeblink=null,b.$watch(angular.bind(this,function(){return k.hobbyWeblinks}),function(){k.doneCount=k.hobbyWeblinksManager.hobbyWeblinks.length-k.remainingCount,k.allChecked=!k.remainingCount},!0),k.editWeblink=function(a){k.editedWeblink=a,k.originalWeblink=angular.copy(a)},k.doneEditing=function(a){k.editedWeblink=null,a.title=a.title.trim(),a.title||k.removeWeblink(a)},k.openHobbyWeblink=function(a){var c=h.open({animation:!0,templateUrl:"hobby-weblink-modal.html",controller:"HobbyWeblinkCtrl as hobbyWeblinkCtrl",backdrop:"static",size:"xl",resolve:{hobbyWeblinkData:function(){return a}}});c.result.then(function(a){b.selected=a},function(){i.info("Modal dismissed at: "+new Date)})},k.hobbyWeblinksManager.getHobbyWeblinks(k.hobbyId)}]);