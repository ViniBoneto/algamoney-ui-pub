import { Component, Input } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

/* 13.9. Criando componente de mensagem de erro de validação:
  P/ se reduzir tam e repetição de cód, vamos criar um comp separado, gerador de msgs de erro
  genéricas, p/ exibir as msgs dos cntrls, em substituição aos elems fixos de msg.

  Este comp receberá como params de entrada o cntrl a ser validado, o erro a ser verificado no ctrnl
  e a msg de erro a ser exibida. Se o erro não existir ou o cntrl ñ estiver no estado estadoCntrl, o
  comp ñ será exibido.

  O comp foi criado com estilo (css) e template (html) inline (c/ os params --inline-template e --inline-style)
  em vez de arqs separados (padrão), pelo fato dos msms serem mto simples e ñ haver necessidade. */
@Component({
  selector: 'app-mensagens-erro',
  template: `
    <p-message *ngIf="temErro()" severity="error" text="{{ texto }}"></p-message>

    <!-- <div *ngIf="temErro()" class="p-message p-message-error">
      {{ texto }}
    </div> -->
  `,
  // Além da alteração nas classes de validação citadas anteriormente, uma regra CSS foi adicionada no
  //   MessageComponent para melhorar o layout das mensagens:
  styles: [`
    .p-message-error, .p-inline-message-error {
      padding: 3px;
    }
  `]
})
export class MensagensErroComponent {

  // @Input() controle!: FormControl;
  @Input() controle!: NgModel;
  @Input() erro!: string;
  @Input() texto!: string;
  @Input() estadoCntrl!: string;

  temErro(): boolean | null {
    const ret = ( ( (this.estadoCntrl === "dirty" && this.controle.dirty) ||
      (this.estadoCntrl === "touched" && this.controle.touched) ) &&
      this.controle.hasError(this.erro) );

    // console.log(`Tem erro de ${this.erro} no controle ${this.controle.name}? ${ret === true ? "Sim!" : "Não!"}`);

    return ret;
  }

}
