gulp = require('gulp');
concat = require('gulp-concat');
sass = require('gulp-sass');
uglify = require('gulp-uglify');
clean = require('gulp-clean');
es = require('event-stream');

gulp.task('clean', function () {
   return gulp.src('dist/')
       .pipe(clean());
});

gulp.task('sass', function () {
   return es.merge([
           gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
               'node_modules/open-iconic/font/css/open-iconic.min.css',
               'node_modules/font-awesome/css/font-awesome.min.css']),
           gulp.src('sass/**/*.scss')
               .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        ])
       .pipe(concat('style.css'))
       .pipe(gulp.dest('lib'));
});


gulp.task('html', function () {
    return gulp.src(['index.html', 'chat.html'])
        .pipe(gulp.dest('demo'));
});

gulp.task('js', function () {
    return es.merge([
            gulp.src(['node_modules/jquery/dist/jquery.min.js',
                'node_modules/angular/angular.min.js',
            ]),
            gulp.src('js/**/*.js')
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('lib'));
});




gulp.task('img', function () {
    return gulp.src(['img/**'])
        .pipe(gulp.dest('demo/img'));
});


gulp.watch(['index.html', 'chat.html'], ['html']);
gulp.watch('sass/!**!/!*.scss', ['sass']);
gulp.watch('js/!**!/!*.js', ['js']);

gulp.task('default', ['js', 'html', 'sass', 'img']);