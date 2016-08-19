var gulp = require('gulp')
    less = require('gulp-less'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    useref = require('gulp-useref'),
    concat = require('gulp-concat');


gulp.task('serve', ['less', 'wiredep-useref'], function() {
    console.log('start gym app!')
});


gulp.task('wiredep-useref', function (){
  // Wire dependencies from the bower_components folder
  // Custom files are bundled in combined.js.

  //TO DO: combine and minify all dependencies and custom scripts
  return gulp.src('./public/app/*.html')
     .pipe(wiredep())
     .pipe(useref())
     .pipe(gulp.dest('./public/dist'));

});


gulp.task('less', function () {
    console.log('less')
    return gulp.src('./public/app/less/*.less')
      .pipe(less({
        paths: ['./public/app/less/*.less' ]
      }))
      .pipe(gulp.dest('./public/app/css'));

});


/*  WIP   */
gulp.task('inject', function () {
  var target = gulp.src('./public/app/index.html');

  var injectCustomFiles = gulp.src(['./public/app/js/*.js', './public/app/css/*.css'], {read: false});

  //epic bug happening when seprating tasks wiredep and inject... it's messing index.html up
  return target.pipe(inject(injectCustomFiles))
    .pipe(wiredep())
    .pipe(gulp.dest('./public/dist'));
});
