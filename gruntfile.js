// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function (grunt) {

 // Load Grunt tasks declared in the package.json file
 grunt.loadNpmTasks("grunt-contrib-watch");
 grunt.loadNpmTasks("grunt-contrib-copy");
 grunt.loadNpmTasks("grunt-contrib-concat");
 grunt.loadNpmTasks("grunt-contrib-uglify");
 grunt.loadNpmTasks("grunt-contrib-htmlmin");
 grunt.loadNpmTasks("grunt-contrib-cssmin");
 grunt.loadNpmTasks("grunt-replace");
 //grunt.loadNpmTasks("grunt-reload");
 //grunt.loadNpmTasks("connect-livereload");
 grunt.loadNpmTasks("grunt-express");

 String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
 };

 var apps = [
  // 'advice'
 ];
 var srcs = [
  {
   cwd: 'public/modules/',
   src: ['explorer/**']
  },
  {
   cwd: 'app/Http/Controllers/',
   src: ['Explorer/**']
  },
  {
   cwd: 'app/Models/',
   src: ['Explorer/**']
  },
  /*
   {
   cwd: 'database/data/components/',
   src: ['skill.mysql.sql']
   }
   */
 ];

 var options = {
  angular_base: "public",
 };


 grunt.initConfig(options);

 var express = {
  all: {
   options: {
    port: 8004,
    hostname: "localhost",
    bases: ['public'],
    livereload: true
   }
  }
 };

 grunt.registerTask('copyFiles', function () {

  apps.forEach(function (app) {
   var files = [];
   srcs.forEach(function (src) {
    files.push(
            {
             expand: true,
             cwd: src.cwd,
             src: src.src,
             dest: src.cwd,
             rename: function (dest, src) {
              return dest + src.replace(/explorer/g, app)
                      .replace(/Explorer/g, app.capitalizeFirstLetter());

             }
            });
   });
   grunt.config.set("copy." + app, {
    files: files
   });
   grunt.task.run('copy:' + app);
  });
 });

 grunt.registerTask('replaceFiles', function () {
  apps.forEach(function (app) {
   grunt.config.set("replace." + app, {
    options: {
     patterns: [
      {
       match: /explorer/g,
       replacement: app
      },
      {
       match: /Explorer/g,
       replacement: app.capitalizeFirstLetter()
      },
      {
       match: /EXPLORER/g,
       replacement: app.toUpperCase()
      },
      {
       match: /app-theme-explorer/g,
       replacement: 'app-theme-' + app
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['public/modules/' + app + '/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['app/Http/Controllers/' + app.capitalizeFirstLetter() + '/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['app/Models/' + app.capitalizeFirstLetter() + '/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['database/data/components/' + app + '.mysql.sql'],
      dest: ''
     }
    ]
   });
   grunt.task.run('replace:' + app);
  });
 });


 // Configure Grunt
 grunt.config("express", express);
 grunt.config.set("concat", {
  options: {
   separator: ''
  },
  sql: {
   src: ['database/data/main.mysql.sql', 'database/data/components/*.sql'],
   dest: 'database/data/generated.sql',
   //cwd: 'public'
  }
 });

 grunt.config("watch", {
  all: {
   files: 'public/**',
   options: {
    livereload: true
   }
  }
 });

 grunt.registerTask('copyBuildFiles', function () {

  grunt.config.set("copy.copy_build_files", {
   files: [{
     expand: true,
     cwd: 'public/',
     src: ['**/*.html'],
     dest: 'public/build/scripts'
    }, {
     expand: true,
     cwd: 'public/',
     src: ['fonts/**', 'img/**'],
     dest: 'public/build'
    }]
  });
  grunt.task.run('copy:copy_build_files');
 });

 grunt.registerTask('copyIndexFile', function () {

  grunt.config.set("copy.copy_index_file", {
   files: [{
     expand: true,
     cwd: 'public/app-v2/.tmp/serve/',
     src: ['index.html'],
     dest: 'public/app-v2'
    }]
  });
  grunt.config.set("replace.replace_index_file", {
   options: {
    patterns: [
     {
      match: /src="..\/bower_components/g,
      replacement: 'src="public/app-v2/bower_components'
     },
     {
      match: /href='..\/bower_components/g,
      replacement: "href='public/app-v2/bower_components"
     },
     {
      match: /src="app\//g,
      replacement: 'src="public/app-v2/app/'
     }
    ]
   },
   files: [
    {
     expand: true,
     src: ['public/app-v2/index.html'],
     dest: ''
    }
   ]
  });
  grunt.task.run('copy:copy_index_file');
  grunt.task.run('replace:replace_index_file');
 });

 grunt.registerTask('replaceBuildFiles', function () {

  grunt.config.set("replace.replace_build_files", {
   options: {
    patterns: [
     {
      match: /public\/modules/g,
      replacement: 'public/build/scripts/modules'
     },
     {
      match: /public\/css\/gb-sass/g,
      replacement: 'public/build/css/gb-sass'
     },
     {
      match: /public\/img/g,
      replacement: 'public/build/img'
     }
    ]
   },
   files: [
    {
     expand: true,
     src: ['public/build/scripts/**'],
     dest: ''
    }
   ]
  });
  grunt.task.run('replace:replace_build_files');
 });


 grunt.config("uglify", {
  build: {
   options: {
    mangle: false
   },
   files: [
    {
     expand: true,
     //flatten: true,
     src: ['modules/**/*.js'],
     dest: 'public/build/scripts',
     cwd: 'public'
    },
    {
     expand: true,
     //flatten: true,
     src: ['internal-libs/**/*.js'],
     dest: 'public/build/internal-libs',
     cwd: 'public'
    },
   ]
  }
 });
 grunt.config("cssmin", {
  target: {
   files: [{
     expand: true,
     cwd: 'public/',
     src: [
      'css/gb-sass/stylesheets/gb-themes/*.css',
      'css/gb-sass/stylesheets/main.css',
      'css/gb-sass/stylesheets/gb-landing-page.css'],
     dest: 'public/build/'
    }]
  }
 });
 grunt.config("htmlmin", {
  dist: {// Target
   options: {// Target options
    removeComments: true,
    collapseWhitespace: true
   },
   files: {
    expand: true,
    //flatten: true,
    src: ['modules/**/*.html'],
    dest: 'public/build/scripts',
    cwd: 'public/'
   }
  }
 });


 grunt.registerTask('gb_build', [
  'uglify',
  'copyBuildFiles',
  'cssmin',
  'replaceBuildFiles'
 ]);

 grunt.registerTask('gb_copy_index_file', [
  'copyIndexFile'
 ]);

 grunt.registerTask('gb_app_copy_replace', [
  'copyFiles', 'replaceFiles'
 ]);

 grunt.registerTask('files-to-lower',
         ['lowerCaseFiles']);

 grunt.registerTask('server', [
  'express',
  //'open',
  'watch'
 ]);
};