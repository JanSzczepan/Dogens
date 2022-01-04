export default class Search {
   constructor() {
      this.dogInput = document.querySelector('.select__input-form');
      this.btn = document.querySelector('.select__btn-form');
      this.value = '';
      this.searchedBtns = [];
      this.message = document.querySelector('.select__nothing-box');
      this.icon = document.querySelector('.select__icon-form');
      this.iconClass = {
         search: 'fa-search',
         restart: 'fa-sync-alt',
      }
      this.selectElement = document.querySelector('.select');
   }

   init() {
      this.dogInput.addEventListener('input', (e) => this.inputHandler(e));
      this.btn.addEventListener('click', () => this.btnHandler());
      this.icon.addEventListener('click', this.btnHandler);
   }

   inputHandler(e) {
      this.value = e.target.value;
   }

   btnHandler = () => {
      this.searchBtns();
      if(this.value) {
         this.changeIcon(this.iconClass.restart)
      }
   }

   btnRestart = () => {
      this.dogInput.value = '';
      this.value = '';
      this.searchBtns();
      this.changeIcon(this.iconClass.search);
   }

   searchBtns() {
      const btns = [...document.querySelectorAll('.select__btn')];
      
      this.searchedBtns = [];  
      this.hideMessage(); 

      btns.forEach(btn => {
         if(btn.textContent.includes(this.value)) {
            this.searchedBtns.push(btn);
            this.showBtn(btn);
         }
         else
            this.hideBtn(btn);
      });

      if(!this.searchedBtns.length) 
         this.showMessage();

      this.selectElement.scrollIntoView();
   }

   showBtn(btn) {
      btn.style.display = 'block';
   }

   hideBtn(btn) {
      btn.style.display = 'none';
   }

   showMessage() {
      this.message.style.display = 'block';
   }

   hideMessage() {
      this.message.style.display = 'none';
   }

   changeIcon(icon=this.iconClass.search) {
      
      if(this.icon.classList.contains(icon)) 
         return;

      if(icon === this.iconClass.search) {
         this.icon.removeEventListener('click', this.btnRestart);
         this.icon.addEventListener('click', this.btnHandler);
         this.icon.classList.remove(this.iconClass.restart);       
         this.icon.classList.add(this.iconClass.search);   
      } else if(icon === this.iconClass.restart) {
         this.icon.removeEventListener('click', this.btnHandler);
         this.icon.addEventListener('click', this.btnRestart);
         this.icon.classList.remove(this.iconClass.search);       
         this.icon.classList.add(this.iconClass.restart);   
      }
   }
}