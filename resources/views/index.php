<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <title>SkillSection</title>
  <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/app.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/ss.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/ss_components.css" rel="stylesheet" type="text/css"/>
  <link href="public/css/font-awesome.css" rel="stylesheet" type="text/css"/>

 </head>
 <body class="">
  <div>
   <a ui-sref="module1">Lazy Module1</a>
  </div>

  <div>
   <a ui-sref="module2">Lazy Module2</a>
  </div>


  <div ui-view></div>

  <div  id="main-containe"></div>
 </body>


 <!-- Application Scripts -->
 <script src="public/scripts/require-confi.js" type="text/javascript"></script>


 <script data-main="public/scripts/require-config" src="bower_components/requirejs/require.js" type="text/javascript"></script>
</html>