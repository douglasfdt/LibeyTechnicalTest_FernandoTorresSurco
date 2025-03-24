import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { LibeyUser } from "src/app/entities/libeyuser";
import { Region } from "src/app/entities/region";
import { Province } from "src/app/entities/province";
import { Ubigeo } from "src/app/entities/ubigeo";
import { DocumentType } from "src/app/entities/document-type";
@Injectable({
	providedIn: "root",
})
export class LibeyUserService {
	constructor(private http: HttpClient) {}
	Find(documentNumber: string): Observable<LibeyUser> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/${documentNumber}`;
		console.log("Llamando a la API con:", uri); // <-- Verifica si la API recibe la petición correcta
		return this.http.get<LibeyUser>(uri);
	}

	GetAll(): Observable<LibeyUser[]> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser`;
		return this.http.get<LibeyUser[]>(uri);
	}

	Create(user: LibeyUser): Observable<LibeyUser> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser`;
		return this.http.post<LibeyUser>(uri, user);
	}

	Update(user: LibeyUser): Observable<LibeyUser> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/${user.documentNumber}`;
		return this.http.put<LibeyUser>(uri, user);
	}

	Delete(documentNumber: string): Observable<void> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/${documentNumber}`;
		return this.http.delete<void>(uri);
	}
		/** Obtiene todas las regiones */
		GetRegions(): Observable<Region[]> {
			return this.http.get<Region[]>(`${environment.pathLibeyTechnicalTest}LibeyUser/regions`);
		}
	
		/** Obtiene las provincias por código de región */
		GetProvinces(regionCode: string): Observable<Province[]> {
			return this.http.get<Province[]>(`${environment.pathLibeyTechnicalTest}LibeyUser/provinces/${regionCode}`);
		}
	
		/** Obtiene los ubigeos por código de provincia */
		GetUbigeos(provinceCode: string): Observable<Ubigeo[]> {
			return this.http.get<Ubigeo[]>(`${environment.pathLibeyTechnicalTest}LibeyUser/ubigeos/${provinceCode}`);
		}

		GetDocumentTypes(): Observable<DocumentType[]> {
			return this.http.get<DocumentType[]>(`${environment.pathLibeyTechnicalTest}LibeyUser/document-types`);
		}
}