angular.module("app.promises").controller("PromiseTodosCtrl",["PromiseTodosManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log",function(a,b,c,d,e,f,g,h,i){var j=this;j.promiseId=d.promiseId,j.promiseTodosManager=new a,j.todoFormDisplay=!1,j.defaultPromiseTodoData={promiseId:d.promiseId,privacy:0},j.newPromiseTodoData=angular.copy(j.defaultPromiseTodoData),j.showTodoForm=function(){j.todoFormDisplay=!0},j.createPromiseTodo=function(a){j.promiseTodosManager.createPromiseTodo(a).then(function(a){j.todoFormDisplay=!1,j.newPromiseTodoData=angular.copy(j.defaultPromiseTodoData)},function(a){console.log(a)})},j.editPromiseTodo=function(a){j.promiseTodosManager.editPromiseTodo(a).then(function(a){j.todoFormDisplay=!1,j.newPromiseTodoData=angular.copy(j.defaultPromiseTodoData)},function(a){console.log(a)})},j.editPromiseTodoSections={title:function(a,b){var c={promiseTodoId:a,title:b};j.editPromiseTodo(c)}},j.cancelPromiseTodo=function(a){j.todoFormDisplay=!1,j.newPromiseTodoData=angular.copy(j.defaultPromiseTodoData),a&&(a.$setPristine(),a.$setUntouched())},j.editedTodo=null,b.$watch(angular.bind(this,function(){return j.promiseTodos}),function(){j.doneCount=j.promiseTodosManager.promiseTodos.length-j.remainingCount,j.allChecked=!j.remainingCount},!0),j.editTodo=function(a){j.editedTodo=a,j.originalTodo=angular.copy(a)},j.doneEditing=function(a){j.editedTodo=null,a.title=a.title.trim(),a.title||j.removeTodo(a)},j.openPromiseTodo=function(a){var c=h.open({animation:!0,templateUrl:"promise-todo-modal.html",controller:"PromiseTodoCtrl as promiseTodoCtrl",backdrop:"static",size:"xl",resolve:{promiseTodoData:function(){return a}}});c.result.then(function(a){b.selected=a},function(){i.info("Modal dismissed at: "+new Date)})},j.promiseTodosManager.getPromiseTodos(j.promiseId)}]);