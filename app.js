var imgSong = document.querySelector(".cd-thumb");
const playlist = document.querySelector(".playlist")
const app = {
    currentIndex : 0,
    isPlaying : false,
    isRandom : false,
    isLoop : false,
    songs : [
        {
            name : " Phóng đổ tim em",
            sing : " Wren Evans",
            pathAudio : "./public/music/song1.mp3",
            pathImg : "./public/img/anh128.webp"
        },
        {
            name : " Từng quen",
            sing : " Wren Evans",
            pathAudio : "./public/music/song2.mp3",
            pathImg : "./public/img/anh128.webp"
        },
        {
            name : " Dân chơi sao phải khóc",
            sing : " Andree Right Hand",
            pathAudio : "./public/music/song3.mp3",
            pathImg : "./public/img/anh3.jpg"
        },
        {
            name : " Em Xinh",
            sing : " Mono",
            pathAudio : "./public/music/song4.mp3",
            pathImg : "./public/img/anh4.jpg"
        },
        {
            name : " Miên man",
            sing : " Minh Huy",
            pathAudio : "./public/music/song5.mp3",
            pathImg : "./public/img/anh5.jpg"
        },
        {
            name : " Mưa tháng sáu",
            sing : " Văn Mai Hương",
            pathAudio : "./public/music/song6.mp3",
            pathImg : "./public/img/anh6.jpg"
        },
        {
            name : " Thủy triều",
            sing : "Quang Hùng MasterD",
            pathAudio : "./public/music/song7.mp3",
            pathImg : "./public/img/anh7.jpg"
        },
        {
            name : "TÒ TE TÍ",
            sing : " Wren Evans",
            pathAudio : "./public/music/song8.mp3",
            pathImg : "./public/img/anh128.webp"
        },
        {
            name : " Trái đất ôm mặt trời",
            sing : " Kai Dinh, GreyD",
            pathAudio : "./public/music/song9.mp3",
            pathImg : "./public/img/anh9.jpg"
        },
        {
            name : " Từng là ",
            sing : " Vũ Cát Tường",
            pathAudio : "./public/music/song10.mp3",
            pathImg : "./public/img/anh10.jpg"
        }
    ],
    render : function(){
        const htmls = this.songs.map((song,index )=>{
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}" >
                <div class="thumb" style="background-image: url('${song.pathImg}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.sing}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        playlist.innerHTML= htmls.join("");
    },
    definrProperty : function() {
        Object.defineProperty(this, "currentSong",{
            get : function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEven : function(){
        const _this = this
        const cd = document.querySelector(".cd");
        const cdWidth = cd.offsetWidth;

        //xử lí phóng to thu nhỏ cd
        document.onscroll = function(){
           const scrollTop = window.scrollY || document.documentElement.scrollTop;
           const cdNew = cdWidth - scrollTop ;
           cd.style.width =cdNew >0 ? cdNew + "px" : 0;
           cd.style.opacity = cdNew/ cdWidth;
        }
        // xu ly animation cd
        const cdThumbAnimate = imgSong.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        });
        
        cdThumbAnimate.pause();


        //xửa lí khi play
        const play = document.querySelector(".player")
        const playBtn = document.querySelector(".btn-toggle-play")
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }  
        }
        //khi phát
        audio.onplay = function(){
            _this.isPlaying = true;
            play.classList.add("playing")
            cdThumbAnimate.play();
        }
        //khi dừng
        audio.onpause = function(){
            _this.isPlaying = false;
            play.classList.remove("playing")
            cdThumbAnimate.pause()
        }

        //nhac chay
        const progress = document.querySelector(".progress")
        audio.ontimeupdate = function(){
            if(audio.duration){
               const percent = Math.floor(audio.currentTime/audio.duration*100)
               progress.value = percent;
            }
            
        }

        //onchange khi tua
        progress.onchange = function(e){
            const seekTime= audio.duration/100*e.target.value
            audio.currentTime = seekTime;
        }


        // netx song
        const nextBtn = document.querySelector(".btn-next")
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandom()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
        }
        // prev song
        const prevBtn = document.querySelector(".btn-prev")
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandom()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }

        //random
        const randomBtn = document.querySelector(".btn-random")
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active",_this.isRandom)
            
        }


        //loop song
        const loopBtn = document.querySelector(".btn-repeat")
        loopBtn.onclick = function(e){
            _this.isLoop = !_this.isLoop;
            loopBtn.classList.toggle("active",_this.isLoop)
            
        }


        //xuwr lys next khi ended
        audio.onended = function(){
            if(_this.isLoop){
                audio.play()
            }else{
                nextBtn.click()
            }
            
        }
        //chuyeern baif hats bawfng click vao bai hat
        playlist.onclick = function(e){
            const songElement = e.target.closest('.song:not(.active)');
            if(songElement || e.target.closest('.option')){
                // clicl vao song
                if(e.target.closest('.song:not(.active)')){
                    _this.currentIndex= Number(songElement.getAttribute('data-index'))
                    _this.loadcurentSong()
                    _this.render()
                    audio.play();
                }
                //click vao icon
                if(e.target.closest('.option')){

                }
            }
        }
    },
    loadcurentSong : function(){
        const nameSong = document.querySelector("h2");
        const audio = document.querySelector("#audio");

        nameSong.textContent = this.currentSong.name;
        imgSong.style.backgroundImage = `url(${this.currentSong.pathImg})`;
        audio.src = this.currentSong.pathAudio;
        // console.log( nameSong,imgSong,audio)
    },
    nextSong : function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadcurentSong()
    },
    prevSong : function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length-1
        }
        this.loadcurentSong()
    },
    playRandom : function(){
        let newIndex 
        do{
            newIndex = Math.floor(Math.random()*this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadcurentSong();
    },

    start : function(){
        //định nghĩa các thuộc tính cho object
        this.definrProperty()

        // lắng nghe suwhj kiện domevent
        this.handleEven()
        // tải thông tin bài hát đầu tiên
        this.loadcurentSong()

        // render lại playlist
        this.render()

    }

}

app.start();