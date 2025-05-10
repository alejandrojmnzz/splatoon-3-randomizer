let weapons = []

window.onload = () => {
    axios.get('http://localhost:3000/weapons')
    .then(response => {
        weapons = response.data
    })  
}
const button = document.getElementById("randomize-button").onclick = randomize

function randomize() {
    const randomIndex = Math.floor(Math.random() * weapons.length)
    const randomWeapon = weapons[randomIndex]
    const weaponName = randomWeapon.name.en_US


    let image = ''
    if (weaponName.split('')[0] === '.') {
        const nameArray = weaponName.split('')
        nameArray.shift()
        image = nameArray.join('').split(' ').join('_')
        console.log(image)

    } else if (weaponName.split('')[weaponName.split('').length - 1] === '.') {
        const nameArray = weaponName.split('')
        nameArray.pop()
        image = nameArray.join('').split(' ').join('_')
        console.log(image)
    }   
    else {
        image = (weaponName.split(' ').join('_'))
        console.log(image)

    }
    
    document.getElementById("image").innerHTML = `<img src="https://jamesomckenna.github.io/SplatRandomiser3/dist/images/weapons/${image}.webp" />`
}
