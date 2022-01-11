import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

/* 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
  Criando um serv p/ tratamento de dts, q inclui funcs p/ conversão e formatação, no mód compartilhado
  da app (shared module).

Obs: A biblioteca moment.js, usada p/ format de dts na aula, foi descontinuada. P/ isto, farei dois métodos,
  c/ duas maneiras p/ formatação das dts. Uma usando o obj Intl.DateTimeFormat, do próprio JS e outra usando
  o comp (pipe) DatePipe, nativo do NG. */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Injeta p/ depend um pipe DatePipe, nativo do NG, p/ usá-lo na format da dt, no método this.dataParaStrDtPipe()
  constructor(private dtPipe: DatePipe) { }

  // Método p/ format dts q converte uma determinada dt em str no formato "YYYY-MM-DD", retornando esta.
  //  Esta func usa o obj Intl.DateTimeFormat p/ formatar a dt.
  dataParaStr(data: Date): string {
    const arrDt = new Array(3);

    Intl.DateTimeFormat("pt-BR").formatToParts(data).forEach(({type, value}) => {
      switch(type) {
        case "year":
          arrDt[0] = value;
          break;
        case "month":
          arrDt[1] = value;
          break;
        case "day":
          arrDt[2] = value;
          break;
      }
    });

    // console.log(arrDt.join("-"));
    return arrDt.join("-");
  }

// Método p/ format dts q converte uma determinada dt em str no formato "YYYY-MM-DD", retornando esta.
//  Esta func usa o pipe DatePipe, nativo do NG, p/ formatar a dt.
  dataParaStrDtPipe(data: Date): string {
    let strDt: string | null;

    if( (strDt = this.dtPipe.transform(data, "yyyy-MM-dd")) !== null )
      return strDt;
    else
      return "";
  }
}
