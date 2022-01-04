export default class Loader {
   constructor() {
      this.loader = document.querySelector('.start__loader-box');
      this.bgImg = document.querySelector('.start__bg-img');
      this.img = document.querySelector('.start__img');
   }

   startLoader() {
      this.bgImg.style.display = 'none';
      this.img.style.display = 'none';
      this.loader.style.display = 'flex';
   }

   endLoader() {
      const {innerWidth} = window;

      if(innerWidth >= 1200) 
         this.bgImg.style.display = 'block';
      
      this.img.style.display = 'block';
      this.loader.style.display = 'none';
   }
}