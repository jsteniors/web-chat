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
           gulp.src('src/sass/**/*.scss')
               .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        ])
       .pipe(concat('style.css'))
       .pipe(gulp.dest('lib'));
});


gulp.task('html', function () {
    return gulp.src(['src/**/*.html'])
        .pipe(gulp.dest('demo'));
});
//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.19/angular.js"></script>
gulp.task('teste', function () {
    return es.merge([
            gulp.src([
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/angular/angular.min.js'
            ]),
            gulp.src('src/js/**/*.js')
        ]).pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src([
                //'node_modules/jquery/dist/jquery.min.js',
                //'node_modules/angular/angular.min.js',
                'node_modules/socket.io-client/dist/socket.io.js',
                'src/socket/**/*.js'
            ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('lib'));
});




gulp.task('img', function () {
    return gulp.src(['img/**'])
        .pipe(gulp.dest('demo/img'));
});


gulp.watch(['src/**/*.html'], ['html']);
gulp.watch('src/sass/**/*.scss', ['sass']);
gulp.watch('src/socket/**/*.js', ['js']);
gulp.watch(['src/js/**/*.js'], ['teste']);

gulp.task('default', ['js', 'html', 'sass', 'img']);