const puppeteer = require('puppeteer');

const raspar  = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            await page.goto("https://www.comilonibus.com.br/site/novidades/categoria-lancamentos");
            
            let urls = await page.evaluate(() => {
                let results = [];
                let titulo = document.querySelectorAll('.tt-titulo-conteudo');
                let link = document.querySelectorAll('.tt-titulo-conteudo a');
                let img = document.querySelectorAll('img');

                let format  = (text) =>{
                    let remove = ["_"];

                    for (var i = 0; i < remove.length; i++) {
                        text =  text.replace(remove[i]," ");
                    }
                    return text;
                }

                img.forEach((item, index) => {
                    if(item.src.search("arquivo/novidade/miniatura") > 0){
                        results.push({
                            titulo: null,
                            imagem: item.src,
                            link: null
                        })   
                    }
                });

                link.forEach((item, index) => {
                    results[index]['link'] = item.getAttribute('href');    
                });

                titulo.forEach((item, index) => {
                    results[index]['titulo'] = item.innerText   
                });

                return results;    
            });

            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

module.exports = raspar;