import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  @Input() moduleName: string = "";
  username: string = "";

  ngOnInit(): void {
    this.username = this.cookieService.get("userId");
  }

  signOut(){
    this.cookieService.delete('userId', '/', 'localhost', false, 'Lax');
    console.log("session data berhasil dihapus");

    this.router.navigate(["/login"])
  }
}
