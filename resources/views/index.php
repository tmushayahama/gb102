<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <title>Angular-Laravel Authentication</title>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
 </head>
 <body ng-app="authApp">

  <div class="container">
   <div ui-view></div>
  </div>

 </body>

 <!-- Application Dependencies -->
 <script type="application/javascript" src="node_modules/angular/angular.js"></script>
 <script type="application/javascript" src="node_modules/angular-ui-router/build/angular-ui-router.js"></script>
 <script type="application/javascript" src="node_modules/satellizer/satellizer.js"></script>

 <!-- Application Scripts -->
 <script type="application/javascript" src="public/scripts/app.js"></script>
 <script type="application/javascript" src="public/scripts/controllers/AuthController.js"></script>
 <script type="application/javascript" src="public/scripts/controllers/UserController.js"></script>
</html>