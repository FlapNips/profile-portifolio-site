module.exports = app => {

	const existsOrError = (value, msg) => {

		if(value == undefined) throw msg
		if(value == null) throw msg
		if(!value) throw msg
		if(Array.isArray(value) && value.length === 0) throw msg
		if(typeof value == 'string' && !value.trim()) throw msg

	}


	const notExistsOrError = (value, msg) => {

		try {
			existsOrError(value, msg)
		} catch(error) {
			return
		}
		throw msg

	}


	const equalsOrError = (valueA, valueB, msg) => {

		if(valueA !== valueB) throw msg
	
	}


	const contentObjectOrError = (obj, msg) => {
		console.log(obj)
		if(Object.values(obj).some( element => {
			if(typeof element == 'string' && !element.trim()) return true
			})
		) { throw msg }
		return

	}

	//VALIDATOR IS DATE
  Date.prototype.isDate = function (){
    return (this !== "Invalid Date" && !isNaN(this)) ? true : false;
	}
	

	const existsValueForUpdate = (data, dataDB) => {

		let validator = false

			if(typeof data == 'object') {

				validator =	Object.keys(dataDB).some( key => {

					key = key.replace('_', '').toLowerCase()
					if(key === 'id') return false

					return data[key] != undefined
				}) 

			} else if ( typeof data == 'array') {

				validator = dataDB.some( key => {

					key = key.replace('_', '').toLowerCase()
					if(key === 'id') return false					

					return data[newKey] != undefined
				}) 

			} else {
				throw 'O metodo EXISTS VALUE FOR UPDATE apenas para ARRAY ou OBJECTS'
			}
			
			if(!validator) throw 'Precisa de ao menos um campo preenchido para atualizar.'
			return validator
	
	}
	
	return { 
		existsOrError, 
		notExistsOrError, 
		equalsOrError,
		existsValueForUpdate,
		contentObjectOrError
	}
}