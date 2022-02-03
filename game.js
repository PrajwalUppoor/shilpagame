
kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
})


const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20


let isJumping = true

var audioop = new Audio('./tracks/opening.mp3')
 loadSprite('coin', './sprites/coin.png')
 loadSprite('evil-shroom', './sprites/lizardb.png')
 loadSprite('brick', './sprites/brick.png')
 loadSprite('block', './sprites/block.png')
 loadSprite('shilpa', './sprites/shilpabig.png')
 loadSprite('jackfruit', './sprites/jackfruit.png')
 loadSprite('surprise', './sprites/surprise.png')
 loadSprite('unboxed', './sprites/unboxed.png')
 loadSprite('pipe-top-left', './sprites/pipe-top-left.png')
 loadSprite('pipe-top-right', './sprites/pipe-top-right.png')
 loadSprite('pipe-bottom-left', './sprites/pipe-bottom-left.png')
  loadSprite('pipe-bottom-right', './sprites/pipe-bottom-right.png')
  loadSprite('thorns','./sprites/thorns.png')
 loadSprite('blue-block', './sprites/blue-block.png')
 loadSprite('blue-brick', './sprites/blue-brick.png')
 loadSprite('blue-steel', './sprites/blue-steel.png')
 loadSprite('blue-evil-shroom', './sprites/blue-evil-shroom.png')
 loadSprite('blue-surprise', './sprites/blue-surprise.png')
 loadSprite('rakshith','./sprites/rakshithhug.png')


scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  
    audioop.play()
  

  const maps = [
    [ '                                                                  £££',
      '                                                                  £££',
      '                                                                  £££',
      '                                                                  £££',
      '                                                                                                                                ',
      '                                                                                                                                ',
      '                                                                                                                                ',
      '                                                                 £                                                              ',
      '                                        ==                      ££                                                              ',
      '     %   =*=%=                                               £££££                                                              ',
      '                                                    ======   £££££                                                              ',
      '                            ()        ===                    £££££                                                              ',
      '                    ^   ^   ()                               £££££                                       -+                        ',
      '==============================   ====      =========     =====££££======  =  = ===  ===   ==    =========()==                                ',
      '==============================   ====      =========     =====££££======  =  = ===  ===   ==  ===========()==                              ',
      '                                                                        t  t  t  t  t  t  t  t  t  t  t  ()                                              ',
      '                                                                                                         ()                       ',
      '                                                                 ============================================                               ',
    ],
   ['x                                                                                                                             ',
    'x                                                                    %*                                                       ()-+ ',
    'x                                                                                                                           ()()()',
    'x                                                                **              ===!!!!      !!!!!!!!     !!!!!!!!!!!!!!!!!!!!!!!!!                             ',
    'x                                                                                                                            ',
    '                                                      }}        t  t                                                                 ',
    '                                            }}          }}}}}}}        }}}}}}                                                               ',
    '                                                     }} }}}}}}}}}}}}}}}}}}}}}                                                                           ',
    '                                                  }}                                                                            ',
    '                                             }}                                                                             ',
    '                                                     }}                                                                            ',
    '                                                                                                                             ',
    '  xxxxxxxxxxxx                              }}      }}                                                                                    ',
    '                                              }}                                                                             ',
    '                          xxxx                   }                                                                                 ',
    '                                                     }}                                                                             ',
    '                xxxxxxx           xxxx             }}                                                                                    ',
    '                                                }}                                                                             ',
    '                            xxxxxxxx           }}                                                                                ',
    '                                          }}}                                                                              ',
    '                                                                                                                                  '
    ],
    [
      '£                                       ££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££',
      '£                                       £££xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx£££xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                                                r £',
      '£                                       ££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££            x              x                           £',
      '£                                                        ££££££                             ££                                    xx                 xx  £££££££££££££££££££££££££',
      '£                                                                                          ££                                                     xx',
      '£        @@@@@@              xx                                                            £££                                             xxx',  
      '£                          xxx           ££££££££££££                                        ££££                                      xx',
      '£                        xxxx  x   ()   ££££                   xxxx     @                                                      ££££££££        ££  ££',
      '£               z   z  x xxxx  x   ()££££                xxxx         ',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!£££          xxx                                                                  xx',
      '                                                                         z ',                                                             
      '                                                          !!!!!!!!!!!!!!!!!!                                              x x',
      '                                                                            xxxxxx                                    xxx',
      '                                                                                xxxxxxxxxxxxx                 xx  xx  ',
      '                                                                                                *%       ',
      '                                                                                                       xxxxxx',
      '                                                                                                ',
      '                                                                                          z                                z                    ^               ^',
      '                                                                                 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    ]
  ]

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    '$': [sprite('coin'), 'coin'],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'jackfruit-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
    '^': [sprite('evil-shroom'), solid(), 'dangerous',scale(0.1)],
    '#': [sprite('jackfruit'), solid(), 'jackfruit', body()],
    '!': [sprite('blue-block'), solid(), scale(0.5)],
    '£': [sprite('blue-brick'), solid(), scale(0.5)],
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    'x': [sprite('blue-steel'), solid(), scale(0.5)],
    'r':[sprite('rakshith'),solid(),'rakshith',scale(0.12)],
    't':[sprite('thorns'),solid(),scale(0.5),'thorns']

  }

  const gameLevel = addLevel(maps[level], levelCfg)

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    }
   
  ])

 

  
  
  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(0.1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(0.2)
        timer = time
        isBig = true     
      }
    }
  }

  const player = add([
    sprite('shilpa'), solid(),scale(0.1),
    pos(30, 0),
    body(),
    big(),
    origin('bot')
  ])

  action('jackfruit', (m) => {
    m.move(20, 0)
  })

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('jackfruit-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })

  player.collides('jackfruit', (m) => {
    destroy(m)
    player.biggify(6)
  })

  player.collides('coin', (c) => {
    destroy(c)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('dangerous', (d) => {
    d.move(-ENEMY_SPEED, 0)
  })

  player.collides('thorns',(t)=>{
    go('lose', { score: scoreLabel.value})
  })

  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d)
    } else {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.collides('rakshith',()=>{
      go('theend')
  })

  player.collides('pipe', () => {
    keyPress('down', () => {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value
      })
      audioop.pause()
      audioop.currentTime=0
    })
  })

  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })
})

scene('theend',()=>{
  audioop.pause()
  audioop.currentTime=0
  let audio = new Audio('./tracks/HappyTogether.mp3');
  audio.play();
  add([text('Happy Ending....',20),origin('center'), pos(width()/2, height()/ 2)])
})

scene('lose', ({ score }) => {
  audioop.pause()
  audioop.currentTime=0
  keyPress('enter',() => {
    window.location.reload();
})
  add([text('Press Enter to Restart', 20), origin('center'), pos(width()/2, height()/ 2)])
})

start("game", { level: 0, score: 0})
