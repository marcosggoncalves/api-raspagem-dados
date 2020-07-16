const puppeteer = require('puppeteer');

const raspar  = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                ignoreDefaultArgs: ['--disable-extensions'],
            });
            
            const page = await browser.newPage();
            
            await page.goto("https://www.antt.gov.br/web/guest/noticias-e-eventos");
            
            let urls = await page.evaluate(() => {
                
                let results = [];
                let data = document.querySelectorAll('.subtexto');
                let titulo = document.querySelectorAll('.corpo h5');
                let imagem = document.querySelectorAll('.imagem img');
                let link = document.querySelectorAll('.cards a');;

                data.forEach((item, index) => {
                    if(item.innerText.search('Notícia') != 0){
                        results.push({
                            titulo: '',
                            link:'',
                            imagem: '',
                            data:item.innerText
                        })
                    }
                });

                titulo.forEach((item, index) => {
                    results[index]['titulo'] = item.innerText;
                });

                imagem.forEach((item, index) => {
                    results[index]['imagem'] = item.src;
                });

                link.forEach((item, index) => {
                    results[index]['link'] = 'https://www.antt.gov.br' +  item.getAttribute('href');
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