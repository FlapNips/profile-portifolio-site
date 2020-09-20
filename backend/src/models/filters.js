module.exports = app => {
    function changeUnderlineToUpperCase(object) {
        let newObject = {}
        Object.entries(object).forEach(element => {
            const [key, value] = element
            let newKey = key.split('_')
            if (newKey.length > 1) {
                newKey.forEach((x, index) => {
                    if (index > 0) {
                        newKey[index] = x.charAt(0).toUpperCase() + x.slice(1)
                    }
                })
            }
            newKey = newKey.join('')
            newObject[newKey] = value
        })
        return newObject
    }


    return {
        changeUnderlineToUpperCase
    }
}