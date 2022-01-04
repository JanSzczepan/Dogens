import '../sass/style.scss';
import 'jquery';
import Dogens from './Dogens';
import Search from './Search';
import slider from './slider';

document.addEventListener('DOMContentLoaded', () => {
   const dog = new Dogens();
   const search = new Search();
   dog.init();
   search.init();
   slider();
});