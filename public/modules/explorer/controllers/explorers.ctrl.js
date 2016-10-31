
var explorersCtrl = function (
        level_categories,
        ConstantsSrv,
        CommunitySrv,
        SearchSrv,
        ComponentsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css,
        $interval) {

 var vm = this;

 $scope.awesomeThings = [
  'HTML5 Boilerplate',
  'AngularJS',
  'Karma'
 ];



 vm.componentsSrv = new ComponentsSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.communitySrv = new CommunitySrv();

 $rootScope.appName = 'Explorer';
 vm.explorerLevels;
 vm.components = [];
 vm.handpickedExplorers = [];
 //vm.appTypes;

 vm.featured = [];
 vm.appTypes;
 $rootScope.subAppName = "ALL";

 /*
  vm.getComponents = function (component, resultFormat) {
  vm.componentsSrv.getComponents(component.id, resultFormat).then(function (response) {
  vm.component = component;
  vm.component.components = response;
  vm.component.newComponentData = vm.getDefaultComponentData();
  }, function (error) {
  console.log(error);
  });
  };
  */

 vm.getComponents = function (resultFormat) {
  vm.componentsSrv.getComponents(resultFormat).then(function (response) {
   vm.components = response;
  }, function (error) {
   console.log(error);
  });
 };

 $rootScope.openAddExplorerModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-component-modal.html',
   controller: 'AddComponentCtrl as addComponentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communitySrv: function () {
     return vm.communitySrv;
    },
    constantsSrv: function () {
     return vm.constantsSrv;
    },
    apps: function () {
     return vm.apps;
    }
   }
  });

  modalInstance.result.then(function (explorer) {
   vm.componentsSrv.createExplorer(explorer).then(function (data) {
    $state.go("apps.componentItem.explore", {"componentId": data.id});
   });
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.createExplorer = function (data) {
  vm.componentsSrv.createExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorersCopy = angular.copy(vm.componentsSrv.explorers);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorer = function (data) {
  vm.componentsSrv.editExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorersCopy = angular.copy(vm.componentsSrv.explorers);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSections = {
  details: function (explorerId, detail) {
   var explorerData = {
    explorerId: explorerId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorer(explorerData);
  }
 }

 //--------init------
 vm.getComponents(2);



 $scope.config = [
  {
   type: "location_change",
   // path: "/"
  },
  {
   type: "title",
   heading: "Welcome to the NG-Joyride demo",
   text: '<div class="row"><div id="title-text" class="col-md-12"><span class="main-text">Welcome to <strong>Ng Joyride Demo</strong></span><br><span>( This demo will walk you through the features of Ng-Joyride. )</span><br/><br/><span class="small"><em>This can have custom html too !!!</em></span></div></div>',
   curtainClass: "randomClass"

  },
  {
   type: "title",
   heading: "Ng-joyride has new features",
   text: '<div class="row"><div id="title-text" class="col-md-12"><span class="main-text">Support for Dynamic configs.Config object or part of the config' +
           ' might change after the joyride is loaded.</span><br/><span class="small"><em>You can bring your configs via ajax !!!</em></span></div></div>',
   curtainClass: "randomClass"

  },
  {
   type: "element",
   selector: "#gb-nav-btns-1",
   heading: "Title can have <em>HTML</em>",
   text: "They can also be appended to the <em> body</em>",
   placement: "bottom",
   scroll: true,
   attachToBody: true
  },
  {
   type: "element",
   selector: ".gb-top-nav-4",
   heading: "Step 1",
   text: "I can come over any element.Even the background and the popover is customizable per step",
   placement: "bottom",
   curtainClass: "blueColour",
   scroll: true,
   elementTemplate: function (content, isEnd) {
    //The joyride will invoke this function while rendering this element.
    //Content : The "text" to be shown in the element.
    //isEnd: Signifying if this is the end of the joyride so that you can style it differently.
    var template =
            '<div class=\"row custom-color\">' +
            '<div id=\"pop-over-text\" class=\"col-md-12\">' +
            content +
            '</div>' +
            '</div>' +
            '<hr>' +
            '<div class=\"row custom-bg\">' +
            '<div class=\"col-md-4 center\">' +
            '<a class=\"skipBtn pull-left\" type=\"button\">Skip</a>' +
            '</div>' +
            '<div class=\"col-md-8\">' +
            '<div class=\"pull-right\">' +
            '<button id=\"prevBtn\" class=\"prevBtn btn btn-xs\" type=\"button\">Previous</button>' +
            ' <button id=\"nextBtn\" class=\"nextBtn btn btn-xs btn-primary\" type=\"button\">' +
            'Next&nbsp;<i class=\"glyphicon glyphicon-chevron-right\">'
    '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    return template;
   }
  },
  {
   type: "element",
   selector: "#gb-add-explorer-btn",
   heading: "Step 2",
   text: "I can change placement.Instead of next you can click the checkbox to advance",
   placement: "left",
   scroll: true,
   advanceOn: {element: '#gb-add-explorer-btn', event: 'click'}
  },
  {
   type: "location_change",
   path: "/demo"
  },
  {
   type: "element",
   selector: "#features",
   heading: "Step 3",
   text: "I can change pages",
   placement: "bottom",
   scroll: true
  },
//
//                {
//                    type: "element",
//                    selector: "#featured",
//                    heading: "Step 5",
//                    text: "I can change pages",
//                    placement: "bottom",
//                    scroll:true
//                },
  {
   type: "function",
   // fn: openModalForDemo
  },
  {
   type: "element",
   selector: "#modal1",
   heading: "Step 4",
   text: "I can open modals",
   placement: "bottom"
  },
  {
   type: "element",
   selector: "#modal2",
   heading: "Step 5",
   text: "I can call functions",
   placement: "bottom"
  },
  {
   type: "element",
   selector: "#modal3",
   heading: "Step 6",
   text: "I can reference any element that is not in DOM when the joyride is initialized",
   placement: "bottom"
  },
  {
   type: "function",
   fn: 'closeModalForDemo'
  },
  {
   type: "element",
   selector: "#finish",
   heading: "Step 7",
   text: "The demo finishes.Head over to github to learn more",
   placement: "top",
   scroll: true
  }
 ];

 var count = 0;
 $scope.startJoyRide = false;
 $scope.start = function () {
  if (count > 0) {
   generateAlternateConfig();
  }
  count++;
  $scope.startJoyRide = true;

 }
 function generateAlternateConfig() {
  //This is to show that it can have dynamic configs which can change . The joyride would not need to be initialized again.
  $scope.config[3].text = "I can have dynamic text that can change in between joyrides"
 }


 vm.tabs = [];
 vm.scrlTabsApi = {};

 vm.reCalcScroll = function () {
  if (vm.scrlTabsApi.doRecalculate) {
   vm.scrlTabsApi.doRecalculate();
  }
 };

 vm.scrollIntoView = function (arg) {
  if (vm.scrlTabsApi.scrollTabIntoView) {
   vm.scrlTabsApi.scrollTabIntoView(arg);
  }
  ;
 };

 vm.addTab = function () {
  vm.tabs.push({
   heading: 'New Tab ' + vm.tabs.length,
   content: 'This is the content for a NEW tab ' + vm.tabs.length
  });
 };

 vm.removeTab = function () {
  vm.tabs.splice(vm.tabs.length - 1, 1);
 };

 for (var i = 0; i < 15; i++) {
  vm.tabs.push({
   heading: 'Tab ' + i,
   content: 'This is the content for tab ' + i
  });
 }


 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explorer.css'
 }, $scope);


 $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern};
 $interval(function () {
  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern};
 }, 5000);



};

explorersCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'CommunitySrv',
 'SearchSrv',
 'ComponentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css',
 '$interval'];

angular.module("app.explorer").controller('ExplorersCtrl', explorersCtrl);