var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify  = require ('gulp-uglify');

gulp.task('styles', function(){
  return gulp.src('assets/css/sass/main.scss')
  .pipe(sass({ outputStyle: 'compressed'}))
  .pipe(rename('app.css'))
  .pipe(gulp.dest('public/css'));
});

gulp.task ('js', function(){
  return gulp.src('assets/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('public/js'));
  
});

gulp.task('watch', function(){
  gulp.watch('assets/css/sass/*.scss', ['styles']);
  gulp.watch('assets/js/*.js', ['js']);
  gulp.watch('public/index.html');
});

gulp.task('default', ['styles', 'js', 'watch']); 