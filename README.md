# Custom Duelingbook
## Installation

- Install [Tampermonkey](https://www.tampermonkey.net/) for your Browser.
- Then open the [Custom DB Script](https://github.com/killburne/custom-duelingbook/raw/master/custom-duelingbook.user.js) and click install.

## Macros
Using the macro function you can do many things.
- Sending a message in chat
- Add cards from deck to hand
- Special summon monsters from deck in ATK/DEF and either open the zone chooser or just summon it a random zone.
- Send a card from deck to GY

### Syntax
- Categories ``-- My Category Name``
- Macros ``Button Name | message to send``
- Multiple actions in one Macro ``Button name | message 1 | message 2 | message 3``
- Variables ``${variableName}``
- Functions ``${functionName(param)}``
- Functions with multiple parameters ``${functionName(param1~param2~param3)}``

### Variables
There are 4 variables available
- ``currentLP`` your current lifepoints
- ``halfOfLP`` half of your current lifepoints
- ``topUsername`` The username of the player at the top
- ``botUsername`` The username of the player at the bottom (usually yourself)

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
- ``sendFromDeckToGY(cardNames)`` sends cards from your deck to your GY.
- ``specialFromDeckInAtk(cardName)`` opens the zone selection and then special summons a monster from your deck to that zone in attack position
- ``specialFromDeckInDef(cardName)`` opens the zone selection and then special summons a monster from your deck to that zone in defense position
- ``specialFromDeckInAtkRandomZone(cardNames)`` special summons monsters from your deck to an available zone chosen by DB in attack position
- ``specialFromDeckInDefRandomZone(cardNames)`` special summons monsters from your deck to an available zone chosen by DB in defense position

#### Examples
- Sends Hello in chat, waits 2 seconds and then sends Bye
  - ``Hello | Hello | ${waitInMs(2000)} | Bye``
- Send Destiny HERO - Celestial and Destiny HERO - Dasher from your deck to the graveyard
  - ``Send DPE Garnets | ${sendFromDeckToGY(Destiny HERO - Celestial~Destiny HERO - Dasher)}``
- Special summon PSY-Frame Driver from your deck to a random zone in attack position
  - ``SS Driver | ${specialFromDeckInAtkRandomZone(PSY-Frame Driver)}``

### Full Example Macros
    -- Chatting
    :)
    Hello | Hello ${topUsername} :)
    TOO LATE | Sorry iz too late
    🤡
    CHET | Stop cheating
    GG | gg ez noob
    -- LP
    LP/2 | /sub ${halfOfLP}
    LP*2 | /add ${currentLP}
    -- SS
    SS Driver | ${specialFromDeckInAtkRandomZone(PSY-Frame Driver)}
    SS Driver Def | ${specialFromDeckInDefRandomZone(PSY-Frame Driver)}
    -- Deck to GY
    Send DPE Garnets | ${sendFromDeckToGY(Destiny HERO - Celestial~Destiny HERO - Dasher)}
    Send Dragoon Garnets | ${sendFromDeckToGY(Dark Magician~Red-Eyes Black Dragon)}
