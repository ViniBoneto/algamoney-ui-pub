import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageModule } from 'primeng/message';

import { DataService } from './data.service';
import { MensagensErroComponent } from './mensagens-erro/mensagens-erro.component';


/* 14.9. Criando um Shared Module:
  Shared móds (móds compatilhados), diferentemente de feature móds (móds funcionais), ñ agrupam comps
  em torno de funcs em comum, mas em torno de funcs q são comuns e compartilhadas por d+ elems na app/proj.

  Nesta app, usaremos um mód compartilhado chamado SharedModule.

  O comp de msg de erro (MensagensErroComponent) será transporado do mód raiz (AppModule) p/ o SharedModule
  e exportado por ele. */
@NgModule({
  declarations: [MensagensErroComponent],
  imports: [
    CommonModule,

    MessageModule
  ],
  exports: [MensagensErroComponent],
  providers: [
/* 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
      Criando um serv p/ tratamento de dts, q inclui funcs p/ conversão e formatação, e incluindo-o entre
      os servs injetáveis providos pelo mód compartilhado. */
    DataService
  ]
})
export class SharedModule { }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
  Criando um método aux, no mód shared, que, dado um obj, retorna uma str representando suas props enumeráveis
  diretas. Muito útil p/ se fazer dbg. */
export function objParaStr(obj: Object | undefined | null): string {
  // return obj.toString();
  let objStr: string = "{\n",
    propVal;

  if(obj === undefined)
    return "undefined";

  if(obj === null)
    return "null";

  for(let prop of Object.keys(obj)) {
    try {
      propVal = eval(`obj[${prop}]`);
    }
    catch(err) {
      if(err instanceof ReferenceError)
        propVal = undefined;
      else
        throw err;
    }

    objStr += `\t'${prop}': '` + (propVal !== undefined ? propVal : "undefined") + "';\n";
  }

  objStr += "}";

  return objStr;
}
