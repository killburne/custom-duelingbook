# Custom Duelingbook
## Installation

- Install [Tampermonkey](https://www.tampermonkey.net/) for your Browser.
- Then open the [Custom DB Script](https://github.com/killburne/custom-duelingbook/raw/master/custom-duelingbook.user.js) and click install.

## Hotkeys

- ``Alt`` + ``R`` opens the ruling db link of the current card in the detail view

## Macros
Using the macro function you can do many things.
- Sending a message in chat
- Add cards from deck to hand
- Special summon monsters from deck in ATK/DEF and either open the zone chooser or just summon it to a random zone.
- Send a card from deck to GY

### Syntax
- Categories ``-- My Category Name``
- Macros ``Button Name | message to send``
- Multiple actions in one Macro ``Button name | message 1 | message 2 | message 3``
- Variables ``${variableName}``
- Functions ``${functionName(param)}``
- Functions with multiple parameters ``${functionName(param1~param2~param3)}``

### Variables
- ``currentLP`` your current lifepoints
- ``halfOfLP`` half of your current lifepoints
- ``topUsername`` The username of the player at the top
- ``botUsername`` The username of the player at the bottom (usually yourself)
- ``atkAllMonsters`` The combined atk of all monsters on the field you can see
- ``defAllMonsters`` The combined def of all monsters on the field you can see
- ``atkAllFaceUpMonsters`` The combined atk of all face up monsters on the field you can see
- ``defAllFaceUpMonsters`` The combined def of all face up monsters on the field you can see

#### Examples
- This adds a macro that greets the opponent and says you're the real YOUR USERNAME
  - ``Hello | Hello ${topUsername} :) I'm the real ${botUsername}``
- This doubles your current lifepoints
  - ``LP*2 | /add ${currentLP}``
- This halfs your current lifepoints
  - ``LP/2 | /sub ${halfOfLP}``

### Functions
- ``waitInMs(number)`` waits for the specified amount of milliseconds before doing the next action in the macro
- ``addFromDeckToHand(cardNames)`` adds cards from your deck to your hand. If the card is not found in your deck the deck will just be shuffled
- ``sendFromDeckToGY(cardNames)`` sends cards from your deck to your GY
- ``specialFromDeckInAtk(cardName)`` opens the zone selection and then special summons a monster from your deck to that zone in attack position
- ``specialFromDeckInDef(cardName)`` opens the zone selection and then special summons a monster from your deck to that zone in defense position
- ``specialFromDeckInAtkRandomZone(cardNames)`` special summons monsters from your deck to an available zone chosen by DB in attack position
- ``specialFromDeckInDefRandomZone(cardNames)`` special summons monsters from your deck to an available zone chosen by DB in defense position
- ``specialFromDeckInAtkToZone(cardName~zone)`` special summons a monster from your deck to an available zone from your given list in attack position
- ``specialFromDeckInDefToZone(cardName~zone)`` special summons a monster from your deck to an available zone from your given list in defense position
- ``specialFromExtraDeckInAtk(cardName)`` opens the zone selection and then special summons a monster from your extra deck to that zone in attack position
- ``specialFromExtraDeckInDef(cardName)`` opens the zone selection and then special summons a monster from your extra deck to that zone in defense position
- ``specialFromExtraDeckInAtkRandomZone(cardNames)`` special summons monsters from your extra deck to an available zone chosen by DB in attack position
- ``specialFromExtraDeckInDefRandomZone(cardNames)`` special summons monsters from your extra deck to an available zone chosen by DB in defense position
- ``specialFromExtraDeckInAtkToZone(cardName~zone)`` special summons a monster from your extra deck to an available zone from your given list in attack position
- ``specialFromExtraDeckInDefToZone(cardName~zone)`` special summons a monster from your extra deck to an available zone from your given list in defense position
- ``sendFromExtraDeckToGY(cardNames)`` sends cards from your extra deck to your GY
- ``specialSummonToken()`` special summons a token
- ``specialSummonTokenToZone(zone)`` special summons a token to an available zone from your given list
- ``sendAllControllingMonstersFromFieldToGY(cardPosition~FaceUpDown)`` sends all monster with given position (ATK/DEF/BOTH) and (FaceUp/FaceDown) or all if no position given to the GY
- ``sendAllOwnSpellTrapsFromFieldToGY()`` sends all your spell and trap cards from your field to your GY
- ``sendFromFieldToGY(cardNames)`` sends monsters you control to the GY
- ``banishFromGY(cardNames)`` banishes monsters from your GY
- ``activateSpellTrapFromDeck(cardNames)`` activates a spell or trap card from your deck
- ``activateSpellTrapFromDeckToZone(cardName~zone)`` activates a spell or trap card from your deck to an available zone from your given list
- ``specialFromGYInAtk(cardName)`` opens the zone selection and then special summons a monster from your GY to that zone in attack position
- ``specialFromGYInDef(cardName)`` opens the zone selection and then special summons a monster from your GY to that zone in defense position
- ``specialFromGYInAtkRandomZone(cardNames)`` special summons monsters from your GY to an available zone chosen by DB in attack position
- ``specialFromGYInDefRandomZone(cardNames)`` special summons monsters from your GY to an available zone chosen by DB in defense position
- ``specialFromGYInAtkToZone(cardName~zone)`` special summons a monster from your GY to an available zone from your given list in attack position
- ``specialFromGYInDefToZone(cardName~zone)`` special summons a monster from your GY to an available zone from your given list in defense position
- ``discard(cardNames)`` discards monsters from your hand to your GY
- ``addFromGYToHand(cardNames)`` adds cards from your GY to your hand
- ``fromBanishToTopOfDeck(cardNames)`` returns banished cards to the top of your deck
- ``fromGYToTopOfDeck(cardNames)`` returns cards in your GY to the top of your deck
- ``fromFieldToTopOfDeck(cardNames)`` returns cards on your field to the top of your deck
- ``shuffleDeck()`` shuffles your deck
- ``moveZone(cardName~zone)`` MOVES a card on the field to an available zone from your given list
- ``overlayMonsters(cardName~materialName)`` overlays a monster with 1 or more materials
- ``specialSummonMultipleTokens(count)`` summons multiple tokens to available zones chosen by DB
- ``returnAllFromHandToTopOfDeck()`` returns all cards in your hand to the top of your deck
- ``banishFromHand(cardNames)`` banishes cards from hand
- ``banishFromDeck(cardNames)`` banishes cards from deck
- ``flipDownMonsters(cardNames)`` flips down monsters
- ``flipUpMonsters(cardNames)`` flips up monsters
- ``changeToAtk(cardNames)`` changes monsters to attack position
- ``changeToDef(cardNames)`` changes monsters to defense position
- ``normalSetToRandomZone(cardName)`` normal sets a monster to a random zone
- ``normalSetToZone(cardName~zone)`` normal sets a monster to an available zone from your given list
- ``normalSummonToRandomZone(cardName)`` normal summons a monster to a random zone
- ``normalSummonToZone(cardName~zone)`` normal summons a monsters to an available zone from your given list
- ``addCountersToCards(count~cardNames)`` adds counters to cards
- ``removeCountersFromCards(count~cardNames)`` removes counters from cards

##### Zones
- Monster zones: M1 - M5
- Extra monster zones: EL (left) and ER (right)
- Spell/Trap zones: S1 - S5
- Opponents monster zones: OM1 - OM5

#### Examples
- Sends Hello in chat, waits 2 seconds and then sends Bye
  - ``Hello | Hello | ${waitInMs(2000)} | Bye``
- Send Destiny HERO - Celestial and Destiny HERO - Dasher from your deck to the graveyard
  - ``Send DPE Garnets | ${sendFromDeckToGY(Destiny HERO - Celestial~Destiny HERO - Dasher)}``
- Special summon PSY-Frame Driver from your deck to a random zone in attack position
  - ``SS Driver | ${specialFromDeckInAtkRandomZone(PSY-Frame Driver)}``

### Full Example Macros
    Hello | Hello ${topUsername}, good luck have fun.
    CHAIN | I'll chain to that.
    Nibiru :( | The total stats of all face up monsters on the field are ${atkAllFaceUpMonsters} ATK / ${defAllFaceUpMonsters} DEF | ${sendAllControllingMonstersFromFieldToGY(Both~FaceUp)} | ${specialSummonToken()}
    -- LP
    LP/2 | /sub ${halfOfLP}
    -- SS
    SS Driver Zone | ${specialFromDeckInAtk(PSY-Frame Driver)}
    SS Driver | ${specialFromDeckInAtkRandomZone(PSY-Frame Driver)} | Thinking on zone
    SS Driver Def | ${specialFromDeckInDefRandomZone(PSY-Frame Driver)} | Thinking on zone
    -- Deck to GY
    Mill 1 | /mill 1
    Verte Fusion Destiny | /sub 2000 | ${sendFromDeckToGY(Fusion Destiny)}
    Send DPE Garnets | ${sendFromDeckToGY(Destiny HERO - Celestial~Destiny HERO - Dasher)}
    Send Dragoon Garnets | ${sendFromDeckToGY(Dark Magician~Red-Eyes Black Dragon)}
    -- Search
    Add Invo | ${addFromDeckToHand(Invocation)}
