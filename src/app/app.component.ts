import { Component } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-node-file-upload';
  currentPage: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      const path = window.location.pathname.split('/').join(' ').trim();
      // document.body.className = (path) ? path : 'login';
      const currentPage = (path) ? path : 'login';
      const currentPageParts = currentPage.split(' ');
      this.currentPage = currentPageParts[currentPageParts.length - 1];
    }
});
  }

  // onuplaodFile(event) {
  //   console.log(event)
  //   if (event.target.files && event.target.files[0]) {
  //     const filesAmount = event.target.files.length;
  //     let file = event.target.files[0];
  //     // console.log(file.name);
  //     let formData = new FormData();
  //     formData.append('image', file);
  //     let url = 'http://localhost:3000/';
  //     this.http
  //     .post(url + 'api/upload', formData)
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  //     // }
  //   }
  // }
}
