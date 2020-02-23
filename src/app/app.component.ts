import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-test';
  handler() {
    const a  = document.querySelector('.red') as HTMLElement;
    a.classList.remove('red');
    a.classList.add('blue');
    
    console.log(a)
  }
}



