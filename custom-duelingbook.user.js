// ==UserScript==
// @name         Custom DB
// @description  Adds options to customize DB and make it more streamer friendly
// @version      1.1.0
// @author       Killburne
// @license		 MIT
// @namespace    https://www.yugioh-api.com/
// @homepageURL  https://github.com/killburne/custom-duelingbook/
// @updateURL    https://github.com/killburne/custom-duelingbook/raw/master/custom-duelingbook.user.js
// @downloadURL  https://github.com/killburne/custom-duelingbook/raw/master/custom-duelingbook.user.js
// @match	     *://*.duelingbook.com/*
// @include      https://www.duelingbook.com/*
// @require            https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @connect yugioh-api.com
// @connect raw.githubusercontent.com
// @connect github.com
// @connect *
// ==/UserScript==



(function() {
    'use strict';

    function isOnDb() {
       return document.getElementById('frames') && document.getElementById('already_logged_in') && document.getElementById('duel_room');
    }

    function xmur3(str) {
        for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
                h = h << 13 | h >>> 19;
        return function() {
            h = Math.imul(h ^ h >>> 16, 2246822507);
            h = Math.imul(h ^ h >>> 13, 3266489909);
            return (h ^= h >>> 16) >>> 0;
        }
    }

    GM_config.init({
        id: 'kbCustomDb',
        title: 'Custom DB',
        fields: {
            active: {
                label: 'Active',
                type: 'checkbox',
                default: true
            },
            censorChat: {
                label: 'Censor chat',
                type: 'checkbox',
                default: true
            },
            bannedWordsList: {
                label: 'Banned words list',
                type: 'text',
                size: 300,
                default: 'https://github.com/killburne/custom-duelingbook/raw/master/bad-words.txt'
            },
            thinkEmoteUrl: {
                label: 'Think Emote Url',
                type: 'text',
                size: 300,
                default: 'https://www.yugioh-api.com/thinkmech.png'
            },
            thinkingText: {
                label: 'Think Text',
                type: 'text',
                size: 300,
                default: "It's just like you know it's like kinda hard to explain right but you know like i guess it's like just you know right? thinking."
            },
            okText: {
                label: 'Ok Text',
                type: 'text',
                size: 300,
                default: '🐔👍'
            },
            sleeveUrl: {
                label: 'Sleeve image url',
                type: 'text',
                size: 300,
                default: 'https://www.duelingbook.com/./images/sleeves/1.jpg'
            },
            pfpUrls: {
                label: 'profile image urls (1 per line, if more than one chooses randomly)',
                type: 'textarea',
                cols: 300,
                rows: 10,
                default: 'https://www.duelingbook.com/images/low-res/3276.jpg\n' +
                'https://www.duelingbook.com/images/low-res/77.jpg\n' +
                'https://www.duelingbook.com/images/low-res/226.jpg\n' +
                'https://www.duelingbook.com/images/low-res/293.jpg\n' +
                'https://www.duelingbook.com/images/low-res/303.jpg\n' +
                'https://www.duelingbook.com/images/low-res/5661.jpg\n' +
                'https://www.duelingbook.com/images/low-res/6540.jpg\n' +
                'https://www.duelingbook.com/images/low-res/675.jpg\n' +
                'https://www.duelingbook.com/images/low-res/808.jpg\n' +
                'https://www.duelingbook.com/images/low-res/826.jpg\n' +
                'https://www.duelingbook.com/images/low-res/4929.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1075.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1079.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1393.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1363.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1510.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1874.jpg\n' +
                'https://www.duelingbook.com/images/low-res/7414.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1763.jpg\n' +
                'https://www.duelingbook.com/images/low-res/7175.jpg\n' +
                'https://www.duelingbook.com/images/low-res/1896.jpg\n' +
                'https://www.duelingbook.com/images/low-res/2095.jpg\n' +
                'https://www.duelingbook.com/images/low-res/2127.jpg\n' +
                'https://www.duelingbook.com/images/low-res/5215.jpg\n' +
                'https://www.duelingbook.com/images/low-res/2319.jpg\n' +
                'https://www.duelingbook.com/images/low-res/2368.jpg\n' +
                'https://www.duelingbook.com/images/low-res/2492.jpg'
            },
            ownPfpUrl: {
                label: 'Url for your own profile picture (leave empty to not change your own pfp)',
                type: 'text',
                size: 300,
                default: 'https://www.duelingbook.com/images/low-res/675.jpg'
            },
            backgroundUrl: {
                label: 'Background image url',
                type: 'text',
                size: 300,
                default: 'https://wallpaperaccess.com/full/1429125.jpg'
            },
            hideStartPageMonster: {
                label: 'Hide start page monster',
                type: 'checkbox',
                default: false
            },
            startPageMonsterUrl: {
                label: 'Start page monster image url',
                type: 'text',
                size: 300,
                default: 'https://www.yugioh-api.com/dragonmaid-chamber.png'
            },
            hideBackgroundBox: {
                label: 'Hide background box',
                type: 'checkbox',
                default: true
            },
            okSoundUrl: {
                label: 'Ok sound url',
                type: 'text',
                size: 300,
                default: 'https://www.yugioh-api.com/pollo.mp3'
            },
            okImageUrl: {
                label: 'Ok image url',
                type: 'text',
                size: 300,
                default: 'https://ae01.alicdn.com/kf/Hc4e3b9a69e1e456cb88c9862edb86a92l/Thumbs-Up-Chicken-Arm-Toy-Chicken-Gag-Gift-Wearing-Artificial-Dinosaur-Arms-Pet-Themed-Party-Funny.jpg_220x220xz.jpg'
            },
            hideWatchersList: {
                label: 'Hide watchers list',
                type: 'checkbox',
                default: true
            },
            hideDuelNotes: {
                label: 'Hide duel notes',
                type: 'checkbox',
                default: true
            },
            macroTexts: {
                label: 'Macro texts (Button Text | Text to send)',
                type: 'textarea',
                cols: 300,
                rows: 20,
                default: 
                'Hello | Hello ${topUsername}, good luck have fun.\n' +
                'CHAIN | I\'ll chain to that.\n' +
                'Nibiru :( | The total stats of all monsters on the field that i can see are ${atkAllMonsters} ATK / ${defAllMonsters} DEF | ${sendAllControllingMonstersFromFieldToGY()} | ${specialSummonToken()}\n' +
                '-- LP\n' +
                'LP/2 | /sub ${halfOfLP}\n' +
                '-- SS\n' +
                'SS Driver Zone | ${specialFromDeckInAtk(PSY-Frame Driver)}\n' +
                'SS Driver | ${specialFromDeckInAtkRandomZone(PSY-Frame Driver)} | Thinking on zone\n' +
                'SS Driver Def | ${specialFromDeckInDefRandomZone(PSY-Frame Driver)} | Thinking on zone\n' +
                '-- Deck to GY\n' +
                'Mill 1 | /mill 1\n' +
                'Verte Fusion Destiny | /sub 2000 | ${sendFromDeckToGY(Fusion Destiny)}\n' +
                'Send DPE Garnets | ${sendFromDeckToGY(Destiny HERO - Celestial~Destiny HERO - Dasher)}\n' +
                'Send Dragoon Garnets | ${sendFromDeckToGY(Dark Magician~Red-Eyes Black Dragon)}\n' +
                '-- Search\n' +
                'Add Invo | ${addFromDeckToHand(Invocation)}'
            }
        },
        events: {
            close: function () {
                init();
                applyChanges();
            }
        }
    });

    let bannedWords = [];

    function addSettingsButton() {
        if (!isOnDb()) {
            return
        }
        const id = 'streamerDbSettings';
        if (!document.getElementById(id)) {
            const wrapper = document.createElement('div');
            wrapper.id = id;
            wrapper.title = 'Streamer Friendly DB';
            wrapper.style.position = 'fixed';
            wrapper.style.left = '20px';
            wrapper.style.bottom = '20px';
            wrapper.style.top = 'auto';
            wrapper.style.width = '36px';
            wrapper.style.height = '36px';
            wrapper.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg style="filter: drop-shadow(1px 1px 0px black)" fill="white" enable-background="new 0 0 478.703 478.703" version="1.1" viewBox="0 0 478.7 478.7" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m454.2 189.1-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8 7.1-27.9-3.2-38.1l-29.8-29.8c-5.6-5.6-13-8.7-20.9-8.7-6.2 0-12.1 1.9-17.1 5.5l-27.8 19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5 0-26.8 10.4-29.2 24.7l-5.8 34c-11.2 3.5-22.1 8.1-32.5 13.7l-27.5-19.8c-5-3.6-11-5.5-17.2-5.5-7.9 0-15.4 3.1-20.9 8.7l-29.9 29.8c-10.2 10.2-11.6 26.3-3.2 38.1l20 28.1c-5.5 10.5-9.9 21.4-13.3 32.7l-33.2 5.6c-14.3 2.4-24.7 14.7-24.7 29.2v42.1c0 14.5 10.4 26.8 24.7 29.2l34 5.8c3.5 11.2 8.1 22.1 13.7 32.5l-19.7 27.4c-8.4 11.8-7.1 27.9 3.2 38.1l29.8 29.8c5.6 5.6 13 8.7 20.9 8.7 6.2 0 12.1-1.9 17.1-5.5l28.1-20c10.1 5.3 20.7 9.6 31.6 13l5.6 33.6c2.4 14.3 14.7 24.7 29.2 24.7h42.2c14.5 0 26.8-10.4 29.2-24.7l5.7-33.6c11.3-3.5 22.2-8 32.6-13.5l27.7 19.8c5 3.6 11 5.5 17.2 5.5 7.9 0 15.3-3.1 20.9-8.7l29.8-29.8c10.2-10.2 11.6-26.3 3.2-38.1l-19.8-27.8c5.5-10.5 10.1-21.4 13.5-32.6l33.6-5.6c14.3-2.4 24.7-14.7 24.7-29.2v-42.1c0.2-14.5-10.2-26.8-24.5-29.2zm-2.3 71.3c0 1.3-0.9 2.4-2.2 2.6l-42 7c-5.3 0.9-9.5 4.8-10.8 9.9-3.8 14.7-9.6 28.8-17.4 41.9-2.7 4.6-2.5 10.3 0.6 14.7l24.7 34.8c0.7 1 0.6 2.5-0.3 3.4l-29.8 29.8c-0.7 0.7-1.4 0.8-1.9 0.8-0.6 0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6-13.1 7.8-27.2 13.6-41.9 17.4-5.2 1.3-9.1 5.6-9.9 10.8l-7.1 42c-0.2 1.3-1.3 2.2-2.6 2.2h-42.1c-1.3 0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8-14.3-3.7-28.1-9.4-41-16.8-2.1-1.2-4.5-1.8-6.8-1.8-2.7 0-5.5 0.8-7.8 2.5l-35 24.9c-0.5 0.3-1 0.5-1.5 0.5-0.4 0-1.2-0.1-1.9-0.8l-29.8-29.8c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4 3.3-10.2 0.6-14.8-7.8-13-13.8-27.1-17.6-41.8-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3 0.9-2.4 2.2-2.6l41.7-7c5.3-0.9 9.6-4.8 10.9-10 3.7-14.7 9.4-28.9 17.1-42 2.7-4.6 2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5 0.3-3.4l29.8-29.8c0.7-0.7 1.4-0.8 1.9-0.8 0.6 0 1.1 0.2 1.5 0.5l34.5 24.6c4.4 3.1 10.2 3.3 14.8 0.6 13-7.8 27.1-13.8 41.8-17.6 5.1-1.4 9-5.6 9.9-10.8l7.2-42.3c0.2-1.3 1.3-2.2 2.6-2.2h42.1c1.3 0 2.4 0.9 2.6 2.2l7 41.7c0.9 5.3 4.8 9.6 10 10.9 15.1 3.8 29.5 9.7 42.9 17.6 4.6 2.7 10.3 2.5 14.7-0.6l34.5-24.8c0.5-0.3 1-0.5 1.5-0.5 0.4 0 1.2 0.1 1.9 0.8l29.8 29.8c0.9 0.9 1 2.3 0.3 3.4l-24.7 34.7c-3.1 4.3-3.3 10.1-0.6 14.7 7.8 13.1 13.6 27.2 17.4 41.9 1.3 5.2 5.6 9.1 10.8 9.9l42 7.1c1.3 0.2 2.2 1.3 2.2 2.6v42.1h-0.1z"/><path d="m239.4 136c-57 0-103.3 46.3-103.3 103.3s46.3 103.3 103.3 103.3 103.3-46.3 103.3-103.3-46.3-103.3-103.3-103.3zm0 179.6c-42.1 0-76.3-34.2-76.3-76.3s34.2-76.3 76.3-76.3 76.3 34.2 76.3 76.3-34.2 76.3-76.3 76.3z"/></svg>';
            document.body.appendChild(wrapper);
            wrapper.onclick = function() {
                if (GM_config.isOpen) {
                    GM_config.close();
                } else {
                    GM_config.open();
                }
            };
        }
    }

    function addMacroButtons() {
        if (!isOnDb()) {
            return
        }
        const id = 'macroButtons';
        const wrapperEl = document.getElementById(id);
        if (wrapperEl) {
            wrapperEl.remove();
        }

        const macroTexts = GM_config.get('macroTexts');
        if (!macroTexts) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.id = id;
        wrapper.style['z-index'] = 999999999;
        wrapper.style.position = 'fixed';
        wrapper.style.right = '20px';
        wrapper.style.bottom = '20px';
        wrapper.style.top = 'auto';
        wrapper.style.left = 'auto';
        wrapper.style.width = '120px';
        wrapper.style['font-size'] = '20px';
        let html = '<h2 id="macroHeadline" style="background-color: black; color: white;cursor: pointer;">Macros</h2><div id="macrosWrapper" style="position: initial; display: none;">';
        const macros = macroTexts.split('\n');
        let isInCategory = false;
        for (const macro of macros) {
            if (!macro.trim()) {
                continue;
            }
            if (macro.indexOf('--') === 0) {
                if (isInCategory) {
                    html += '</div></div>';
                }
                isInCategory = true;
                html += '<div class="macroCategory" style="position: initial;"><h3 class="macroCategoryHeadline" style="background-color: black; color: white;cursor: pointer;">' + macro.substr(2).trim() + '</h3><div class="macroCategoryEntries" style="position: initial; display: none;">';
                continue;
            }
            const parts = macro.split('|');
            let buttonText = '';
            let macroText = '';
            if (parts.length > 1) {
                buttonText = parts.shift();
                macroText = parts.join('|');
            } else if (parts.length === 1) {
                macroText = buttonText = parts[0].trim();
            }
            html += '<button class="macro-button" style="width: 100%; margin-bottom:8px;font-size:16px;" data-text="' + btoa(encodeURIComponent(macroText)) + '">' + buttonText + '</button>';
        }
        html += '</div>';
        wrapper.innerHTML = html;

        wrapper.onclick = function (e) {
            if (e.target.id === 'macroHeadline') {
                const macros = document.getElementById('macrosWrapper');
                if (macros) {
                     macros.style.display = macros.style.display === 'none' ? 'block' : 'none';
                }
            } else if (e.target.className === 'macro-button') {
                const text = e.target.dataset.text;
                if (!text) {
                    return;
                }
                const decoded = decodeURIComponent(atob(text));
                const texts = decoded.split('|');
                sendDuelChatMessages(texts);
            } else if (e.target.className === 'macroCategoryHeadline') {
                const macroEntries = e.target.parentElement.querySelector('.macroCategoryEntries');
                if (macroEntries) {
                    macroEntries.style.display = macroEntries.style.display === 'none' ? 'block' : 'none';
                }
            }
        };

        document.body.appendChild(wrapper);
    }

    function getCurrentPlayer() {
        let win = (window.unsafeWindow || window);
        let player;
        if (win.user_username == win.player1.username) {
            player = win.player1;
        }
        else if (win.user_username == win.player2.username) {
            player = win.player2;
        }
        else if (win.tag_duel && win.user_username == win.player3.username) {
            player = win.player3;
        }
        else if (win.tag_duel && win.user_username == win.player4.username) {
            player = win.player4;
        }
        return player;
    }

    function waitMs(ms) {
        return new Promise((accept) => {
            setTimeout(() => accept(), parseInt(ms) || 100);
        });
    }

    async function sendDuelChatMessages(messages) {
        const message = messages.shift();
        const cmd = getCommandFromStr(message);
        let timeToWait = 250;
        if (cmd) {
            switch (cmd.command) {
                case 'addFromDeckToHand':
                    if (cmd.param) {
                        await addCardFromDeckToHand(cmd.param);
                    }
                    break;
                case 'waitInMs':
                    if (cmd.param) {
                        timeToWait = parseInt(cmd.param) || 100;
                    }
                    break;
                case 'specialFromDeckInAtk':
                    if (cmd.param) {
                        await specialSummonFromDeck(cmd.param, 'SS ATK');
                    }
                    return;
                case 'specialFromDeckInDef':
                    if (cmd.param) {
                        await specialSummonFromDeck(cmd.param, 'SS DEF');
                    }
                    return;
                case 'specialFromDeckInAtkRandomZone':
                    if (cmd.param) {
                        await specialSummonFromDeckRandomZone(cmd.param, 'SS ATK');
                    }
                    break;
                case 'specialFromDeckInDefRandomZone':
                    if (cmd.param) {
                        await specialSummonFromDeckRandomZone(cmd.param, 'SS DEF');
                    }
                    break;
                case 'specialFromDeckInAtkToZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await specialSummonFromDeckToZone(params.shift(), 'SS ATK', params);
                        }
                    }
                    break;
                case 'specialFromDeckInDefToZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await specialSummonFromDeckToZone(params.shift(), 'SS DEF', params);
                        }
                    }
                    break;
                case 'sendFromDeckToGY':
                    if (cmd.param) {
                        await sendFromDeckToGY(cmd.param);
                    }
                    break;
                case 'specialFromExtraDeckInAtk':
                    if (cmd.param) {
                        await specialSummonFromExtraDeck(cmd.param, 'SS ATK');
                    }
                    return;
                case 'specialFromExtraDeckInDef':
                    if (cmd.param) {
                        await specialSummonFromExtraDeck(cmd.param, 'SS DEF');
                    }
                    return;
                case 'specialFromExtraDeckInAtkRandomZone':
                    if (cmd.param) {
                        await specialSummonFromExtraDeckRandomZone(cmd.param, 'SS ATK');
                    }
                    break;
                case 'specialFromExtraDeckInDefRandomZone':
                    if (cmd.param) {
                        await specialSummonFromExtraDeckRandomZone(cmd.param, 'SS DEF');
                    }
                    break;
                case 'specialFromExtraDeckInAtkToZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await specialSummonFromExtraDeckToZone(params.shift(), 'SS ATK', params);
                        }
                    }
                    break;
                case 'specialFromExtraDeckInDefToZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await specialSummonFromExtraDeckToZone(params.shift(), 'SS DEF', params);
                        }
                    }
                    break;
                case 'sendFromExtraDeckToGY':
                    if (cmd.param) {
                        await sendFromExtraDeckToGY(cmd.param);
                    }
                    break;
                case 'specialSummonToken':
                    await specialSummonToken();
                    break;
                case 'sendAllControllingMonstersFromFieldToGY':
                    await sendOwnMonstersFromFieldToGY(cmd.param);
                    break;
                case 'sendAllOwnSpellTrapsFromFieldToGY':
                    await sendOwnSpellTrapsFromFieldToGY();
                    break;
                case 'sendFromFieldToGY':
                    if (cmd.param) {
                        await sendFromFieldToGY(cmd.param);
                    }
                    break;
                case 'banishFromGY':
                    if (cmd.param) {
                        await banishFromGY(cmd.param);
                    }
                    break;
                case 'activateSpellTrapFromDeck':
                    if (cmd.param) {
                        await activateSpellTrapFromDeck(cmd.param);
                    }
                    break;
                case 'specialFromGYInAtk':
                    if (cmd.param) {
                        await specialFromGY(cmd.param, 'SS ATK');
                    }
                    return;
                case 'specialFromGYInDef':
                    if (cmd.param) {
                        await specialFromGY(cmd.param, 'SS DEF');
                    }
                    return;
                case 'specialFromGYInAtkRandomZone':
                    if (cmd.param) {
                        await specialFromGYRandomZone(cmd.param, 'SS ATK');
                    }
                    break;
                case 'specialFromGYInDefRandomZone':
                    if (cmd.param) {
                        await specialFromGYRandomZone(cmd.param, 'SS DEF');
                    }
                    break;
                case 'specialFromGYInAtkToZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await specialFromGYToZone(params.shift(), 'SS ATK', params);
                        }
                    }
                    break
                case 'specialFromGYInDefToZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await specialFromGYToZone(params.shift(), 'SS DEF', params);
                        }
                    }
                    break
                case 'discard':
                    if (cmd.param) {
                        await sendFromHandToGY(cmd.param);
                    }
                    break;
                case 'addFromGYToHand':
                    if (cmd.param) {
                        await addToHandFromGY(cmd.param);
                    }
                    break;
                case 'fromBanishToTopOfDeck':
                    if (cmd.param) {
                        await fromBanishToTopOfDeck(cmd.param);
                    }
                    break;
                case 'fromGYToTopOfDeck':
                    if (cmd.param) {
                        await fromGYToTopOfDeck(cmd.param);
                    }
                    break;
                case 'fromFieldToTopOfDeck':
                    if (cmd.param) {
                        await fromFieldToTopOfDeck(cmd.param);
                    }
                    break;
                case 'shuffleDeck':
                    await shuffleDeck();
                    break;
                case 'moveZone':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await moveZone(params.shift(), params);
                        }
                    }
                    break;
                case 'overlayMonsters':
                    if (cmd.param) {
                        const params = cmd.param.split('~');
                        if (params.length >= 2) {
                            await overlayMonsters(params.shift(), params);
                        }
                    }
                    break;
            }
        } else {
            (window.unsafeWindow || window).Send({action:'Duel', play:'Duel message', message:replaceVariablesInStr(message.trim()), html:0});
        }
        if (messages.length > 0) {
            await waitMs(timeToWait);
            sendDuelChatMessages(messages);
        }
    }

    async function banishFromGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0) {
            return;
        }
        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = player.grave_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'Banish', card:card.data('id')});
            }
        }
    }

    async function shuffleDeck() {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }
        (window.unsafeWindow || window).Send({action:'Duel', play:'Shuffle deck', card:player.extra_arr[0].data('id')});
    }

    async function addToHandFromGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0) {
            return;
        }

        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = player.grave_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'To hand', card:card.data("id")});
            }
        }
    }

    async function moveZone(name, zones) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());

        const card = cardsOnField.find((c) => c.data('cardfront').data('name') === name.trim());
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                (window.unsafeWindow || window).Send({action:'Duel', play:'Move', card:card.data('id'), zone:zone});
                break;
            }
        }
    }

    async function overlayMonsters(name, materials) {
        const cardsOnField = getOwnControlledMonsters();

        const card = cardsOnField.find((c) => c.data('cardfront').data('name') === name.trim());
        if (card) {
            for (const material of materials) {
                const cardMaterial = cardsOnField.find((c) => c.data('cardfront').data('name') === material.trim());
                if (cardMaterial && cardMaterial.data('id') !== card.data('id')) {
                    (window.unsafeWindow || window).Send({action:'Duel', play:'Overlay', start_card:card.data('id'), end_card: cardMaterial.data('id')});
                }
            }
        }
    }

    async function fromFieldToTopOfDeck(name) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());

        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = cardsOnField.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'To T Deck', card:card.data("id")});
            }
        }
    }

    async function fromGYToTopOfDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0) {
            return;
        }

        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = player.grave_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'To T Deck', card:card.data("id")});
            }
        }
    }

    async function fromBanishToTopOfDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.banished_arr.length === 0) {
            return;
        }

        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = player.banished_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'To T Deck', card:card.data("id")});
            }
        }
    }

    async function specialFromGY(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        const card = player.grave_arr.find((c) => c.data('cardfront').data('name') === name);
        if (card) {
            (window.unsafeWindow || window).menu_card = card;
            (window.unsafeWindow || window).cardMenuClicked(card, position);
            /*(window.unsafeWindow || window).summoning_card = card;
				(window.unsafeWindow || window).summoning_play = position;
				(window.unsafeWindow || window).startChooseMonsterZones();*/
        }
    }

    async function specialFromGYToZone(name, position, zones) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        const card = player.grave_arr.find((c) => c.data('cardfront').data('name') === name.trim());
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                (window.unsafeWindow || window).Send({action:'Duel', play:position, card:card.data('id'), zone:zone});
                break;
            }
        }
    }

    async function specialFromGYRandomZone(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = player.grave_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:position, card:card.data('id')});
            }
        }
    }

    function getOwnControlledMonsters() {
        const player = getCurrentPlayer();
        const zones = [player.m1, player.m2, player.m3, player.m4, player.m5, (window.unsafeWindow || window).linkLeft, (window.unsafeWindow || window).linkRight];
        return zones.filter((card) => card && card.data('controller').username === player.username);
    }

    function getOpponentsControlledMonsters() {
        const player = getCurrentPlayer();
        const opponent = player.opponent;
        const zones = [opponent.m1, opponent.m2, opponent.m3, opponent.m4, opponent.m5, (window.unsafeWindow || window).linkLeft, (window.unsafeWindow || window).linkRight];
        return zones.filter((card) => card && card.data('controller').username === opponent.username);
    }

    function getOwnSpellsAndTrapsOnField() {
        const player = getCurrentPlayer();
        return [player.s1, player.s2, player.s3, player.s4, player.s5].filter((card) => !!card);
    }

    async function sendFromHandToGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }

        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = player.hand_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'To GY', card:card.data('id')});
            }
        }
    }

    async function sendOwnMonstersFromFieldToGY(position) {
        const monstersOnField = getOwnControlledMonsters();
        let checkPosition = false;
        if (position) {
            if (position.toLowerCase() === 'atk') {
                checkPosition = 'inATK';
            } else if (position.toLowerCase() === 'def') {
                checkPosition = 'inDEF';
            }
        }

        for (const card of monstersOnField) {
            if (checkPosition && !card.data(checkPosition)) {
                continue;
            }
            (window.unsafeWindow || window).Send({action:'Duel', play:'To GY', card:card.data('id')});
        }
    }

    async function sendOwnSpellTrapsFromFieldToGY() {
        const spellTraps = getOwnSpellsAndTrapsOnField();

        for (const card of spellTraps) {
            (window.unsafeWindow || window).Send({action:'Duel', play:'To GY', card:card.data('id')});
        }
    }

    async function sendFromFieldToGY(name) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());
        const cardNames = name.split('~');
        for (const cardName of cardNames) {
            const card = cardsOnField.find((c) => c.data('cardfront').data('name') === cardName.trim());
            if (card) {
                (window.unsafeWindow || window).Send({action:'Duel', play:'To GY', card:card.data('id')});
            }
        }
    }

    function calculateAtkAllMonstersOnField() {
        const allMonsters = getOwnControlledMonsters().concat(getOpponentsControlledMonsters());
        let atk = 0;
        for (const card of allMonsters) {
            atk += parseInt(card.data('cardfront').data('atk')) || 0;
        }
        return atk;
    }

    function calculateDefAllMonstersOnField() {
        const allMonsters = getOwnControlledMonsters().concat(getOpponentsControlledMonsters());
        let def = 0;
        for (const card of allMonsters) {
            def += parseInt(card.data('cardfront').data('def')) || 0;
        }
        return def;
    }

    async function specialSummonToken() {
        (window.unsafeWindow || window).tokenE();
    }

    function doStuffInDeck(cb, exit) {
        return new Promise((accept) => {
            exit = typeof exit === 'undefined' ? true : exit;
            const player = getCurrentPlayer();
            if (!player || player.main_arr.length === 0) {
                accept();
                return;
            }

            (window.unsafeWindow || window).viewing = 'Deck';
            (window.unsafeWindow || window).Send({action:'Duel', play:'View deck', card:player.main_arr[0].data('id')});
            setTimeout(() => {
                cb();
                if (exit) {
                    (window.unsafeWindow || window).exitViewing();
                }
                accept();
            }, 500);
        });
    }

    function doStuffInExtraDeck(cb, exit) {
        return new Promise((accept) => {
            exit = typeof exit === 'undefined' ? true : exit;
            const player = getCurrentPlayer();
            if (!player || player.extra_arr.length === 0) {
                accept();
                return;
            }

            (window.unsafeWindow || window).viewing = 'Extra Deck';
            (window.unsafeWindow || window).Send({action:'Duel', play:'View ED', card:player.extra_arr[0].data('id')});
            setTimeout(function() {
                cb();
                if (exit) {
                    (window.unsafeWindow || window).exitViewing();
                }
                accept();
            }, 500);
        });
    }

    async function sendFromExtraDeckToGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0) {
            return;
        }

        await doStuffInExtraDeck(() => {
            const cardNames = name.split('~');
            for (const cardName of cardNames) {
                const card = player.extra_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
                if (card) {
                    (window.unsafeWindow || window).Send({action:'Duel', play:'To GY', 'card':card.data('id')});
                }
            }
        });
    }

    async function specialSummonFromExtraDeckRandomZone(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInExtraDeck(() => {
            const cardNames = name.split('~');
            for (const cardName of cardNames) {
                const card = player.extra_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
                if (card) {
                    (window.unsafeWindow || window).Send({action:'Duel', play:position, card:card.data('id')});
                }
            }
        });
    }

    function normalizeZones(zones) {
        return zones.map((zone) => {
            zone = zone.toLowerCase();
            let matches = zone.match(/m([1-5]{1})/);
            if (matches) {
                return 'M-' + matches[1];
            }
            matches = zone.match(/s([1-5]{1})/);
            if (matches) {
                return 'S-' + matches[1];
            }
            if (zone === 'el') {
                return 'Left Extra Monster Zone';
            }
            if (zone === 'er') {
                return 'Right Extra Monster Zone';
            }
        }).filter((zone) => !!zone);
    }

    function isZoneEmpty(zone) {
        const player = getCurrentPlayer();
        if (!player) {
            return false;
        }
        switch (zone) {
            case 'M-1':
                return !player.m1;
            case 'M-2':
                return !player.m2;
            case 'M-3':
                return !player.m3;
            case 'M-4':
                return !player.m4;
            case 'M-5':
                return !player.m5;
            case 'S-1':
                return !player.s1;
            case 'S-2':
                return !player.s2;
            case 'S-3':
                return !player.s3;
            case 'S-4':
                return !player.s4;
            case 'S-5':
                return !player.s5;
            case 'Left Extra Monster Zone':
                return !(window.unsafeWindow || window).linkLeft;
            case 'Right Extra Monster Zone':
                return !(window.unsafeWindow || window).linkRight;
        }
        return false;
    }

     async function specialSummonFromExtraDeckToZone(name, position, zones) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInExtraDeck(() => {
            const card = player.extra_arr.find((c) => c.data('cardfront').data('name') === name.trim());
            if (card) {
                for (const zone of normalizeZones(zones)) {
                    if (!isZoneEmpty(zone)) {
                        continue;
                    }
                    (window.unsafeWindow || window).Send({action:'Duel', play:position, card:card.data('id'), zone:zone});
                    break;
                }
            }
        });
    }

    async function specialSummonFromExtraDeck(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInExtraDeck(() => {
            const card = player.extra_arr.find((c) => c.data('cardfront').data('name') === name);
            if (card) {
                (window.unsafeWindow || window).menu_card = card;
                (window.unsafeWindow || window).cardMenuClicked(card, position);
                /*(window.unsafeWindow || window).summoning_card = card;
				(window.unsafeWindow || window).summoning_play = position;
				(window.unsafeWindow || window).startChooseMonsterZones();*/
            }
        }, false);
    }

    async function sendFromDeckToGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        await doStuffInDeck(() => {
            const cardNames = name.split('~');
            for (const cardName of cardNames) {
                const card = player.main_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
                if (card) {
                    (window.unsafeWindow || window).Send({action:'Duel', play:'To GY', card:card.data('id')});
                }
            }
        });
    }

    async function specialSummonFromDeckToZone(name, position, zones) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInDeck(() => {
            const card = player.main_arr.find((c) => c.data('cardfront').data('name') === name.trim());
            if (card) {
                for (const zone of normalizeZones(zones)) {
                    if (!isZoneEmpty(zone)) {
                        continue;
                    }
                    (window.unsafeWindow || window).Send({action:'Duel', play:position, card:card.data('id'), zone:zone});
                    break;
                }
            }
        });
    }

    async function specialSummonFromDeckRandomZone(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInDeck(() => {
            const cardNames = name.split('~');
            for (const cardName of cardNames) {
                const card = player.main_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
                if (card) {
                    (window.unsafeWindow || window).Send({action:'Duel', play:position, card:card.data('id')});
                }
            }
        });
    }

    async function specialSummonFromDeck(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInDeck(() => {
            const card = player.main_arr.find((c) => c.data('cardfront').data('name') === name);
            if (card) {
                (window.unsafeWindow || window).menu_card = card;
                (window.unsafeWindow || window).cardMenuClicked(card, position);
                /*(window.unsafeWindow || window).summoning_card = card;
				(window.unsafeWindow || window).summoning_play = position;
				(window.unsafeWindow || window).startChooseMonsterZones();*/
            }
        }, false);
    }

    async function addCardFromDeckToHand(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        await doStuffInDeck(() => {
            const cardNames = name.split('~');
            for (const cardName of cardNames) {
                const card = player.main_arr.find((c) => c.data('cardfront').data('name') === cardName.trim());
                if (card) {
                    (window.unsafeWindow || window).Send({action:'Duel', play:'To hand', card:card.data("id")});
                }
            }
        });
    }

    async function activateSpellTrapFromDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        const cardTypes = ['Spell', 'Trap'];
        await doStuffInDeck(() => {
            const cardNames = name.split('~');
            for (const cardName of cardNames) {
                const card = player.main_arr.find((c) => cardTypes.indexOf(c.data('cardfront').data('card_type')) !== -1 && c.data('cardfront').data('name') === cardName.trim());
                if (card) {
                    (window.unsafeWindow || window).menu_card = card;
                    (window.unsafeWindow || window).cardMenuClicked(card, 'To ST');
                }
            }
        }, false);
    }

    function getCommandFromStr(str) {
        const match = str.match(/\$\{([^(]+)\((.*)\)\}/);
        if (!match) {
            return;
        }
        return {
            command: match[1],
            param: match[2]
        };
    }

    function replaceVariablesInStr(str) {
        return str.replace(/\$\{([^}]+)\}/g, function(whole, varName) {
            switch (varName) {
                case 'topUsername':
                    return document.querySelector('#avatar2 .username_txt').textContent;
                case 'botUsername':
                    return document.querySelector('#avatar1 .username_txt').textContent;
                case 'halfOfLP': {
                    const player = getCurrentPlayer();
                    let lp = 0;
                    if (player) {
                        lp = Math.floor(player.lifepoints/2);
                    }
                    return lp;
                }
                case 'currentLP': {
                    const player = getCurrentPlayer();
                    let lp = 0;
                    if (player) {
                        lp = player.lifepoints;
                    }
                    return lp;
                }
                case 'atkAllMonsters':
                    return calculateAtkAllMonstersOnField();
                case 'defAllMonsters':
                    return calculateDefAllMonstersOnField();
            }
            return '';
        });
    }

    function makeAllSleevesDefault() {
        const sleeveUrl = GM_config.get('sleeveUrl');
        if (!sleeveUrl) {
            return;
        }
        for (const back of document.querySelectorAll('.cardback img, img.cardback')) {
            if (back.getAttribute('src') !== sleeveUrl) {
                back.setAttribute('src', sleeveUrl);
            }
        }
    }
    function replaceThinkEmote() {
        const thinkEmoteUrl = GM_config.get('thinkEmoteUrl');
        if (!thinkEmoteUrl) {
            return;
        }
        for (const thinkImg of document.querySelectorAll('.think')) {
            if (thinkImg.getAttribute('src') !== thinkEmoteUrl) {
                thinkImg.setAttribute('src', thinkEmoteUrl);
            }
        }
        const thinkButtonImg = document.querySelector('#think_btn img');
        if (thinkButtonImg && thinkButtonImg.getAttribute('src') !== thinkEmoteUrl) {
            thinkButtonImg.setAttribute('src', thinkEmoteUrl);
        }
    }
    function hideProfilePictures() {
        const pfpUrls = GM_config.get('pfpUrls').split('\n').map(p => p.trim()).filter(p => !!p);
        //var bottomPfpUrls = GM_config.get('bottomPfpUrl').split('\n').map(p => p.trim()).filter(p => !!p);

        if (pfpUrls.length > 0) {
            const topUsername = document.querySelector('#avatar2 .username_txt').textContent;
            const bottomUsername = document.querySelector('#avatar1 .username_txt').textContent;

            const topRandom = xmur3(topUsername);
            const pfpUrl = pfpUrls[topRandom() % pfpUrls.length];
            for (const pfpTop of document.querySelectorAll('#avatar2 .image')) {
                if (pfpUrls.indexOf(pfpTop.getAttribute('src')) === -1) {
                    pfpTop.setAttribute('src', pfpUrl);
                }
            }

            const ownPfpUrl = GM_config.get('ownPfpUrl');

            if (bottomUsername != (window.unsafeWindow || window).user_username) {
                const botRandom = xmur3(bottomUsername);
                const bottomPfpUrl = pfpUrls[topRandom() % pfpUrls.length];
                for (const pfpBot of document.querySelectorAll('#avatar1 .image')) {
                    if (pfpUrls.indexOf(pfpBot.getAttribute('src')) === -1) {
                        pfpBot.setAttribute('src', bottomPfpUrl);
                    }
                }
            } else if (ownPfpUrl) {
                for (const pfpBot2 of document.querySelectorAll('#avatar1 .image')) {
                    if (ownPfpUrl !== pfpBot2.getAttribute('src')) {
                        pfpBot2.setAttribute('src', ownPfpUrl);
                    }
                }
            }
        }
        /*if (bottomPfpUrls.length > 0) {
            var bottomPfpUrl = bottomPfpUrls[botRandom() % pfpUrls.length];
            for (var pfpBot of document.querySelectorAll('#avatar1 .image')) {
                if (bottomPfpUrls.indexOf(pfpBot.getAttribute('src')) === -1) {
                    pfpBot.setAttribute('src', bottomPfpUrl);
                }
            }
        }*/
    }
    function setBackgroundImage() {
        const backgroundUrl = GM_config.get('backgroundUrl');
        if (!backgroundUrl) {
            return;
        }
        const circuit = document.getElementById('circuit_board');
        if (circuit) {
            circuit.remove();
        }
        const greenLines = document.getElementById('greenlines');
        if (greenLines) {
            greenLines.remove();
        }
        const bg = 'url("' + backgroundUrl + '")';
        if (document.body.style.background !== bg) {
            document.body.style.background = bg;
            document.body.style['background-size'] = 'cover';
        }
    }
    function setOkSound() {
        const okSoundUrl = GM_config.get('okSoundUrl');
        if (!okSoundUrl) {
            return;
        }
        (window.unsafeWindow || window).Ok = okSoundUrl;
    }
    function setOkImage() {
        const okImageUrl = GM_config.get('okImageUrl');
        if (!okImageUrl) {
            return;
        }
        for (const okImage of document.querySelectorAll('.duel_avatar .all_good')) {
            if (okImage.getAttribute('src') !== okImageUrl) {
                okImage.setAttribute('src', okImageUrl);
            }
        }
    }
    function setStartPageMonster() {
        const el = document.getElementById('brionac_large');
        if (!el) {
            return;
        }
        if (GM_config.get('hideStartPageMonster')) {
            el.setAttribute('hidden', '');
            return;
        } else {
            el.removeAttribute('hidden');
        }
        const startPageMonsterUrl = GM_config.get('startPageMonsterUrl');
        if (!startPageMonsterUrl) {
            return;
        }
        if (el.getAttribute('src') !== startPageMonsterUrl) {
            el.setAttribute('src', startPageMonsterUrl);
        }
    }
    function hideBackgroundBox() {
        const hideBackgroundBox = GM_config.get('hideBackgroundBox');
        const el = document.getElementById('circuit_cover');
        if (el) {
            el.style.display = hideBackgroundBox ? 'none' : 'block';
        }
    }
    function removeWatchersList() {
        const hideWatchersList = GM_config.get('hideWatchersList');
        if (!hideWatchersList) {
            return;
        }
        /*var el = document.getElementById('watchers');
            if (el) {
                el.remove();
            }*/
        for (const watcher of document.querySelectorAll('#watchers .users .os-list .cell')) {
            if (!watcher.classList.contains('isAdmin') && !watcher.classList.contains('adjudicator')) {
                watcher.textContent = '*'.repeat(watcher.textContent.length);
            }
        }
    }
    function removeDuelNotes() {
        const hideDuelNotes = GM_config.get('hideDuelNotes');
        if (!hideDuelNotes) {
            return;
        }
        for (const duelNote of document.querySelectorAll('.duelbutton .note_txt')) {
            duelNote.textContent = '';
        }
    }
    function getTextNodesInElementRecursive(el) {
        const ret = [];
        if (el.hasChildNodes()) {
            for (const node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    ret.push(node);
                } else {
                    ret = ret.concat(getTextNodesInElementRecursive(node));
                }
            }
        }
        return ret;
    }
    function censorChat() {
        if (!GM_config.get('active') || !GM_config.get('censorChat')) {
            return;
        }
        for (const msg of document.querySelectorAll('#duel .cout_txt .os-content > font')) {
            const els = getTextNodesInElementRecursive(msg);
            for (const el of els) {
                el.data = el.data.split(/\b/).map((word) => bannedWords.includes(word.toLowerCase()) ? '*'.repeat(word.length) : word).join('');
            }
        }
    }
    function applyChanges() {
        if (!GM_config.get('active') || !isOnDb()) {
            return;
        }
        makeAllSleevesDefault();
        hideProfilePictures();
        setBackgroundImage();
        setOkSound();
        setOkImage();
        setStartPageMonster();
        removeWatchersList();
        removeDuelNotes();
        hideBackgroundBox();
        replaceThinkEmote();
    }
    function sendThinkingText() {
        const thinkingText = GM_config.get('thinkingText');
        if (!thinkingText || !((window.unsafeWindow || window).Send)) {
            return;
        }
        sendDuelChatMessages([thinkingText]);
        (window.unsafeWindow || window).Send({"action":"Duel", "play":"Thinking"});
    }
    function sendOkText() {
        const okText = GM_config.get('okText');
        if (!okText || !((window.unsafeWindow || window).Send)) {
            return;
        }
        sendDuelChatMessages([okText]);
    }
    let initDone = false;
    function init() {
        if (!GM_config.get('active') || !isOnDb()) {
            return;
        }
        addMacroButtons();
        if (initDone) {
            return;
        }
        initDone = true;

        restoreDuelVSP = function() {
            $('#duel .cout_txt').scrollTop($('#duel .cout_txt').scrollMax());
        }

        const config = {attributes: true, childList: true, characterData: true, subtree: true};
        const target = document.querySelector('body');
        let applying = false;
        const observer = new MutationObserver((mutations) => {
            if (applying) {
                return;
            }
            applying = true;
            observer.disconnect();
            applyChanges();
            setTimeout(() => {
                applying = false;
                observer.observe(target, config);
            }, 300);
        });
        if (target) {
            observer.observe(target, config);
        }

        const chatObserverConfig = {childList: true, subtree: true};
        const chatTarget = document.querySelector('#duel .cout_txt');
        let chatApplying = false;
        const chatObserver = new MutationObserver((mutations) => {
            if (chatApplying) {
                return;
            }
            chatApplying = true;
            chatObserver.disconnect();
            censorChat();
            chatApplying = false;
            chatObserver.observe(chatTarget, chatObserverConfig);
        });
        if (chatTarget) {
            chatObserver.observe(chatTarget, chatObserverConfig);
        }
        document.addEventListener('click', (e) => {
            if (e.target.id === 'think_btn') {
                sendThinkingText();
            } else if (e.target.id === 'good_btn') {
                sendOkText();
            }
        }, false);
    }

    addSettingsButton();
    init();

    const bannedWordsList = GM_config.get('bannedWordsList');
    if (bannedWordsList) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: GM_config.get('bannedWordsList'),
            onload: (response) => {
                bannedWords = response.responseText.split('\n').filter((w) => !!w.trim());
                init();
            }
        });
    }
})();
