import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { ProfesorPage } from '../profesor/profesor';
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nombre: string;
  pass: string;
  private APIurl = "http://192.168.1.134:3000/api/Personas";
  constructor(public navCtrl: NavController,
              private http: HttpClient) {}

  Autentificar(){
    
     this.http.get<any>(this.APIurl + '/' + this.nombre)
    .subscribe(Persona =>{
                            
                            if(Persona.nombre === this.nombre && Persona.contra === this.pass){
                               if(Persona.rol === "Profesor"){this.navCtrl.push(ProfesorPage);}
                               else{console.log("Alumno");}
                              }
                            else
                              {
                                 console.log('Contraseña incorrecta');
                              }
                           }
                );
                  }
}

