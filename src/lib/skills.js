const skilldefs = [
  {
    name: 'acrobatics',
    label: 'Acrobatics',
    type: 'key',
    ability: 'dex'
  },
  {
    name: 'animalhandling',
    label: 'Animal Handling',
    ability: 'wis'
  },
  {
    name: 'arcana',
    label: 'Arcana',
    ability: 'int'
  },
  {
    name: 'athletics',
    label: 'Athletics',
    type: 'key',
    ability: 'str'
  },
  {
    name: 'deception',
    label: 'Deception',
    type: 'conversation',
    ability: 'cha'
  },
  {
    name: 'history',
    label: 'History',
    ability: 'int'
  },
  {
    name: 'insight',
    label: 'Insight',
    type: 'conversation',
    ability: 'wis'
  },
  {
    name: 'intimidation',
    label: 'Intimidation',
    type: 'conversation',
    ability: 'cha',
    altability: 'str'
  },
  {
    name: 'investigation',
    label: 'Investigation',
    type: 'key',
    ability: 'int'
  },
  {
    name: 'medicine',
    label: 'Medicine',
    ability: 'wis',
    altability: 'int'
  },
  {
    name: 'nature',
    label: 'Nature',
    ability: 'int'
  },
  {
    name: 'perception',
    label: 'Perception',
    type: 'key',
    ability: 'wis'
  },
  {
    name: 'performance',
    label: 'Performance',
    ability: 'cha'
  },
  {
    name: 'persuasion',
    label: 'Persuasion',
    type: 'conversation',
    ability: 'cha'
  },
  {
    name: 'religion',
    label: 'Religion',
    ability: 'int'
  },
  {
    name: 'sleightofhand',
    label: 'Sleight of Hand',
    ability: 'dex'
  },
  {
    name: 'stealth',
    label: 'Stealth',
    type: 'key',
    ability: 'dex'
  },
  {
    name: 'survival',
    label: 'Survival',
    ability: 'wis'
  }
]

export default class Skills {
  constructor (character) {
    this.character = character
    this.skills = []
    for (const skill of skilldefs) {
      if (!this.character.skills.limited || !this.character.skills.limited.length || this.character.skills.limited.includes(skill.name)) {
        this.skills.push({
          key: skill.name,
          name: skill.label,
          bonus: this.getbonus(skill),
          type: skill.type,
          description: (this.character.skills.description || {})[skill.name],
          proficient: this.character.skills.proficient.includes(skill.name)
        })
      }
    }
  }

  getbonus (skill) {
    const info = this.character.skills
    let bonus = 0
    bonus += this.character.abilities[skill.ability]
    if (info.proficient.includes(skill.name)) {
      bonus += this.character.proficiency
    } else if (info.bard) {
      bonus += Math.floor(this.character.proficiency / 2)
    }
    if (info.bonus && info.bonus[skill.name]) {
      bonus += info.bonus[skill.name]
    }
    return (bonus >= 0 ? '+' : '') + bonus
  }
}
