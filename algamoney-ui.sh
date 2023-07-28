### Ini script ###
#!/bin/bash
### Exec principal do pgma ###
unzip algamoney-ui.zip -d ~/Downloads/__tmp/
RET=$?
if [ $RET -ne 0 ]
then
	hnd_err "Falha na descompressão do .zip. Código retorno (erro): $RET."
fi
cd ~/Downloads/__tmp/algamoney-ui/
RET=$?
if [ $RET -ne 0 ]
then
	hnd_err "Falha na mudança p/ o dir dest. Código retorno (erro): $RET."
fi
npm install
RET=$?
if [ $RET -ne 0 ]
then
	hnd_err "Falha na instalação de depends da app (node). Código retorno (erro): $RET."
fi
node server.js
RET=$?
if [ $RET -ne 0 ]
then
	hnd_err "Falha na inicialização do serv (node). Código retorno (erro): $RET."
fi
return 0

### Func aux de tratamento erro ###
hnd_err () {
	if [ $# -ge 1 ]
	then
		echo -e "ERRO! \tMensagem erro: $1" 1>&2
	fi
	return 1
}
### Fim script ###
