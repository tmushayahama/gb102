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
 }

 var apps = [
  "goal",
  "promise",
  "hobby",
  "mentorship",
  "advice",
  "teach",
  "collaboration",
  "journal",
  "group",
  "project",
  "profile",
  "community"
 ];
 var srcs = [
  {
   cwd: 'public/modules/',
   src: ['skills/**']
  },
  {
   cwd: 'app/Http/Controllers/',
   src: ['Skill/**']
  },
  {
   cwd: 'app/Models/',
   src: ['Skill/**']
  },
  {
   cwd: 'database/data/components/',
   src: ['skill.mysql.sql']
  }
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
  grunt.config.set("copy.copy_build_files",
          {
           expand: true,
           cwd: 'public/',
           src: ['**/*.html'],
           dest: 'public/build/scripts'
          },
          {
           expand: true,
           cwd: 'public/',
           src: ['fonts/**', 'img/**'],
           dest: 'public/build'
          }
  );
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
              return dest + src.replace(/skill/g, app)
                      .replace(/Skill/g, app.capitalizeFirstLetter());

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
       match: /skill/g,
       replacement: app
      },
      {
       match: /Skill/g,
       replacement: app.capitalizeFirstLetter()
      },
      {
       match: /SKILL/g,
       replacement: app.toUpperCase()
      },
      {
       match: /app-theme-skill/g,
       replacement: 'app-theme-' + app
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['public/modules/' + app + 's/**'],
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


 grunt.registerTask('gb_build', [
  //'uglify',
  // 'copy:copy_build_files',
  // 'cssmin',
  // 'replace:build_scripts'
 ]);

 grunt.registerTask('gb_app_copy_replace', [
  'copyFiles', 'replaceFiles'
 ]);

 grunt.registerTask('server', [
  'express',
  //'open',
  'watch'
 ]);
};