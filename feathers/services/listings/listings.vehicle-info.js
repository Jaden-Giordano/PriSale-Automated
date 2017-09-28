const makes = [
	'acura', 'alfa-romeo', 'aston-martin', 'audi',
	'bently', 'bmw', 'buick', 'cadillac',
	'chevrolet', 'chrysler', 'dodge', 'ferrari',
	'fiat', 'ford', 'genesis', 'gmc',
	'honda', 'hyundai', 'infiniti', 'jaguar',
	'jeep', 'kia', 'lamborghini', 'land-rover',
	'lexus', 'lincoln', 'lotus', 'maserati',
	'mazda', 'mclaren', 'mercedes-benz', 'mini',
	'mitsubishi', 'nissan', 'porsche', 'ram',
	'rolls-royce', 'scion', 'smart', 'subaru',
	'tesla', 'toyota', 'volkswagen', 'volvo'
];

function fixMake(notNiceMake) {
	let hypenDownCase = notNiceMake.replace(/\s/, '-').toLowerCase();

	if (makes.includes(hypenDownCase))
		return hypenDownCase;

	return false;
}

module.exports = {
	fixMake
};
