'use strict';

// Подключение плагинов
var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    preprocess = require('gulp-preprocess'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress');

const autoprefixer = require('gulp-autoprefixer');

// Пути для сборки
var path = {
    build: {
        root: 'prod/',
        js: 'prod/js/',
        fonts: 'prod/fonts',
        css: 'prod/css/',
        libs: 'prod/libs/',
        img: 'prod/img/'
    },
    src: {
        root: 'src/',
        html: 'src/html/**/[^_]*.html',
        sass: 'src/styles/**/*.scss',
        scripts: 'src/scripts/**/*.js',
        css: 'src/css/',
        js: 'src/js/',
        img: 'src/img/**/*.*',
        libs: 'src/libs/'
    },
    watch: {
        html: 'src/html/**/[^_]*.html',
        sass: 'src/styles/**/*.scss',
        scripts: 'src/scripts/**/*.js'
    },
    clean_dev: ['src/css/*.css', 'src/index.html', 'src/js/*.js'],
    clean_prod: ['prod/css/*.css', 'prod/index.html', 'prod/js/*.js']
};

// Конфиги для локального вебсервера
var webserver = {
    dev: {
        server: {
            baseDir: './src',
        },
        tunnel: true,
        host: 'localhost',
        port: 9001,
        logPrefix: 'app_dev'
    },
    prod: {
        server: {
            baseDir: './prod'
        },
        tunnel: true,
        host: 'localhost',
        port: 9002,
        logPrefix: 'app_prod'
    }
};

// Очистка папок и файлов

// development
gulp.task('clean:dev', function() {
    return gulp.src(path.clean_dev, {read: false})
        .pipe(clean());
});

// prod
gulp.task('clean:prod', function() {
    return gulp.src(path.clean_prod, {read: false})
        .pipe(clean());
});

// Компиляция sass, сборка стилей
// development
gulp.task('sass:dev', function(done) {
    gulp.src(path.src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.src.css))
        .pipe(browserSync.stream());
    done();
});

// prod
gulp.task('sass:prod', function(done) {
    gulp.src(path.src.sass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefyixer({
            browsers: ['last 10 versions']
        }))
        .pipe(gulp.dest(path.build.css));
    done();
});

// Оптимизация изображений
gulp.task('img', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
        //.pipe(debug({title: 'building img:', showFiles: true}))
        //.pipe(plumber(plumberOptions))
        .pipe(gulp.dest(path.build.img)) //Копируем изображения заранее, imagemin может пропустить парочку )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            pngquant({quality: '80'}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(path.build.img)); //И бросим в prod отпимизированные изображения
});

// Склеивание и минимизация скриптов
// development
gulp.task('js:dev', function(done) {

    gulp.src(path.src.scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(path.src.js))
        .pipe(browserSync.stream());
    done();
});

//prod
gulp.task('js:prod', function(done) {
    gulp.src(path.src.scripts)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
    done();
});

// Препроцессинг html
// development
gulp.task('html:dev', function(done) {

    gulp.src(path.src.html)
        .pipe(preprocess({context: {NODE_ENV: 'development', DEBUG: true}}))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.src.root))
        .pipe(browserSync.stream());
    done();
});

// prod
gulp.task('html:prod', function(done) {
    gulp.src(path.src.html)
        .pipe(preprocess({context: {NODE_ENV: 'production', DEBUG: true}}))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.root));
    done();
});

// watch

// development
gulp.task('watch:dev', function(done) {
    //browserSync(webserver.dev);
    /**/
    var files = [ '*.html', 'css/*.css', 'js/*.js', 'styles/*.scss', 'scripts/**/*.js', 'html/**/[^_]*.html' ];
    browserSync.init(files, {
        server: {
            baseDir: "./src",
            directory: true
        } });

    gulp.watch('src/styles/**/*.scss', gulp.parallel('sass:dev'));
    gulp.watch('src/scripts/*.js', gulp.parallel('js:dev'));
    gulp.watch('src/html/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('src/**/*.html').on('change', () => {
        browserSync.reload();
        done();
    });
    done();
});

// prod
gulp.task('watch:prod', function(done) {

    browserSync.init({
        server: "prod/"
    });

    gulp.watch("src/styles/*.scss", gulp.parallel('html:prod','sass:prod','js:prod','img'));
    gulp.watch("prod/*.html").on('change', () => {
        browserSync.reload();
        done();
    });

    done();
});

// Запуск локального веб-сервера

// development
gulp.task('webserver:dev', function() {
    browserSync(webserver.dev);
});

// prod
gulp.task('webserver:prod', function() {
    browserSync(webserver.prod);
});


// Режим разработки

gulp.task('dev', gulp.series(
    'clean:dev',
    gulp.parallel('html:dev','sass:dev','js:dev'),
    'watch:dev'
));

// Компилляция одной задачей в продакшен

gulp.task('prod', gulp.series(
    'clean:prod',
    gulp.parallel('html:prod','sass:prod','js:prod')
));