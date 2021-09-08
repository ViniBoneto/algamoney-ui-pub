import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: "Jacinto L. Aquino Rego", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Romeu Pinto", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Ava Berta", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Cuca Alves Beludo", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Botelho Soares Pinto", cidade: "Paraty", estado: "RJ", ativo: 1 },
    { nome: "Mila Amiuza", cidade: "Petrópolis", estado: "RJ", ativo: 0 },
    { nome: "Beijamin Argola", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Laís C. Navarra", cidade: null, estado: null, ativo: 0 },
    { nome: "Major Tommas", cidade: "Washington", estado: "DC", ativo: 0 },
    { nome: "Patinhas McPato", cidade: "Patópolis", estado: null, ativo: 0 }
  ];

}
