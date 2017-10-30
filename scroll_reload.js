class Reload {
    constructor() {
        this.scrolltop = document.documentElement.scrollTop;
        // console.log(this.scrolltop)
        // this.clientX = 0;
        this.clientY_start = 0;
        this.clientY_move = 0
    }
    touchStart(that, e) {
        e = window.event || e;
        this.scrolltop = document.documentElement.scrollTop;
        if (this.scrolltop === 0) {
            this.clientY_start = e.touches[0].clientY;
        }
    }
    touchMove(that, e) {

        e = window.event || e;
        e.stopPropagation()
        if (this.scrolltop === 0) {
            this.clientY_move = Math.floor(e.touches[0].clientY - this.clientY_start);
            let scroll_content = document.querySelector('.scroll_content');
            let scroll_box = document.querySelector('.scroll_box')
            scroll_box.setAttribute('style', 'display:block;position:relative;');

            if (this.clientY_move > 2 && this.scrolltop === 0) {
                this.createEle('松开手指刷新', 1)
                // document.body.height = document.documentElement.clientHeight
                document.body.setAttribute('style','overflow:hidden;')
                console.log(document.documentElement.clientHeight,document.body.scrollTop)
            }
        }

        // this.createEle('松开手指刷新')
    }
    touchEnd() {
        var scroll_box = document.querySelector('.scroll_box');
        let str = scroll_box.style.transform.slice(11)
        if(parseInt(str)>50 ){
            let scroll_box = document.querySelector('.scroll_box')
            let tip_img = document.querySelector('.tip_img')
            scroll_box.style.transform = 'translateY(44px)'
            scroll_box.style.transition = 'all .3s'
            this.createEle('刷新中', 2)
            tip_img.src = './5-121204193R0-50.gif'
            tip_img.width = 20;
            tip_img.height= 20;
            tip_img.setAttribute('style','vertical-align: middle;')
            setTimeout(function () {
                location.reload();
            }, 1300);
        }else{
            scroll_box.style.transform = 'translateY(0px)'
            // document.body.setAttribute('style','overflow:auto;')
        }
        
    }

    createEle(text, step) {
        switch (step) {
            case 0:
                let text_box = document.createElement('div');
                text_box.className = 'text_box'
                let tip_img = document.createElement('img');
                var tip_text = document.createElement('span');
                tip_text.setAttribute('style','vertical-align: middle;margin-left:5px;')
                tip_img.className = 'tip_img'
                tip_text.className = 'tip_text'
                tip_text.innerText = text
                text_box.appendChild(tip_img)
                text_box.appendChild(tip_text)
                let scroll_content = document.querySelector('.scroll_content');
                var scroll_box = document.querySelector('.scroll_box');
                scroll_content.insertBefore(text_box, scroll_box)
                text_box.setAttribute('style', 'text-align: center;box-sizing: border-box;padding: 11px 0;height: 44px;position: absolute;z-index: -1;')
                break;
            case 1:
                var tip_text = document.querySelector('.tip_text');
                var scroll_box = document.querySelector('.scroll_box');
                scroll_box.style.transform = 'translateY(' + Math.floor(this.clientY_move/5) + 'px)'
                if (this.clientY_move > 100) {
                    tip_text.innerText = text;
                }
                break;
            case 2:
                var tip_text = document.querySelector('.tip_text');
                tip_text.innerText = text;
                break;
        }

    }

    init() {
        let that = this;
        that.createEle('下拉刷新', 0)
        document.body.addEventListener('touchstart', function () {
            this.touchStart(that)
        }.bind(that))

        document.body.addEventListener('touchmove', function () {
            this.touchMove(that)
        }.bind(that))

        document.body.addEventListener('touchend', function () {
            this.touchEnd(that)
        }.bind(that))
    }
}