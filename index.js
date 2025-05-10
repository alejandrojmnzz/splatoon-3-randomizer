let weapons = []
let abilities = []

window.onload = () => {
    axios.get('http://localhost:3000/weapons')
    .then(response => {
        weapons = response.data
    })  

    axios.get('http://localhost:3000/abilities')
    .then(response => {
        abilities = response.data
    })
}
const button = document.getElementById("randomize-button").onclick = randomize

function randomize() {
    const randomWeaponIndex = Math.floor(Math.random() * weapons.length)
    const randomAbilityIndex = Math.floor(Math.random() * abilities.length)

    const randomWeapon = weapons[randomWeaponIndex]
    const randomAbility = abilities[randomAbilityIndex]
    console.log(randomAbility)

    const weaponName = randomWeapon.name.en_US


    let weaponImage = ''
    if (weaponName.split('')[0] === '.') {
        const nameArray = weaponName.split('')
        nameArray.shift()
        weaponImage = nameArray.join('').split(' ').join('_')
        console.log(weaponImage)

    } else if (weaponName.split('')[weaponName.split('').length - 1] === '.') {
        const nameArray = weaponName.split('')
        nameArray.pop()
        weaponImage = nameArray.join('').split(' ').join('_')
        console.log(weaponImage)
    }   
    else {
        weaponImage = (weaponName.split(' ').join('_'))
        console.log(weaponImage)

    }


    if (randomAbility["image-code"] != null) { 
        if ( randomAbility["exclusive"] == false) {
         document.getElementById("ability-image").innerHTML = `<img src="https://leanny.github.io/splat3/images/skill/${randomAbility["image-code"]}" />`
        }
        }
    if (randomAbility["image-url"] != null) {
        if ( randomAbility["exclusive"] == false) {
        document.getElementById("ability-image").innerHTML = `<img src="${randomAbility["image-url"]}" />`
        }
    }
    document.getElementById("weapon-image").innerHTML = `<img src="https://jamesomckenna.github.io/SplatRandomiser3/dist/images/weapons/${weaponImage}.webp" />`
   
}


