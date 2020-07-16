// const puppeteer = require('puppeteer');

// const raspar  = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],ignoreDefaultArgs: ['--disable-extensions']});

//             const page = await browser.newPage();
            
//             await page.goto("https://www.comilonibus.com.br/site/novidades/categoria-eventos");
            
//             let urls = await page.evaluate(() => {
                
//                 let results = [];
//                 let titulo = document.querySelectorAll('.tt-titulo-conteudo');
//                 let link = document.querySelectorAll('.tt-titulo-conteudo a');
//                 let img = document.querySelectorAll('img');

//                 img.forEach((item, index) => {
//                     if(item.src.search("arquivo/novidade/miniatura") > 0 && index <= 4){
//                         results.push({
//                             titulo: null,
//                             imagem: item.src,
//                             link: null
//                         })   
//                     }
//                 });

//                 link.forEach((item, index) => {
//                     if(index < results.length){
//                         results[index]['link'] = item.getAttribute('href');       
//                     }
// -                });

//                 titulo.forEach((item, index) => {
//                     if(index < results.length){
//                         results[index]['titulo'] = item.innerText ;
//                     }  
//                 });

//                 return results;    
//             });

//             browser.close();
//             return resolve(urls);
//         } catch (e) {
//             return reject(e);
//         }
//     })
// }

let raspar = ()=>{
    const request = require('request');
    const cheerio = require('cheerio');

    request('', function(error, response, html) {
      if (!error) {
            var $ = cheerio.load(html);

            var resultado = [];

            $('.cards').each(function(i) {
                var codigo = $(this).find('td').eq(0).text().trim(),
                    orgao = $(this).find('td').eq(1).text().trim(),
                    valorTotal = $(this).find('td').eq(2).text().trim();
                
                resultado.push({
                    codigo: codigo,
                    orgao: orgao,
                    total: valorTotal
                });
            });

        }

    });
}

module.exports = raspar;