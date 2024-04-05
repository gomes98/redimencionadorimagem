const questions = require('./question');
const fs = require('fs');
const sharp = require('sharp');

const main = async () => {
  let path = await questions.question('Qual a pasta para redimencionar as imagens? ');
  console.log(`pasta para redimensionar imagens: ${path}`);
  // Verifica se a pasta existe
  if(!fs.existsSync(path)){
    console.log('pasta não existe');
    return process.exit(0);
  }
  // Verifica se a pasta resized existe, se não existir cria a pasta
  if(!fs.existsSync(path + '/resized')){
    console.log('pasta resized não existe, criando pasta');
    fs.mkdirSync(path + '/resized');
  }
  // pergunta a largura da imagem
  let largura = await questions.question('Qual a nova largura da imagem? ');
  console.log(`nova largura da imagem: ${largura}`);

  // Lista os arquivos da pasta
  let files = fs.readdirSync(path);
  let filesImages = files.filter(file => file.match(/\.(png|jpeg|jpg)$/));
  // Lista os arquivos da pasta resized
  let filesR = fs.readdirSync(path + '/resized');
  let filesImagesR = filesR.filter(file => file.match(/\.(png|jpeg|jpg)$/));
  // mostra a quantidade de imagens encontradas e redimensionadas
  console.log('Imagens encontradas:', filesImages.length, 'Imagens redimensionadas:', filesImagesR.length);

  let count = 0;
  for (const key in filesImages) {
    if (Object.hasOwnProperty.call(filesImages, key)) {
      const element = filesImages[key];
      if(filesImagesR.includes(element)){
        console.log(`Imagem ${element} já redimensionada`);
        continue;
      }
      count++;
      await sharp(`${path}/${element}`).resize({width: parseInt(largura)}).toFile(`${path}/resized/${element}`);
      console.log(`Imagem ${element} redimensionada`);
    }
  }
  console.log(count, 'Imagens redimensionadas com sucesso');
  return process.exit(0);
};

(async () => {
  await main();
})();