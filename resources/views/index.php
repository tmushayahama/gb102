<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <title>SkillSection</title>
  <link href="node_modules/bootstrap/dist/css/bootstrap.css" rel="stylesheet" type="text/css">
  <link href="public/css/app.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/ss.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/ss_components.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/font-awesome.css" rel="stylesheet" type="text/css"/>

 </head>
 <body ng-app="gbApp" class="ng-cloak">
  <div ui-view id="main-container"></div>
 </body>

 <!-- Application Dependencies -->
 <script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
 <script src="bower_components/angular/angular.js" type="text/javascript"></script>
 <script src="node_modules/angular-ui-router/release/angular-ui-router.js" type="text/javascript"></script>
 <script src="bower_components/angular-resource/angular-resource.js" type="text/javascript"></script>
 <script src="bower_components/moment/moment.js" type="text/javascript"></script>
 <script src="bower_components/satellizer/satellizer.js" type="text/javascript"></script>

 <script src="bower_components/jquery-easing/jquery.easing.min.js" type="text/javascript"></script>
 <script src="bower_components/bootstrap/dist/js/bootstrap.js" type="text/javascript"></script>

 <!-- Application Scripts -->
 <script src="public/scripts/app.js" type="text/javascript"></script>
 <script src="public/scripts/agency.js" type="text/javascript"></script>
 <script src="public/scripts/classie.js" type="text/javascript"></script>
 <script src="public/scripts/jqBootstrapValidation.js" type="text/javascript"></script>

 <script src="public/scripts/services/TimeService.js"  type="text/javascript"></script>
 <script src="public/scripts/services/SkillService.js" type="text/javascript"></script>

 <script src="public/scripts/controllers/AuthCtrl.js" type="text/javascript"></script>
 <script src="public/scripts/controllers/UserCtrl.js" type="text/javascript"></script>
 <script src="public/scripts/controllers/TimeEntryCtrl.js" type="text/javascript"></script>
 <script src="public/scripts/controllers/AppsCtrl.js" type="text/javascript"></script>
 <script src="public/scripts/controllers/SkillsCtrl.js" type="text/javascript"></script>
</html>
