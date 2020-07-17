module.exports.index = (req,res)=>{
	const request = require('request');
    const cheerio = require('cheerio');
    const moment = require("moment");

    moment.locale('pt-BR');

    request('https://www.antt.gov.br/web/guest/noticias-e-eventos', function(error, response, html) {
      	var $ = cheerio.load(html);

        var results = [];

        $('.cards a').each(function(i) {
            if(i < 4){
                let data = $(this).find('.subtexto').eq(0).text().trim();
                let titulo = $(this).find('.corpo h5').eq(0).text().trim();
                let imagem = $(this).find('img').eq(0).attr('src');
                let link = $(this).eq(0).attr('href');

                results.push({
                    titulo: titulo,
                    link: `https://www.antt.gov.br/${link}`,
                    imagem: imagem,
                    data:data
                });  
            }          
        });

        res.json({
            "atualizado":moment().format('L'),
			"success": true,
			"data": {
                "noticias": results
            }
		});
    });
}