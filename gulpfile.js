var gulp = require('gulp'),
  sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify');

// Define the task. Call it 'styles'
// The method takes two arguments: the name of the task, and a callback function
gulp.task('styles', function() {

  // Use gulp.src() to set up what files we want to look at
  // Pass a string of the location of the files we want to watch
  gulp.src('sass/materialize.scss')
  	.pipe(sass().on('error', sass.logError))

  	// Put destination of the newly compiled sass 
  	.pipe(gulp.dest('./app/css/'))
  	.pipe(rename({suffix: '.min'}))
  	.pipe(cssnano())
  	.pipe(gulp.dest('./app/css/'))
  	.pipe(notify({message: 'Materialize task complete'}));
});

// Watch task
gulp.task('default', function() {
  gulp.watch('sass/materialize.scss', ['styles']);
});