import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Pages/layout/layout.component';

import { LoginComponent } from './Pages/login/login.component';
import { IndexComponent } from './Pages/index/index.component';
import { AssetComponent } from './Pages/asset/asset.component';
import { SkillComponent } from './Pages/skill/skill.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RequestComponent } from './Pages/request/request.component';
import { NewsComponent } from './Pages/news/news.component';
import { NeighboursComponent } from './Pages/neighbours/neighbours.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AllskillsComponent } from './Pages/admin/allskills/allskills.component';
import { AllassetsComponent } from './Pages/admin/allassets/allassets.component';
import { AllusersComponent } from './Pages/admin/allusers/allusers.component';
import { AllrequestsComponent } from './Pages/admin/allrequests/allrequests.component';
import { AllnewsComponent } from './Pages/admin/allnews/allnews.component';
import { AuthGuard } from './auth/auth.gaurd';
import { User } from './Models/user';
import { Role } from './Models/role';
import { AssetService } from './services/asset.service';
import { UploadComponent } from './Pages/upload/upload.component';
import { AddUserComponent } from './Pages/add-user/add-user.component';
import { AddAssetComponent } from './Pages/add-asset/add-asset.component';
import {AddSkillComponent} from 'src/app/Pages/add-skill/add-skill.component';
import { OrderedAssetsComponent } from './Pages/ordered-assets/ordered-assets.component';
import { OrderedSkillsComponent } from './Pages/ordered-skills/ordered-skills.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { WhoUsComponent } from './Pages/who-us/who-us.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';

// const routes: Routes = [
//   {path: '',
//   component: LayoutComponent },
//   {path: 'login', component: LoginComponent},
//   {path: 'register', component: RegisterComponent}


// ];
const routes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  {
    path: 'who-us',
    component: WhoUsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles:[Role.Admin ]}
  },
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'login',
   component: LoginComponent,

  },
  {
    path: 'register',
   component: AddUserComponent,
  },

  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
 
  },
  {
    path: 'skill',
    component: SkillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'request',
    component: RequestComponent,
   canActivate: [AuthGuard]
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'neighbours',
    component: NeighboursComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'allskills',
    component:AllskillsComponent,
     canActivate: [AuthGuard],
     data: { roles:[Role.Admin ]}
  },
  {
    path:'allassets',
    component:AllassetsComponent,
     canActivate: [AuthGuard],
     data: { roles:[Role.Admin ]}
  },
  {
    path:'allnews',
    component:AllnewsComponent,
    canActivate: [AuthGuard],
    data: { roles:[Role.Admin ]}
  },
  {
    path:'allusers',
    component:AllusersComponent,
    canActivate: [AuthGuard],
     data: { roles:[Role.Admin ]}
  },
  {
    path:'allrequests',
    component:AllrequestsComponent,
  canActivate: [AuthGuard],
  data: { roles:[Role.Admin ]
  }}];


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    
    LoginComponent,
    IndexComponent,
    AssetComponent,
    SkillComponent,
    ProfileComponent,
    RequestComponent,
    NewsComponent,
    NeighboursComponent,
    AdminComponent,
    AllskillsComponent,
    AllassetsComponent,
    AllusersComponent,
    AllrequestsComponent,
    AllnewsComponent,
    UploadComponent,
    AddUserComponent,
    AddAssetComponent, 
    AddSkillComponent, OrderedAssetsComponent, OrderedSkillsComponent, ContactusComponent, WhoUsComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    //imports: [RouterModule.forRoot(routes)],
    
  ],
  providers: [AssetService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
