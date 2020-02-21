import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  /*
    Necessário para obtermos acesso ao binário do
    arquivo de imagem selecionado, para enviarmos
    ao back end.
  */
  file: File;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    /*
      Não podemos aplicar o "getRawValue()" nesse caso,
      pois a propriedade "file" do objeto conteria uma
      string com o path do arquivo, e o que queremos é
      o binário do arquivo.
    */
    // const dados = this.photoForm.getRawValue();

    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));    
  }
}
