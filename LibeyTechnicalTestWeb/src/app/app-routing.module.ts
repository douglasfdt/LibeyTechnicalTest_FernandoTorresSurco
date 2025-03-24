import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { UsercardsComponent } from "./User/user/usercards/usercards.component";
import {ListComponent } from "./User/user/list/list.component";
import { UsermaintenanceComponent } from "./User/user/usermaintenance/usermaintenance.component";
import { ViewUserComponent } from "./User/user/view-user/view-user.component";
const routes: Routes = [
	{
		path: "",
		redirectTo: "/user",
		pathMatch: "full",
	},
	{
		path: "user",
		children: [
			{ path: "card", component: UsercardsComponent },
			{ path: "maintenance", component: UsermaintenanceComponent },
			{ path: "maintenance/:documentNumber", component: UsermaintenanceComponent },
			{ path: "list", component: ListComponent },
			{ path: "view/:documentNumber", component: ViewUserComponent },
			{ path: "**", redirectTo: "card" },
		],
	},
	{ path: "**", component: AppComponent },
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}