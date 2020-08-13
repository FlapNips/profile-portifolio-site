module.exports = app => {
	const existsOrError = (value, msg) => {
		if(value == undefined) throw msg
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

	const objectValueOrError = (obj, msg) => {
		if(Object.values(obj).some( element => {
			if(typeof element == 'string' && !element.trim()) return true
			})
		) { throw msg }
		return
	}
	
	const existsValueForUpdate = (data, dataDB) => {
		let validator = false
			if(typeof data == 'object') {
				validator =	Object.keys(dataDB).some( key => {

					key = key.split('_')
					let newKey = ''
					for(const [index, element] of key.entries()) {
						if(index == 0) newKey += element
						else newKey += element.charAt(0).toUpperCase() + element.slice(1)
					}
					return data[newKey] != undefined

				}) 
			}else if ( typeof data == 'array') {

				validator = dataDB.some( key => {
					key = key.split('_')
					let newKey = ''
					for(const [index, element] of key.entries()) {
						if(index == 0) newKey += element
						else newKey += element.charAt(0).toUpperCase() + element.slice(1)
					}
					return data[newKey] != undefined
				}) 

			} else {

				throw 'O metodo EXISTIS VALUE FOR UPDATE apenas para ARRAY e OBJECTS'
			}
			if(!validator) throw 'Precisa de ao menos um campo preenchido para atualizar'

	
	}
	
	return { 
		existsOrError, 
		notExistsOrError, 
		equalsOrError,
		existsValueForUpdate,
		objectValueOrError
	}
}