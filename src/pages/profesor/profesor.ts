import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profesor',
  templateUrl: 'profesor.html',
})
export class ProfesorPage {

  private APIurl = "http://[::1]:3000/personas";
  lista: any[];
  seleccionados: boolean[];
  todos: boolean=false;

  listaalumnos: any[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient) {
  }

  ionViewDidLoad() {
    
       this.DameAlumnos();
  
  }

  DameAlumnos() {
    this.http.get<any[]>(this.APIurl)
       .subscribe(lista =>{ 
                          this.lista = lista;
                          console.log('Lista:',this.lista)
                         
                          
       this.lista.forEach(element => {   if(element.rol === 'Alumno')
                                              {
                                                  this.listaalumnos.push(element);
                                                   console.log(this.listaalumnos);
                                              }
                                                                       });

                           // Seleccionados tendra el mismo valor que la lista que nos llega de la API y me los llena en falso
                          this.seleccionados = Array(this.lista.length).fill(false);
       });

  }

  Incrementar(){
    console.log("Voy a incremenar los puntos de:");
    console.log(this.seleccionados);
    for (var i=0; i<this.seleccionados.length;i++){
      if(this.seleccionados[i]){
        this.lista[i].puntuacion++;
        this.http.put<any>(this.APIurl + '/' + this.lista[i].nombre, this.lista[i])
        .subscribe(() => this.DameAlumnos());
      }
    }
  }






}
