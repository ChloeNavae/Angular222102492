import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare const $ : any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private renderer: Renderer2, private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {
    this.renderer.addClass(document.body, "login-page");

    this.renderer.removeClass(document.body, "sidebar-mini");
    this.renderer.removeClass(document.body, "layout-fixed");

    this.renderer.setAttribute(document.body, "style", "min-height: 464px;")
  }

  ngOnInit(): void {

  }

  showPeringatanModal(message: string): void {
    $("#peringatanModal").modal();
    $("#pm_message").html(message);
  }

  signIn(): void {
    console.log("signIn()");

    var userId = $("#IdText").val();
    userId = encodeURIComponent(userId);

    var password = $("#PasswordText").val();
    password = encodeURIComponent(password);

    var url = "https://stmikpontianak.cloud/011100862/login.php" +
      "?id=" + userId +
      "&password=" + password;
    console.log("url : " + url);

    this.httpClient.get(url)
      .subscribe((data : any) => {
        console.log(data);
        var row = data[0];

        if (row.idCount != "1"){
          this.showPeringatanModal("Id atau password tidak cocok");
          return;
        }

        this.cookieService.set("userId", userId);

        console.log("session data berhasil dibuat");

        this.router.navigate(["/dashboard"])
      })
  }
}


