var subExplorersCtrl=function(ExplorerSrv,$state,$stateParams,$http,$q,$rootScope){var vm=this;vm.explorerId=$stateParams.explorerId,vm.subExplorers,vm.explorerSrv=new ExplorerSrv,vm.gridsterOpts={columns:6,pushing:!0,floating:!0,swapping:!1,width:"auto",colWidth:"auto",rowHeight:"match",margins:[10,10],outerMargin:!0,isMobile:!1,mobileBreakPoint:600,mobileModeEnabled:!0,minColumns:1,minRows:2,maxRows:100,defaultSizeX:2,defaultSizeY:1,minSizeX:1,maxSizeX:null,minSizeY:1,maxSizeY:null,resizable:{enabled:!0,handles:["n","e","s","w","ne","se","sw","nw"],start:function(event,$element,widget){},resize:function(event,$element,widget){},stop:function(event,$element,widget){}},draggable:{enabled:!0,handle:".my-class",start:function(event,$element,widget){},drag:function(event,$element,widget){},stop:function(event,$element,widget){}}},vm.subExplorersMap={sizeX:"item.size.x",sizeY:"item.size.y",row:"item.position[0]",col:"item.position[1]",minSizeY:"item.minSizeY",maxSizeY:"item.maxSizeY"},vm.getSubExplorers=function(explorerId){vm.explorerSrv.getSubExplorers(explorerId).then(function(data){vm.subExplorers=data})},vm.getSubExplorers(vm.explorerId)};subExplorersCtrl.$inject=["ExplorerSrv","$state","$stateParams","$http","$q","$rootScope"],angular.module("app.explorer").controller("SubExplorersCtrl",subExplorersCtrl);