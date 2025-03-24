import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LibeyUserService } from "src/app/core/service/libeyuser/libeyuser.service";
import { LibeyUser } from "src/app/entities/libeyuser";

@Component({
	selector: "app-view",
	templateUrl: "./view-user.component.html",
	styleUrls: ["./view-user.component.css"],
})
export class ViewUserComponent implements OnInit {
	user: LibeyUser | null = null;
	documentNumber: string | null = null;

	constructor(
		private route: ActivatedRoute,
		private userService: LibeyUserService,
		private router: Router
	) {
    console.log("✅ ViewUserComponent se ha inicializado.");   
  }

	ngOnInit(): void {
    console.log("Hola")
		this.documentNumber = this.route.snapshot.paramMap.get("documentNumber");

	console.log("📌 Document Number recibido en view-user:", this.documentNumber); // <-- Verificar

	if (this.documentNumber) {
		this.userService.Find(this.documentNumber).subscribe({
			next: (data) => {
				console.log("✅ Datos del usuario recibidos:", data);
				this.user = data;
			},
			error: (err) => {
				console.error("❌ Error al obtener usuario:", err);
			}
		});
	} else {
		console.warn("⚠️ No se recibió documentNumber en la URL");
	}
	}

	GoBack(): void {
		this.router.navigate(["/user/list"]);
	}
}
