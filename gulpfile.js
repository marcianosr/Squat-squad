var gulp = require('gulp')
    less = require('gulp-less'),
    wiredep = require('wiredep').stream;

gulp.task('default', ['bower', 'watch'], function() {
    console.log('start gym app!')
});

gulp.task('bower', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function (){

  gulp.watch('public/less/**/*.less', ['less']);
  // gulp.watch('public/css/**/*.css', browserSync.reload);
  // gulp.watch('public/*.html', browserSync.reload);
  // gulp.watch('public/js/**/*.js', browserSync.reload);
  // gulp.watch('public/**/*', ['useref']);

  // Other watchers

  console.log('watch...')
});

gulp.task('less', function () {
    console.log('less')
    return gulp.src('./public/less/**/*.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./public/css'));

});
