/* 19.9. Exibindo o menu do sistema conforme permissões do usuário:
  P/ ñ ficar botando as strs descritivas das perms "hard coded" no cód, cria um enum const do tp str c/ os
    vals delas e insere os membros do enum no cód. */
export enum PERMISSOES {
  ROLE_CADASTRAR_CATEGORIA = 1,
  ROLE_PESQUISAR_CATEGORIA,
  ROLE_CADASTRAR_PESSOA,
  ROLE_REMOVER_PESSOA,
  ROLE_PESQUISAR_PESSOA,
  ROLE_CADASTRAR_LANCAMENTO,
  ROLE_REMOVER_LANCAMENTO,
  ROLE_PESQUISAR_LANCAMENTO
}
