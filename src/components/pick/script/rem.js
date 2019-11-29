const rem = {

	width: window.innerWidth,

	target:750,

	multiple:32,

	em:0,

	unit:function (value,parse=true) {
		if (parse) {
			return parseFloat(value) / rem.em;
		} else {
			return parseFloat(value) * rem.em;
		}
	}

};

rem.em = rem.target / rem.width;


export default rem;
