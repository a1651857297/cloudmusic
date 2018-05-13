//引入插件
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minCss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    data = require('./data/data.json');


//流程  先把所有需要的东西复制一遍放到目标文件夹  起服务  排列执行顺序


//开始布置任务  编译scss 压缩css 输出目标文件夹
gulp.task('css', function() {
        //开始的路径
        gulp.src('src/css/*.scss')
            //把scss文件编译成css文件
            .pipe(sass())
            //加上前缀
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0']
            }))
            //压缩css文件
            .pipe(minCss())
            //输出到目标文件夹
            .pipe(gulp.dest('build/css'))
    })
    //开始任务 压缩js文件 输出到指定文件夹
gulp.task('uglify', function() {
    //开始的路径
    gulp.src('src/js/*.js')
        //压缩js
        .pipe(uglify())
        //输出目标文件夹
        .pipe(gulp.dest('build/js'))
})

//开始任务 复制html文件
gulp.task('copyHtml', function() {
    //开始的路径
    gulp.src('src/*.html')
        //输出目标文件夹
        .pipe(gulp.dest('build'))
})

//开始任务 复制css文件
gulp.task('copyCss', function() {
    //开始的路径
    gulp.src('src/css/*.css')
        //输出目标文件夹
        .pipe(gulp.dest('build/css'))
})

//开始任务 复制img文件
gulp.task('copyImg', function() {
        //开始的路径
        gulp.src('src/imgs/*.{jpg,png}')
            //输出目标文件夹
            .pipe(gulp.dest('build/imgs'))
    })
    //开始任务 监听
gulp.task('watch', function() {
        //监听
        gulp.watch('src/*.html', ['coptHtml'])
        gulp.watch('src/scc/*.scss', ['css'])
        gulp.watch('src/js/*.js', ['uglify'])
    })
    //开始任务  起服务  [执行顺序]
gulp.task('server', ['css', 'copyCss', 'uglify', 'copyHtml', 'copyImg', 'watch'], function() {
        //运行的文件夹
        gulp.src('build')
            .pipe(server({
                //端口
                port: 9090,
                //自动打开
                open: true,
                //自动刷新浏览器
                livereload: true,
                middleware: function(req, res, next) {
                    if (req.url === '/api/data') {
                        res.end(JSON.stringify(data))
                    }
                    next()
                }
            }))
    })
    //任务
gulp.task('default', ['server'])