import { Component, OnInit } from "@angular/core";
import { LibeyUserService } from "src/app/core/service/libeyuser/libeyuser.service";
import { LibeyUser } from "src/app/entities/libeyuser";
import { DocumentType } from "src/app/entities/document-type";
import { Region } from "src/app/entities/region";
import { Province } from "src/app/entities/province";
import { Ubigeo } from "src/app/entities/ubigeo";
import { Router } from "@angular/router";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
	users: any[] = [];
	filteredUsers: any[] = [];
	searchDni: string = "";
	documentTypes: DocumentType[] = [];
	regions: Region[] = [];
	provinces: Province[] = [];
	ubigeos: Ubigeo[] = [];

	constructor(private router: Router,private userService: LibeyUserService) {}

	ngOnInit(): void {
		this.LoadLocations().then(() => {
			this.LoadUsers();
		});
	}

	/** Carga regiones, provincias y ubigeos antes de cargar usuarios */
	LoadLocations(): Promise<void> {
    return new Promise((resolve) => {
      this.userService.GetRegions().subscribe((data) => {
        this.regions = Array.isArray(data) ? data : [];
        console.log("Regiones cargadas:", this.regions);
      });
      this.userService.GetProvinces("").subscribe((data) => {
        this.provinces = Array.isArray(data) ? data : [];
        console.log("Provincias cargadas:", this.provinces);
      });
      this.userService.GetUbigeos("").subscribe((data) => {
        this.ubigeos = Array.isArray(data) ? data : [];
        console.log("Ubigeos cargados:", this.ubigeos);
      });
      this.userService.GetDocumentTypes().subscribe((data) => {
        this.documentTypes = Array.isArray(data) ? data : [];
        console.log("Document Types cargados:", this.documentTypes);
        resolve();
      });
    });
  }

  ViewUser(documentNumber: string): void {
    this.router.navigate(["/user/view", documentNumber]);
  }

  EditUser(documentNumber: string): void {
    this.router.navigate(["/user/maintenance", documentNumber]);
  }

	/** Carga la lista de usuarios y asigna sus ubicaciones */
	LoadUsers(): void {
		this.userService.GetAll().subscribe((data) => {
			/*if (!this.regions.length || !this.provinces.length || !this.ubigeos.length) {
				console.error("Error: Datos de regiones, provincias o ubigeos no cargados.");
				return;
			}*/

			this.users = data.map(user => ({
				...user,
				department: this.GetRegionName(user.ubigeoCode.substring(0, 2)),
				province: this.GetProvinceName(user.ubigeoCode.substring(0, 4)),
				district: this.GetUbigeoName(user.ubigeoCode),
				documentTypeDescription: this.GetDocumentTypeDescription(user.documentTypeId),
				activeStatus: user.active ? "Activo" : "Inactivo"
			}));
			this.filteredUsers = this.users;
			console.log("Usuarios procesados:", this.users);
		});
	}

	/** Retorna el nombre del Departamento */
	GetRegionName(regionCode: string): string {
		const region = this.regions.find(r => r.regionCode === regionCode);
		if (!region) {
			console.warn(`Región no encontrada para código: ${regionCode}`);
			return "Desconocido";
		}
		return region.regionDescription;
	}

	/** Retorna el nombre de la Provincia */
  GetProvinceName(provinceCode: string): string {
    if (!Array.isArray(this.provinces)) {
      console.error("Error: Provinces no es un array", this.provinces);
      return "Desconocido";
    }
  
    const province = this.provinces.find(p => p.provinceCode === provinceCode);
    if (!province) {
      console.warn(`Provincia no encontrada para código: ${provinceCode}`);
      return "Desconocido";
    }
    return province.provinceDescription;
  }

	/** Retorna el nombre del Distrito */
	GetUbigeoName(ubigeoCode: string): string {
		const ubigeo = this.ubigeos.find(u => u.ubigeoCode === ubigeoCode);
		if (!ubigeo) {
			console.warn(`Ubigeo no encontrado para código: ${ubigeoCode}`);
			return "Desconocido";
		}
		return ubigeo.ubigeoDescription;
	}

	/** Retorna la descripción del tipo de documento */
	GetDocumentTypeDescription(documentTypeId: number): string {
		const docType = this.documentTypes.find(d => d.documentTypeId === documentTypeId);
		if (!docType) {
			console.warn(`Tipo de documento no encontrado para ID: ${documentTypeId}`);
			return "Desconocido";
		}
		return docType.documentTypeDescription;
	}

	/** Filtra usuarios por DNI en tiempo real */
	FilterUsers(): void {
		this.filteredUsers = this.users.filter((user) =>
			user.documentNumber.includes(this.searchDni)
		);
	}

	/** Elimina un usuario con confirmación */
	DeleteUser(documentNumber: string): void {
		if (confirm(`¿Estás seguro de eliminar el usuario con DNI ${documentNumber}?`)) {
			this.userService.Delete(documentNumber).subscribe({
				next: () => {
					alert("Usuario eliminado exitosamente");
					this.LoadUsers();
				},
				error: (error) => {
					alert("Error al eliminar usuario");
					console.error(error);
				},
			});
		}
	}
}
