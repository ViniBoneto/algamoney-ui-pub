import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { NgForm, NgModel, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { Endereco, Pessoa } from './../../core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

/* 18.15. Desafio: roteamento e edição de pessoas:
    No modo edt de pessoa alterando carregamento da pessoa a ser atualizada, do ngOninit() - fase do cliclo
    de vida de init da dir ou comp após NG exibir 1º as props vinculadas a dados e definir as de entrada -
    p/ ngAfterContentInit() - qdo NG projeta conteúdo externo na view do comp ou na view em que uma dir está -
    pois este último ocorre antes do 1º, qdo o comp ou dir é inicializado. C/ isto, visa-se corrigir erro de q
    props do form ñ estavam sendo vinculadas ao model, na atual de pessoa, vindo vazias.

  Mais detalhes sobre fases do cliclo de vida de dirs ou comps no NG: https://angular.io/guide/lifecycle-hooks */
// export class PessoasCadastroComponent implements OnInit, AfterContentInit {

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Criando uma prop representando a nova pessoa a ser cadastrada. */
  pessoa = new Pessoa();

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas o preenchimento dos campos na edt, como feito p/ lançs na aula 18.7.
  get editando() : boolean {
    return Boolean(this.pessoa.codigo);
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Criando prop e ligando-a ao form da view, via @ViewChild, p/ tst e verificação dos vals deste.
  @ViewChild("form") pessoaForm: NgForm | undefined;

/* 18.15. Desafio: roteamento e edição de pessoas:
    Precisei mudar o 2-way-databind (banana in the box) pelo simples prop bind, na view, e pela atrib de
    props da view p/ o model na submit, devido aos erros TS2531 e NG5002 (probl reportado na aula 17.21).
    Porém, devido a um bug, ou no NG ou no PNG, na edt de pessoas os vals dos campos do form (view) estão
    vindo vazios ou indef qdo ñ alterados (c/ status pristine) e, p/ contornar isso, estou levando em conta
    apenas campos "sujos" (dirty) e inválidos p/ rejeitar a submit do form e estou atualizando no model apenas
    as props "sujas" (dirty) e válidas.

  Array abaixo conterá props a serem alteradas ("sujas" e válidas). */
  propsAlteradas: string[] = [];

  // constructor() { }

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Injetando serv de pessoa, serv tratamento erro e serv de msg no comp. */
  // constructor(private pessoaServ: PessoaService, private errHndServ: ErrorHandlerService,
  //   private msgServ: MessageService) { }

  constructor(
    private pessoaServ: PessoaService,
    private errHndServ: ErrorHandlerService,
    private msgServ: MessageService,
    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas o recebimento de parâms da rota, como feito p/ lançs na aula 18.5.
    private route: ActivatedRoute,
    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas a impl de nav imperativa, como feito p/ lançs na aula 18.9.
    private router: Router,
    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas a def de título pág din, como feito p/ lançs na aula 18.12.
    private title: Title
  ) { }

/* 18.15. Desafio: roteamento e edição de pessoas:
    No modo edt de pessoa alterando carregamento da pessoa a ser atualizada, do ngOninit() - fase do cliclo
    de vida de init da dir ou comp após NG exibir 1º as props vinculadas a dados e definir as de entrada -
    p/ ngAfterContentInit() - qdo NG projeta conteúdo externo na view do comp ou na view em que uma dir está -
    pois este último ocorre antes do 1º, qdo o comp ou dir é inicializado. C/ isto, visa-se corrigir erro de q
    props do form ñ estavam sendo vinculadas ao model, na atual de pessoa, vindo vazias.

  Mais detalhes sobre fases do cliclo de vida de dirs ou comps no NG: https://angular.io/guide/lifecycle-hooks */
  // ngAfterContentInit() {
  //   let codPessoa = this.route.snapshot.params["codigo"];

  //   if(codPessoa)
  //     this.carregarPessoa(codPessoa);
  // }

  ngOnInit(): void {
    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas a def de título pág din, como feito p/ lançs na aula 18.12.
    this.title.setTitle("Nova pessoa");

/*  18.15. Desafio: roteamento e edição de pessoas:
      Repetindo c/ pessoas o recebimento de parâms da rota, como feito p/ lançs na aula 18.5.

    No modo edt de pessoa alterando carregamento da pessoa a ser atualizada, do ngOninit() - fase do cliclo
      de vida de init da dir ou comp após NG exibir 1º as props vinculadas a dados e definir as de entrada -
      p/ ngOnChanges() - qdo NG define ou redefine as props de entrada vinculadas a dados - pois este último
      ocorre antes do 1º, qdo o comp ou dir é inicializado. C/ isto, visa-se corrigir erro de q props do form
      ñ estavam sendo vinculadas ao model, na atual de pessoa, vindo vazias.

    Mais detalhes sobre fases do cliclo de vida de dirs ou comps no NG: https://angular.io/guide/lifecycle-hooks */
    let codPessoa = this.route.snapshot.params["codigo"];

    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas o preenchimento dos campos na edt, como feito p/ lançs na aula 18.7.
    if(codPessoa)
      this.carregarPessoa(codPessoa);
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas o preenchimento dos campos na edt, como feito p/ lançs na aula 18.7.
  carregarPessoa(codPessoa: number) {
    this.pessoaServ.buscar(codPessoa).then((pessoa) => {
      this.pessoa = pessoa;

/*    18.15. Desafio: roteamento e edição de pessoas:
        Caso exista uma prop Pessoa.endereco?.cep válidan na instância, será formatada p/ ser representada
        no formato padrão "99.999-999", caso já ñ esteja.

      O estratagema de se usar uma var temp intermediária (end), foi como forma de contornar probl de qdo tento
        atribuir diretamente val à Pessoa.endereco?.cep, pois devido à prop endereco ser opt, gera erro TS2779. */
      if(this.pessoa.endereco?.cep) {
        let end = this.pessoa.endereco;
        end.cep =  this.__validarFormatCep(this.pessoa.endereco?.cep);
      }
    })
    .then( ( ) => this.atualizarTituloEdt() )
    // .then( ( ) => this.copiarModelPraView(this.pessoaForm) )
    .catch(erro => {
      this.errHndServ.handle(erro);
    });
  }

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Submentendo o form e tratando evto submissão no comp. */
  // salvar(pessoaForm: NgForm) {

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas salvamento edt e nav imperativa, como feito p/ lançs nas aulas 18.8 e 18.9.
  adicionarPessoa(pessoaForm: NgForm) {
    try {
      /*  Como usar o oper ? ao campo endereco ñ funcionou p/ driblar os erros TS2531 e NG5002, mudei a estratégia
            de 2-way-databind p/ property-bind no front c/ atribs de campos às vars do modelo, na func de sumissão,
            no back.

          Comentando as atribs de props do form p/ o model (Pessoa) feitas aqui, à exceção da prop ativo (q já começará
            fixamente c/ true), pois as atribs de props foram movidas p/ o método salvar(), de modo q serão efetuadas
            tanto na add qto na edt de pessoas. */
          // let end =  this.pessoa.endereco || ( this.pessoa.endereco = new Endereco() );

          // Object.assign(end, pessoaForm.value);

          // Trocando método Object.assign(), comentado acima, pela estrut de repetição for...in, pois a prop nome ñ deve
          //   ser copiada como subprop da prop endereco.
          // for (const prop in pessoaForm.value) {
          //   if (prop !== "nome" && pessoaForm.value.hasOwnProperty(prop)) {
              // end[prop] = pessoaForm.value[prop];

              // É preciso converter a expr p/ str e executar c/ eval() p/ a atrib funcionar
            //   eval(`end["${prop}"] = pessoaForm.value[prop];`);
            // }
          // }

          // Prop ativo p/ padrão começa c/ true
          this.pessoa.ativo = true;

          // console.log("Form pessoa:\n", pessoaForm);
          console.log("Salvando pessoa:\n", this.pessoa);

          this.pessoaServ.adicionar(this.pessoa).then(
            // Ñ iremos usar o lanç retornado no corpo de resp (o msm cadastrado), então podemos ignorar o param
            //  de entrada do hnd de tratamento de sucesso.
            // () => {

            // 18.15. Desafio: roteamento e edição de pessoas:
            //   Repetindo c/ pessoas salvamento edt e nav imperativa, como feito p/ lançs nas aulas 18.8 e 18.9.
            (pessoaAdd) => {
              this.msgServ.add({
                severity:'success',
                summary:'Pessoa cadastrada!',
                detail: 'A pessoa foi adicionada com sucesso!'
              });

              pessoaForm.reset();
              this.pessoa = new Pessoa();

              // 18.15. Desafio: roteamento e edição de pessoas:
              //   Repetindo c/ pessoas salvamento edt e nav imperativa, como feito p/ lançs nas aulas 18.8 e 18.9.
              this.router.navigate(["/pessoas", pessoaAdd.codigo]);
            }
          )
          .catch(erro => this.errHndServ.handle(erro));
    }
    catch(ex) {
      this.errHndServ.handle(ex);
    }
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas salvamento edt e nav imperativa, como feito p/ lançs nas aulas 18.8 e 18.9.
  atualizarPessoa(pessoaForm: NgForm) {
    this.pessoaServ.atualizar(this.pessoa).then(
      (pessoaEdt) => {
        this.msgServ.add({
          severity:'success',
          summary:'Pessoa editada!',
          detail: 'A pessoa foi atualizada com sucesso!'
        });

        this.pessoa = pessoaEdt;
      }
    )
    .then( () => this.atualizarTituloEdt() )
    .then( () => this.propsAlteradas = [] )
/*  18.15. Desafio: roteamento e edição de pessoas:
      Como ñ desejo ficar reenviando o form, em modo de edt, qdo nenhuma prop tiver sido alterada, vou
      resetar o status do form, porém recopiando seus atuais vals. S/ esta "gambiarra", ao ser alt e
      submetido uma 1ª x, ele continuará sendo submetido outras x msm s/ alts posteriores.

    Obs: Devido ao probl já reportado - bug, no NG ou no PNG, na edt de pessoas, c/ vals dos campos do
      form (view) vindo vazios ou indef qdo ñ alterados - copio as props da cls model p/ o form antes de
      submeter este ao reset.*/
    .then( () => {
      this.copiarModelPraView(pessoaForm);
      pessoaForm.reset( pessoaForm.value )
      }
    )
    .catch(erro => this.errHndServ.handle(erro));
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas salvamento edt e nav imperativa, como feito p/ lançs nas aulas 18.8 e 18.9.
  salvar(pessoaForm: NgForm) {

/*  18.15. Desafio: roteamento e edição de pessoas:
      Precisei mudar o 2-way-databind (banana in the box) pelo simples prop bind, na view, e pela atrib de
      props da view p/ o model na submit, devido aos erros TS2531 e NG5002 (probl reportado na aula 17.21).
      Porém, devido a um bug, ou no NG ou no PNG, na edt de pessoas os vals dos campos do form (view) estão
      vindo vazios ou indef qdo ñ alterados (c/ status pristine) e, p/ contornar isso, estou levando em conta
      apenas campos "sujos" (dirty) e inválidos p/ rejeitar a submit do form e estou atualizando no model apenas
      as props "sujas" (dirty) e válidas.

    Método abaixo valida o form levando em conta o probl relatado acima, validando somente props "sujas" e válidas
      ou props "limpas" (ou prístinas). */
    if(!this.validarForm(pessoaForm)) {
      this.msgServ.add({
        severity:'error',
        summary:'Formulário inválido!',
        detail: `Favor preencher corretamente todos os campos do form (verificar campos destacados como incorretos).`
      });

      return;
    }
    // Diff qdo ñ houver alts em algum campo, p/ evitar submits desnecessários.
    if(this.propsAlteradas.length == 0) {
      this.msgServ.add({
        severity:'error',
        summary:'Formulário inválido!',
        detail: "Nenhum campo foi alterado. Favor alterar ao menos um campo para submeter form."
      });

      return;
    }

/* 18.15. Desafio: roteamento e edição de pessoas:
    Como precisei mudar o 2-way-databind (banana in the box) pelo simples prop bind, na view, devido aos erros
    TS2531 e NG5002 (probl reportado na aula 17.21), precisarei fazer às atribs dos campos do form às props do
    model, antes de enviá-lo ao backend. Farei isto através do método copiarViewPraModel(). */
    this.copiarViewPraModel(pessoaForm);

    if(this.editando){
      this.atualizarPessoa(pessoaForm);
      // console.log("Alterando pessoa...\n" + JSON.stringify(this.pessoa));
      // this.propsAlteradas = [];
    }
    else
      this.adicionarPessoa(pessoaForm);
      // console.log("Adicionando pessoa...\n" + JSON.stringify(this.pessoa));
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas salvamento edt e nav imperativa, como feito p/ lançs nas aulas 18.8 e 18.9.
  novo(pessoaForm: NgForm) {
    pessoaForm.reset();

    setTimeout(( () => {
      this.pessoa = new Pessoa();
    } ).bind(this), 1);

    this.router.navigate(["/pessoas/nova"]);
  }

/* 18.15. Desafio: roteamento e edição de pessoas:
    Criação método p/ remover val do elem, caso seja um formato de cep inválido e acrescer os chars '.' e '-'
    nas pos corretas, caso o usr ñ faça, de forma a deixar o CEP na format padrão "99.999-999". Este método
    será invocado no evto onChange (view). */
  validarFormatCep(cep: NgModel) {
    if(!cep.valid) {
      // cep.reset("");

      // Ñ posso resetar, como feito acima, pois isso tb tira o estado de "sujo" (dirty), ñ disparando
      //   a msg de erro. P/ conta disto apenas atribuirei ao val a str vazia ("").
      // cep.valueAccessor?.writeValue("");
      // cep.update.emit("");
      cep.control.setValue("");
    }
    else {
      // console.log(`Controle válido:\n${cep}`);
      // console.log(`Controle válido. Valor controle:\n${cep.value}`);
      let cepVal: string = this.__validarFormatCep(cep.value);

      if(cepVal !== cep.value)
        cep.control.setValue(cepVal);
    }
  }

/* 18.15. Desafio: roteamento e edição de pessoas:
    Precisei mudar o 2-way-databind (banana in the box) pelo simples prop bind, na view, e pela atrib de
    props da view p/ o model na submit, devido aos erros TS2531 e NG5002 (probl reportado na aula 17.21).
    Porém, devido a um bug, ou no NG ou no PNG, na edt de pessoas os vals dos campos do form (view) estão
    vindo vazios ou indef qdo ñ alterados (c/ status pristine) e, p/ contornar isso, estou levando em conta
    apenas campos "sujos" (dirty) e inválidos p/ rejeitar a submit do form e estou atualizando no model apenas
    as props "sujas" (dirty) e válidas.

  Qdo estivermos no modo de edt (editando == true), o método abaixo valida o form levando em conta o probl
    relatado acima, validando somente props "sujas" e válidas ou props "limpas" (ou prístinas). Qdo estivermos
    no modo add nova pessoa (editando == false), tds as props serão consideradas automaticamente "sujas" e válidas,
    ou seja, aptas p/ atualização. */
  validarForm(form: NgForm): boolean {
    let valido = true;
    let controls;

    if(!this.editando) {
      this.propsAlteradas.push( ...Object.keys(form.form.controls) );

      // console.log("Form válido? Sim.");
      // console.log(`Props a atualizar: ${this.propsAlteradas.join(", ")}`);

      return true;
    }

    for( let cntrl of Object.keys(controls = form.form.controls) ) {
      if(controls[cntrl].dirty) {
        if( controls[cntrl].invalid ) {
          valido = false;
          break;
        }

        this.propsAlteradas.push(cntrl);
      }
    }

    // console.log(`Form válido? ${valido ? "Sim." : "Não."}`);
    // valido && console.log(`Props a atualizar: ${this.propsAlteradas.join(", ")}`);

    return valido;
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Criação método  p/ acrescer os chars '.' e '-' nas pos corretas, caso o usr ñ faça, de forma a deixar o
  //   CEP na format padrão "99.999-999". Método será invocado no evto onInput.
  // validarInput(ie: Event) {
  //   console.log(ie.target);
  // }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas a def de título pág din, como feito p/ lançs na aula 18.12.
  private atualizarTituloEdt() {
    this.title.setTitle(`Edição pessoa: ${this.pessoa.nome}`);
  }

/* 18.15. Desafio: roteamento e edição de pessoas:
    Criando método interno, p/ formatar corretamente o CEP no padrão "99.999-999". Este método receberá uma
    str c/ o CEP e o retornará outra na format padrão, caso já ñ esteja. Caso já esteja, retornará a msm str. */
  private __validarFormatCep(cep: string): string {

    if(cep.charAt(2) != ".") {
      cep = cep.substring(0, 2) + "." + cep.substring(2);
    }

    if(cep.charAt(6) != "-") {
      cep = cep.substring(0, 6) + "-" + cep.substring(6);
    }

    return cep;
  }

/* 18.15. Desafio: roteamento e edição de pessoas:
    Como precisei mudar o 2-way-databind (banana in the box) pelo simples prop bind, na view, devido aos erros
    TS2531 e NG5002 (probl reportado na aula 17.21), precisarei fazer às atribs dos campos do form às props do
    model, antes de enviá-lo ao backend. Farei isto através do método copiarViewPraModel(). */
  private copiarViewPraModel(pessoaForm: NgForm) {
    // this.pessoa = { ...pessoaForm.value };

    // Prop nome vai direto em pessoa. D+ props do form vão em pessoa.endereco.
    this.pessoa.nome = pessoaForm.value.nome;
    this.pessoa.endereco = this.pessoa.endereco ?? new Endereco();

    for(const prop in pessoaForm.value) {
      if( prop == "nome" || ( this.propsAlteradas.indexOf(prop) < 0 ) )
        continue;

      const propDesc = Object.getOwnPropertyDescriptor(pessoaForm.value, prop);

      if(propDesc)
        Object.defineProperty(this.pessoa.endereco, prop, propDesc);
    }
  }

  private copiarModelPraView(pessoaForm: NgForm | undefined) {
    let end;

    if(pessoaForm) {
      // Prop nome vai direto em pessoa. D+ props do form vão em pessoa.endereco.
      pessoaForm.value.nome = this.pessoa.nome;

      if(end = this.pessoa.endereco) {
        for(const prop in end) {
          const propDesc = Object.getOwnPropertyDescriptor(end, prop);

          if(propDesc)
            Object.defineProperty(pessoaForm.value, prop, propDesc);
        }
      }
    }
  }
}
