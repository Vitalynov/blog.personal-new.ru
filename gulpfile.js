/* Сборка 22.02.2021г. */
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // добавление префиксов в .css для кросбраузерности
    uglify = require('gulp-uglify-es').default,
    del = require('del'), //плагин удаления
    sync = require('browser-sync').create(), // сервер
    plumber = require("gulp-plumber"),
    panini = require("panini"),
    sass = require('gulp-sass'), //преобразование файла scss в css
    cssnano = require("gulp-cssnano"),//сжатие файла css
    cssbeautify = require("gulp-cssbeautify"),
    removeComments = require('gulp-strip-css-comments'),
    csso = require('gulp-csso'), //сжатие файла css
    rename = require('gulp-rename'), //плагин переименования файлов с расширением .css и .js с префиксом min
    sourcemaps = require('gulp-sourcemaps'), // показывает ссылки, в каком файле или в дополнительном модуле находится код
    notify = require("gulp-notify"), // обработчик ошибки
    svgSprite = require('gulp-svg-sprite'), //делает файл sprite из файлов svg
    webpack = require('webpack'), //webpack
    webpackStream = require('webpack-stream'), //webpack
    ttf2woff = require('gulp-ttf2woff'), //преобразование текста из формата .ttf в .woff
    ttf2woff2 = require('gulp-ttf2woff2'), //преобразование текста из формата .ttf в .woff2
    fs = require('fs'),
    tiny = require('gulp-tinypng-compress'), // сжимает изображения https://tinypng.com/
    concat = require('gulp-concat'), //объеденяет файлы ( в нашем случае .css)
    fonter = require('gulp-fonter'), //преобразование текста из формата .otf в .ttf
    gulpif = require('gulp-if'),





    htmlmin = require('gulp-htmlmin'); // сжатие файла .html

let isProd = false; // dev by default

/*Функция для преобразования картинок.svg в общий файл sprite*/
const svgSprites = () => {
    return src('#src/assets/img/svg/**.svg')
        .pipe(dest('dist/img/svg'))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/img/sprite'));
};
/*Функция для работы с файлами .html*/
const html = (cb) => {
    panini.refresh();
    return src('#src/html/*.html', {base: '#src/html'})
        .pipe(plumber())
        .pipe(panini({
            root:       '#src/html',
            layouts:    '#src/html/layouts/',
            partials:   '#src/html/partials/',
            helpers:    '#src/html/helpers/',
            data:       '#src/html/data/'
        }))
        .pipe(gulpif(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(dest('dist/'));
    cb();
};


/*Функция для работы с файлами .scss*/
const scss = (cb) => {
    return src('#src/scss/*.scss', {base: '#src/scss/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 version'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest('dist/css/'))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest('dist/css/'));
        

    cb();
};



/* Перенос папки с файлами .json */
const jsonFolder = () => {
    return src('#src/assets/json/**.json')

        .pipe(dest('dist/json/'));
};
/* Перенос папки с файломи ВИДЕО */
const videoFolder = () => {
    return src('#src/assets/video/**')

        .pipe(dest('dist/video/'));
};

/* Перенос папки с фавиконами */
const iconsFolder = () => {
    return src('#src/assets/icons/**')

        .pipe(dest('dist/icons/'));
};

/*Функция для работы с файлами .js*/
const scripts = () => {
    return src('./#src/js/app.js')
        .pipe(gulpif(!isProd, webpackStream({
            mode: 'development',
            output: {
                filename: 'app.js'
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules | help)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env']
                            ]
                        }
                    }
                }]
            }
        })))
        .pipe(gulpif(isProd, webpackStream({
            mode: 'production',
            output: {
                filename: 'app.js'
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules | help)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env']
                            ]
                        }
                    }
                }]
            }
        })))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end');
        })
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(dest('dist/js/'))
        .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(dest('dist/js/'));

};
// const scripts = () => {
//     return src(['./#src/js/moduls/**.js', './#src/js/main.js'])
//         .pipe(gulpif(!isProd, sourcemaps.init()))
//         .pipe(concat('main.js'))
//         .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulpif(!isProd, sourcemaps.write('.')))
//         .pipe(dest('./dist/js'))
// };


/*Функция для переноса картинок без жатия*/
const img = () => {
    // return src('#src/assets/img/**/*.jpg', '#src/assets/img/**/*.png', '#src/assets/img/**/*.jpeg', '#src/assets/img/**/*.ico', '#src/assets/img/**/*.gif', '#src/assets/img/**/*.webp')
    return src('#src/assets/img/**/*.{jpg,jpeg,png,gif,ico,webp}')
        .pipe(gulpif(isProd, tiny({
            key: 'Lk3Zkyc67S57l5tNcDWftwDh6vYF78fF',
            parallel: true,
            sigFile: 'dist/img/.tinypng-sigs',
            parallelMax: 50,
            log: true
        })))
        .pipe(dest('./dist/img'));
};
/*Перенос папок и библиотек*/
const resources = () => {
    return src('#src/resources/**')
        .pipe(dest('dist'));
};

/*Преобразование шрифтов otf в ttf*/
//Задача запускается отдельно: gulp otf2ttf
const otf2ttf = () => {
    return src(['#src/assets/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest('#src/fonts/'));
};

/*Функция для конвертирования шрифта с .ttf в .woff и .woff2*/
const fonts = () => {
    src('#src/assets/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('dist/fonts/'));
    return src('#src/assets/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts/'));
};

/* Условие контроля толщины шрифта */
const checkWeight = (fontname) => {
    let weight;
    switch (true) {
        case /Thin/.test(fontname) || /thin/.test(fontname):
            weight = 100;
            break;
        case /ExtraLight/.test(fontname) || /extraLight/.test(fontname):
            weight = 200;
            break;
        case /Light/.test(fontname) || /light/.test(fontname):
            weight = 300;
            break;
        case /Regular/.test(fontname) || /regular/.test(fontname):
            weight = 400;
            break;
        case /Medium/.test(fontname) || /medium/.test(fontname):
            weight = 500;
            break;
        case /SemiBold/.test(fontname) || /semiBold/.test(fontname):
            weight = 600;
            break;
        case /Semi/.test(fontname) || /semi/.test(fontname):
            weight = 600;
            break;
        case /Bold/.test(fontname) || /bold/.test(fontname):
            weight = 700;
            break;
        case /ExtraBold/.test(fontname) || /extraBold/.test(fontname):
            weight = 800;
            break;
        case /Heavy/.test(fontname) || /heavy/.test(fontname):
            weight = 700;
            break;
        case /Black/.test(fontname) || /Black/.test(fontname):
            weight = 900;
            break;
        default:
            weight = 400;
    }
    return weight;
};

const cb = () => {};

let srcFonts = './#src/scss/add/mixins/_fonts.scss';
let distFonts = './dist/fonts/';
/* Функция подключения шрифтов в файле _fonts.scss*/
const fontsStyle = (done) => {
    //let file_content = fs.readFileSync(srcFonts);
    fs.writeFile(srcFonts, '', cb);
    fs.readdir(distFonts, function (err, items) {
        if (items) {
            let cFontname;
            for (var i = 0; i < items.length; i++) {
                let fontname = items[i].split('.');
                fontname = fontname[0];
                let font = fontname.split('-')[0];
                let weight = checkWeight(fontname);
                if (cFontname != fontname) {
                    fs.appendFile(srcFonts, `@include font-face("${font}", "${fontname}", ${weight});\r\n //font-family: '${font}', sans-serif;\r\n`, cb);
                }
                cFontname = fontname;
            }
        }
    });
    done();
};

/*Удаление папки dist через функцию clean*/
const clear = () => {
    return del('dist');
};

/*Отслеживание за изменениями файлов в браузере browserSync - сервера*/
const watchFile = () => {
    sync.init({
        server: './dist'
    });
    watch('#src/html/**/*.html', series(html)).on('change', sync.reload);
    watch('#src/scss/**/*.scss', series(scss)).on('change', sync.reload);
    watch('#src/assets/json/*.json', series(jsonFolder)).on('change', sync.reload);
    watch('#src/assets/video/**', series(videoFolder)).on('change', sync.reload);
    watch('#src/assets/icons/**', series(iconsFolder)).on('change', sync.reload);
    watch('#src/assets/img/**/*.{jpg,jpeg,png,gif,ico,webp}', series(img)).on('change', sync.reload);
    watch('#src/assets/img/svg/**/*.svg', series(svgSprites)).on('change', sync.reload);
    watch('#src/resources/**', series(resources)).on('change', sync.reload);
    watch('#src/assets/fonts/**.ttf', series(fonts)).on('change', sync.reload);
    watch('#src/assets/fonts/**.ttf', series(fontsStyle)).on('change', sync.reload);
    watch('#src/js/**/*.js', series(scripts)).on('change', sync.reload);
};

const toProd = (done) => {
    isProd = true;
    done();
};

//exports.watch = watchFile;
exports.otf2ttf = otf2ttf; // Для преобразования шрифта с формата .otf в формат  .ttf, нужно набрать 
//команду:gulp otf2ttf. Все шрифты с расширением .otf нужно положить в папку: #src/assets/fonts/


//сборка по дефолту, нужно набрать команду: gulp
exports.default = series(clear, parallel(html, scripts, fonts, resources, img, svgSprites, jsonFolder, videoFolder, iconsFolder), fontsStyle, scss, watchFile);

//Что бы собрать сборку build, нужно набрать команду: gulp build
exports.build = series(toProd, clear, parallel(html, scripts, fonts, resources, svgSprites, jsonFolder, videoFolder, iconsFolder), fontsStyle, scss, img);