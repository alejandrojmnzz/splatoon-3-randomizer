
let weapons = []
let abilities = []
let exclusiveAbilities = false


window.onload = () => {
    axios.get('https://splatoon-3-randomizer.onrender.com/weapons')
        .then(response => {
            weapons = response.data
        })

    axios.get('https://splatoon-3-randomizer.onrender.com/abilities')
        .then(response => {
            abilities = response.data

        })
}
let button = document.getElementById('randomize-button')
button.onclick = randomize

function randomize() {
    

    const randomWeaponIndex = Math.floor(Math.random() * weapons.length)
    let randomAbility = {}
    let secondAbility = null

    document.getElementById('ability-image').innerHTML = ''


    if (!exclusiveAbilities) {
        const generalAbilities = abilities.filter(ability => ability.exclusive == false)
        const randomAbilityIndex = Math.floor(Math.random() * generalAbilities.length)
        randomAbility = generalAbilities[randomAbilityIndex]
    } else {
        const randomAbilityIndex = Math.floor(Math.random() * abilities.length)
        randomAbility = abilities[randomAbilityIndex]
        if (randomAbility.exclusive == true) {
            const generalAbilities = abilities.filter(ability => ability.exclusive == false)
            const randomAbilityIndex = Math.floor(Math.random() * generalAbilities.length)
            secondAbility = generalAbilities[randomAbilityIndex]
        }
    }

    const randomWeapon = weapons[randomWeaponIndex]



    const weaponName = randomWeapon.name.en_US
    const subName = randomWeapon.sub.name.en_US
    const specialName = randomWeapon.special.name.en_US
    const subImage = randomWeapon.sub.name.en_US.split(' ').join('_')
    const specialImage = randomWeapon.special.name.en_US.split(' ').join('_')


    let weaponImage = ''
    if (weaponName.split('')[0] === '.') {
        const nameArray = weaponName.split('')
        nameArray.shift()
        weaponImage = nameArray.join('').split(' ').join('_')

    } else if (weaponName.split('')[weaponName.split('').length - 1] === '.') {
        const nameArray = weaponName.split('')
        nameArray.pop()
        weaponImage = nameArray.join('').split(' ').join('_')
    }
    else {
        weaponImage = (weaponName.split(' ').join('_'))

    }




    if (randomAbility["image-code"] != null) {

        const firstImage = document.createElement('img')
        firstImage.src = `https://leanny.github.io/splat3/images/skill/${randomAbility["image-code"]}`
        firstImage.height = 126
        firstImage.width = 126
        document.getElementById("ability-image").appendChild(firstImage)

    }

    if (randomAbility["image-url"] != null) {
 
        const firstImage = document.createElement('img')
        firstImage.src = randomAbility["image-url"]
        firstImage.height = 126
        firstImage.width = 126
        document.getElementById("ability-image").appendChild(firstImage)

    }
    if (secondAbility) {
        const plus = document.createElement('p')
        const node = document.createTextNode("+");
        plus.className = 'plus'
        plus.appendChild(node)
        document.getElementById('ability-image').appendChild(plus)
        if (secondAbility['image-code'] != null) {
            const secondImage = document.createElement('img')
            secondImage.src = `https://leanny.github.io/splat3/images/skill/${secondAbility["image-code"]}`
            secondImage.height = 126
            secondImage.width = 126
            document.getElementById("ability-image").appendChild(secondImage)
        }
        
        if (secondAbility['image-url'] != null) {

            const secondImage = document.createElement('img')
            secondImage.src = secondAbility["image-url"]
            secondImage.height = 126
            secondImage.width = 126
            document.getElementById("ability-image").appendChild(secondImage)
        }
    }

    if (randomAbility.name == "Sub Power Up") {
        document.getElementById('buff-description').innerHTML = `
        <div>
            <p class="buff-title">Effect on ${randomWeapon.sub.name.en_US}</p>
            <p class="buff">${randomWeapon.sub.buff}</p>
        </div>
        `
    } else {
        document.getElementById('buff-description').innerHTML = ''
    }
    
    document.getElementById("weapon-name").innerHTML = weaponName
    document.getElementById("weapon-image").innerHTML = `<img width=170px height=170px src="https://jamesomckenna.github.io/SplatRandomiser3/dist/images/weapons/${weaponImage}.webp" />`
    document.getElementById("sub-image").innerHTML = `<img width=60px height=60px src="https://jamesomckenna.github.io/SplatRandomiser3/dist/images/sub/${subImage}.webp" />`
    document.getElementById("sub-name").innerHTML = subName
    document.getElementById("special-name").innerHTML = specialName
    // document.getElementById("ability-name").innerHTML = randomAbility.name
    document.getElementById("special-image").innerHTML = `<img width=60px height=60px src="https://jamesomckenna.github.io/SplatRandomiser3/dist/images/special/${specialImage}.webp" />`

}

const switcher = document.getElementById('switchCheckDefault').onchange = excludeAbilities

function excludeAbilities(event) {
    if (event.target.checked) {
        exclusiveAbilities = true
    } else {
        exclusiveAbilities = false
    }
}