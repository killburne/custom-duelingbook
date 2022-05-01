# Custom Duelingbook
## Installation

- Install [Tampermonkey](https://www.tampermonkey.net/) for your Browser.
- Then, open the [Custom DB Script](https://github.com/killburne/custom-duelingbook/raw/master/custom-duelingbook.user.js) and click install.
- After this go to [Duelingbook](https://www.duelingbook.com/) and you'll see in the bottom left corner a button to open the settings to customize it to your liking

## Hotkeys

- ``F2`` (you can also configure this in the settings): opens the ruling database entry for the current card in the detailed view

## Macros
Using the macro function you can do many things, for example:
- Send a message in chat
- Add cards from the Deck to your hand
- Special Summon monsters from the Deck in Attack/Defense Position and either open the zone chooser or just Summon it to a random zone.
- Send a card from the Deck to the GY

### Syntax
- Categories: ``-- My Category Name``
- Macros: ``Button Name | message to send``
- Multiple actions in one Macro: ``Button name | message 1 | message 2 | message 3``
- Variables: ``${variableName}``
- Functions: ``${functionName(param)}``
- Functions with multiple parameters: ``${functionName(param1~param2~param3)}``

### Variables 

|Variable|Holds|
|---|---|
|``currentLP``|Your current lifepoints|
|``halfOfLP``|Half of your current lifepoints|
|``topUsername``|The username of the player at the top|
|``botUsername``|The username of the player at the bottom (usually yourself)|
|``atkAllMonsters``|The combined ATK of all monsters on the field that you can see|
|``defAllMonsters``|The combined DEF of all monsters on the field that you can see|
|``atkAllFaceUpMonsters``|The combined ATK of all face up monsters on the field that you can see|
|``defAllFaceUpMonsters``|The combined DEF of all face up monsters on the field that you can see|

#### Examples:
- This adds a macro that greets the opponent and then says you're the real YOUR USERNAME
  - ``Hello | Hello ${topUsername} :) I'm the real ${botUsername}``
- This doubles your current lifepoints
  - ``LP*2 | /add ${currentLP}``
- This halves your current lifepoints
  - ``LP/2 | /sub ${halfOfLP}``

### Functions

|Function|Action Perfomed|
|---|---|
|``waitInMs(number)``|Waits for the specified amount of milliseconds before doing the next action in the macro|
|``addFromDeckToHand(cardNames)``|Adds cards from your Deck to your hand. If the card is not found in your Deck the Deck will just be shuffled|
|``sendFromDeckToGY(cardNames)``|Sends cards from your Deck to your GY|
|``specialFromDeckInAtk(cardName)``|opens the zone selection and then Special Summons a monster from your Deck to that zone in Attack Position|
|``specialFromDeckInDef(cardName)``|opens the zone selection and then Special Summons a monster from your Deck to that zone in Defense Position|
|``specialFromDeckInAtkRandomZone(cardNames)``|Special Summons monsters from your Deck to an available zone chosen by DB in Attack Position|
|``specialFromDeckInDefRandomZone(cardNames)``|Special Summons monsters from your Deck to an available zone chosen by DB in Defense Position|
|``specialFromDeckInAtkToZone(cardName~zone)``|Special Summons a monster from your Deck to an available zone from your given list in Attack Position|
|``specialFromDeckInDefToZone(cardName~zone)``|Special Summons a monster from your Deck to an available zone from your given list in Defense Position|
|``specialFromExtraDeckInAtk(cardName)``|Opens the zone selection and then Special Summons a monster from your extra Deck to that zone in Attack Position|
|``specialFromExtraDeckInDef(cardName)``|Opens the zone selection and then Special Summons a monster from your extra Deck to that zone in Defense Position|
|``specialFromExtraDeckInAtkRandomZone(cardNames)``|Special Summons monsters from your extra Deck to an available zone chosen by DB in Attack Position|
|``specialFromExtraDeckInDefRandomZone(cardNames)``|Special Summons monsters from your extra Deck to an available zone chosen by DB in Defense Position|
|``specialFromExtraDeckInAtkToZone(cardName~zone)``|Special Summons a monster from your extra Deck to an available zone from your given list in Attack Position|
|``specialFromExtraDeckInDefToZone(cardName~zone)``|Special Summons a monster from your extra Deck to an available zone from your given list in Defense Position|
|``sendFromExtraDeckToGY(cardNames)``|Sends cards from your extra Deck to your GY|
|``specialSummonToken()``|Special Summons a token|
|``specialSummonTokenToZone(zone)``|Special Summons a token to an available zone from your given list|
|``sendAllControllingMonstersFromFieldToGY(cardPosition~FaceUpDown)``|Sends all monsters with given Position (Attack/Defense/both) and (FaceUp/FaceDown), or all if no Position given, to the GY|
|``sendAllOwnSpellTrapsFromFieldToGY()``|Sends all your Spell and Trap cards from your field to the GY|
|``sendFromFieldToGY(cardNames)``|Sends monsters you control to the GY|
|``banishFromGY(cardNames)``|Banishes monsters from your GY|
|``activateSpellTrapFromDeck(cardNames)``|activates a Spell or Trap card from your Deck|
|``activateSpellTrapFromDeckToZone(cardName~zone)``|activates a Spell or Trap card from your Deck to an available zone from your given list|
|``specialFromGYInAtk(cardName)``|opens the zone selection and then Special Summons a monster from your GY to that zone in Attack Position|
|``specialFromGYInDef(cardName)``|opens the zone selection and then Special Summons a monster from your GY to that zone in Defense Position|
|``specialFromGYInAtkRandomZone(cardNames)``|Special Summons monsters from your GY to an available zone chosen by DB in Attack Position|
|``specialFromGYInDefRandomZone(cardNames)``|Special Summons monsters from your GY to an available zone chosen by DB in Defense Position|
|``specialFromGYInAtkToZone(cardName~zone)``|Special Summons a monster from your GY to an available zone from your given list in Attack Position|
|``specialFromGYInDefToZone(cardName~zone)``|Special Summons a monster from your GY to an available zone from your given list in Defense Position|
|``discard(cardNames)``|Discards monsters from your hand to your GY|
|``addFromGYToHand(cardNames)``|Adds cards from your GY to your hand|
|``fromBanishToTopOfDeck(cardNames)``|Returns banished cards to the top of your Deck|
|``fromGYToTopOfDeck(cardNames)``|Returns cards in your GY to the top of your Deck|
|``fromFieldToTopOfDeck(cardNames)``|Returns cards from your field to the top of your Deck|
|``shuffleDeck()``|Shuffles your Deck|
|``moveZone(cardName~zone)``|MOVES a card on the field to an available zone from your given list|
|``overlayMonsters(cardName~materialName)``|Overlays a monster with 1 or more materials|
|``specialSummonMultipleTokens(count)``|Summons multiple tokens to available zones chosen by DB|
|``returnAllFromHandToTopOfDeck()``|Returns all cards in your hand to the top of your Deck|
|``banishFromHand(cardNames)``|Banishes cards from your hand|
|``banishFromDeck(cardNames)``|Banishes cards from your Deck|
|``flipDownMonsters(cardNames)``|Flips down monsters|
|``flipUpMonsters(cardNames)``|Flips up monsters|
|``changeToAtk(cardNames)``|Changes monsters to Attack Position|
|``changeToDef(cardNames)``|Changes monsters to Defense Position|
|``normalSetToRandomZone(cardName)``|Normal Sets a monster to a random zone|
|``normalSetToZone(cardName~zone)``|Normal Sets a monster to an available zone from your given list|
|``normalSummonToRandomZone(cardName)``|Normal Summons a monster to a random zone|
|``normalSummonToZone(cardName~zone)``|Normal Summons a monsters to an available zone from your given list|
|``addCountersToCards(count~cardNames)``|Adds counters to cards|
|``removeCountersFromCards(count~cardNames)``|Removes counters from cards|

#### Zones
- Monster zones: M1 - M5
- Extra monster zones: EL (left) and ER (right)
- Spell/Trap zones: S1 - S5
- Opponents monster zones: OM1 - OM5

#### Examples
- Sends Hello in chat, waits 2 seconds and then sends Bye
  - ``Hello | Hello | ${waitInMs(2000)} | Bye``
- Send Destiny HERO - Celestial and Destiny HERO - Dasher from your Deck to the graveyard
  - ``Send DPE Garnets | ${sendFromDeckToGY(Destiny HERO - Celestial~Destiny HERO - Dasher)}``
- Special Summon PSY-Frame Driver from your Deck to a random zone in Attack Position
  - ``SS Driver | ${specialFromDeckInAtkRandomZone(PSY-Frame Driver)}``

### <ins> Full Example Macros </ins>
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
