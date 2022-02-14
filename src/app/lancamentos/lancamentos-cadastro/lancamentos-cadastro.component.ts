import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  // 13.3. Adicionando botão de seleção:
  //   Vamos criar a prop tipos (um array de objs), p/ carregar as opts do SelectButton no template HTML.
  //   O comp SelectButton automaticamente exibirá as strs dos campos label, de cada obj, como rótulos das abas.
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }
  ];

  // 13.4. Adicionando caixa de seleção (componente Dropdown):
  //   Comp PNG Dropdown tem um funcionamento mto semelhante ao SelecButton (botão de seleção). Array de categs
  //   será carregado no Dropdown de categs, de modo análogo ao array de tipos no SelectButton. Idem p/ o array
  //   de pessoas no Dropdown de pessoas.
/*   categorias = [
    { label: "Lazer", value: "1" },
    { label: "Alimentação", value: "2" },
    { label: "Supermercado", value: "3" },
    { label: "Farmácia", value: "4" },
    { label: "Outros", value: "5" }
  ]; */

/* 17.17. Listando as categorias cadastradas no dropdown:
    Esvaziando o array fixo de categs, usado no desenv da tela, pois, a partir de agora, o array q é fonte da combo
    de categs será dinamicamente carregada pelo serv de categs. */
  categorias = [];

  pessoas = [
    { label: "Jacinto L. Aquino Rego", value: "1" },
    { label: "Romeu Pinto", value: "2" },
    { label: "Ava Berta", value: "3" },
    { label: "Cuca Alves Beludo", value: "4" },
    { label: "Botelho Soares Pinto", value: "5" },
    { label: "Mila Amiuza", value: "6" },
    { label: "Beijamin Argola", value: "7" },
    { label: "Laís C. Navarra", value: "8" },
    { label: "Major Tommas", value: "9" },
    { label: "Patinhas McPato", value: "10" }
  ];

  constructor(
/* 17.17. Listando as categorias cadastradas no dropdown:
    Iremos injetar no comp de cadastro de lançamento o serv de categs, p/ preencher dinamicamente a combo desta
    e tb o serv de tratamento de erros, p/ tratar qq erro q venha a ocorrer. */
    private categServ: CategoriaService,
    private errHndServ: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    // 17.17. Listando as categorias cadastradas no dropdown:
    //  Chama o método p/ carregar dinamicamente a combo de categs, logo após o comp ter suas props inicializadas.
    this.carregarCategs();
  }

/* 17.17. Listando as categorias cadastradas no dropdown:
    Acrescentamos um método p/ invocar o serv e carregar a combo de categs. Este método, no entanto, ñ poderá simplesmente
    atribuir diretamente o array de categs retornado pelo servidor à prop do comp (modelo da combobox). Isto pq os objs
    retornados pelo servidor têm as props nome e cód, enquanto a prop do combo tem objs c/ as props lbl e value, q é o formato
    aceito pelo p-dropdown e d+ comps semelhantes do PNG. Então, uma conversão ou mapeamento de arrays terá q ser feita. */
  carregarCategs(){
    // Como anteriormente explicado, ñ se pode simplesmente fazer "this.categorias = categs;". É preciso fazer um map.
    this.categServ.listar().then(categs => {
      // this.categorias = categs.map( (categ: any) => {
      //   return { label: categ.nome, value: categ.codigo };

      // Podemos tornar o cód acima (comentado) ainda + enxuto, rescrevendo-o da forma abaixo.
      //  Obs: Os () em torno dos {} são requeridos, p/ o compilador ñ pensar q se trata do corpo da func.
      this.categorias = categs.map( (categ: any) => ( { label: categ.nome, value: categ.codigo } ) );
    })
    // É preciso tb fazer um tratamento de erros
    .catch(erro => this.errHndServ.handle(erro));
  }
}
