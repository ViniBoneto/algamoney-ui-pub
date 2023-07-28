/* Fullstack Angular e Spring - Parte de front-end (UI): Criando arqvo nodejs (algamoney-ui.js) e alterando e inserindo
    configs de prod p/ implantar app no amb AWS. */

// import process from 'node:process';
const process = require('process');
const { spawn, execFile } = require('child_process');

// const TMPDIR = `${process.env.HOME}/Downloads/__tmp/`,
// const ZIPFILE = 'algamoney-ui.zip';

/* Procura obter caminho do arq zip em var de amb, caso haja. Senão continua com caminho padrão, definido no inicio
    do script. */
let zipFile = 'algamoney-ui.zip';
// Busca dir dinamicamente de arq de config de amb
let dirImpl = "";
let i = 0;

loadEnvCfgs().then(
  () => {
    // unzip();
/* Adicionando etapa anterior de obtenção do arq zip c/ cmd curl e salvamento deste p/ o dir corrente, p/ somente
  aí descomprimi-lo. */
    fetchFile();
  }
);

console.log(String(i++) + "- Initializing app deployment.");

function unzip() {
  // const unzip = spawn('unzip', [ZIPFILE, `-d ${TMPDIR}`]);

  // Da forma acima ñ deu certo. Então, passo opt shell true p/ q o cmd rode dentro de amb shell (/bin/sh), p/
  //  contornar erro (pois neste amb o cmd roda s/ probs).
  // const unzip = spawn('unzip', ['-o', ZIPFILE, `-d ${TMPDIR}`], { shell: true });

  // Busca dir dinamicamente de arq de config de amb
  // const unzip = spawn('unzip', ['-o', ZIPFILE, `-d ${dirImpl}`], { shell: true });

/* Procura obter caminho do arq zip em var de amb, caso haja. Senão continua com caminho padrão, definido no inicio
    do script. */
  const unzip = spawn('unzip', ['-o', zipFile, `-d ${dirImpl}`], { shell: true });

  unzip.on('error', (err) => {
    hndlErr('Failed to start unzip subprocess.');
  });

  unzip.stderr.on('data', (data) => {
    hndlErr(`unzip stderr: ${data}`);
  });

  unzip.on('close', (code) => {
    if(code !== 0)
      hndlErr(`child process exited with code ${code}`, code);

    // console.log(`1- Unziped file ${ZIPFILE} to directory ${TMPDIR}`);
    // console.log(`1- Unziped file ${ZIPFILE} to directory ${dirImpl}`);
    console.log(String(i++) + `- Unziped file ${zipFile} to directory ${dirImpl}`);
    cd();
  });
}

function cd(){
  try {
    // process.chdir(TMPDIR);
    process.chdir(dirImpl);
    console.log(String(i++) + `- New directory: ${process.cwd()}`);
    nodeInstall();
  } catch (err) {
    hndlErr(`chdir: ${err}`);
  }
}

function nodeInstall() {
  process.chdir("./algamoney-ui");
  console.log(`Diretório atual:\t${process.cwd()}`);

  execFile("npm", ["install"], (error, stdout, stderr) => {
    if (error) {
      // throw error;
      hndlErr(error.toString());
    }
    // console.log(stdout);
    console.log(String(i++) + "- Program node dependencies installed");
    nodestart();
  });
}

function nodestart() {
  const node = execFile("node", ["server.js"], (error, stdout, stderr) => {
    if (error) {
      // throw error;
      hndlErr(error.toString());
    }
    // console.log(stdout);
    console.log(String(i++) + "- Node server finished.");
  });

  // node.on("spawn", () => {
  console.log(String(i++) + "- Node server starting.");
  // });
}

function loadEnvCfgs() {
/* Como ñ é possível importar um mód TS (environment) p/ um pgm nodejs (algamoney-ui.js), mudei p/ confgs fixas de
  dev e prod, escolhidas via param passado p/ pgm. */
  // return import("./src/environments/environment").then(
  //   (modEnv) => this.dirImpl = modEnv.dirImpl
  // );

  // console.log(`args p/ pgm: [${process.argv}]\nNúmero de args: ${process.argv.length}`);
  // return Promise.resolve(true);

/*  Adicionar cond p/ receber cfg relativa ao tp de amb (prod ou dev) p/ var de amb, além daquela preexistente p/
      lin de cmd. */
  let ambProd;

  if(process.env.NODE_ENV) {
    ambProd = (process.env.NODE_ENV === "PROD");
  }
  else {
    ambProd = (process.argv.length > 2) ? process.argv[2] === "--prod" : false;
  }

  const logFunc = console.log;
  dirImpl = ambProd ? "./" : `${process.env.HOME}/Downloads/__tmp/`
  console.log(`Pgm rodando em amb de ${ambProd ? "PROD" : "DEV"}, usando dir de impl "${dirImpl}"`);

  /* Procura obter caminho do arq zip em var de amb, caso haja. Senão continua com caminho padrão, definido no inicio
    do script. */
  if(process.env.ZIP_FILE) {
    zipFile = process.env.ZIP_FILE;
    zipFile = scapeStr(zipFile);
  }

  console.log(`Arq .zip contento a app, a ser extraído: ${zipFile}`);

  return new Promise( (logFunc) => {
                        logFunc(dirImpl);
                    });
}

/* Adicionando etapa anterior de obtenção do arq zip c/ cmd curl e salvamento deste p/ o dir corrente, p/ somente
  aí descomprimi-lo. */
function fetchFile() {
  let localZipFile;
  const curl = spawn('curl', ['--no-progress-meter', `-o ${dirImpl}/${localZipFile = basename(zipFile)}`,
    `"${zipFile}"`], { shell: true });

  curl.on('error', (err) => {
    hndlErr(`Failed to fetch file ${zipFile}`);
  });

  curl.stderr.on('data', (data) => {
    hndlErr(`Fetch file (curl) stderr: ${data}`);
  });

  curl.on('close', (code) => {
    if(code !== 0)
      hndlErr(`child process exited with code ${code}`, code);

    console.log(String(i++) + `- Fetched file ${zipFile} to directory ${dirImpl}`);
    zipFile = localZipFile;
    unzip();
  });
}

function hndlErr(msgErr, codErr) {
  if(!codErr)
    codErr = -1;

  console.error(`Erro!!\tCódigo erro: ${codErr}.\tMsg erro: "${msgErr}"`);
  process.exit(codErr);
}

function scapeStr(str) {
  if(str.trim().includes(" "))
    str = '"'.concat(process.env.ZIP_FILE, '"');

  return str;
}

function basename(fileName) {
  if(typeof fileName !== "string" )
    return null;

  let iLastSep = fileName.lastIndexOf("/");

  if(iLastSep < 0)
    iLastSep = 0;
  else
    iLastSep++;

  let iQueryStr = fileName.indexOf("?", iLastSep);

  if(iQueryStr < 0)
    iQueryStr = fileName.length;

  fileName = fileName.substring(iLastSep, iQueryStr);
  console.log(`Zip file basename:\t${fileName}`);

  return fileName;
}
