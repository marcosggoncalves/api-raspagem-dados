module.exports.index = (req,res)=>{
	const moment = require("moment");

    moment.locale('pt-BR');

	res.json({
        "atualizado":moment().format('L'),
		"success": true,
		"data": []
	});
}