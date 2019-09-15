import Skills from './skills'

export default class Character {
  constructor (data, novice) {
    for (const [key, val] of Object.entries(data)) {
      this[key] = val
    }
    this.actions = this.actions || []
    this.offensiveactions = this.offensiveactions || []
    this.defensiveactions = this.defensiveactions || []
    this.basicactions = this.basicactions || []
    this.bonusactions = this.bonusactions || []
    this.reactions = this.reactions || []
    this.triggered = this.triggered || []
    this.ritual = this.ritual || []
    this.computedskills = new Skills(this).skills
    if (novice) {
      this.basicactions.push({
        name: 'Hide',
        description: 'Make a stealth roll if you are at least partially concealed.'
      })
      this.basicactions.push({
        name: 'Activate Magical Item'
      })
      this.basicactions.push({
        name: 'Dodge',
        description: 'Attackers are at disadvantage.'
      })
      this.basicactions.push({
        name: 'Disengage',
        description: 'Escape enemy reach without provoking attack.'
      })
      this.basicactions.push({
        name: 'Dash',
        description: 'Double movement this turn.'
      })
      this.basicactions.push({
        name: 'Help',
        description: 'Give an ally advantage on their next action, or distract an enemy so the next attack on them has advantage.'
      })
      this.basicactions.push({
        name: 'Ready an action',
        description: 'Take your action as a reaction to a trigger you specify.'
      })
      this.bonusactions.push({
        name: 'Drink Potion'
      })
      this.reactions.push({
        name: 'Attack of Opportunity',
        description: 'Attack an enemy when they try to move away from you.'
      })
    }
    for (const action of this.actions) this.processaction(action)
    for (const action of this.offensiveactions) this.processaction(action)
    for (const action of this.defensiveactions) this.processaction(action)
    for (const action of this.basicactions) this.processaction(action)
    for (const action of this.bonusactions) this.processaction(action)
    for (const action of this.reactions) this.processaction(action)
    for (const action of this.triggered) this.processaction(action)
    for (const action of this.ritual) this.processaction(action)
    this.defenses.computedsaves = this.processsaves()
  }

  processaction (action) {
    action.computed = {
      name: action.name,
      description: action.description
    }
    if (action.tohit) action.computed.tohit = this.processmodifier(action.tohit)
    if (action.damage) action.computed.damage = this.processdamage(action.damage)
    if (action.dc) action.computed.dc = this.processdc(action.dc)
    return action
  }

  processmodifier (info) {
    let modifier = 0
    if (info.proficient > 0) modifier += Math.floor(this.proficiency * info.proficient)
    if (info.ability) modifier += parseInt(this.abilities[info.ability])
    if (info.bonus) modifier += parseInt(info.bonus)

    return (modifier >= 0 ? '+' : '') + modifier
  }

  processdamage (info) {
    const die = info.die || []
    const modifier = this.processmodifier(info)

    let ret = die.join('+')
    if (parseInt(modifier) || die.length === 0) {
      ret += modifier
    }
    return ret
  }

  processdc (info) {
    let modifier = 8
    const proficient = typeof info.proficient === 'undefined' ? 1 : info.proficient
    modifier += this.proficiency * proficient
    if (info.ability) modifier += this.abilities[info.ability]
    if (info.bonus) modifier += info.bonus

    return (info.target.toUpperCase() || '') + modifier
  }

  processsaves () {
    const ret = []
    const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha']
    for (const stat of stats) {
      ret[stat] = this.abilities[stat]
      if (this.defenses.saves.includes(stat)) ret[stat] += this.proficiency
      if (this.defenses.savebonus) ret[stat] += this.defenses.savebonus
      ret[stat] = (ret[stat] >= 0 ? '+' : '') + ret[stat]
    }
    return ret
  }
}
