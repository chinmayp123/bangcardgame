// ===== DODGE CITY EXPANSION =====
// This file adds the Dodge City expansion content to the BANG! card game.
// It is loaded AFTER game.js and extends the base game data.

const DC_CHARACTERS = [
  { name:"Apache Kid", hp:3, ability:"Unaffected by cards played by others with Diamond suit (except Duels).", key:"apache", expansion:'dc' },
  { name:"Belle Star", hp:4, ability:"During her turn, cards in play in front of other players have no effect.", key:"belle", expansion:'dc' },
  { name:"Bill Noface", hp:4, ability:"Draws 1 card + 1 per wound he has during draw phase.", key:"bill", expansion:'dc' },
  { name:"Chuck Wengam", hp:4, ability:"May lose 1 life point to draw 2 cards (not his last life).", key:"chuck", expansion:'dc' },
  { name:"Doc Holyday", hp:4, ability:"May discard 2 cards to shoot (BANG!) a reachable target. Doesn't count as BANG!.", key:"doc", expansion:'dc' },
  { name:"Elena Fuente", hp:3, ability:"May use any card from her hand as a Missed! card.", key:"elena", expansion:'dc' },
  { name:"Greg Digger", hp:4, ability:"Regains 2 life points when another player is eliminated.", key:"greg", expansion:'dc' },
  { name:"Herb Hunter", hp:4, ability:"Draws 2 extra cards when another player is eliminated.", key:"herb", expansion:'dc' },
  { name:"Jose Delgado", hp:4, ability:"May discard a blue card from hand to draw 2 cards (up to twice per turn).", key:"jose", expansion:'dc' },
  { name:"Molly Stark", hp:4, ability:"Draws 1 card each time she plays BANG!, Missed!, or Beer out of turn.", key:"molly", expansion:'dc' },
  { name:"Pat Brennan", hp:4, ability:"May draw 1 card in play from any player instead of normal draw phase.", key:"pat", expansion:'dc' },
  { name:"Pixie Pete", hp:3, ability:"Draws 3 cards instead of 2 during draw phase.", key:"pixie", expansion:'dc' },
  { name:"Sean Mallory", hp:3, ability:"May hold up to 10 cards in hand at end of turn.", key:"sean", expansion:'dc' },
  { name:"Tequila Joe", hp:4, ability:"Each Beer he plays regains 2 life points instead of 1.", key:"tequila", expansion:'dc' },
  { name:"Vera Custer", hp:3, ability:"At start of turn, copies any other living character's ability until next turn.", key:"vera", expansion:'dc' },
];

// Character portrait images for DC characters
const DC_CHAR_IMGS = {
  apache:'images/dc/apache.jpg', belle:'images/dc/belle.jpg', bill:'images/dc/bill.jpg',
  chuck:'images/dc/chuck.jpg', doc:'images/dc/doc.jpg', elena:'images/dc/elena.jpg',
  greg:'images/dc/greg.jpg', herb:'images/dc/herb.jpg', jose:'images/dc/jose.jpg',
  molly:'images/dc/molly.jpg', pat:'images/dc/pat.jpg', pixie:'images/dc/pixie.jpg',
  sean:'images/dc/sean.jpg', tequila:'images/dc/tequila.jpg', vera:'images/dc/vera.jpg',
};

const DC_CHAR_ICONS = {
  apache:'🪶', belle:'⭐', bill:'😶', chuck:'💪', doc:'🤵', elena:'💃',
  greg:'⛏️', herb:'🌿', jose:'🎩', molly:'🌟', pat:'🔥', pixie:'🧝',
  sean:'🍀', tequila:'🥃', vera:'🎭',
};

// Card images for DC-exclusive cards
const DC_CARD_IMGS = {
  'Bible':'images/dc/bible.png',
  'Buffalo Rifle':'images/dc/buffalo_rifle.png',
  'Can Can':'images/dc/cancan.png',
  'Canteen':'images/dc/canteen.png',
  'Conestoga':'images/dc/conestoga.png',
  'Derringer':'images/dc/derringer.png',
  'Howitzer':'images/dc/howitzer.png',
  'Iron Plate':'images/dc/iron_plate.png',
  'Knife':'images/dc/knife.png',
  'Pepperbox':'images/dc/pepperbox.png',
  'Pony Express':'images/dc/pony_express.png',
  'Sombrero':'images/dc/sombrero.png',
  'Ten Gallon Hat':'images/dc/ten_gallon_hat.png',
  'Brawl':'images/dc/brawl.png',
  'Dodge':'images/dc/dodge_card.png',
  'Punch':'images/dc/punch.png',
  'Rag Time':'images/dc/ragtime.png',
  'Springfield':'images/dc/springfield.png',
  'Tequila':'images/dc/tequila_card.png',
  'Whisky':'images/dc/whisky.png',
  'Binocular':'images/dc/binocular.png',
  'Hideout':'images/dc/hideout.png',
};

const DC_CARD_ICONS = {
  'Bible':'📖', 'Buffalo Rifle':'🦬', 'Can Can':'💃', 'Canteen':'🫗',
  'Conestoga':'🐎', 'Derringer':'🔫', 'Howitzer':'💣', 'Iron Plate':'🛡️',
  'Knife':'🔪', 'Pepperbox':'🔫', 'Pony Express':'📬', 'Sombrero':'👒',
  'Ten Gallon Hat':'🤠', 'Brawl':'👊', 'Dodge':'🛡️', 'Punch':'👊',
  'Rag Time':'🎵', 'Springfield':'🔫', 'Tequila':'🍹', 'Whisky':'🥃',
  'Binocular':'🔭', 'Hideout':'🏚️',
};

// Build Dodge City expansion deck (40 cards added to base)
function buildDodgeCityDeck() {
  let id=200, cards=[];
  function add(name, type, suit, value, desc, extra={}) {
    cards.push(makeCard(id++, name, type, suit, value, desc, extra));
  }

  // === GREEN CARDS (13) ===
  // Green MISS! cards
  add('Bible','green',2,10,'Missed! + draw 1 card.',{greenMiss:true, greenDraw:1});
  add('Iron Plate','green',0,14,'Missed!.',{greenMiss:true});
  add('Iron Plate','green',3,12,'Missed!.',{greenMiss:true});
  add('Sombrero','green',1,7,'Missed!.',{greenMiss:true});
  add('Ten Gallon Hat','green',0,11,'Missed!.',{greenMiss:true});

  // Green BANG! cards
  add('Buffalo Rifle','green',1,12,'BANG! any player (unlimited range).',{greenBang:true, greenRange:Infinity});
  add('Derringer','green',3,7,'BANG! range 1, draw 1 card.',{greenBang:true, greenRange:1, greenDraw:1});
  add('Howitzer','green',3,9,'Gatling effect: BANG! all other players.',{greenGatling:true});
  add('Knife','green',2,8,'BANG! range 1.',{greenBang:true, greenRange:1});
  add('Pepperbox','green',2,14,'BANG! any player (unlimited range).',{greenBang:true, greenRange:Infinity});

  // Green utility cards
  add('Can Can','green',1,11,'Same as Cat Balou: discard a card from any player.',{greenCatBalou:true});
  add('Canteen','green',2,7,'Regain 1 life point (like Beer).',{greenBeer:true});
  add('Conestoga','green',0,9,'Same as Panic!: steal a card from player at distance 1.',{greenPanic:true});
  add('Pony Express','green',0,12,'Draw 3 cards from the deck.',{greenDraw:3});

  // === NEW BROWN CARDS (17) ===
  // Extra BANG! x4
  add('BANG!','brown',3,8,'Shoot a player within range. They must play a MISS!');
  add('BANG!','brown',1,5,'Shoot a player within range. They must play a MISS!');
  add('BANG!','brown',1,6,'Shoot a player within range. They must play a MISS!');
  add('BANG!','brown',1,13,'Shoot a player within range. They must play a MISS!');
  // Extra Beer x2
  add('Beer','brown',2,6,'Regain 1 life point (not usable if only 2 players remain).');
  add('Beer','brown',3,6,'Regain 1 life point (not usable if only 2 players remain).');
  // Extra Cat Balou x1
  add('Cat Balou','brown',1,8,'Discard a card (hand or in-play) from any player.');
  // Extra Indians! x1
  add('Indians!','brown',0,5,'Each other player must play a BANG! or lose 1 life.');
  // Extra Missed! x1
  add('Missed!','brown',0,8,'Cancel a BANG! played against you.');
  // Extra General Store x1
  add('General Store','brown',3,14,'Reveal cards = alive players. Each picks one, starting with you.');

  // Dodge x2
  add('Dodge','brown',0,7,'Missed! + draw 1 card.',{isDodge:true});
  add('Dodge','brown',2,13,'Missed! + draw 1 card.',{isDodge:true});

  // Punch x1 — BANG! at range 1, doesn't count as BANG!
  add('Punch','brown',3,10,'BANG! effect at range 1. Does not count toward BANG! limit.',{punchCard:true});

  // Discard-cost cards
  add('Brawl','brown',3,11,'Discard 1 card: each other player discards 1 card from in play (your choice).',{discardCost:1, brawlCard:true});
  add('Rag Time','brown',2,9,'Discard 1 card: steal a card from any player.',{discardCost:1, ragTimeCard:true});
  add('Springfield','brown',3,13,'Discard 1 card: BANG! any player (unlimited range). Not a BANG!.',{discardCost:1, springfieldCard:true});
  add('Tequila','brown',1,9,'Discard 1 card: any player regains 1 life point.',{discardCost:1, tequilaCard:true});
  add('Whisky','brown',0,12,'Discard 1 card: you regain 2 life points.',{discardCost:1, whiskyCard:true});

  // === NEW BLUE CARDS (10) ===
  add('Barrel','blue',2,14,'When targeted by BANG!, flip top card. If Hearts → automatic Miss!',{equip:true});
  add('Binocular','blue',0,10,'You can target others at 1 extra range (same as Scope).',{equip:true});
  add('Dynamite','blue',2,10,'Passes around. At start of turn: flip card. If 2-9 of Spades → take 3 damage.',{equip:true,dynamite:true});
  add('Hideout','blue',0,13,'Others need 1 extra range to target you (same as Mustang).',{equip:true});
  add('Mustang','blue',2,5,'Others need 1 extra range to target you.',{equip:true});
  add('Panic!','brown',2,11,'Steal a card (hand or in-play) from a player at distance 1.');
  add('Remington','blue',0,6,'Weapon with range 3.',{equip:true,weapon:true,range:3});
  add('Rev. Carabine','blue',3,5,'Weapon with range 4.',{equip:true,weapon:true,range:4});

  return cards;
}

// Role distribution for 8 players
function assignRolesDC(count) {
  const roles = [];
  roles.push('sheriff');
  if(count>=3) roles.push('renegade');
  if(count>=4) roles.push('outlaw');
  if(count>=5) roles.push('outlaw');
  if(count>=6) roles.push('deputy');
  if(count>=7) roles.push('outlaw');
  if(count>=8) { roles.push('renegade'); roles.push('deputy'); }
  return shuffle(roles);
}

// ===== EXPANSION INTEGRATION =====

// Track expansion state
let DC_ENABLED = false;

function enableDodgeCity() {
  DC_ENABLED = true;
  // Merge DC characters into CHARACTERS
  DC_CHARACTERS.forEach(c => {
    if(!CHARACTERS.find(x=>x.key===c.key)) CHARACTERS.push(c);
  });
  // Merge DC images/icons into base maps
  Object.assign(CHAR_IMGS, DC_CHAR_IMGS);
  Object.assign(CHAR_ICONS, DC_CHAR_ICONS);
  Object.assign(CARD_IMGS, DC_CARD_IMGS);
  Object.assign(CARD_ICONS, DC_CARD_ICONS);
}

function disableDodgeCity() {
  DC_ENABLED = false;
  // Remove DC characters from CHARACTERS
  for(let i=CHARACTERS.length-1; i>=0; i--) {
    if(CHARACTERS[i].expansion==='dc') CHARACTERS.splice(i,1);
  }
  // Remove DC images/icons
  Object.keys(DC_CHAR_IMGS).forEach(k => delete CHAR_IMGS[k]);
  Object.keys(DC_CHAR_ICONS).forEach(k => delete CHAR_ICONS[k]);
  Object.keys(DC_CARD_IMGS).forEach(k => delete CARD_IMGS[k]);
  Object.keys(DC_CARD_ICONS).forEach(k => delete CARD_ICONS[k]);
}

// Override buildDeck to include DC cards when enabled
const _originalBuildDeck = buildDeck;
function buildDeckWithDC() {
  const base = _originalBuildDeck();
  if(!DC_ENABLED) return base;
  const dcCards = buildDodgeCityDeck();
  return base.concat(dcCards);
}
// Replace buildDeck globally
buildDeck = buildDeckWithDC;

// Override assignRoles to support 8 players
const _originalAssignRoles = assignRoles;
assignRoles = function(count) {
  if(DC_ENABLED && count === 8) return assignRolesDC(count);
  return _originalAssignRoles(count);
};

// ===== GREEN CARD MECHANICS =====

// When a green card is played, it goes to inPlay with a "greenPlayedTurn" marker.
// It becomes usable on the NEXT turn. Green MISS! cards can be used defensively
// once ready (played on a previous turn).

function playGreenCard(pidx, cardIdx) {
  const p = G.players[pidx];
  const card = p.hand[cardIdx];

  // Check if player already has this green card in play
  if(p.inPlay.some(c => c.name === card.name && c.type === 'green')) {
    addLog(`Already have ${card.name} in play!`, 'log-info');
    return;
  }

  p.hand.splice(cardIdx, 1);
  card.greenPlayedTurn = G.turn; // Mark when it was played
  card.greenReady = false; // Not usable this turn
  p.inPlay.push(card);
  addLog(`${p.name} places ${card.name} (green) — usable next turn.`, 'log-action');
  renderAll();
  afterCardPlay(pidx);
}

// Activate a green card from inPlay (on a subsequent turn)
function activateGreenCard(pidx, cardInPlayIdx) {
  const p = G.players[pidx];
  const card = p.inPlay[cardInPlayIdx];
  if(!card || card.type !== 'green' || !card.greenReady) return;

  // Remove from inPlay and discard
  p.inPlay.splice(cardInPlayIdx, 1);
  discardCard(card);

  // Execute the green card's effect
  if(card.greenBang) {
    // BANG! effect — need target
    addLog(`${p.name} activates ${card.name}!`, 'log-action');
    showCardPopup(p.name, card.name);
    if(p.isHuman) {
      // Prompt for target
      G.pendingGreenBang = { card, range: card.greenRange };
      const validTargets = G.players.filter(q => q.alive && q.idx !== pidx &&
        (card.greenRange === Infinity || effectiveDistance(pidx, q.idx) <= card.greenRange));
      if(validTargets.length === 0) {
        addLog('No valid targets.', 'log-info');
        if(card.greenDraw) { const c=drawTop(); if(c) p.hand.push(c); }
        renderAll();
        return;
      }
      setStatus(`🎯 Click a target for ${card.name}!`);
      showTargetBanner(card.name);
      renderAll(validTargets.map(q=>q.idx));
      G.pendingTargetAction = {
        cardIdx: -1, type: 'greenbang', greenCard: card,
        onSelect: (targetIdx) => {
          playBang(pidx, targetIdx, card);
          if(card.greenDraw) {
            const c=drawTop(); if(c){ p.hand.push(c); addLog(`${p.name} draws 1 card from ${card.name}.`,'log-good'); }
          }
        }
      };
    } else {
      // AI: pick best target
      const targets = G.players.filter(q => q.alive && q.idx !== pidx &&
        (card.greenRange === Infinity || effectiveDistance(pidx, q.idx) <= card.greenRange));
      if(targets.length > 0) {
        const t = aiPickBangTarget(pidx, targets);
        if(t) {
          playBang(pidx, t.idx, card);
          if(card.greenDraw) { const c=drawTop(); if(c) p.hand.push(c); }
        }
      }
    }
    return;
  }

  if(card.greenGatling) {
    addLog(`${p.name} activates ${card.name} — hits everyone!`, 'log-action');
    showCardPopup(p.name, card.name);
    playGatling(pidx);
    return;
  }

  if(card.greenPanic || card.greenCatBalou) {
    const isPanic = !!card.greenPanic;
    const filterFn = q => q.alive && q.idx !== pidx && (q.hand.length > 0 || q.inPlay.length > 0)
      && (!isPanic || effectiveDistance(pidx, q.idx) <= 1);
    const playFn = isPanic ? playPanic : playCatBalou;
    addLog(`${p.name} activates ${card.name}!`, 'log-action');
    showCardPopup(p.name, card.name);
    const targets = G.players.filter(filterFn);
    if(p.isHuman) {
      if(targets.length === 0) { addLog('No valid targets.','log-info'); renderAll(); return; }
      G.pendingTargetAction = {
        cardIdx: -1, type: isPanic ? 'greenpanic' : 'greencatbalou',
        onSelect: (targetIdx) => { playFn(pidx, targetIdx); }
      };
      setStatus(`🎯 Click a target for ${card.name}!`);
      showTargetBanner(card.name);
      renderAll(targets.map(q=>q.idx));
    } else {
      if(targets.length > 0) playFn(pidx, targets[0].idx);
    }
    return;
  }

  if(card.greenBeer) {
    const heal = (p.char.key === 'tequila' || (p._veraAbility === 'tequila')) ? 2 : 1;
    if(p.hp < p.maxHp) {
      p.hp = Math.min(p.maxHp, p.hp + heal);
      addLog(`${p.name} activates ${card.name} — heals ${heal}!`, 'log-good');
    } else {
      addLog(`${p.name} activates ${card.name} but is already at full health.`, 'log-info');
    }
    showCardPopup(p.name, card.name);
    renderAll();
    afterCardPlay(pidx);
    return;
  }

  if(card.greenDraw && !card.greenBang && !card.greenMiss) {
    // Pony Express: draw 3 cards
    addLog(`${p.name} activates ${card.name} — draws ${card.greenDraw} cards!`, 'log-good');
    showCardPopup(p.name, card.name);
    animateDrawCards(pidx, card.greenDraw, () => {
      for(let i=0; i<card.greenDraw; i++) { const c=drawTop(); if(c) p.hand.push(c); }
      renderAll();
      afterCardPlay(pidx);
    });
    return;
  }

  // Fallback
  renderAll();
  afterCardPlay(pidx);
}

// Use a green MISS! card defensively (must be ready)
function useGreenMissCard(pidx, cardInPlayIdx) {
  const p = G.players[pidx];
  const card = p.inPlay[cardInPlayIdx];
  if(!card || !card.greenMiss || !card.greenReady) return false;

  p.inPlay.splice(cardInPlayIdx, 1);
  discardCard(card);
  addLog(`${p.name} uses ${card.name} as Missed!`, 'log-good');

  if(card.greenDraw) {
    const c = drawTop();
    if(c) { p.hand.push(c); addLog(`${p.name} draws 1 card from ${card.name}.`, 'log-good'); }
  }
  return true;
}

// Mark green cards as ready at start of turn
function markGreenCardsReady(pidx) {
  const p = G.players[pidx];
  p.inPlay.forEach(c => {
    if(c.type === 'green' && !c.greenReady) {
      c.greenReady = true;
    }
  });
}

// ===== NEW BROWN CARD MECHANICS =====

// Punch: BANG! at range 1, doesn't count as BANG! limit
function playPunch(pidx, targetIdx) {
  const p = G.players[pidx];
  const t = G.players[targetIdx];
  addLog(`${p.name} punches ${t.name}!`, 'log-action');
  playBang(pidx, targetIdx, {name:'Punch'});
}

// Springfield: discard 1 card cost, BANG! any player (unlimited range)
function playSpringfield(pidx, targetIdx, costCardIdx) {
  const p = G.players[pidx];
  const t = G.players[targetIdx];
  // Cost card already removed by caller
  addLog(`${p.name} shoots ${t.name} with Springfield!`, 'log-action');
  playBang(pidx, targetIdx, {name:'Springfield'});
}

// Whisky: discard 1 card, regain 2 life
function playWhisky(pidx) {
  const p = G.players[pidx];
  const heal = 2;
  p.hp = Math.min(p.maxHp, p.hp + heal);
  addLog(`${p.name} drinks Whisky — heals ${heal}!`, 'log-good');
}

// Tequila (card): discard 1 card, any player heals 1
function playTequilaCard(pidx, targetIdx) {
  const t = G.players[targetIdx];
  if(t.hp < t.maxHp) {
    t.hp = Math.min(t.maxHp, t.hp + 1);
    addLog(`${G.players[pidx].name} gives Tequila to ${t.name} — heals 1!`, 'log-good');
  }
}

// Brawl: discard 1 card, each other player discards 1 in-play card
function playBrawl(pidx) {
  const p = G.players[pidx];
  G.players.forEach(q => {
    if(q.idx === pidx || !q.alive || q.inPlay.length === 0) return;
    // Remove a random in-play card (AI choice: least valuable)
    const c = q.inPlay.splice(0, 1)[0];
    if(c) {
      discardCard(c);
      addLog(`${p.name}'s Brawl forces ${q.name} to discard ${c.name}!`, 'log-action');
    }
  });
}

// Rag Time: discard 1 card, steal from any player (like Panic! but unlimited range)
function playRagTime(pidx, targetIdx) {
  // Same as Panic but no range limit
  playPanic(pidx, targetIdx);
}

// ===== DC CHARACTER ABILITIES =====

// Apache Kid: immunity to diamond-suited cards from others
function apacheKidCheck(defenderIdx, card) {
  const def = G.players[defenderIdx];
  if(!def.alive) return false;
  const charKey = def._veraAbility || def.char.key;
  if(charKey === 'apache' && card && card.suit === 1) {
    // Diamond suit — Apache Kid is immune (except during duels)
    return true;
  }
  return false;
}

// Belle Star: during her turn, other players' in-play cards have no effect
function isBelleStarTurn() {
  if(!DC_ENABLED) return false;
  const current = G.players[G.turn];
  if(!current || !current.alive) return false;
  const charKey = current._veraAbility || current.char.key;
  return charKey === 'belle';
}

// Elena Fuente: can use any card as Missed!
function isElenaFuente(pidx) {
  const p = G.players[pidx];
  const charKey = p._veraAbility || p.char.key;
  return charKey === 'elena';
}

// Check if a player has a Dodge card for defensive play
function hasDodgeCard(pidx) {
  if(!DC_ENABLED) return false;
  const p = G.players[pidx];
  return p.hand.some(c => c.isDodge);
}

// Greg Digger / Herb Hunter: on elimination event
function dcOnElimination(eliminatedIdx) {
  if(!DC_ENABLED) return;
  G.players.forEach(p => {
    if(!p.alive || p.idx === eliminatedIdx) return;
    const charKey = p._veraAbility || p.char.key;
    if(charKey === 'greg') {
      const heal = Math.min(2, p.maxHp - p.hp);
      if(heal > 0) {
        p.hp += heal;
        addLog(`${p.name} (Greg Digger) regains ${heal} life!`, 'log-good');
      }
    }
    if(charKey === 'herb') {
      for(let i=0; i<2; i++) { const c=drawTop(); if(c) p.hand.push(c); }
      addLog(`${p.name} (Herb Hunter) draws 2 extra cards!`, 'log-good');
    }
  });
}

// Molly Stark: draws a card when playing BANG!/MISS!/Beer out of turn
function mollyStarkCheck(pidx, cardName) {
  if(!DC_ENABLED) return;
  const p = G.players[pidx];
  const charKey = p._veraAbility || p.char.key;
  if(charKey === 'molly' && G.turn !== pidx) {
    if(['BANG!','MISS!','Beer','Dodge'].includes(cardName)) {
      const c = drawTop();
      if(c) { p.hand.push(c); addLog(`${p.name} (Molly Stark) draws a card!`, 'log-good'); }
    }
  }
}

// Sean Mallory: hand limit is 10
function getHandLimit(pidx) {
  const p = G.players[pidx];
  const charKey = p._veraAbility || p.char.key;
  if(charKey === 'sean') return 10;
  return p.hp;
}

// Tequila Joe: Beer heals 2
function getTequilaJoeHeal(pidx) {
  const p = G.players[pidx];
  const charKey = p._veraAbility || p.char.key;
  if(charKey === 'tequila') return 2;
  return 1;
}

// Binocular = Scope, Hideout = Mustang (handled in distance calc)
function dcDistanceModifiers(fromIdx, toIdx) {
  let mod = 0;
  const from = G.players[fromIdx];
  const to = G.players[toIdx];
  if(!DC_ENABLED) return 0;

  // Binocular gives -1 to targets (like Scope)
  if(from.inPlay.some(c => c.name === 'Binocular') && !isBelleStarTurn()) mod -= 1;
  // Hideout gives +1 to be targeted (like Mustang)
  if(to.inPlay.some(c => c.name === 'Hideout') && !isBelleStarTurn()) mod += 1;

  return mod;
}

// ===== AI SUPPORT FOR DC CARDS =====

function aiCanPlayDCCard(card, pidx) {
  const p = G.players[pidx];

  // Green cards: always playable (placed in front)
  if(card.type === 'green') {
    // Don't play if already have same green card in play
    if(p.inPlay.some(c => c.name === card.name && c.type === 'green')) return false;
    return true;
  }

  // Discard-cost cards: need at least 2 cards in hand (the card + 1 to discard)
  if(card.discardCost && p.hand.length < 2) return false;

  // Punch: need target at range 1
  if(card.punchCard) {
    return G.players.some(q => q.alive && q.idx !== pidx && effectiveDistance(pidx, q.idx) <= 1);
  }

  // Springfield: need any alive target
  if(card.springfieldCard) {
    return G.players.some(q => q.alive && q.idx !== pidx);
  }

  // Brawl: any opponent with in-play cards
  if(card.brawlCard) {
    return G.players.some(q => q.alive && q.idx !== pidx && q.inPlay.length > 0);
  }

  // Dodge: defensive only
  if(card.isDodge) return false;

  // Tequila card: any player hurt
  if(card.tequilaCard) {
    return G.players.some(q => q.alive && q.hp < q.maxHp);
  }

  // Whisky: self healing
  if(card.whiskyCard) return p.hp < p.maxHp;

  // Rag Time: any target with cards
  if(card.ragTimeCard) {
    return G.players.some(q => q.alive && q.idx !== pidx && (q.hand.length > 0 || q.inPlay.length > 0));
  }

  return false;
}

function aiPlayDCCard(pidx, card) {
  const p = G.players[pidx];
  const ci = p.hand.indexOf(card);
  if(ci === -1) return;

  if(card.type === 'green') {
    playGreenCard(pidx, ci);
    return;
  }

  // Remove the played card
  p.hand.splice(ci, 1);
  discardCard(card);
  showCardPopup(p.name, card.name);

  // Handle discard cost
  if(card.discardCost) {
    // Discard lowest value card as cost
    const sorted = [...p.hand].sort((a,b) => aiCardValue(a,pidx) - aiCardValue(b,pidx));
    if(sorted.length > 0) {
      const costCard = sorted[0];
      p.hand.splice(p.hand.indexOf(costCard), 1);
      discardCard(costCard);
      addLog(`${p.name} discards ${costCard.name} as cost.`, 'log-info');
    }
  }

  if(card.punchCard) {
    const targets = G.players.filter(q => q.alive && q.idx !== pidx && effectiveDistance(pidx, q.idx) <= 1);
    if(targets.length > 0) {
      const t = aiPickBangTarget(pidx, targets) || targets[0];
      playPunch(pidx, t.idx);
    }
    return;
  }

  if(card.springfieldCard) {
    const targets = G.players.filter(q => q.alive && q.idx !== pidx);
    if(targets.length > 0) {
      const t = aiPickBangTarget(pidx, targets) || targets[0];
      playSpringfield(pidx, t.idx);
    }
    return;
  }

  if(card.brawlCard) {
    playBrawl(pidx);
    afterCardPlay(pidx);
    return;
  }

  if(card.whiskyCard) {
    playWhisky(pidx);
    afterCardPlay(pidx);
    return;
  }

  if(card.tequilaCard) {
    // Heal self or ally
    const self = p.hp < p.maxHp ? p : null;
    const allies = G.players.filter(q => q.alive && q.hp < q.maxHp && q.idx !== pidx);
    const target = self || (allies.length > 0 ? allies[0] : p);
    playTequilaCard(pidx, target.idx);
    afterCardPlay(pidx);
    return;
  }

  if(card.ragTimeCard) {
    const targets = G.players.filter(q => q.alive && q.idx !== pidx && (q.hand.length > 0 || q.inPlay.length > 0));
    if(targets.length > 0) {
      playRagTime(pidx, targets[0].idx);
    }
    return;
  }

  afterCardPlay(pidx);
}

// AI helper: pick best BANG! target (reuse from base game if available)
function aiPickBangTarget(pidx, targets) {
  if(targets.length === 0) return null;
  const p = G.players[pidx];
  // Prefer low HP targets, enemies by role
  const scored = targets.map(t => {
    let score = 10 - t.hp;
    if(p.role === 'outlaw' && t.role === 'sheriff') score += 5;
    if(p.role === 'sheriff' && t.role === 'outlaw') score += 3;
    if(p.role === 'deputy' && t.role === 'outlaw') score += 3;
    return { t, score };
  });
  scored.sort((a,b) => b.score - a.score);
  return scored[0].t;
}

// DC AI card value scoring
function aiDCCardValue(card, pidx) {
  if(card.type === 'green') {
    if(card.greenGatling) return 9;
    if(card.greenBang && card.greenRange === Infinity) return 7;
    if(card.greenBang) return 5;
    if(card.greenMiss) return 5;
    if(card.greenPanic) return 5;
    if(card.greenCatBalou) return 5;
    if(card.greenBeer) return 4;
    if(card.greenDraw) return 7;
    return 4;
  }
  if(card.punchCard) return 5;
  if(card.springfieldCard) return 7;
  if(card.brawlCard) return 6;
  if(card.isDodge) return 6;
  if(card.whiskyCard) return 4;
  if(card.tequilaCard) return 3;
  if(card.ragTimeCard) return 5;
  return 0;
}

// ===== DC CHARACTER DRAW PHASE ABILITIES =====

// Bill Noface: draws 1 + wounds
function billNofaceDraw(pidx) {
  const p = G.players[pidx];
  const wounds = p.maxHp - p.hp;
  const count = 1 + wounds;
  drawForPlayer(pidx, count);
  addLog(`${p.name} (Bill Noface) draws ${count} cards (1 + ${wounds} wounds).`, 'log-info');
}

// Pixie Pete: draws 3
function pixiePeteDraw(pidx) {
  const p = G.players[pidx];
  drawForPlayer(pidx, 3);
  addLog(`${p.name} (Pixie Pete) draws 3 cards.`, 'log-info');
}

// Chuck Wengam: lose 1 life to draw 2 (AI decision)
function aiChuckWengam(pidx) {
  const p = G.players[pidx];
  // Use ability if HP > 2
  if(p.hp > 2) {
    p.hp -= 1;
    const c1 = drawTop(), c2 = drawTop();
    if(c1) p.hand.push(c1);
    if(c2) p.hand.push(c2);
    addLog(`${p.name} (Chuck Wengam) loses 1 life, draws 2 cards.`, 'log-info');
  }
}

// Jose Delgado: discard blue card to draw 2 (AI, up to twice)
function aiJoseDelgado(pidx) {
  const p = G.players[pidx];
  let uses = 0;
  while(uses < 2) {
    const blueCard = p.hand.find(c => c.type === 'blue');
    if(!blueCard) break;
    p.hand.splice(p.hand.indexOf(blueCard), 1);
    discardCard(blueCard);
    const c1 = drawTop(), c2 = drawTop();
    if(c1) p.hand.push(c1);
    if(c2) p.hand.push(c2);
    addLog(`${p.name} (Jose Delgado) discards ${blueCard.name}, draws 2 cards.`, 'log-info');
    uses++;
  }
}

// Doc Holyday: discard 2 cards to BANG! (AI)
function aiDocHolyday(pidx) {
  const p = G.players[pidx];
  if(p.hand.length < 2) return false;
  const targets = G.players.filter(q => q.alive && q.idx !== pidx && canTarget(pidx, q.idx));
  if(targets.length === 0) return false;

  // Only do it if we have spare cards (4+)
  if(p.hand.length >= 4) {
    const sorted = [...p.hand].sort((a,b) => aiCardValue(a,pidx) - aiCardValue(b,pidx));
    const c1 = sorted[0], c2 = sorted[1];
    p.hand.splice(p.hand.indexOf(c1), 1); discardCard(c1);
    p.hand.splice(p.hand.indexOf(c2), 1); discardCard(c2);
    const t = aiPickBangTarget(pidx, targets);
    addLog(`${p.name} (Doc Holyday) discards 2 cards to shoot ${t.name}!`, 'log-action');
    playBang(pidx, t.idx, {name:'Doc Holyday Shot'});
    return true;
  }
  return false;
}

// Pat Brennan: draw 1 in-play card from any player instead of normal draw
function aiPatBrennan(pidx) {
  const p = G.players[pidx];
  // Find best in-play card to steal
  let bestCard = null, bestOwner = null, bestVal = 0;
  G.players.forEach(q => {
    if(q.idx === pidx || !q.alive) return;
    q.inPlay.forEach(c => {
      let val = 5;
      if(c.weapon) val = 7;
      if(c.name === 'Barrel') val = 8;
      if(c.name === 'Scope' || c.name === 'Binocular') val = 6;
      if(val > bestVal) { bestVal = val; bestCard = c; bestOwner = q; }
    });
  });

  if(bestCard && bestVal >= 5) {
    bestOwner.inPlay.splice(bestOwner.inPlay.indexOf(bestCard), 1);
    p.hand.push(bestCard);
    addLog(`${p.name} (Pat Brennan) takes ${bestCard.name} from ${bestOwner.name}!`, 'log-info');
    return true;
  }
  return false;
}

// Vera Custer: copy another character's ability at start of turn
function aiVeraCuster(pidx) {
  const p = G.players[pidx];
  // Pick the most useful ability to copy
  const others = G.players.filter(q => q.alive && q.idx !== pidx);
  if(others.length === 0) return;

  // Prefer: willy (unlimited BANG!), slab (2 MISS!), bart (draw on damage)
  const prefs = ['willy','slab','bart','jour','lucky','suzy','gringo','elena','molly','doc'];
  let chosen = others[0];
  for(const key of prefs) {
    const match = others.find(q => q.char.key === key);
    if(match) { chosen = match; break; }
  }
  p._veraAbility = chosen.char.key;
  addLog(`${p.name} (Vera Custer) copies ${chosen.char.name}'s ability!`, 'log-info');
}

console.log('Dodge City expansion loaded.');
