(function ($) {
    function Slide(par) {
        this.wrap = par.fat;
        this.img = par.imges;
        this.speed = par.speed || 2000;
        this.showBtn = par.showBtn || 'true';
        this.showNav = par.showNav || 'true';
        this.init();

    }
    Slide.prototype = {
        init: function () {
            this.newIndex = 0,
                this.len = this.img.length,
                this.itemWidth = $(this.wrap).width(),
                this.itemHeight = $(this.wrap).height();
            this.timer = null,
                this.key = true;
            this.createDom();
            this.clickBtn();
            this.slideShow();
        },
        createDom: function () {
            var imgBox = $('<ul class="innr"></ul>');
            if (this.showBtn == 'true') {
                var btn = $('<span class="btn-left"></span><span class="btn-right"></span>');
            } else if (this.showBtn == 'left') {
                var btn = $('<span class="btn-left"></span>');
            } else if (this.showBtn == 'right') {
                var btn = $('<span class="btn-right"></span>');
            } else if (this.showBtn == 'false') {
                var btn = '';
            }
            if (this.showNav == 'true') {
                var nav = $('<p class = "nav-box"></p>');
            } else { var nav = '' }
            var str = '', navStr = '';
            for (var i = 0; i < this.len; i++) {
                str += '<li><img src=' + this.img[i] + '></li>';
                navStr += '<span class="nav"></span>';
            }
            str += '<li><img src=' + this.img[0] + '></li>';
            $(imgBox).html(str);
            $(nav).html(navStr);
            console.log(navStr);
            $(this.wrap).append(imgBox);
            $(this.wrap).append(btn);
            $(this.wrap).append(nav);
            $(imgBox).css('width', this.itemWidth * (this.len + 1) + 'px');
            $(imgBox).children('li').css('width', this.itemWidth + 'px');
            $(nav).css('margin-left', -$(nav).width() / 2);
            console.log($(imgBox).width(), $(imgBox).height());
            console.log($(imgBox).children('li').width());
            console.log(this.itemWidth * (this.len + 1));
        },
        clickBtn: function () {
            var that = this;
            $('.btn-left').add('.btn-right').add('.nav-box span').on('click', function () {
                if ($(this).attr('class') == 'btn-left') {
                    that.show('left');
                } else if ($(this).attr('class') == 'btn-right') {
                    that.show('right');
                } else {
                    // console.log($(this).index())
                    var index = $(this).index();
                    that.show(index);
                }
            })
        },
        slideShow: function () {
            var that = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                that.show('right');
            }, that.speed)

        },
        show: function (str) {
            var that = this;
            if (this.key) {
                this.key = false;
                if (str == 'left' || str == 'right') {
                    if (str == 'left') {
                        // console.log(888)
                        if (this.newIndex == 0) {
                            $('.innr').css({
                                left: -(that.len * that.itemWidth)
                            })
                            that.newIndex = len - 1;
                        } else {
                            --that.newIndex;
                        }

                    } else {
                        // console.log(888)
                        if (this.newIndex == this.len - 1) {
                            $('.innr').animate({
                                left: -(that.len * that.itemWidth)
                            }, function () {

                                $('.innr').css('left', 0);
                                that.key = true;
                            })
                            that.newIndex = 0;
                        } else {
                            ++that.newIndex;
                        }

                    }
                } else {
                    that.newIndex = str;
                }

                this.slide();
                this.navStyle();
                this.boxHover();
            }
        },
        slide: function () {
            var that = this;
            $('.innr').animate({
                left: -(that.newIndex * that.itemWidth)
            }, function () {

                that.slideShow();
                that.key = true;
            })
        },
        navStyle: function () {
            var that = this;
            // console.log(that.itemWidth)
            $('.nav-on').removeClass('nav-on');
            $('.nav').eq(that.newIndex).addClass('nav-on');
        },
        boxHover: function () {
            var that = this;
            $(this.wrap).hover(function () {
                clearTimeout(that.timer)
            }, function () {
                that.slideShow();
            })
        }
    }
    $.fn.extend({
        addSlide: function (variable) {
            variable.fat = this || $('body');
            new Slide(variable);
        }
    })
}(jQuery));

// 使用方法
//插件要在jQuery后引入
//使用jQuery的$.fn.extend方法加载
//然后就可以随时调用了
//例： 
//$(ele).addSlide({
//     imges: [arr],  图片地址数组，必填
//     showBtn: 'str',  轮播按钮是否显示'true'默认值全部显示，'false'不显示，'left'显示左边，'right'显示右边
//     speed: num ,   轮播速度默认值2000
//     showNav： 'str'  是否显示导航 默认值'true'显示   'false' 不显示 
// })
