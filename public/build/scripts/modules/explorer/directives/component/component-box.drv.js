angular.module("app.explorer").directive("gbComponentBox",["ComponentsSrv","level_categories","$q",function(ComponentsSrv,level_categories,$q){"use strict";return{restrict:"EA",templateUrl:"public/build/scripts/modules/explorer/views/templates/component/component-box.tpl.html",scope:{component:"=",openComponent:"&"},controller:["$scope",function($scope){$scope.componentsLimitTo=8}],link:function(scope,element,attr,ctrl){scope.open=function(){scope.openComponent({omponentId:scope.component.id})}}}}]);