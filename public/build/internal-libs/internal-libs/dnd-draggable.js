angular.module("dndLists",[]).directive("dndDraggable",["$parse","$timeout","dndDropEffectWorkaround","dndDragTypeWorkaround",function($parse,$timeout,dndDropEffectWorkaround,dndDragTypeWorkaround){return function(scope,element,attr){element.attr("draggable","true"),attr.dndDisableIf&&scope.$watch(attr.dndDisableIf,function(disabled){element.attr("draggable",!disabled)}),element.on("dragstart",function(event){return event=event.originalEvent||event,"false"==element.attr("draggable")?!0:(event.dataTransfer.setData("Text",angular.toJson(scope.$eval(attr.dndDraggable))),event.dataTransfer.effectAllowed=attr.dndEffectAllowed||"move",element.addClass("dndDragging"),$timeout(function(){element.addClass("dndDraggingSource")},0),dndDropEffectWorkaround.dropEffect="none",dndDragTypeWorkaround.isDragging=!0,dndDragTypeWorkaround.dragType=attr.dndType?scope.$eval(attr.dndType):void 0,event._dndHandle&&event.dataTransfer.setDragImage&&event.dataTransfer.setDragImage(element[0],0,0),$parse(attr.dndDragstart)(scope,{event:event}),void event.stopPropagation())}),element.on("dragend",function(event){event=event.originalEvent||event;var dropEffect=dndDropEffectWorkaround.dropEffect;scope.$apply(function(){switch(dropEffect){case"move":$parse(attr.dndMoved)(scope,{event:event});break;case"copy":$parse(attr.dndCopied)(scope,{event:event});break;case"none":$parse(attr.dndCanceled)(scope,{event:event})}$parse(attr.dndDragend)(scope,{event:event,dropEffect:dropEffect})}),element.removeClass("dndDragging"),$timeout(function(){element.removeClass("dndDraggingSource")},0),dndDragTypeWorkaround.isDragging=!1,event.stopPropagation()}),element.on("click",function(event){attr.dndSelected&&(event=event.originalEvent||event,scope.$apply(function(){$parse(attr.dndSelected)(scope,{event:event})}),event.stopPropagation())}),element.on("selectstart",function(){this.dragDrop&&this.dragDrop()})}}]).directive("dndList",["$parse","$timeout","dndDropEffectWorkaround","dndDragTypeWorkaround",function($parse,$timeout,dndDropEffectWorkaround,dndDragTypeWorkaround){return function(scope,element,attr){function isMouseInFirstHalf(event,targetNode,relativeToParent){var mousePointer=horizontal?event.offsetX||event.layerX:event.offsetY||event.layerY,targetSize=horizontal?targetNode.offsetWidth:targetNode.offsetHeight,targetPosition=horizontal?targetNode.offsetLeft:targetNode.offsetTop;return targetPosition=relativeToParent?targetPosition:0,targetPosition+targetSize/2>mousePointer}function getPlaceholderElement(){var placeholder;return angular.forEach(element.children(),function(childNode){var child=angular.element(childNode);child.hasClass("dndPlaceholder")&&(placeholder=child)}),placeholder||angular.element("<li class='dndPlaceholder'></li>")}function getPlaceholderIndex(){return Array.prototype.indexOf.call(listNode.children,placeholderNode)}function isDropAllowed(event){if(!dndDragTypeWorkaround.isDragging&&!externalSources)return!1;if(!hasTextMimetype(event.dataTransfer.types))return!1;if(attr.dndAllowedTypes&&dndDragTypeWorkaround.isDragging){var allowed=scope.$eval(attr.dndAllowedTypes);if(angular.isArray(allowed)&&-1===allowed.indexOf(dndDragTypeWorkaround.dragType))return!1}return!attr.dndDisableIf||!scope.$eval(attr.dndDisableIf)}function stopDragover(){return placeholder.remove(),element.removeClass("dndDragover"),!0}function invokeCallback(expression,event,index,item){return $parse(expression)(scope,{event:event,index:index,item:item||void 0,external:!dndDragTypeWorkaround.isDragging,type:dndDragTypeWorkaround.isDragging?dndDragTypeWorkaround.dragType:void 0})}function hasTextMimetype(types){if(!types)return!0;for(var i=0;i<types.length;i++)if("Text"===types[i]||"text/plain"===types[i])return!0;return!1}var placeholder=getPlaceholderElement(),placeholderNode=placeholder[0],listNode=element[0];placeholder.remove();var horizontal=attr.dndHorizontalList&&scope.$eval(attr.dndHorizontalList),externalSources=attr.dndExternalSources&&scope.$eval(attr.dndExternalSources);element.on("dragenter",function(event){return event=event.originalEvent||event,isDropAllowed(event)?void event.preventDefault():!0}),element.on("dragover",function(event){if(event=event.originalEvent||event,!isDropAllowed(event))return!0;if(placeholderNode.parentNode!=listNode&&element.append(placeholder),event.target!==listNode){for(var listItemNode=event.target;listItemNode.parentNode!==listNode&&listItemNode.parentNode;)listItemNode=listItemNode.parentNode;listItemNode.parentNode===listNode&&listItemNode!==placeholderNode&&(isMouseInFirstHalf(event,listItemNode)?listNode.insertBefore(placeholderNode,listItemNode):listNode.insertBefore(placeholderNode,listItemNode.nextSibling))}else if(isMouseInFirstHalf(event,placeholderNode,!0))for(;placeholderNode.previousElementSibling&&(isMouseInFirstHalf(event,placeholderNode.previousElementSibling,!0)||0===placeholderNode.previousElementSibling.offsetHeight);)listNode.insertBefore(placeholderNode,placeholderNode.previousElementSibling);else for(;placeholderNode.nextElementSibling&&!isMouseInFirstHalf(event,placeholderNode.nextElementSibling,!0);)listNode.insertBefore(placeholderNode,placeholderNode.nextElementSibling.nextElementSibling);return attr.dndDragover&&!invokeCallback(attr.dndDragover,event,getPlaceholderIndex())?stopDragover():(element.addClass("dndDragover"),event.preventDefault(),event.stopPropagation(),!1)}),element.on("drop",function(event){if(event=event.originalEvent||event,!isDropAllowed(event))return!0;event.preventDefault();var transferredObject,data=event.dataTransfer.getData("Text")||event.dataTransfer.getData("text/plain");try{transferredObject=JSON.parse(data)}catch(e){return stopDragover()}var index=getPlaceholderIndex();return attr.dndDrop&&(transferredObject=invokeCallback(attr.dndDrop,event,index,transferredObject),!transferredObject)?stopDragover():(transferredObject!==!0&&scope.$apply(function(){scope.$eval(attr.dndList).splice(index,0,transferredObject)}),invokeCallback(attr.dndInserted,event,index,transferredObject),"none"===event.dataTransfer.dropEffect?"copy"===event.dataTransfer.effectAllowed||"move"===event.dataTransfer.effectAllowed?dndDropEffectWorkaround.dropEffect=event.dataTransfer.effectAllowed:dndDropEffectWorkaround.dropEffect=event.ctrlKey?"copy":"move":dndDropEffectWorkaround.dropEffect=event.dataTransfer.dropEffect,stopDragover(),event.stopPropagation(),!1)}),element.on("dragleave",function(event){event=event.originalEvent||event,element.removeClass("dndDragover"),$timeout(function(){element.hasClass("dndDragover")||placeholder.remove()},100)})}}]).directive("dndNodrag",function(){return function(scope,element,attr){element.attr("draggable","true"),element.on("dragstart",function(event){event=event.originalEvent||event,event._dndHandle||(event.dataTransfer.types&&event.dataTransfer.types.length||event.preventDefault(),event.stopPropagation())}),element.on("dragend",function(event){event=event.originalEvent||event,event._dndHandle||event.stopPropagation()})}}).directive("dndHandle",function(){return function(scope,element,attr){element.attr("draggable","true"),element.on("dragstart dragend",function(event){event=event.originalEvent||event,event._dndHandle=!0})}}).factory("dndDragTypeWorkaround",function(){return{}}).factory("dndDropEffectWorkaround",function(){return{}});