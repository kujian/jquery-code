/**
 *  @author liruiyun
 *
 *  @date  2013/06/27
 *
 *  @desc  无缝滚动幻灯
 *
 *  speed: 速度
 *  btn: 按钮
 *  next：向右滚动按钮
 *  prev：向左滚动按钮
 *  direction：方向；暂支持left、right
 *
 */

(function($) {

    function Slider(opts) {
        this.opt = $.extend({}, this.opt, opts);
        this.init();
        
        var me = this;
        
        return {
        	goNext: function() {
        		me.goNext.apply(me, arguments);
        	},
        	goPrev: function() {
        		me.goPrev.apply(me, arguments);
        	},
        	show: function() {
        		me.show.apply(me, arguments);
        	},
        	on: function() {
        		me.on.apply(me, arguments);
        	}
        };
    }

    Slider.prototype = {
        opt: {
        	elem: null,
        	width: null,
        	selector: {
        		play: '.play',
        		img: 'img',
        		next: '.next',
                prev: '.prev'
        	},
            speed: 1000,
            btn: true,
            direction: 'left'
        },

        init: function() {
            var me = this, o = this.opt;
            
            me.num = 0;
            me.running = false;
            this.timer = null;

            this._event = {};
            
            o.elem && (me.$elem = $(o.elem));
            me.$play = me.$elem.find(o.selector.play);
            
            me.render();
            me.bindEvents();
        },
        
        render: function() {
        	var me = this,
        		o = this.opt,
        		$slider = me.$elem, 
                $play = me.$play, 
                $img = $play.find('img');

            ! o.width && (o.width = $play.width());

            var w = o.width, n = me.count = $img.length;

            $play.css('width', w*n);
            o.btn && me.createBtn($slider);
            me.createBox($slider);
        },

        createBtn: function($slider) {
            var me = this, n = this.count, span = '', btn;

            for(var i = 0; i < n; i++){
                span += '<span></span>';
            }
            
            btn = '<div class="btn" >'+ span +'</div>';
            var $btn = $(btn).appendTo($slider), btnW = $btn.width();

            this.$btn = $btn;
            
            $btn.css('margin-left', -btnW*0.5);
            
            $btn.on('click', 'span', function() {
                me.show($(this).index());
            });
            
            me.on('show', function(index) {
            	$btn.find('span').eq(index).addClass('cur').siblings().removeClass('cur');
            });
        },

        on: function(event, func) {
        	(typeof this._event[event] == 'undefined') && (this._event[event] = []);
        	this._event[event].push(func);
        },
        
        run: function(event, param) {
        	this._event[event] && (function(funcs) {
        		$.each(funcs, function(k, func) {
        			func(param);
        		});
        	}) (this._event[event]);
        },
        
        createBox: function($slider) {
            var me = this,
                o = me.opt,
                w = o.width,
                $elem = me.$elem,
                $play = me.$play,
                $left = this.$left = $('<ul class="left"></ul>').appendTo($elem),
                $right = this.$right =  $('<ul class="right"></ul>').appendTo($elem),
                $next = $elem.find(o.selector.next),
                $prev = $elem.find(o.selector.prev);

            $left.append($play.children().last().clone());
            $right.append($play.children().first().clone());
            
            $left.css({
                'width' : w + 'px',
                'left' : -w + 'px'
            })

            $right.css({
                'width' : w + 'px',
                'left' : w + 'px'
            });
            
            $next.on('click', function() {
                me.goNext && me.goNext();
            });

            $prev.on('click', function() {
            	me.goPrev && me.goPrev();
            });
        },

        show: function(index) {
        	var me = this;
        	me.abort();
        	me.num = index;      
            me.roll();
            me.start();
        },
        
        abort: function() {
        	var me = this;
        	clearInterval(this.timer);
        },
        
        start: function() {
        	var me = this;
        	clearInterval(this.timer);
        	this.timer = setInterval(function() {
                me.direction();
                me.roll();
            }, this.opt.speed);
        },
        
        goNext: function() {
        	var me = this;
        	if (me.running) return;
            me.abort();
            me.num ++;
            me.roll();
            me.start();
        },
        
        goPrev: function() {
        	var me = this;
        	if (me.running) return;
            me.abort();
            me.num --;
            me.roll();
            me.start();
        },
        
        bindEvents: function() {
            var me = this, o = this.opt,
            	timer = null, 
            	$play = this.$play;

            $play.mouseover(function() {
                me.abort();
            }).mouseout(function(){
                me.start();
            })

            me.start();
            me.run('show', me.num);
        },

        roll: function() {
            var me = this, o = this.opt, n = me.count, w = o.width, $play = me.$play, $left = this.$left, $right = this.$right, num = this.num;

            me.running = true;
            
            var rollImg = function($elem, i, callback) {
            	if (i !== undefined) {
                    me.num = i;
                }
            	
            	$elem.stop().animate({left:(-w*me.num)+'px'}, 500, function() {
                    me.running = false;
                    callback && callback();
                });
            };
            
            rollImg($play);
            
            if (num >= n) {
                rollImg($right, 0, function() {
                    $play.css('left', 0);
                    $right.css('left', w + 'px');
                });
                me.num = 0;
            } else if(num <= -1) {
                rollImg($left, 0, function() {
                    $play.css('left', (1-n)*w + 'px');
                    $left.css('left', -w + 'px');
                });
                
                me.num = n-1;
            }
            
            me.run('show', me.num);
        },

        rollImg: function($elem, i, callback){
            var me = this, w = me.w;

            if (i !== undefined) {
                me.num = i;
            }

            $elem.stop().animate({left:(-w*me.num)+'px'}, 500, function() {
                running = false;
                callback && callback();
            });
        },

        direction: function() {
            this.num += (this.opt.direction == 'left' ? 1 : -1);
        }
    }

    $.fn.slider = function(opts) {
        opts = opts || {};

        for(var i = 0, l = this.length; i < l; i++) {
            return new Slider($.extend({elem: this[i]}, opts));
        }
    };

    return Slider;
} (jQuery));
