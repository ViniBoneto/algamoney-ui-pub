import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';


/* 19.3. Desafio: módulo de segurança e protótipo da tela de login:
  Criando mód de seg c/ mód aux de roteamento (ambos seguindo padrão de como já feito na app) e protótipo
  de tela de login. */
@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    // Mód p/ templs direcionado à forms (template-driven forms) em NG. Ex: ngForm, ngModel...
    FormsModule,

    // Mód p/ usar o comp PNG p-button ou a dir PNG pButton
    ButtonModule,
    // Mód p/ usar a dir PNG pInputText
    InputTextModule,

    // Mód de roteamento atrelado ao mód de seg
    SegurancaRoutingModule
  ]
})
export class SegurancaModule { }
