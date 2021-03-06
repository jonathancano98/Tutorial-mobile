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

  private APIurl = "http://192.168.1.134:3000/api/Personas";
 
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
                          console.log('Lista personas:',this.lista)
                          // Para que no se me duplique
                           this.listaalumnos=[];
                          
                           this.lista.forEach(element => {   
                                           if(element.rol === 'Alumno'){this.listaalumnos.push(element);}
                                              });
                                            console.log('Lista alumnos:',this.listaalumnos);
                           
                          // Seleccionados tendra el mismo valor que la lista que nos llega de la API y me los llena en falso
                          this.seleccionados = Array(this.listaalumnos.length).fill(false);
                          console.log("Lista seleccionados:",this.seleccionados);
       });

  }

  Incrementar(){
    
    console.log("Voy a incremenar los puntos de:",this.seleccionados);
    
    for (var i=0; i<this.listaalumnos.length;i++){
      if(this.seleccionados[i]){ // Con el if(this.seleccionados[i]) escojemos los que estan en true en seleccionados
        this.listaalumnos[i].puntuacion++;
        this.http.put<any>(this.APIurl + '/' + this.listaalumnos[i].nombre, this.listaalumnos[i])
        .subscribe(() => this.DameAlumnos());
      }
    }
  }






}
