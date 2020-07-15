module.exports.index = (req,res)=>{
	const raspagem = require("../../utils/raspagemSiteComil.js");
	const moment = require("moment");
	const fs = require('fs');

	moment.locale('pt-BR');

	let data = moment().format('LLL');

	fs.exists('comil.json', function(exists){
		if(exists){
			let arquivo =  fs.readFileSync("./comil.json", "utf8");

			if(arquivo.atualizado && arquivo.atualizado < data){
				raspagem().then((result)=>{
					result.push({"atualizado": data});

					let noticias = JSON.stringify(result);

					fs.unlink('comil.json');

			 		fs.writeFileSync('comil.json', noticias);

			 		let create =  fs.readFileSync("./comil.json", "utf8");

			 		res.json({
				 		"success": true,
				 		"status":"Arquivo atualizado.",
				 		"noticias":  JSON.parse(arquivo)
				 	});
				}).catch((error)=>{	
					res.status(417).json({
						status: false,
						message:"Não foi possivel extrair dados!"
					});
				});
		 	}else{
		 		res.json({
			 		"success": true,
			 		"status":"Arquivo não atualizado.",
			 		"noticias":  JSON.parse(arquivo)
			 	});
		 	}
		}else{	
			raspagem().then((result)=>{
				result.push({"atualizado": data});

				let noticias = JSON.stringify(result);

				let create = fs.writeFileSync('comil.json', noticias);
				let arquivo =  fs.readFileSync("./comil.json", "utf8");

			 	res.json({
			 		"success": true,
			 		"status":"Arquivo criado com sucesso.",
			 		"noticias": JSON.parse(arquivo)
			 	});
			}).catch((error)=>{		
				res.status(417).json({
					status: false,
					message:"Não foi possivel extrair dados!"
				});
			});
		}
	});
}