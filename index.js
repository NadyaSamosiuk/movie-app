function Movie(){
    
    this.getMovieData=async()=>{
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&page=1')
            .then(res => res.json())
            .then(json => this.create(json))   
    }

    this.create=(json)=>{
        
        const main=document.querySelector('.main');
        
        this.element = document.createElement('div');
        this.element.classList.add('wrapper');
        main.appendChild(this.element);

        this.list = "";
        this.data = json.results
        this.data.forEach((item) =>{
            this.list +=`
            <div class="movie">
                <div class="movie__img__wrapper">
                    <img src="https://image.tmdb.org/t/p/w1280${item.poster_path}" alt="${item.title}">
                </div>
                <div class="movie__info">
                    <h3 class="movie__info__title">${item.title}</h3>
                    <span class="movie__vote__average" id="${item.vote_average}">${item.vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${item.overview}
                </div>
            </div>`    
        })      
        this.element.innerHTML=`${this.list}`

        const voteAverage = document.querySelectorAll('.movie__vote__average')
        voteAverage.forEach((item) =>{
        if(item.id >= 8){
                item.classList.add('green')
            }else if(item.id >= 5){
                item.classList.add('orange')
            }else{
                item.classList.add('red')
            }
        })

        const search = document.querySelector('.search');
        const list = document.querySelectorAll('.movie');
        const close = document.querySelector('.close');
        //если поиск не дал результатов отоброжаем
        this.element = document.createElement('div');
        this.element.classList.add('container');
        main.appendChild(this.element);
        const empty = document.querySelector('.container')
        empty.innerHTML=`
            <h2 class="container_title">Sorry! No results found</h2>`
        
        this.search=(value)=>{
            let inputValue =value.trim().toLowerCase();
            
            if(inputValue !=""){ 
                list.forEach((item) =>{
                    let title = item.innerText.split("\n")[0].toLowerCase()
                    console.log(title)
                    if(title.search(inputValue) == -1){
                        item.classList.add('hide')
                    }
                });
                
                if(document.querySelectorAll('.hide').length==json.results.length){
                    empty.classList.add('empty')
                }
            }else{
                list.forEach((item) =>{
                    item.classList.remove('hide')
                })
                empty.classList.remove('empty')
               
            }   
        }

        search.addEventListener('click', (event)=>{
            event.preventDefault()
            this.search(event.target.value)
        })
        close.addEventListener('click', (event)=>{
            search.value=""
            close.classList.remove('show')
            this.search('')
        })
        //После введения букв в inpyt появляется кнопка удалить
        search.addEventListener('keydown', (event) =>{
            close.classList.add('show')
        });
        //поиск по нажатию на Enter
        search.addEventListener('keydown', (event)=>{
            if (event.keyCode === 13) {
                event.preventDefault()
                this.search(event.target.value)
                return false;//что бы не обновлял страницу
            }
        });

        return this.element
    }

    this.init =()=> {
        return this.getMovieData().then(data =>{
            return this.element
        })

    }
}

const movie = new Movie().init()
export default movie