
function previn( ...modules ) {
    var Base = Base || class {}

    modules.forEach( mod => {
        Base = mod( Base )
    })

    return Base
}


export function PrevinBase( Base ) {
    return previn
}

export default previn
