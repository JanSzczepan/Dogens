import Loader from "./Loader";

export default class Dogens extends Loader{
   constructor() {
      super();
      this.loader = new Loader();

      this.apiUrl = 'https://dog.ceo/api';
      this.imageElement = document.querySelector('.start__img');
      this.breedsList = [];
      this.btnsContainer = document.querySelector('.select__container');
      this.btnClassName = 'select__btn';
      this.startElement = document.querySelector('.start');
      this.startContainer = document.querySelector('.start__bg-img');
   }

   init() {
      this.loader.startLoader();
      this.randomPhoto()
         .then(img => {
            this.generateRandomPhoto(img);
            this.generateBgPhoto(img);  
         });
      this.allBreeds()
         .then(list => this.generateBreedList(list));
   }

   randomPhoto() {
      return fetch(`${this.apiUrl}/breeds/image/random`)
         .then(response => response.json())
         .then(random => random.message);
   }

   generateRandomPhoto(img) {
      this.imageElement.setAttribute('src', img);
   }

   allBreeds() {
      return fetch(`${this.apiUrl}/breeds/list/all`)
      .then(response => response.json())
      .then(list => list.message);
   }

   generateBreedList(list) {
      for(const breed in list) {
         if(list[breed].length) {
            const dog = {
               breed,
               subbreed: []
            }
            for(const subbreed of list[breed]) {
               dog.subbreed.push(subbreed);
            }
            this.breedsList.push(dog)
         } else {
            const dog = {
               breed,
               subbreed: null
            }
            this.breedsList.push(dog);
         }
      }

      this.generateBtns();
   }

   generateBtns() {
      this.breedsList.forEach(dog => {

         if(dog.subbreed) {
            dog.subbreed.forEach(subbreed => {
               this.generateBtn(dog.breed, subbreed);
            });
            return;
         }

         this.generateBtn(dog.breed);
      });
   }

   generateBtn(breed, subbreed = null) {
      const btn = document.createElement('button');
      btn.setAttribute('type', 'button');

      let name = null;
      let nameAPI = null;

      if(subbreed) {
         name = `${breed} ${subbreed}`;
         nameAPI = `${breed}/${subbreed}`;
      } else {
         name = `${breed}`;
         nameAPI = `${breed}`;
      }

      btn.innerHTML = name;
      btn.classList.add(this.btnClassName);
      btn.addEventListener('click', () => this.btnHandler(nameAPI));
      this.btnsContainer.appendChild(btn);
   }

   btnHandler(api) {
      this.loader.startLoader();

      const {innerWidth} = window;
      if(innerWidth >= 1200) {
         document.body.scrollIntoView();   
      } else {
         this.startElement.scrollIntoView();
      }
      
      this.photoByBreeds(api)
         .then(photo => {
            this.generateRandomPhoto(photo);
            this.generateBgPhoto(photo);
         });
   }  

   photoByBreeds(breed) {
      return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then(response => response.json())
      .then(photo => photo.message);
   }

   generateBgPhoto(photo) {
      this.startContainer.style.backgroundImage = `url(${photo})`;
      this.loader.endLoader();
   }
}