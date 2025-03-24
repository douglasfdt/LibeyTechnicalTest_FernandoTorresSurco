import swal from 'sweetalert2';
import { NgForm } from "@angular/forms";
import { LibeyUserService } from "src/app/core/service/libeyuser/libeyuser.service";
import { LibeyUser } from "src/app/entities/libeyuser";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocumentType } from "src/app/entities/document-type";
import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/entities/region';
import { Province } from 'src/app/entities/province';
import { Ubigeo } from 'src/app/entities/ubigeo';
@Component({
  selector: 'app-usermaintenance',
  templateUrl: './usermaintenance.component.html',
  styleUrls: ['./usermaintenance.component.css']
})
export class UsermaintenanceComponent implements OnInit {
 // user: LibeyUser = new LibeyUser();
  regions: Region[] = [];
	provinces: Province[] = [];
	ubigeos: Ubigeo[] = [];
  documentTypes: DocumentType[] = [];
	selectedDocumentType: any;

  selectedDocumentTypeId: any ;
	selectedUbigeoCode: string = "";
	selectedRegionCode: string = "";
	selectedProvinceCode: string = "";
	user: LibeyUser = {
		documentNumber: "",
		documentTypeId: "",
		name: "",
		fathersLastName: "",
		mothersLastName: "",
		address: "",
		ubigeoCode: "",
		phone: "",
		email: "",
		password: "",
		active: true,
	};
  
	isEditMode: boolean = false;
  constructor(private userService: LibeyUserService,
	private route: ActivatedRoute,
	private router: Router
  ) {}

  ngOnInit(): void {

	this.LoadDocumentTypes();

    this.LoadRegions();
    this.LoadDocumentTypes();


	const documentNumber = this.route.snapshot.paramMap.get("documentNumber");

	if (documentNumber) {
		this.isEditMode = true;
		console.log("📌 Modo edición activado para DNI:", documentNumber);
		this.LoadUser(documentNumber);
	}
  }

  LoadUser(documentNumber: string): void {
	this.userService.Find(documentNumber).subscribe({
		next: (data) => {
			this.user = data;

			// Extraer códigos desde ubigeoCode
			this.selectedRegionCode = data.ubigeoCode.substring(0, 2);
			this.selectedProvinceCode = data.ubigeoCode.substring(0, 4);
			this.selectedUbigeoCode=data.ubigeoCode;
			// Cargar Provincias
			this.LoadProvinces();
		},
		error: (err) => {
			console.error("❌ Error al obtener usuario:", err);
		},
	});
}


GetDocumentTypeName(documentTypeId: number): string {
	const docType = this.documentTypes.find(d => d.documentTypeId === documentTypeId);
	return docType ? docType.documentTypeDescription : "Desconocido";
}

GetRegionName(regionCode: string): string {
	const region = this.regions.find(r => r.regionCode === regionCode);
	return region ? region.regionDescription : "Desconocido";
}

GetProvinceName(provinceCode: string): string {
	const province = this.provinces.find(p => p.provinceCode === provinceCode);
	return province ? province.provinceDescription : "Desconocido";
}

GetUbigeoName(ubigeoCode: string): string {
	const ubigeo = this.ubigeos.find(u => u.ubigeoCode === ubigeoCode);
	return ubigeo ? ubigeo.ubigeoDescription : "Desconocido";}

	LoadProvinces(): void {
		this.provinces = [];
		this.ubigeos = [];
		if (this.selectedRegionCode) {
			this.userService.GetProvinces(this.selectedRegionCode).subscribe((data) => {
				this.provinces = data;

				this.LoadUbigeos();
			});
		}
	}

  LoadRegions(): void {
		this.userService.GetRegions().subscribe((data) => {
			this.regions = data;
			if (this.isEditMode) {
				this.selectedRegionCode = this.GetRegionName(this.user.ubigeoCode.substring(0, 2));
			}
		});
	}

  LoadUbigeos(): void {
		this.ubigeos = [];
		if (this.selectedProvinceCode) {
			this.userService.GetUbigeos(this.selectedProvinceCode).subscribe((data) => {
				this.ubigeos = data;
			});
		}
  }

  OnDocumentTypeChange(event: any): void {
	console.log("Elemento seleccionado:", event); // <-- Muestra el valor seleccionado
	console.log("documentTypeId asignado:", this.user.documentTypeId);
	this.selectedDocumentTypeId = this.user.documentTypeId;
}

  LoadDocumentTypes(): void {
    this.userService.GetDocumentTypes().subscribe((data) => {
      console.log("Document Types Cargados:", data); // <-- Verifica que la API devuelve datos correctos
      this.documentTypes = data;

      // Si es el primer registro, asignarlo automáticamente
		/*if (this.documentTypes.length > 0) {
			this.user.documentTypeId = this.documentTypes[0].documentTypeId;
			this.selectedDocumentTypeId = this.documentTypes[0].documentTypeId;
			console.log("Primer documento asignado automáticamente:", this.user.documentTypeId);
		}*/
    });
  }
 
	Submit(form: NgForm): void {
		if (form.invalid) {
			alert("Por favor, complete todos los campos obligatorios.");
			return;
		}
    this.userService.Create(this.user).subscribe({
			next: () => {
				alert("Usuario registrado con éxito");
				form.resetForm();
				this.user = {
		          documentNumber:"",
		          documentTypeId:"",
		          name:"",
		          fathersLastName :"",
		          mothersLastName :"",
		          address :"",    
		          ubigeoCode :"",
		          phone :"",
		          email :"",
		          password :"",
		          active : true,
				};
			},
			error: (error) => {
				alert("Error al registrar usuario");
				console.error(error);
			},
		});
	}

  /*SaveUser(form: NgForm): void {
		if (form.invalid) {
			alert("Por favor, complete todos los campos obligatorios.");
			return;
		}

    if (!this.user.documentTypeId || this.user.documentTypeId === 0) {
      alert("Seleccione un tipo de documento válido.");
      return;
    }

	console.log("Id Documento Seleccionado:", this.selectedDocumentTypeId);

		this.user.documentTypeId = this.selectedDocumentTypeId;
		this.user.ubigeoCode = this.selectedUbigeoCode;
		this.user.active = true;

		this.userService.Create(this.user).subscribe({
			next: () => {
				alert("Usuario guardado exitosamente");
				form.resetForm();
				this.user = {
					documentNumber: "",
					documentTypeId: "",
					name: "",
					fathersLastName: "",
					mothersLastName: "",
					address: "",
					ubigeoCode: "",
					phone: "",
					email: "",
					password: "",
					active: true,
				};
			},
			error: (error) => {
				alert("Error al guardar el usuario");
				console.error(error);
			},
		});
	}*/

	SaveUser(form: NgForm): void {
		if (form.invalid) {
			alert("Por favor, complete todos los campos obligatorios.");
			return;
		}

		if (this.isEditMode) {
			this.userService.Update(this.user).subscribe({
				next: () => {
					alert("Usuario actualizado correctamente");
					this.router.navigate(["/user/list"]);
				},
				error: (err) => {
					alert("Error al actualizar usuario");
					console.error(err);
				},
			});
		} else {
			this.userService.Create(this.user).subscribe({
				next: () => {
					alert("Usuario registrado correctamente");
					this.router.navigate(["/user/list"]);
				},
				error: (err) => {
					alert("Error al registrar usuario");
					console.error(err);
				},
			});
		}
	}

	Clear(form: NgForm): void {
		form.resetForm();
		this.user = {
      documentNumber:"",
      documentTypeId:"",
      name:"",
      fathersLastName :"",
      mothersLastName :"",
      address :"", 
      ubigeoCode :"",
      phone :"",
      email :"",
      password :"",
      active : true,
		};
	}

	GoBack(): void {
		this.router.navigate(["/user/list"]);
	}
}