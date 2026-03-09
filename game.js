// ===== GAME DATA =====

const CHARACTERS = [
  { name:"Willy the Kid", hp:4, ability:"Can play any number of BANG! cards per turn.", key:"willy" },
  { name:"Slab the Killer", hp:4, ability:"Opponents need 2 MISS! cards to dodge his BANG!.", key:"slab" },
  { name:"Bart Cassidy", hp:4, ability:"Draws a card each time he loses a life point.", key:"bart" },
  { name:"El Gringo", hp:3, ability:"Steals a card from the shooter each time he's hit.", key:"gringo" },
  { name:"Jesse Jones", hp:4, ability:"May draw his first card from any player's hand.", key:"jesse" },
  { name:"Jourdonnais", hp:4, ability:"Has a built-in Barrel — flips a card when shot.", key:"jour" },
  { name:"Kit Carlson", hp:4, ability:"Looks at top 3 cards and keeps 2 during draw phase.", key:"kit" },
  { name:"Lucky Duke", hp:4, ability:"Flips 2 cards for 'draw!' checks and picks the better one.", key:"lucky" },
  { name:"Paul Regret", hp:3, ability:"Always considered to have a Mustang in play.", key:"paul" },
  { name:"Calamity Janet", hp:4, ability:"Can use BANG! as MISS! and vice versa.", key:"janet" },
  { name:"Suzy Lafayette", hp:4, ability:"Draws a card when she has no cards in hand.", key:"suzy" },
  { name:"Vulture Sam", hp:4, ability:"Takes all cards from any player who is eliminated.", key:"vulture" },
  { name:"Pedro Ramirez", hp:4, ability:"May draw first card from the discard pile.", key:"pedro" },
  { name:"Sid Ketchum", hp:4, ability:"May discard 2 cards at any time to regain 1 life point.", key:"sid" },
  { name:"Rose Doolan", hp:4, ability:"Always considered to have a Scope in play.", key:"rose" },
  { name:"Black Jack", hp:4, ability:"Shows 2nd drawn card; if red, draws an extra card.", key:"bjack" },
];

// Suits: 0=hearts♥ 1=diamonds♦ 2=clubs♣ 3=spades♠
// Values: 2-14 (11=J, 12=Q, 13=K, 14=A)
function suitSym(s) { return ['♥','♦','♣','♠'][s]; }
function suitName(s) { return ['hearts','diamonds','clubs','spades'][s]; }
function valName(v) {
  if(v===11)return 'J'; if(v===12)return 'Q'; if(v===13)return 'K'; if(v===14)return 'A';
  return String(v);
}
function isRed(suit) { return suit===0||suit===1; }

function makeCard(id, name, type, suit, value, desc, extra) {
  return { id, name, type, suit, value, desc, ...extra };
}

function buildDeck() {
  let id=0, cards=[];
  function add(name, type, suit, value, desc, extra={}) {
    cards.push(makeCard(id++, name, type, suit, value, desc, extra));
  }
  // BANG! x25
  const bangData = [
    [0,14],[0,9],[1,14],[1,12],[1,11],[1,10],[1,9],[1,8],[1,7],[1,6],[1,5],[1,4],[1,3],[1,2],
    [2,14],[2,13],[2,12],[2,11],[2,10],[2,9],[2,8],[2,7],[2,6],[2,5],[3,14]
  ];
  bangData.forEach(([s,v])=>add('BANG!','brown',s,v,'Shoot a player within range. They must play a MISS!'));
  // MISS! x15
  const missData=[[0,13],[0,12],[0,11],[0,10],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[3,13],[3,12],[3,11],[3,10]];
  missData.forEach(([s,v])=>add('MISS!','brown',s,v,'Cancel a BANG! played against you.'));
  // Beer x8
  const beerData=[[0,9],[1,7],[1,6],[1,5],[1,4],[1,3],[3,7],[3,5]];
  beerData.forEach(([s,v])=>add('Beer','brown',s,v,'Regain 1 life point (not usable if only 2 players remain).'));
  // Stagecoach x2
  add('Stagecoach','brown',3,9,'Draw 2 cards from the deck.');
  add('Stagecoach','brown',2,6,'Draw 2 cards from the deck.');
  // Wells Fargo x1
  add('Wells Fargo','brown',0,3,'Draw 3 cards from the deck.');
  // Gatling Gun x1
  add('Gatling Gun','brown',0,10,'BANG! all other players. Cannot be cancelled by Miss! (needs special miss per shooter).',{gtling:true});
  // Indians! x2
  add('Indians!','brown',1,13,'Each other player must play a BANG! or lose 1 life.');
  add('Indians!','brown',3,14,'Each other player must play a BANG! or lose 1 life.');
  // Panic! x4
  add('Panic!','brown',0,11,'Steal a card (hand or in-play) from a player at distance 1.');
  add('Panic!','brown',0,12,'Steal a card (hand or in-play) from a player at distance 1.');
  add('Panic!','brown',1,14,'Steal a card (hand or in-play) from a player at distance 1.');
  add('Panic!','brown',3,11,'Steal a card (hand or in-play) from a player at distance 1.');
  // Cat Balou x4
  add('Cat Balou','brown',0,13,'Discard a card (hand or in-play) from any player.');
  add('Cat Balou','brown',1,9,'Discard a card (hand or in-play) from any player.');
  add('Cat Balou','brown',2,13,'Discard a card (hand or in-play) from any player.');
  add('Cat Balou','brown',3,8,'Discard a card (hand or in-play) from any player.');
  // Duel x3
  add('Duel','brown',3,12,'Challenge player to duel. Alternate BANG! or lose 1 life. You must respond first.');
  add('Duel','brown',1,11,'Challenge player to duel. Alternate BANG! or lose 1 life. You must respond first.');
  add('Duel','brown',2,12,'Challenge player to duel. Alternate BANG! or lose 1 life. You must respond first.');
  // Saloon x1
  add('Saloon','brown',0,5,'All living players regain 1 life point.');
  // BLUE / Equipment
  // Barrel x2
  add('Barrel','blue',3,14,'When targeted by BANG!, flip top card. If Hearts → automatic Miss!',{equip:true});
  add('Barrel','blue',2,9,'When targeted by BANG!, flip top card. If Hearts → automatic Miss!',{equip:true});
  // Mustang x2
  add('Mustang','blue',0,8,'Others need 1 extra range to target you.',{equip:true});
  add('Mustang','blue',1,8,'Others need 1 extra range to target you.',{equip:true});
  // Scope x1
  add('Scope','blue',2,14,'You can target others at 1 extra range.',{equip:true});
  // Volcanic x2
  add('Volcanic','blue',3,10,'You can play any number of BANG! cards per turn. Range 1.',{equip:true,weapon:true,range:1});
  add('Volcanic','blue',0,10,'You can play any number of BANG! cards per turn. Range 1.',{equip:true,weapon:true,range:1});
  // Schofield x3
  add('Schofield','blue',2,7,'Weapon with range 2.',{equip:true,weapon:true,range:2});
  add('Schofield','blue',3,6,'Weapon with range 2.',{equip:true,weapon:true,range:2});
  add('Schofield','blue',2,8,'Weapon with range 2.',{equip:true,weapon:true,range:2});
  // Remington x1
  add('Remington','blue',2,12,'Weapon with range 3.',{equip:true,weapon:true,range:3});
  // Rev. Carabine x1
  add('Rev. Carabine','blue',2,11,'Weapon with range 4.',{equip:true,weapon:true,range:4});
  // Winchester x1
  add('Winchester','blue',3,8,'Weapon with range 5.',{equip:true,weapon:true,range:5});
  // Jail x3
  add('Jail','blue',3,4,'Put on any non-Sheriff player. They must draw hearts at start of turn or skip it.',{equip:true,jail:true});
  add('Jail','blue',0,4,'Put on any non-Sheriff player. They must draw hearts at start of turn or skip it.',{equip:true,jail:true});
  add('Jail','blue',1,10,'Put on any non-Sheriff player. They must draw hearts at start of turn or skip it.',{equip:true,jail:true});
  // Dynamite x1
  add('Dynamite','blue',2,10,'Passes around. At start of turn: flip card. If 2-9 of Spades → take 3 damage.',{equip:true,dynamite:true});
  return cards;
}

// ===== GAME STATE =====
let G = {
  players: [],
  deck: [],
  discard: [],
  turn: 0, // index of current player
  phase: 'idle', // idle, draw, play, discard, response
  bangsThisTurn: 0,
  selectedCard: null, // index in human hand
  pendingResponse: null, // { type, attacker, card, needMisses, callback }
  pendingTargetAction: null, // { cardIdx, type }
  gameOver: false,
  humanIdx: 0,
  log: [],
  animLock: false,
  gameStarted: false,
};

// ===== INIT =====
function shuffle(arr) {
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function drawTop() {
  if(G.deck.length===0) reshuffleDeck();
  if(G.deck.length===0) return null;
  return G.deck.pop();
}

function reshuffleDeck() {
  if(G.discard.length===0) return;
  const top = G.discard[G.discard.length-1];
  G.deck = shuffle(G.discard.slice(0,-1));
  G.discard = [top];
  addLog('Deck reshuffled from discard pile.','log-system');
}

function discardCard(card) {
  if(card) G.discard.push(card);
}

// "Draw!" check - flip top card, return it
function drawBang() {
  const c = drawTop();
  if(c) discardCard(c);
  return c;
}

// ===== ROLE & CHARACTER ASSIGNMENT =====
function assignRoles(count) {
  const roles = [];
  roles.push('sheriff');
  if(count>=3) roles.push('renegade');
  if(count>=4) roles.push('outlaw');
  if(count>=5) roles.push('outlaw');
  if(count>=6) roles.push('deputy');
  if(count>=7) roles.push('outlaw');
  return shuffle(roles);
}

function startGame(humanCharIdx, playerCount) {
  G.deck = shuffle(buildDeck());
  G.discard = [];
  G.gameOver = false;
  G.log = [];
  G.turn = 0;
  G.bangsThisTurn = 0;
  G.selectedCard = null;

  const roles = assignRoles(playerCount);
  const humanRole = roles[0];

  // Pick characters for players
  const shuffledChars = shuffle([...CHARACTERS]);
  const playerChars = shuffledChars.slice(0, playerCount);
  // Human gets chosen char
  playerChars[0] = CHARACTERS[humanCharIdx];

  const names = ['You','Billy','Dakota','Rosa','Colt','Tex','Hank'];
  G.players = [];
  for(let i=0;i<playerCount;i++){
    const char = playerChars[i];
    const role = roles[i];
    let maxHp = char.hp + (role==='sheriff' ? 1 : 0);
    G.players.push({
      idx: i,
      name: i===0 ? 'You' : names[i],
      role,
      char,
      hp: maxHp,
      maxHp,
      hand: [],
      inPlay: [],
      alive: true,
      isHuman: i===0,
      jailed: false,
      roleRevealed: role==='sheriff',
    });
  }

  // Find sheriff and give them +1 card
  const sheriff = G.players.find(p=>p.role==='sheriff');

  // Deal initial hands
  G.players.forEach(p=>{
    const drawCount = p.hp + (p.role==='sheriff'?0:0);
    for(let i=0;i<drawCount;i++){
      const c = drawTop();
      if(c) p.hand.push(c);
    }
  });

  G.humanIdx = G.players.findIndex(p=>p.isHuman);
  G.phase = 'idle';
  G.gameStarted = true;

  addLog(`Game started! ${playerCount} players. Your role: ${G.players[G.humanIdx].role.toUpperCase()}.`,'log-system');
  addLog(`Your character: ${G.players[G.humanIdx].char.name}.`,'log-info');
  addLog(`Sheriff is ${sheriff.name} (${sheriff.char.name}).`,'log-info');

  renderAll();
  // Start first turn
  setTimeout(()=>beginTurn(0), 600);
}

// ===== TURN FLOW =====
function beginTurn(playerIdx) {
  if(G.gameOver) return;
  G.turn = playerIdx;
  G.bangsThisTurn = 0;
  G.selectedCard = null;
  G._afterPlay = null; // clear any stale callback from previous turn
  const p = G.players[playerIdx];
  if(!p.alive) { nextTurn(); return; }

  addLog(`--- ${p.name}'s turn (${p.char.name}) ---`,'log-system');

  // Handle Dynamite
  const dynIdx = p.inPlay.findIndex(c=>c.dynamite);
  if(dynIdx!==-1){
    const dynCard = p.inPlay[dynIdx];
    const flipped = drawBang();
    addLog(`${p.name} flips for Dynamite: ${flipped?valName(flipped.value)+suitSym(flipped.suit):'nothing'}.`,'log-action');
    if(flipped && flipped.suit===3 && flipped.value>=2 && flipped.value<=9){
      addLog(`BOOM! Dynamite explodes on ${p.name}! -3 life!`,'log-bad');
      p.inPlay.splice(dynIdx,1);
      discardCard(dynCard);
      if(p.isHuman) renderAll();
      dealDamage(playerIdx, 3, null, ()=>{
        // Pass dynamite or continue
        continueAfterDynamiteCheck(playerIdx);
      });
      return;
    } else {
      // Pass dynamite to next player
      p.inPlay.splice(dynIdx,1);
      const nextAlive = nextAlivePlayer(playerIdx);
      G.players[nextAlive].inPlay.push(dynCard);
      addLog(`Dynamite passes to ${G.players[nextAlive].name}.`,'log-info');
    }
  }

  continueAfterDynamiteCheck(playerIdx);
}

function continueAfterDynamiteCheck(playerIdx) {
  const p = G.players[playerIdx];
  if(!p.alive){nextTurn();return;}

  // Handle Jail
  if(p.jailed){
    const jailIdx = p.inPlay.findIndex(c=>c.jail);
    const jailCard = jailIdx!==-1 ? p.inPlay.splice(jailIdx,1)[0] : null;
    if(jailCard) discardCard(jailCard);
    p.jailed = false;
    const flipped = drawBang();
    addLog(`${p.name} draws for Jail: ${flipped?valName(flipped.value)+suitSym(flipped.suit):'nothing'}.`,'log-action');
    if(flipped && flipped.suit===0){
      addLog(`${p.name} escapes jail! (Hearts drawn)`,'log-good');
    } else {
      addLog(`${p.name} stays in jail — turn skipped.`,'log-bad');
      renderAll();
      setTimeout(()=>nextTurn(), p.isHuman?1200:800);
      return;
    }
  }

  renderAll();
  if(p.isHuman){
    G.phase='draw';
    updatePhaseInfo('Phase: Draw Cards');
    setStatus(`Your turn! Draw 2 cards to begin.`);
    document.getElementById('btn-draw').disabled=false;
    document.getElementById('btn-end').disabled=true;
    // Jesse Jones special draw
    if(p.char.key==='jesse') {
      setStatus('Jesse Jones: draw from deck or steal from a player?');
      // Handled in doDrawPhase
    }
  } else {
    // AI turn
    setTimeout(()=>aiDrawPhase(playerIdx), 700);
  }
}

function doDrawPhase() {
  const p = G.players[G.humanIdx];
  if(G.phase!=='draw') return;

  // Kit Carlson: special draw
  if(p.char.key==='kit') {
    kitCarlsonDraw();
    return;
  }
  // Jesse Jones: prompt
  if(p.char.key==='jesse') {
    jesseDraw();
    return;
  }
  // Pedro Ramirez: option to draw from discard
  if(p.char.key==='pedro' && G.discard.length>0) {
    pedroDraw();
    return;
  }

  // Normal draw
  drawForPlayer(G.humanIdx, 2);
  afterDrawPhase(G.humanIdx);
}

function drawForPlayer(pidx, count) {
  const p = G.players[pidx];
  let extra = 0;
  for(let i=0;i<count;i++){
    const c = drawTop();
    if(c){
      p.hand.push(c);
      // Black Jack: show second card, if red draw extra
      if(p.char.key==='bjack' && i===1 && !extra){
        addLog(`Black Jack shows: ${valName(c.value)}${suitSym(c.suit)}.`,'log-info');
        if(isRed(c.suit)){ extra=1; addLog('Red card! Black Jack draws an extra card.','log-good'); }
      }
    }
  }
  if(extra){ const c=drawTop(); if(c) p.hand.push(c); }
  addLog(`${p.name} draws ${count+(extra)} card${count>1?'s':''}.`,'log-action');
}

function afterDrawPhase(pidx) {
  const p = G.players[pidx];
  G.phase = 'play';
  renderAll();
  if(p.isHuman){
    updatePhaseInfo('Phase: Play Cards');
    setStatus(`Play cards from your hand, then End Turn.`);
    document.getElementById('btn-draw').disabled=true;
    document.getElementById('btn-end').disabled=false;
    if(p.char.key==='sid') document.getElementById('btn-sid').style.display='block';
  } else {
    setTimeout(()=>aiPlayPhase(pidx), 600);
  }
}

function endTurn() {
  if(G.phase!=='play') return;
  const p = G.players[G.humanIdx];
  const maxHand = p.hp;
  if(p.hand.length > maxHand){
    setStatus(`Discard down to ${maxHand} cards (you have ${p.hand.length}).`);
    G.phase = 'discard';
    updatePhaseInfo('Phase: Discard');
    document.getElementById('btn-end').disabled=true;
    renderAll(); // re-render so ALL cards get click handlers for discarding
    return;
  }
  doEndTurn(G.humanIdx);
}

function doEndTurn(pidx) {
  G.phase = 'idle';
  G.selectedCard = null;
  document.getElementById('card-info-box').style.display='none';
  document.getElementById('btn-sid').style.display='none';
  suzyCheck(pidx);
  renderAll();
  setTimeout(()=>nextTurn(), 400);
}

function nextTurn() {
  if(G.gameOver) return;
  checkWinCondition();
  if(G.gameOver) return;
  let next = (G.turn+1) % G.players.length;
  let attempts = 0;
  while(!G.players[next].alive && attempts<G.players.length){
    next=(next+1)%G.players.length;
    attempts++;
  }
  beginTurn(next);
}

function nextAlivePlayer(from) {
  let next=(from+1)%G.players.length;
  while(!G.players[next].alive) next=(next+1)%G.players.length;
  return next;
}

// ===== DISTANCE =====
function alivePlayers() { return G.players.filter(p=>p.alive); }

function tableDistance(fromIdx, toIdx) {
  const alive = alivePlayers();
  const fromPos = alive.findIndex(p=>p.idx===fromIdx);
  const toPos = alive.findIndex(p=>p.idx===toIdx);
  if(fromPos===-1||toPos===-1) return 999;
  const n = alive.length;
  const cw = Math.abs(fromPos-toPos);
  return Math.min(cw, n-cw);
}

function getRange(pidx) {
  const p = G.players[pidx];
  let base = 1;
  if(p.inPlay.some(c=>c.weapon)) {
    const wpn = p.inPlay.find(c=>c.weapon);
    base = wpn.range;
    // Volcanic: range 1 but unlimited bangs
  }
  let bonus = 0;
  if(p.inPlay.some(c=>c.name==='Scope')) bonus++;
  if(p.char.key==='rose') bonus++;
  return base + bonus;
}

function effectiveDistance(fromIdx, toIdx) {
  let dist = tableDistance(fromIdx, toIdx);
  const to = G.players[toIdx];
  if(to.inPlay.some(c=>c.name==='Mustang')) dist++;
  if(to.char.key==='paul') dist++;
  return dist;
}

function canTarget(fromIdx, toIdx) {
  if(fromIdx===toIdx) return false;
  if(!G.players[toIdx].alive) return false;
  return effectiveDistance(fromIdx, toIdx) <= getRange(fromIdx);
}

// ===== DAMAGE =====
function dealDamage(pidx, amount, attackerIdx, callback) {
  const p = G.players[pidx];
  for(let i=0;i<amount;i++){
    p.hp--;
    if(p.hp<=0){ p.hp=0; break; }
  }
  // Bart Cassidy: draw card per damage
  if(p.char.key==='bart' && amount>0 && p.alive){
    for(let i=0;i<amount&&p.hp>0;i++){
      const c=drawTop(); if(c){p.hand.push(c); addLog(`${p.name} (Bart Cassidy) draws a card!`,'log-good');}
    }
  }
  // El Gringo: steal from attacker
  if(p.char.key==='gringo' && attackerIdx!==null && attackerIdx!==undefined && G.players[attackerIdx]?.alive && amount>0){
    const atk=G.players[attackerIdx];
    for(let i=0;i<amount&&atk.hand.length>0;i++){
      const ri=Math.floor(Math.random()*atk.hand.length);
      const stolen=atk.hand.splice(ri,1)[0];
      p.hand.push(stolen);
      addLog(`${p.name} (El Gringo) steals a card from ${atk.name}!`,'log-good');
      if(atk.isHuman) clearHumanSelection();
    }
  }
  if(p.hp<=0) {
    setTimeout(()=>eliminatePlayer(pidx, attackerIdx, callback), 300);
    return;
  }
  renderAll();
  if(callback) callback();
}

function eliminatePlayer(pidx, killerIdx, callback) {
  const p = G.players[pidx];
  if(!p.alive){if(callback)callback();return;}
  p.alive = false;
  p.roleRevealed = true;
  addLog(`${p.name} (${p.role}) has been eliminated!`,'log-bad');

  // Vulture Sam: takes all cards
  const vs = G.players.find(q=>q.alive&&q.char.key==='vulture'&&q.idx!==pidx);
  if(vs){
    [...p.hand,...p.inPlay].forEach(c=>vs.hand.push(c));
    addLog(`${vs.name} (Vulture Sam) takes all of ${p.name}'s cards!`,'log-good');
    p.hand=[]; p.inPlay=[];
  } else {
    p.hand.forEach(c=>discardCard(c));
    p.inPlay.forEach(c=>discardCard(c));
    p.hand=[]; p.inPlay=[];
  }

  // Sheriff kills deputy penalty
  if(killerIdx!==null&&killerIdx!==undefined&&G.players[killerIdx]?.role==='sheriff'&&p.role==='deputy'){
    addLog(`PENALTY: Sheriff eliminated a Deputy! Sheriff discards all cards!`,'log-bad');
    const s=G.players[killerIdx];
    [...s.hand,...s.inPlay].forEach(c=>discardCard(c));
    s.hand=[]; s.inPlay=[];
  }

  renderAll();
  checkWinCondition();
  if(callback&&!G.gameOver) callback();
}

function checkWinCondition() {
  if(G.gameOver) return;
  const alive = G.players.filter(p=>p.alive);
  const sheriff = G.players.find(p=>p.role==='sheriff');
  const outlaws = G.players.filter(p=>p.role==='outlaw'&&p.alive);
  const renegade = G.players.find(p=>p.role==='renegade');
  const deputies = G.players.filter(p=>p.role==='deputy'&&p.alive);

  if(!sheriff||!sheriff.alive){
    // Renegade wins if last standing
    if(alive.length===1&&alive[0].role==='renegade'){
      gameOver('renegade','Renegade wins! Last one standing!');
    } else {
      gameOver('outlaws','Outlaws win! The Sheriff is dead!');
    }
    return;
  }
  const badGuys = outlaws.length + (renegade&&renegade.alive?1:0);
  if(badGuys===0){
    gameOver('law','Sheriff and Deputies win! All outlaws eliminated!');
  }
}

function gameOver(winner, msg) {
  G.gameOver = true;
  G.phase = 'idle';
  addLog(msg,'log-system');
  renderAll();
  setTimeout(()=>{
    const humanRole = G.players[G.humanIdx].role;
    const humanWon = (winner==='law'&&(humanRole==='sheriff'||humanRole==='deputy'))||
                     (winner==='outlaws'&&humanRole==='outlaw')||
                     (winner==='renegade'&&humanRole==='renegade');
    showModal('Game Over!',
      `<div style="text-align:center;font-size:1.1em;margin:10px 0">${msg}</div>
      <div style="text-align:center;font-size:1.4em;margin:10px 0;color:${humanWon?'#7ec87e':'#ff7777'}">${humanWon?'You WIN!':'You LOSE!'}</div>
      <div style="margin-top:10px"><strong>Roles revealed:</strong><br>${G.players.map(p=>`${p.name}: ${p.role} (${p.char.name})`).join('<br>')}</div>`,
      [{label:'Play Again', fn:()=>{ closeModal(); showCharSelect(); }}]
    );
  }, 800);
}

// ===== CARD EFFECTS =====

function canPlayBang(pidx) {
  const p = G.players[pidx];
  if(p.char.key==='willy') return true;
  if(p.inPlay.some(c=>c.name==='Volcanic')) return true;
  return G.bangsThisTurn===0;
}

function playCard(pidx, cardIdx, targetIdx) {
  const p = G.players[pidx];
  const card = p.hand[cardIdx];
  if(!card) return;

  // Show popup only when card will actually be played (not on target-prompt early-returns)
  const needsTarget = ['BANG!','Panic!','Cat Balou','Duel'].includes(card.name);
  if(card.name!=='MISS!' && (!needsTarget || (targetIdx!==undefined && targetIdx!==null))){
    showCardPopup(p.name, card.name);
  }

  if(card.equip){
    playEquipment(pidx, cardIdx, targetIdx);
    return;
  }

  const remove = ()=>{ p.hand.splice(cardIdx,1); discardCard(card); };

  switch(card.name){
    case 'BANG!':
      if(targetIdx===undefined||targetIdx===null){
        promptTarget(pidx, cardIdx,'bang'); return;
      }
      remove();
      G.bangsThisTurn++;
      playBang(pidx, targetIdx, card);
      break;
    case 'MISS!':
      // MISS! is defensive only — cannot be played proactively
      addLog(`${p.name} cannot play MISS! proactively.`,'log-info');
      break;
    case 'Beer':
      remove();
      if(alivePlayers().length<=2){
        addLog(`${p.name} tries Beer but only 2 players left — no effect.`,'log-info');
      } else if(p.hp<p.maxHp){
        p.hp++;
        addLog(`${p.name} drinks Beer. +1 life (${p.hp}/${p.maxHp}).`,'log-good');
      } else {
        addLog(`${p.name} drinks Beer but is already at full health.`,'log-info');
      }
      renderAll();
      afterCardPlay(pidx);
      break;
    case 'Stagecoach':
      remove();
      drawForPlayer(pidx,2);
      renderAll();
      afterCardPlay(pidx);
      break;
    case 'Wells Fargo':
      remove();
      drawForPlayer(pidx,3);
      renderAll();
      afterCardPlay(pidx);
      break;
    case 'Gatling Gun':
      remove();
      playGatling(pidx);
      break;
    case 'Indians!':
      remove();
      playIndians(pidx, card);
      break;
    case 'Panic!':
      if(targetIdx===undefined||targetIdx===null){
        promptTarget(pidx, cardIdx,'panic'); return;
      }
      remove();
      playPanic(pidx, targetIdx);
      afterCardPlay(pidx);
      break;
    case 'Cat Balou':
      if(targetIdx===undefined||targetIdx===null){
        promptTarget(pidx, cardIdx,'catbalou'); return;
      }
      remove();
      playCatBalou(pidx, targetIdx);
      afterCardPlay(pidx);
      break;
    case 'Duel':
      if(targetIdx===undefined||targetIdx===null){
        promptTarget(pidx, cardIdx,'duel'); return;
      }
      remove();
      playDuel(pidx, targetIdx);
      break;
    case 'Saloon':
      remove();
      G.players.filter(p=>p.alive).forEach(q=>{ if(q.hp<q.maxHp){q.hp++;} });
      addLog(`${p.name} plays Saloon! Everyone regains 1 life.`,'log-good');
      renderAll();
      afterCardPlay(pidx);
      break;
    default:
      addLog(`${p.name} plays ${card.name}.`,'log-action');
      remove();
      renderAll();
      afterCardPlay(pidx);
  }
}

function afterCardPlay(pidx) {
  suzyCheck(pidx);
  renderAll();
  // Continue AI's turn if a callback is pending
  if(G._afterPlay && !G.gameOver) {
    const fn = G._afterPlay;
    G._afterPlay = null;
    fn();
  }
}

function suzyCheck(pidx) {
  const p = G.players[pidx];
  if(p.char.key==='suzy'&&p.hand.length===0&&p.alive){
    const c=drawTop(); if(c){p.hand.push(c); addLog(`${p.name} (Suzy Lafayette) draws a card!`,'log-good');}
  }
}

// BANG! resolution
function playBang(attackerIdx, defenderIdx, card) {
  const atk = G.players[attackerIdx];
  const def = G.players[defenderIdx];
  addLog(`${atk.name} shoots BANG! at ${def.name}!`,'log-action');

  // Check barrel first
  let savedByBarrel = false;
  const hasBarrel = def.inPlay.some(c=>c.name==='Barrel') || def.char.key==='jour';
  if(hasBarrel){
    let lucky = def.char.key==='lucky';
    let flipped1=drawBang(), flipped2=lucky?drawBang():null;
    const check = lucky ? (isRed(flipped1.suit)?flipped1:isRed(flipped2.suit)?flipped2:flipped1) : flipped1;
    const text = lucky ? `${valName(flipped1.value)}${suitSym(flipped1.suit)}/${valName(flipped2.value)}${suitSym(flipped2.suit)}` : `${valName(check.value)}${suitSym(check.suit)}`;
    addLog(`${def.name} flips for Barrel: ${text}.`,'log-info');
    if(check.suit===0){ savedByBarrel=true; addLog(`Hearts! Barrel saves ${def.name}!`,'log-good'); }
  }

  if(savedByBarrel){
    renderAll();
    afterCardPlay(attackerIdx);
    return;
  }

  // Human defender: prompt for MISS!
  if(def.isHuman){
    G.phase='response';
    const needMisses = atk.char.key==='slab' ? 2 : 1;
    G.pendingResponse = {
      type:'bang', attackerIdx, defenderIdx, needMisses, missesSoFar:0,
      onDodge:()=>{ addLog(`${def.name} dodges!`,'log-good'); renderAll(); afterCardPlay(attackerIdx); },
      onHit:()=>{ addLog(`${def.name} is hit!`,'log-bad'); dealDamage(defenderIdx,1,attackerIdx,()=>{ renderAll(); afterCardPlay(attackerIdx); }); }
    };
    showResponsePrompt(`${atk.name} shoots you! Play MISS!${needMisses>1?' (need 2)':''}`, defenderIdx);
    return;
  }

  // AI defender
  const needMisses = atk.char.key==='slab' ? 2 : 1;
  const misses = aiGetMissCards(defenderIdx, needMisses);
  if(misses.length>=needMisses){
    misses.forEach(c=>{ const i=def.hand.indexOf(c); if(i!==-1){def.hand.splice(i,1); discardCard(c);} });
    addLog(`${def.name} plays MISS!`,'log-good');
    showMissPopup(def.name);
    renderAll();
    afterCardPlay(attackerIdx);
  } else {
    addLog(`${def.name} is hit!`,'log-bad');
    dealDamage(defenderIdx,1,attackerIdx,()=>{ renderAll(); afterCardPlay(attackerIdx); });
  }
}

function aiGetMissCards(pidx, count) {
  const p = G.players[pidx];
  const isCJ = p.char.key==='janet';
  return p.hand.filter(c=>c.name==='MISS!'||(isCJ&&c.name==='BANG!')).slice(0,count);
}

function hasMissCard(pidx) {
  const p = G.players[pidx];
  return p.hand.some(c=>c.name==='MISS!'||(p.char.key==='janet'&&c.name==='BANG!'));
}

// Gatling
function playGatling(attackerIdx) {
  const atk = G.players[attackerIdx];
  addLog(`${atk.name} fires the Gatling Gun at everyone!`,'log-action');
  const targets = G.players.filter(p=>p.alive&&p.idx!==attackerIdx);
  let i=0;
  function nextTarget(){
    if(i>=targets.length){ renderAll(); afterCardPlay(attackerIdx); return; }
    const def = targets[i++];
    // Check barrel (Gatling CAN be barrel'd - it's still one BANG per player)
    let savedByBarrel = false;
    const hasBarrel = def.inPlay.some(c=>c.name==='Barrel')||def.char.key==='jour';
    if(hasBarrel){
      const f=drawBang();
      if(f&&f.suit===0){savedByBarrel=true; addLog(`${def.name}'s Barrel saves them from Gatling!`,'log-good');}
    }
    if(savedByBarrel){nextTarget();return;}

    if(def.isHuman){
      G.phase='response';
      G.pendingResponse={
        type:'gatling',attackerIdx,defenderIdx:def.idx,needMisses:1,missesSoFar:0,
        onDodge:()=>{addLog(`${def.name} dodges Gatling!`,'log-good');showPlayerCardPopup(def.idx,'MISS!');nextTarget();},
        onHit:()=>{addLog(`${def.name} hit by Gatling!`,'log-bad');dealDamage(def.idx,1,attackerIdx,nextTarget);}
      };
      showResponsePrompt(`Gatling Gun hits you! Play MISS!`, def.idx);
      return;
    }

    if(hasMissCard(def.idx)){
      const mc=aiGetMissCards(def.idx,1)[0];
      def.hand.splice(def.hand.indexOf(mc),1); discardCard(mc);
      addLog(`${def.name} dodges Gatling!`,'log-good');
      showPlayerCardPopup(def.idx,'MISS!');
      nextTarget();
    } else {
      addLog(`${def.name} hit by Gatling!`,'log-bad');
      dealDamage(def.idx,1,attackerIdx,nextTarget);
    }
  }
  nextTarget();
}

// Indians!
function playIndians(attackerIdx, card) {
  const atk = G.players[attackerIdx];
  addLog(`${atk.name} plays Indians!`,'log-action');
  const targets = G.players.filter(p=>p.alive&&p.idx!==attackerIdx);
  let i=0;
  function nextTarget(){
    if(i>=targets.length){ renderAll(); afterCardPlay(attackerIdx); return; }
    const def = targets[i++];
    if(def.isHuman){
      G.phase='response';
      G.pendingResponse={
        type:'indians',attackerIdx,defenderIdx:def.idx,needMisses:0,missesSoFar:0,
        onDodge:()=>{addLog(`${def.name} plays BANG! against Indians!`,'log-good');showPlayerCardPopup(def.idx,'BANG!');nextTarget();},
        onHit:()=>{addLog(`${def.name} hit by Indians!`,'log-bad');dealDamage(def.idx,1,attackerIdx,nextTarget);}
      };
      showResponsePrompt(`Indians! Play a BANG! or lose 1 life.`, def.idx);
      return;
    }
    // AI: play bang or lose life
    const bangCard = def.hand.find(c=>c.name==='BANG!'||(def.char.key==='janet'&&c.name==='MISS!'));
    if(bangCard){
      def.hand.splice(def.hand.indexOf(bangCard),1); discardCard(bangCard);
      addLog(`${def.name} plays BANG! against Indians!`,'log-good');
      showPlayerCardPopup(def.idx,'BANG!');
      nextTarget();
    } else {
      addLog(`${def.name} has no BANG! — hit by Indians!`,'log-bad');
      dealDamage(def.idx,1,attackerIdx,nextTarget);
    }
  }
  nextTarget();
}

// Panic!
function playPanic(attackerIdx, targetIdx) {
  const atk=G.players[attackerIdx], def=G.players[targetIdx];
  if(def.hand.length===0&&def.inPlay.length===0){
    addLog(`${atk.name} uses Panic! on ${def.name} but they have no cards.`,'log-info');
    afterCardPlay(attackerIdx);
    return;
  }
  if(G.players[attackerIdx].isHuman){
    promptStealFrom(attackerIdx, targetIdx, 'panic');
    return;
  }
  // AI: prefer in-play then hand
  if(def.inPlay.length>0){
    const c=def.inPlay.splice(0,1)[0];
    atk.hand.push(c);
    addLog(`${atk.name} steals ${c.name} from ${def.name}'s table.`,'log-action');
  } else {
    const ri=Math.floor(Math.random()*def.hand.length);
    const c=def.hand.splice(ri,1)[0];
    atk.hand.push(c);
    addLog(`${atk.name} steals a card from ${def.name}'s hand.`,'log-action');
    if(def.isHuman) clearHumanSelection(); // hand index shifted
  }
  afterCardPlay(attackerIdx);
}

// Cat Balou
function playCatBalou(attackerIdx, targetIdx) {
  const atk=G.players[attackerIdx], def=G.players[targetIdx];
  if(def.hand.length===0&&def.inPlay.length===0){
    addLog(`${atk.name} uses Cat Balou on ${def.name} but they have no cards.`,'log-info');
    afterCardPlay(attackerIdx);
    return;
  }
  if(G.players[attackerIdx].isHuman){
    promptDiscardFrom(attackerIdx, targetIdx);
    return;
  }
  // AI: prefer enemy's weapon or barrel
  const weapon=def.inPlay.find(c=>c.weapon||c.name==='Barrel'||c.name==='Mustang'||c.name==='Scope');
  if(weapon){
    def.inPlay.splice(def.inPlay.indexOf(weapon),1);
    discardCard(weapon);
    addLog(`${atk.name} discards ${weapon.name} from ${def.name}.`,'log-action');
  } else if(def.inPlay.length>0){
    const c=def.inPlay.splice(0,1)[0]; discardCard(c);
    addLog(`${atk.name} discards ${c.name} from ${def.name}'s table.`,'log-action');
  } else {
    const ri=Math.floor(Math.random()*def.hand.length);
    const c=def.hand.splice(ri,1)[0]; discardCard(c);
    addLog(`${atk.name} discards a card from ${def.name}'s hand.`,'log-action');
    if(def.isHuman) clearHumanSelection(); // hand index shifted
  }
  afterCardPlay(attackerIdx);
}

// Duel
function playDuel(challengerIdx, defenderIdx) {
  const chal=G.players[challengerIdx], def=G.players[defenderIdx];
  addLog(`${chal.name} challenges ${def.name} to a Duel!`,'log-action');
  // Defender must play bang first, then challenger, alternating
  // current responder starts as defender
  let current = defenderIdx;
  let other = challengerIdx;
  function duelRound(){
    const p=G.players[current];
    if(p.isHuman){
      G.phase='response';
      G.pendingResponse={
        type:'duel',attackerIdx:other,defenderIdx:current,
        onDodge:()=>{ // card already removed by response button handler
          [current,other]=[other,current];
          duelRound();
        },
        onHit:()=>{ addLog(`${p.name} has no BANG! — loses duel!`,'log-bad'); dealDamage(current,1,other,()=>{renderAll();afterCardPlay(challengerIdx);}); }
      };
      showResponsePrompt(`Duel with ${G.players[other].name}! Play a BANG! or lose 1 life.`, current);
      return;
    }
    // AI
    const bangCard=p.hand.find(c=>c.name==='BANG!'||(p.char.key==='janet'&&c.name==='MISS!'));
    if(bangCard){
      p.hand.splice(p.hand.indexOf(bangCard),1); discardCard(bangCard);
      addLog(`${p.name} plays BANG! in duel.`,'log-good');
      renderAll();
      [current,other]=[other,current];
      setTimeout(duelRound,500);
    } else {
      addLog(`${p.name} has no BANG! — loses duel!`,'log-bad');
      dealDamage(current,1,other,()=>{renderAll();afterCardPlay(challengerIdx);});
    }
  }
  duelRound();
}

// Equipment
function playEquipment(pidx, cardIdx, targetIdx) {
  const p=G.players[pidx];
  const card=p.hand[cardIdx];

  if(card.jail){
    // Target: any non-sheriff player (can target self? No)
    if(!p.isHuman){
      // AI picks a target
      const targets=G.players.filter(q=>q.alive&&q.idx!==pidx&&q.role!=='sheriff'&&!q.jailed);
      if(targets.length>0){
        const t=targets[0];
        p.hand.splice(cardIdx,1);
        t.inPlay.push(card);
        t.jailed=true;
        addLog(`${p.name} puts ${t.name} in Jail!`,'log-action');
      } else {
        addLog(`${p.name} has no valid Jail target.`,'log-info');
      }
      afterCardPlay(pidx);
      return;
    }
    // Human: pick target
    if(targetIdx===undefined){promptTarget(pidx,cardIdx,'jail');return;}
    const t=G.players[targetIdx];
    p.hand.splice(cardIdx,1);
    t.inPlay.push(card);
    t.jailed=true;
    addLog(`You put ${t.name} in Jail!`,'log-action');
    renderAll();
    afterCardPlay(pidx);
    return;
  }

  if(card.dynamite){
    // Play on yourself
    if(p.inPlay.some(c=>c.dynamite)){addLog('Already have Dynamite!','log-info');return;}
    p.hand.splice(cardIdx,1);
    p.inPlay.push(card);
    addLog(`${p.name} places Dynamite in front of them.`,'log-action');
    renderAll();
    afterCardPlay(pidx);
    return;
  }

  // Regular equipment: play on self
  // Check duplicates for weapons/unique items
  if(card.weapon){
    const oldWpn=p.inPlay.find(c=>c.weapon);
    if(oldWpn){
      p.inPlay.splice(p.inPlay.indexOf(oldWpn),1);
      discardCard(oldWpn);
    }
  }
  if(!card.weapon && p.inPlay.some(c=>c.name===card.name)){
    addLog(`Already have ${card.name} in play.`,'log-info');
    return;
  }
  p.hand.splice(cardIdx,1);
  p.inPlay.push(card);
  addLog(`${p.name} plays ${card.name}.`,'log-action');
  renderAll();
  afterCardPlay(pidx);
}

// ===== RESPONSE PROMPT =====
function showResponsePrompt(msg, defenderIdx) {
  const def=G.players[defenderIdx];
  document.getElementById('response-title').textContent=msg;
  const btns=document.getElementById('response-btns');
  btns.innerHTML='';
  const pr=G.pendingResponse;

  if(pr.type==='bang'||pr.type==='gatling'){
    // Can play MISS! (or BANG! if Calamity Janet)
    const missCards=def.hand.filter(c=>c.name==='MISS!'||(def.char.key==='janet'&&c.name==='BANG!'));
    // Beer if possible
    const beerCards=def.hand.filter(c=>c.name==='Beer');

    missCards.forEach((c,i)=>{
      const b=document.createElement('button');
      b.className='btn primary';
      b.textContent=`Play ${c.name} (${valName(c.value)}${suitSym(c.suit)})`;
      b.onclick=()=>{
        pr.missesSoFar++;
        def.hand.splice(def.hand.indexOf(c),1); discardCard(c);
        addLog(`You play ${c.name}!`,'log-good');
        if(pr.missesSoFar>=pr.needMisses){
          if(pr.type==='bang') showMissPopup(def.name);
          hideResponse(); G.phase='play'; pr.onDodge();
        } else {
          showResponsePrompt(`Play 1 more MISS! (Slab the Killer)`, defenderIdx);
        }
      };
      btns.appendChild(b);
    });

    if(def.hp<def.maxHp||alivePlayers().length>2){
      beerCards.forEach(c=>{
        const b=document.createElement('button');
        b.className='btn';
        b.textContent=`Beer (+1 HP then take hit)`;
        b.onclick=()=>{
          def.hand.splice(def.hand.indexOf(c),1); discardCard(c);
          if(def.hp<def.maxHp&&alivePlayers().length>2) def.hp++;
          addLog(`You drink Beer (+1 HP).`,'log-good');
          hideResponse(); G.phase='play';
          addLog(`You take the hit!`,'log-bad');
          dealDamage(defenderIdx,1,pr.attackerIdx,()=>{renderAll();afterCardPlay(pr.attackerIdx);});
        };
        btns.appendChild(b);
      });
    }

    const take=document.createElement('button');
    take.className='btn';
    take.textContent='Take the Hit';
    take.onclick=()=>{ hideResponse(); G.phase='play'; pr.onHit(); };
    btns.appendChild(take);
  }

  if(pr.type==='indians'){
    const bangCards=def.hand.filter(c=>c.name==='BANG!'||(def.char.key==='janet'&&c.name==='MISS!'));
    bangCards.forEach(c=>{
      const b=document.createElement('button');
      b.className='btn primary';
      b.textContent=`Play ${c.name} (${valName(c.value)}${suitSym(c.suit)})`;
      b.onclick=()=>{
        def.hand.splice(def.hand.indexOf(c),1); discardCard(c);
        hideResponse(); G.phase='play'; pr.onDodge();
      };
      btns.appendChild(b);
    });
    const take=document.createElement('button');
    take.className='btn';
    take.textContent='Take the Hit (-1 life)';
    take.onclick=()=>{ hideResponse(); G.phase='play'; pr.onHit(); };
    btns.appendChild(take);
  }

  if(pr.type==='duel'){
    const bangCards=def.hand.filter(c=>c.name==='BANG!'||(def.char.key==='janet'&&c.name==='MISS!'));
    bangCards.forEach(c=>{
      const b=document.createElement('button');
      b.className='btn primary';
      b.textContent=`Play ${c.name} (${valName(c.value)}${suitSym(c.suit)})`;
      b.onclick=()=>{
        def.hand.splice(def.hand.indexOf(c),1); discardCard(c);
        addLog(`You play ${c.name} in the duel.`,'log-good');
        hideResponse(); G.phase='play'; pr.onDodge();
      };
      btns.appendChild(b);
    });
    const take=document.createElement('button');
    take.className='btn';
    take.textContent='Give Up (-1 life)';
    take.onclick=()=>{ hideResponse(); G.phase='play'; pr.onHit(); };
    btns.appendChild(take);
  }

  document.getElementById('response-area').classList.add('active');
}

function hideResponse() {
  document.getElementById('response-area').classList.remove('active');
  G.pendingResponse=null;
}

// ===== TARGET SELECTION =====
function promptTarget(pidx, cardIdx, type) {
  const card = G.players[pidx].hand[cardIdx];
  G.pendingTargetAction = { cardIdx, type, card };

  // Determine valid targets
  let validTargets=[];
  if(type==='bang'){
    validTargets=G.players.filter(p=>p.alive&&p.idx!==pidx&&canTarget(pidx,p.idx));
  } else if(type==='panic'){
    validTargets=G.players.filter(p=>p.alive&&p.idx!==pidx&&effectiveDistance(pidx,p.idx)<=1&&(p.hand.length>0||p.inPlay.length>0));
  } else if(type==='catbalou'){
    validTargets=G.players.filter(p=>p.alive&&p.idx!==pidx&&(p.hand.length>0||p.inPlay.length>0));
  } else if(type==='duel'){
    validTargets=G.players.filter(p=>p.alive&&p.idx!==pidx);
  } else if(type==='jail'){
    validTargets=G.players.filter(p=>p.alive&&p.idx!==pidx&&p.role!=='sheriff'&&!p.jailed);
  }

  if(validTargets.length===0){
    addLog(`No valid targets for ${card.name}.`,'log-info');
    G.pendingTargetAction=null;
    return;
  }

  const targetNames = validTargets.map(p=>p.name).join(', ');
  setStatus(`🎯 Click an opponent to target them with ${card.name}! (${targetNames})`);
  showTargetBanner(card.name);
  // Highlight targets visually
  renderAll(validTargets.map(p=>p.idx));
}

function selectTarget(targetIdx) {
  if(!G.pendingTargetAction) return;
  const {cardIdx,type}=G.pendingTargetAction;
  G.pendingTargetAction=null;
  // Re-find cardIdx (might have shifted? No, we haven't removed it yet)
  hideTargetBanner();
  playCard(G.humanIdx, cardIdx, targetIdx);
  setStatus('Play cards or End Turn.');
  renderAll();
}

function promptStealFrom(attackerIdx, targetIdx, type) {
  const atk=G.players[attackerIdx], def=G.players[targetIdx];
  const options=[];
  def.inPlay.forEach(c=>options.push({label:`[Table] ${c.name}`,card:c,fromPlay:true}));
  if(def.hand.length>0) options.push({label:`[Hand] Random card`,card:null,fromHand:true});

  showModal(`Panic! — steal from ${def.name}`,
    options.map((o,i)=>`<div class="char-option" onclick="document.querySelectorAll('.char-option').forEach(x=>x.classList.remove('picked'));this.classList.add('picked');window._pickIdx=${i}">${o.label}</div>`).join(''),
    [{label:'Steal', fn:()=>{
      const idx=window._pickIdx||0;
      const opt=options[idx];
      if(opt.fromPlay){
        const ci=def.inPlay.indexOf(opt.card);
        def.inPlay.splice(ci,1); atk.hand.push(opt.card);
        addLog(`You steal ${opt.card.name} from ${def.name}'s table.`,'log-good');
      } else {
        const ri=Math.floor(Math.random()*def.hand.length);
        const c=def.hand.splice(ri,1)[0]; atk.hand.push(c);
        addLog(`You steal a card from ${def.name}'s hand.`,'log-good');
      }
      closeModal(); renderAll(); afterCardPlay(attackerIdx);
    }},{label:'Cancel',fn:closeModal}]
  );
}

function promptDiscardFrom(attackerIdx, targetIdx) {
  const atk=G.players[attackerIdx], def=G.players[targetIdx];
  const options=[];
  def.inPlay.forEach(c=>options.push({label:`[Table] ${c.name}`,card:c,fromPlay:true}));
  if(def.hand.length>0) options.push({label:`[Hand] Random card`,card:null,fromHand:true});

  showModal(`Cat Balou — discard from ${def.name}`,
    options.map((o,i)=>`<div class="char-option" onclick="document.querySelectorAll('.char-option').forEach(x=>x.classList.remove('picked'));this.classList.add('picked');window._pickIdx=${i}">${o.label}</div>`).join(''),
    [{label:'Discard', fn:()=>{
      const idx=window._pickIdx||0;
      const opt=options[idx];
      if(opt.fromPlay){
        const ci=def.inPlay.indexOf(opt.card);
        def.inPlay.splice(ci,1); discardCard(opt.card);
        addLog(`You discard ${opt.card.name} from ${def.name}'s table.`,'log-good');
      } else {
        const ri=Math.floor(Math.random()*def.hand.length);
        const c=def.hand.splice(ri,1)[0]; discardCard(c);
        addLog(`You discard a card from ${def.name}'s hand.`,'log-good');
      }
      closeModal(); renderAll(); afterCardPlay(attackerIdx);
    }},{label:'Cancel',fn:closeModal}]
  );
}

// Jesse Jones draw
function jesseDraw() {
  const p=G.players[G.humanIdx];
  const targets=G.players.filter(q=>q.alive&&q.idx!==G.humanIdx&&q.hand.length>0);
  if(targets.length===0){ drawForPlayer(G.humanIdx,2); afterDrawPhase(G.humanIdx); return; }
  showModal('Jesse Jones — Draw Phase',
    'Draw your first card from the deck, or steal it from another player\'s hand?<br><br>'+
    targets.map((t,i)=>`<div class="char-option" onclick="document.querySelectorAll('.char-option').forEach(x=>x.classList.remove('picked'));this.classList.add('picked');window._pickIdx=${i+1}">[Steal from ${t.name} (${t.hand.length} cards)]</div>`).join('')+
    `<div class="char-option" onclick="document.querySelectorAll('.char-option').forEach(x=>x.classList.remove('picked'));this.classList.add('picked');window._pickIdx=0">[Draw from deck]</div>`,
    [{label:'Confirm',fn:()=>{
      const idx=window._pickIdx||0;
      if(idx===0){ drawForPlayer(G.humanIdx,2); }
      else {
        const t=targets[idx-1];
        const ri=Math.floor(Math.random()*t.hand.length);
        const c=t.hand.splice(ri,1)[0]; p.hand.push(c);
        addLog(`You steal a card from ${t.name}'s hand (Jesse Jones).`,'log-good');
        drawForPlayer(G.humanIdx,1); // draw second card normally
      }
      closeModal(); afterDrawPhase(G.humanIdx);
    }}]
  );
}

function kitCarlsonDraw() {
  const p=G.players[G.humanIdx];
  const cards=[drawTop(),drawTop(),drawTop()].filter(Boolean);
  if(cards.length===0){ afterDrawPhase(G.humanIdx); return; }
  showModal('Kit Carlson — Draw Phase',
    'Choose 2 cards to keep (click to toggle). The third goes back on top of the deck.<br><br>'+
    cards.map((c,i)=>`<div class="char-option" id="kc-${i}" onclick="toggleKC(${i})">${cardDisplayName(c)}<br><small>${c.desc}</small></div>`).join(''),
    [{label:'Keep 2 Cards',fn:()=>{
      const kept=cards.filter((_,i)=>document.getElementById(`kc-${i}`)?.classList.contains('picked'));
      const back=cards.filter((_,i)=>!document.getElementById(`kc-${i}`)?.classList.contains('picked'));
      if(kept.length!==2){alert('Pick exactly 2 cards!');return;}
      kept.forEach(c=>p.hand.push(c));
      back.forEach(c=>G.deck.push(c)); // put back on top
      addLog(`Kit Carlson keeps 2 of 3 drawn cards.`,'log-good');
      closeModal(); afterDrawPhase(G.humanIdx);
    }}]
  );
}
window.toggleKC=function(i){
  const el=document.getElementById(`kc-${i}`);
  const picked=document.querySelectorAll('.picked');
  if(el.classList.contains('picked')){ el.classList.remove('picked'); return; }
  if(picked.length>=2){ alert('Already selected 2!'); return; }
  el.classList.add('picked');
};

function pedroDraw() {
  const p=G.players[G.humanIdx];
  const top=G.discard[G.discard.length-1];
  showModal('Pedro Ramirez — Draw Phase',
    `Draw your first card from the discard pile (${top?cardDisplayName(top):'empty'}) or deck?`,
    [{label:'Take from Discard',fn:()=>{
      if(G.discard.length>0){
        const c=G.discard.pop(); p.hand.push(c);
        addLog(`Pedro Ramirez takes ${c.name} from discard.`,'log-good');
      }
      drawForPlayer(G.humanIdx,1); closeModal(); afterDrawPhase(G.humanIdx);
    }},{label:'Draw from Deck',fn:()=>{ closeModal(); drawForPlayer(G.humanIdx,2); afterDrawPhase(G.humanIdx); }}]
  );
}

function doSidAbility() {
  const p=G.players[G.humanIdx];
  if(p.hp>=p.maxHp){addLog('Already at full health.','log-info');return;}
  if(p.hand.length<2){addLog('Need at least 2 cards to use Sid Ketchum ability.','log-info');return;}
  // Prompt which 2 cards to discard
  showModal('Sid Ketchum — Discard 2 for +1 HP',
    'Click two cards from your hand to discard:<br><br>'+
    p.hand.map((c,i)=>`<div class="char-option" id="sid-${i}" onclick="toggleSid(${i})">${cardDisplayName(c)}<br><small>${c.desc}</small></div>`).join(''),
    [{label:'Discard 2',fn:()=>{
      const sel=[...document.querySelectorAll('.picked')].map(el=>parseInt(el.id.split('-')[1]));
      if(sel.length!==2){alert('Pick exactly 2!');return;}
      sel.sort((a,b)=>b-a).forEach(i=>{
        const c=p.hand.splice(i,1)[0]; discardCard(c);
      });
      if(p.hp<p.maxHp) p.hp++;
      addLog(`You discard 2 cards for +1 HP (${p.hp}/${p.maxHp}).`,'log-good');
      closeModal(); renderAll();
    }},{label:'Cancel',fn:closeModal}]
  );
}
window.toggleSid=function(i){
  const el=document.getElementById(`sid-${i}`);
  const picked=document.querySelectorAll('.picked');
  if(el.classList.contains('picked')){ el.classList.remove('picked'); return; }
  if(picked.length>=2){ alert('Pick exactly 2!'); return; }
  el.classList.add('picked');
};

// ===== SPECIAL CHARACTER DRAWS =====

// ===== AI LOGIC =====
function aiDrawPhase(pidx) {
  const p=G.players[pidx];
  // Jesse Jones AI: steal from sheriff or random player if advantageous
  if(p.char.key==='jesse'){
    const targets=G.players.filter(q=>q.alive&&q.idx!==pidx&&q.hand.length>0);
    if(targets.length>0&&Math.random()<0.4){
      const t=targets[Math.floor(Math.random()*targets.length)];
      const ri=Math.floor(Math.random()*t.hand.length);
      const c=t.hand.splice(ri,1)[0]; p.hand.push(c);
      addLog(`${p.name} steals a card from ${t.name}'s hand (Jesse Jones).`,'log-info');
      drawForPlayer(pidx,1);
      afterDrawPhase(pidx);
      return;
    }
  }
  if(p.char.key==='kit'){
    const cards=[drawTop(),drawTop(),drawTop()].filter(Boolean);
    if(cards.length===0){afterDrawPhase(pidx);return;}
    // AI: keep highest value or most useful cards
    const sorted=[...cards].sort((a,b)=>aiCardValue(b,pidx)-aiCardValue(a,pidx));
    const keep=sorted.slice(0,Math.min(2,sorted.length));
    const back=sorted.slice(keep.length);
    keep.forEach(c=>p.hand.push(c));
    back.forEach(c=>G.deck.push(c));
    addLog(`${p.name} uses Kit Carlson's ability.`,'log-info');
    afterDrawPhase(pidx);
    return;
  }
  if(p.char.key==='pedro'&&G.discard.length>0){
    const top=G.discard[G.discard.length-1];
    if(aiCardValue(top,pidx)>5){
      const c=G.discard.pop(); p.hand.push(c);
      addLog(`${p.name} takes ${c.name} from discard (Pedro Ramirez).`,'log-info');
      drawForPlayer(pidx,1);
      afterDrawPhase(pidx);
      return;
    }
  }
  drawForPlayer(pidx,2);
  afterDrawPhase(pidx);
}

function aiCardValue(card, pidx) {
  if(!card) return 0;
  const p=G.players[pidx];
  if(card.name==='BANG!') return 6;
  if(card.name==='MISS!') return 5;
  if(card.name==='Beer') return p.hp<=2?8:3;
  if(card.name==='Stagecoach') return 7;
  if(card.name==='Wells Fargo') return 8;
  if(card.name==='Gatling Gun') return 9;
  if(card.name==='Indians!') return 7;
  if(card.name==='Cat Balou') return 6;
  if(card.name==='Panic!') return 5;
  if(card.name==='Duel') return 5;
  if(card.weapon) return 6;
  if(card.name==='Barrel') return 5;
  if(card.name==='Scope') return 4;
  return 3;
}

function aiPlayPhase(pidx) {
  if(G.gameOver) return;
  const p=G.players[pidx];

  // Sid Ketchum: use ability if low health and 2+ cards
  if(p.char.key==='sid'&&p.hp<=2&&p.hand.length>=2&&p.hp<p.maxHp){
    // find 2 least valuable cards
    const sorted=[...p.hand].sort((a,b)=>aiCardValue(a,pidx)-aiCardValue(b,pidx));
    const [c1,c2]=sorted;
    p.hand.splice(p.hand.indexOf(c1),1); discardCard(c1);
    p.hand.splice(p.hand.indexOf(c2),1); discardCard(c2);
    if(p.hp<p.maxHp) p.hp++;
    addLog(`${p.name} discards 2 cards for +1 HP (Sid Ketchum).`,'log-info');
    renderAll();
  }

  // Collect plays to make
  const plays=[];

  // Equipment: play weapons/barrel/mustang/scope if not already
  for(const card of p.hand){
    if(card.equip&&!card.jail&&!card.dynamite){
      if(card.weapon&&!p.inPlay.some(c=>c.weapon)) plays.push({card,type:'equip'});
      else if(card.name==='Barrel'&&!p.inPlay.some(c=>c.name==='Barrel')) plays.push({card,type:'equip'});
      else if(card.name==='Mustang'&&!p.inPlay.some(c=>c.name==='Mustang')) plays.push({card,type:'equip'});
      else if(card.name==='Scope'&&!p.inPlay.some(c=>c.name==='Scope')) plays.push({card,type:'equip'});
    }
    if(card.dynamite&&!p.inPlay.some(c=>c.dynamite)) plays.push({card,type:'equip'});
  }

  // Jail: put on sheriff if outlaw/renegade
  if(p.role==='outlaw'||p.role==='renegade'){
    const jailCard=p.hand.find(c=>c.jail);
    if(jailCard){
      const sheriff=G.players.find(q=>q.alive&&q.role==='sheriff'&&!q.jailed);
      // Actually can't jail sheriff!
      // Target: a deputy or someone
      const jailTarget=G.players.find(q=>q.alive&&q.idx!==pidx&&q.role!=='sheriff'&&!q.jailed&&(q.role==='deputy'));
      if(jailTarget) plays.push({card:jailCard,type:'jail',target:jailTarget.idx});
    }
  }

  // Draw cards
  for(const card of p.hand){
    if(card.name==='Wells Fargo'||card.name==='Stagecoach') plays.push({card,type:'draw'});
  }

  // Saloon if low health
  const saloon=p.hand.find(c=>c.name==='Saloon');
  if(saloon&&p.hp<=3) plays.push({card:saloon,type:'saloon'});

  // Beer if needed
  const beer=p.hand.find(c=>c.name==='Beer');
  if(beer&&p.hp<=2&&alivePlayers().length>2) plays.push({card:beer,type:'beer'});

  // Pick target to attack (role-aware)
  function pickTarget(){
    const alive=G.players.filter(q=>q.alive&&q.idx!==pidx&&canTarget(pidx,q.idx));
    if(alive.length===0) return null;
    // Priority: outlaws target sheriff, law targets outlaws
    if(p.role==='outlaw'||p.role==='renegade'){
      const sheriff=alive.find(q=>q.role==='sheriff');
      if(sheriff) return sheriff.idx;
    } else {
      const outlaw=alive.find(q=>q.role==='outlaw');
      if(outlaw) return outlaw.idx;
    }
    return alive[Math.floor(Math.random()*alive.length)].idx;
  }

  // BANG!
  if(canPlayBang(pidx)){
    const bangCard=p.hand.find(c=>c.name==='BANG!');
    if(bangCard){
      const t=pickTarget();
      if(t!==null) plays.push({card:bangCard,type:'bang',target:t});
    }
  }

  // Gatling, Indians!
  const gat=p.hand.find(c=>c.name==='Gatling Gun');
  if(gat&&alivePlayers().length>=3) plays.push({card:gat,type:'gatling'});
  const ind=p.hand.find(c=>c.name==='Indians!');
  if(ind) plays.push({card:ind,type:'indians'});

  // Panic!, Cat Balou
  const panic=p.hand.find(c=>c.name==='Panic!');
  if(panic){
    const t=G.players.find(q=>q.alive&&q.idx!==pidx&&effectiveDistance(pidx,q.idx)<=1&&(q.inPlay.some(c=>c.weapon)||q.hand.length>0));
    if(t) plays.push({card:panic,type:'panic',target:t.idx});
  }
  const catbalou=p.hand.find(c=>c.name==='Cat Balou');
  if(catbalou){
    const t=G.players.find(q=>q.alive&&q.idx!==pidx&&(q.inPlay.length>0||q.hand.length>0));
    if(t) plays.push({card:catbalou,type:'catbalou',target:t.idx});
  }

  // Duel
  const duel=p.hand.find(c=>c.name==='Duel');
  if(duel){
    const t=pickTarget();
    // Only duel if we have bangCards in hand
    const bangCount=p.hand.filter(c=>c.name==='BANG!').length;
    if(t!==null&&bangCount>=2) plays.push({card:duel,type:'duel',target:t});
  }

  // Execute plays sequentially with delays
  let pi=0;
  function doNextPlay(){
    if(G.gameOver){aiEndTurn(pidx);return;}
    if(pi>=plays.length){aiEndTurn(pidx);return;}
    const play=plays[pi++];
    // Check card still in hand
    if(!p.hand.includes(play.card)){doNextPlay();return;}
    if(!p.alive){return;}

    const cardIdx=p.hand.indexOf(play.card);
    if(play.type==='bang'){
      if(!canPlayBang(pidx)){doNextPlay();return;}
      if(play.target===undefined||play.target===null||!G.players[play.target].alive){doNextPlay();return;}
      if(!canTarget(pidx,play.target)){doNextPlay();return;}
      renderAll();
      setTimeout(()=>{
        playCard(pidx,p.hand.indexOf(play.card),play.target);
      },500);
      // Continue after delay (playCard is async for responses)
      G._afterPlay=()=>{ setTimeout(doNextPlay,600); };
      return;
    } else if(play.type==='equip'||play.type==='beer'||play.type==='saloon'||play.type==='draw'){
      renderAll();
      setTimeout(()=>{
        const ci=p.hand.indexOf(play.card);
        if(ci===-1){doNextPlay();return;}
        playCard(pidx,ci,play.target);
        setTimeout(doNextPlay,500);
      },500);
      return;
    } else if(play.type==='indians'||play.type==='gatling'||play.type==='panic'||play.type==='catbalou'||play.type==='duel'||play.type==='jail'){
      if((play.type==='panic'||play.type==='catbalou'||play.type==='duel'||play.type==='jail')&&
         (play.target===undefined||!G.players[play.target]?.alive)){doNextPlay();return;}
      G._afterPlay=()=>{ setTimeout(doNextPlay,600); };
      renderAll();
      setTimeout(()=>{
        const ci=p.hand.indexOf(play.card);
        if(ci===-1){G._afterPlay=null;doNextPlay();return;}
        playCard(pidx,ci,play.target);
      },500);
      return;
    }
    doNextPlay();
  }
  doNextPlay();
}

function aiEndTurn(pidx) {
  if(G.gameOver) return;
  const p=G.players[pidx];
  if(!p.alive){nextTurn();return;}
  // Discard excess
  const maxHand=p.hp;
  while(p.hand.length>maxHand){
    // Discard least valuable
    const sorted=[...p.hand].sort((a,b)=>aiCardValue(a,pidx)-aiCardValue(b,pidx));
    const c=sorted[0];
    p.hand.splice(p.hand.indexOf(c),1); discardCard(c);
    addLog(`${p.name} discards ${c.name}.`,'log-info');
  }
  suzyCheck(pidx);
  renderAll();
  setTimeout(()=>nextTurn(), 400);
}

// ===== HUMAN CARD SELECTION =====
function selectCard(idx) {
  if(G.phase!=='play'&&G.phase!=='discard') return;
  if(G.turn!==G.humanIdx) return;
  // Cancel any pending target selection
  if(G.pendingTargetAction){ G.pendingTargetAction=null; hideTargetBanner(); }
  const p=G.players[G.humanIdx];
  const card=p.hand[idx];
  G.selectedCard=idx;
  document.getElementById('card-info-box').style.display='block';
  document.getElementById('card-info-text').innerHTML=`<strong>${card.name}</strong><br><em>${valName(card.value)}${suitSym(card.suit)}</em><br>${card.desc}`;
  // Enable play button?
  const canPlay=canPlayCardHuman(idx);
  document.getElementById('btn-play-card').disabled=!canPlay;
  if(G.phase==='discard'){
    document.getElementById('btn-play-card').textContent='Discard';
    document.getElementById('btn-play-card').disabled=false;
  } else {
    document.getElementById('btn-play-card').textContent='Play Card';
  }
  renderAll();
}

function canPlayCardHuman(idx) {
  const p=G.players[G.humanIdx];
  const card=p.hand[idx];
  if(!card) return false;
  if(G.phase!=='play') return false;
  // BANG! limited to 1/turn unless Willy, Volcanic, or Janet using MISS as BANG
  if(card.name==='BANG!'&&!canPlayBang(G.humanIdx)) return false;
  // MISS! is defensive only — cannot be played on your active turn
  if(card.name==='MISS!') return false;
  if(card.name==='Beer'&&(p.hp>=p.maxHp||alivePlayers().length<=2)) return false;
  return true;
}

function playSelectedCard() {
  if(G.selectedCard===null) return;
  const p=G.players[G.humanIdx];
  if(G.phase==='discard'){
    const card=p.hand.splice(G.selectedCard,1)[0];
    discardCard(card);
    G.selectedCard=null;
    document.getElementById('card-info-box').style.display='none';
    if(p.hand.length<=p.hp){ doEndTurn(G.humanIdx); }
    renderAll();
    return;
  }
  if(!canPlayCardHuman(G.selectedCard)){
    addLog('Cannot play that card right now.','log-info');
    return;
  }
  const idx=G.selectedCard;
  G.selectedCard=null;
  document.getElementById('card-info-box').style.display='none';
  playCard(G.humanIdx, idx);
  // Don't call renderAll() here — if playCard triggered promptTarget,
  // it already rendered with orange targetable opponents. Calling renderAll()
  // again without targetable IDs would strip the click handlers.
  if(!G.pendingTargetAction) renderAll();
}

function showTargetBanner(cardName) {
  document.getElementById('target-banner-text').textContent=`Choose a target for ${cardName}`;
  document.getElementById('target-banner').style.display='block';
}
function hideTargetBanner() {
  document.getElementById('target-banner').style.display='none';
}

function clearHumanSelection() {
  G.selectedCard=null;
  G.pendingTargetAction=null;
  hideTargetBanner();
  document.getElementById('card-info-box').style.display='none';
}

function deselectCard() {
  clearHumanSelection();
  setStatus('Play cards from your hand, then End Turn.');
  renderAll();
}

// Escape cancels targeting
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && G.pendingTargetAction){ deselectCard(); }
});

// ===== RENDERING =====
function renderAll(targetableIds) {
  renderOpponents(targetableIds);
  renderHumanInfo();
  renderHumanHand();
  renderDeckArea();
  updateActionButtons();
}

const CHAR_ICONS = {
  willy:'🤠', slab:'💪', bart:'🤑', gringo:'😤',
  jesse:'🎯', jour:'🛡️', kit:'🔍', lucky:'🍀',
  paul:'🐎', janet:'⚡', suzy:'🦊', vulture:'🦅',
  pedro:'🌵', sid:'💰', rose:'🌹', bjack:'🎲'
};

// Hex seating positions: cx = center-x as % of container, top = px from top
const HEX_SEATS = {
  1: [{cx:50,  top:10}],
  2: [{cx:25,  top:10},  {cx:75,  top:10}],
  3: [{cx:16,  top:45},  {cx:50,  top:5},  {cx:84,  top:45}],
  4: [{cx:14,  top:45},  {cx:38,  top:5},  {cx:62,  top:5},  {cx:86,  top:45}],
  5: [{cx:12,  top:70},  {cx:30,  top:18}, {cx:50,  top:4},  {cx:70,  top:18}, {cx:88,  top:70}],
  6: [{cx:12,  top:70},  {cx:27,  top:20}, {cx:43,  top:4},  {cx:57,  top:4},  {cx:73,  top:20}, {cx:88,  top:70}],
};

function renderOpponents(targetableIds) {
  const area=document.getElementById('opponents-area');
  const others=G.players.filter(p=>!p.isHuman);
  area.innerHTML='';

  others.forEach(p=>{
    const isTargetable=targetableIds&&targetableIds.includes(p.idx);
    const isCurTurn=G.turn===p.idx;
    const div=document.createElement('div');
    div.className='opp-box'+(p.alive?'':' dead')+(isCurTurn?' current-turn':'')+(isTargetable?' targetable':'');
    div.id=`opp-box-${p.idx}`;
    if(isTargetable) div.onclick=()=>selectTarget(p.idx);

    const icon = CHAR_ICONS[p.char.key] || '🤠';
    const roleText = p.roleRevealed
      ? `<span class="role-badge role-${p.role}">${p.role}</span>`
      : '<span style="color:#666">??? role</span>';

    let hpHtml='<div class="health-bar">';
    for(let i=0;i<p.maxHp;i++) hpHtml+=`<div class="health-pip ${i<p.hp?'full':'empty'}"></div>`;
    hpHtml+='</div>';

    const dist=p.alive?effectiveDistance(G.humanIdx,p.idx):'-';
    const rangeable=p.alive&&canTarget(G.humanIdx,p.idx);

    // Card backs for hand
    let cardBacksHtml='<div class="card-backs">';
    const MAX_SHOW=8;
    const shown=Math.min(p.hand.length,MAX_SHOW);
    for(let i=0;i<shown;i++) cardBacksHtml+=`<div class="card-back"></div>`;
    if(p.hand.length>MAX_SHOW) cardBacksHtml+=`<div class="card-back extra">+${p.hand.length-MAX_SHOW}</div>`;
    cardBacksHtml+='</div>';

    // Mini equipment cards on placemat
    let equipHtml='<div class="placemat-equip">';
    p.inPlay.forEach(c=>{
      const red=isRed(c.suit);
      equipHtml+=`<div class="mini-card${red?' mini-red':''}">
        <div class="mini-card-val${red?' red-suit':''}">${valName(c.value)}${suitSym(c.suit)}</div>
        <div class="mini-card-suit${red?' red-suit':''}">${suitSym(c.suit)}</div>
        <div class="mini-card-name">${c.name}</div>
        ${c.weapon?`<div class="mini-card-range">Range ${c.range}</div>`:''}
      </div>`;
    });
    if(p.jailed) equipHtml+=`<div class="mini-card" style="background:#2a0a00;border-color:#aa4400;color:#dd8866"><div style="font-size:1.4em">⛓️</div><div class="mini-card-name">JAIL</div></div>`;
    equipHtml+='</div>';

    div.innerHTML=`
      ${isCurTurn?'<div class="turn-indicator">ACTIVE</div>':''}
      <div class="opp-header">
        <div class="opp-icon">${icon}</div>
        <div class="opp-info">
          <div class="opp-name">${p.name}</div>
          <div class="opp-char">${p.char.name}</div>
          <div class="opp-role">${roleText}</div>
        </div>
      </div>
      ${hpHtml}
      <div class="opp-stats">${p.alive?`dist: ${dist}${rangeable?' ✓ in range':''}`:'☠ ELIMINATED'}</div>
      <div class="placemat">
        <div class="placemat-label">${p.alive?`Hand (${p.hand.length})`:'no cards'}</div>
        ${p.alive&&p.hand.length>0?cardBacksHtml:''}
        ${p.inPlay.length>0||p.jailed?'<div class="placemat-label" style="margin-top:3px">In Play</div>':''}
        ${equipHtml}
      </div>
    `;
    area.appendChild(div);
  });
}

function renderHumanInfo() {
  const p=G.players[G.humanIdx];
  const icon=CHAR_ICONS[p.char.key]||'🤠';
  document.getElementById('human-character').innerHTML=`<span style="font-size:1.6em;vertical-align:middle;margin-right:6px">${icon}</span>${p.char.name}`;
  document.getElementById('human-role-display').innerHTML=`<span class="role-badge role-${p.role}">${p.role.toUpperCase()}</span>`;
  document.getElementById('human-ability').textContent=p.char.ability;
  let hpHtml='';
  for(let i=0;i<p.maxHp;i++) hpHtml+=`<div class="health-pip ${i<p.hp?'full':'empty'}"></div>`;
  document.getElementById('human-health').innerHTML=hpHtml;
  document.getElementById('human-range-stat').textContent=`Range: ${getRange(G.humanIdx)} | HP: ${p.hp}/${p.maxHp}`;
  let equipHtml='';
  p.inPlay.forEach(c=>{
    const red=isRed(c.suit);
    equipHtml+=`<div class="mini-card${red?' mini-red':''}" style="width:40px;height:54px">
      <div class="mini-card-val${red?' red-suit':''}">${valName(c.value)}${suitSym(c.suit)}</div>
      <div class="mini-card-suit${red?' red-suit':''}">${suitSym(c.suit)}</div>
      <div class="mini-card-name">${c.name}</div>
      ${c.weapon?`<div class="mini-card-range">Range ${c.range}</div>`:''}
    </div>`;
  });
  if(p.jailed) equipHtml+=`<div class="mini-card" style="width:40px;height:54px;background:#2a0a00;border-color:#aa4400;color:#dd8866"><div style="font-size:1.4em">⛓️</div><div class="mini-card-name">JAIL</div></div>`;
  document.getElementById('human-equip').innerHTML=equipHtml;
}

function cardDisplayName(c) {
  return `${c.name} <span class="${isRed(c.suit)?'red-suit':''}">${valName(c.value)}${suitSym(c.suit)}</span>`;
}

function makeCardEl(card, idx, canPlay, isSelected) {
  const div = document.createElement('div');
  const isBlue = card.type === 'blue';
  const suitColor = isRed(card.suit) ? 'red-suit' : '';
  div.className = 'card' + (isBlue?' blue-card':'') + (isSelected?' selected':'') + ((!canPlay&&!isSelected)?' disabled':'');
  div.dataset.cardId = card.id;
  if(canPlay||isSelected) div.onclick = ()=>selectCard(idx);
  div.innerHTML = `
    <div class="card-corner"><span class="${suitColor}">${valName(card.value)}<br>${suitSym(card.suit)}</span></div>
    <div>
      <div class="card-suit-big ${suitColor}">${suitSym(card.suit)}</div>
      <div class="card-center">${card.name}</div>
    </div>
    <div class="card-corner-bot"><span class="${suitColor}">${valName(card.value)}<br>${suitSym(card.suit)}</span></div>
  `;
  return div;
}

function renderHumanHand() {
  const p = G.players[G.humanIdx];
  const container = document.getElementById('human-hand');
  const isOurTurn = G.turn === G.humanIdx;
  const isPlay = G.phase === 'play';
  const isDiscard = G.phase === 'discard';

  // Update label
  const label = document.getElementById('hand-label');
  if(isDiscard) label.textContent = `Discard down to ${p.hp} cards (have ${p.hand.length}) — click a card to discard it`;
  else if(isPlay) label.textContent = `Your Hand (${p.hand.length}) — click a card to select`;
  else label.textContent = `Your Hand (${p.hand.length})`;

  if(p.hand.length === 0) {
    container.innerHTML = '<div style="color:#555;font-style:italic;align-self:center">No cards in hand</div>';
    return;
  }

  // Remove empty-hand placeholder if present
  if(container.children.length === 1 && !container.children[0].dataset.cardId) {
    container.innerHTML = '';
  }

  const existingIds = [...container.children].map(el => Number(el.dataset.cardId));
  const newIds = p.hand.map(c => c.id);

  // Remove cards no longer in hand
  [...container.children].forEach(el => {
    if(!newIds.includes(Number(el.dataset.cardId))) {
      el.remove();
    }
  });

  // Add new cards or reorder, update state
  p.hand.forEach((card, idx) => {
    const canPlay = isOurTurn && (isPlay||isDiscard) && (isDiscard||canPlayCardHuman(idx));
    const isSelected = G.selectedCard === idx;
    const existing = [...container.children].find(el => Number(el.dataset.cardId) === card.id);

    if(existing) {
      // Just update classes and handler, no DOM rebuild
      const isBlue = card.type === 'blue';
      existing.className = 'card' + (isBlue?' blue-card':'') + (isSelected?' selected':'') + ((!canPlay&&!isSelected)?' disabled':'');
      existing.onclick = (canPlay||isSelected) ? ()=>selectCard(idx) : null;
      // Move to correct position if needed
      const currentPos = [...container.children].indexOf(existing);
      if(currentPos !== idx) container.insertBefore(existing, container.children[idx]||null);
    } else {
      // New card — build element and animate only it
      const el = makeCardEl(card, idx, canPlay, isSelected);
      el.classList.add('card-anim');
      const ref = container.children[idx] || null;
      container.insertBefore(el, ref);
    }
  });
}

function renderDeckArea() {
  document.getElementById('deck-count').textContent=G.deck.length;
  const discard=document.getElementById('discard-card');
  if(G.discard.length>0){
    const top=G.discard[G.discard.length-1];
    const sc=isRed(top.suit)?'red-suit':'';
    discard.innerHTML=`
      <div style="font-size:0.65em;color:#888">Discard</div>
      <div class="${sc}" style="font-size:1.5em">${suitSym(top.suit)}</div>
      <div style="font-size:0.65em;text-align:center;font-weight:bold">${top.name}</div>
      <div style="font-size:0.6em;color:#888">${valName(top.value)}${suitSym(top.suit)}</div>
    `;
    document.getElementById('discard-pile').style.background=top.type==='blue'?'#1a2040':'#1a1208';
  } else {
    discard.innerHTML='<span style="color:#555;font-size:0.75em">Empty</span>';
  }

  // Center info
  const ci=document.getElementById('game-center-info');
  if(G.gameOver){ ci.textContent='Game Over'; return; }
  const cur=G.players[G.turn];
  ci.innerHTML=cur?`<strong>${cur.name}'s turn</strong><br>${G.phase}`:'-';
}

function updateActionButtons() {
  const isOurTurn=G.turn===G.humanIdx;
  const isPlay=G.phase==='play';
  const isDraw=G.phase==='draw';

  document.getElementById('btn-draw').disabled=!(isOurTurn&&isDraw);
  document.getElementById('btn-end').disabled=!(isOurTurn&&isPlay);
}

function updatePhaseInfo(text) {
  document.getElementById('phase-info').textContent=text;
}

// ===== LOG =====
function addLog(msg, cls='log-action') {
  G.log.push({msg,cls});
  const log=document.getElementById('game-log');
  const line=document.createElement('div');
  line.className='log-line '+cls;
  line.textContent=msg;
  log.appendChild(line);
  log.scrollTop=log.scrollHeight;
}

function setStatus(msg) {
  document.getElementById('status-msg').textContent=msg;
}

const CARD_ICONS = {
  'BANG!':'🔫', 'MISS!':'🛡️', 'Beer':'🍺', 'Stagecoach':'🚂', 'Wells Fargo':'💰',
  'Gatling Gun':'💥', 'Indians!':'🏹', 'Panic!':'😱', 'Cat Balou':'🐱',
  'Duel':'⚔️', 'Saloon':'🍻', 'Dynamite':'🧨', 'Jail':'⛓️',
  'Barrel':'🛢️', 'Mustang':'🐴', 'Scope':'🔭', 'Volcanic':'🌋',
  'Schofield':'🔫', 'Remington':'🔫', 'Rev. Carabine':'🔫', 'Winchester':'🔫',
};

let _cardPopupTimer=null;
function showCardPopup(playerName, cardName) {
  const el=document.getElementById('card-popup');
  if(_cardPopupTimer){ clearTimeout(_cardPopupTimer); }
  const icon=CARD_ICONS[cardName]||'🃏';
  el.innerHTML=`<div id="card-popup-inner">
    <div class="cp-icon">${icon}</div>
    <div class="cp-name">${cardName}</div>
    <div class="cp-player">${playerName}</div>
  </div>`;
  _cardPopupTimer=setTimeout(()=>{ el.innerHTML=''; _cardPopupTimer=null; }, 1600);
}

function showPlayerCardPopup(pidx, cardName) {
  const p=G.players[pidx];
  const anchor=p.isHuman
    ? document.getElementById('left-panel')
    : document.getElementById(`opp-box-${pidx}`);
  if(!anchor) return;
  const rect=anchor.getBoundingClientRect();
  const overlay=document.getElementById('player-badge-overlay');
  const icon=CARD_ICONS[cardName]||'🃏';
  const badge=document.createElement('div');
  badge.className='player-card-badge';
  badge.style.top=rect.top+'px';
  badge.style.left=rect.left+'px';
  badge.style.width=rect.width+'px';
  badge.style.height=rect.height+'px';
  badge.innerHTML=`<span class="pcb-icon">${icon}</span><span class="pcb-name">${cardName}</span>`;
  overlay.appendChild(badge);
  setTimeout(()=>badge.remove(), 1600);
}

function showMissPopup(playerName) {
  const el=document.getElementById('miss-popup');
  el.innerHTML=`<div id="miss-popup-inner">
    <div class="miss-icon">🛡️</div>
    <div class="miss-label">MISS!</div>
    <div class="miss-name">${playerName} dodged!</div>
  </div>`;
  setTimeout(()=>{ el.innerHTML=''; }, 1700);
}

// ===== MODAL =====
function showModal(title, body, buttons) {
  document.getElementById('modal-title').textContent=title;
  document.getElementById('modal-body').innerHTML=body;
  const btns=document.getElementById('modal-btns');
  btns.innerHTML='';
  buttons.forEach(b=>{
    const el=document.createElement('button');
    el.className='btn primary';
    el.textContent=b.label;
    el.onclick=b.fn;
    btns.appendChild(el);
  });
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

function deckInfo() {
  addLog(`Deck: ${G.deck.length} cards remaining, ${G.discard.length} in discard.`,'log-info');
}

// ===== GAME SETUP =====
function showCharSelect() {
  let selectedChar=0;
  const charListHtml=CHARACTERS.map((c,i)=>{
    const icon=CHAR_ICONS[c.key]||'🤠';
    return `<div class="char-option char-card ${i===0?'picked':''}" id="copt-${i}" onclick="selectChar(${i})">
      <div class="char-card-icon">${icon}</div>
      <div class="char-card-name">${c.name}</div>
      <div class="char-card-hp">${'❤️'.repeat(c.hp)}</div>
      <div class="char-card-ability">${c.ability}</div>
    </div>`;
  }).join('');

  const playerCountHtml=`
    <div class="player-count-setting">
      <span class="pcs-label">Number of Players</span>
      <div class="pcs-btns">
        ${[3,4,5,6,7].map(n=>`<button class="pcs-btn${n===5?' picked':''}" onclick="selectPlayerCount(${n})">${n}</button>`).join('')}
      </div>
    </div>`;

  showModal('Choose Your Character',
    `${playerCountHtml}
    <p style="margin:12px 0 10px;color:#d4a017;text-align:center">Select your character:</p>
    <div class="char-grid">${charListHtml}</div>
    <p style="margin-top:10px;font-size:0.8em;color:#888;text-align:center">You will be assigned a random role. The Sheriff is revealed at the start.</p>`,
    [{label:'Start Game!', fn:()=>{ closeModal(); startGame(window._selectedChar||0, window._selectedPlayerCount||5); }}]
  );
  window._selectedChar=0;
  window._selectedPlayerCount=5;
  window.selectChar=function(i){
    document.querySelectorAll('[id^="copt-"]').forEach(el=>el.classList.remove('picked'));
    document.getElementById(`copt-${i}`)?.classList.add('picked');
    window._selectedChar=i;
  };
  window.selectPlayerCount=function(n){
    document.querySelectorAll('.pcs-btn').forEach(el=>el.classList.remove('picked'));
    document.querySelector(`.pcs-btn[onclick="selectPlayerCount(${n})"]`)?.classList.add('picked');
    window._selectedPlayerCount=n;
  };
}

// ===== START =====
showCharSelect();
