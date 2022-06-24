// ==UserScript==
// @name         Custom DB
// @description  Adds options to customize DB and make it more streamer friendly
// @version      1.1.28
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
// @grant              GM_openInTab
// @connect yugioh-api.com
// @connect yugioh.app
// @connect raw.githubusercontent.com
// @connect github.com
// @connect *
// ==/UserScript==


(function() {
    'use strict';

    function isOnDb() {
       return document.getElementById('frames') && document.getElementById('duel') && document.getElementById('start');
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
            censorPrivateChat: {
                label: 'Censor private chat (on hover you can see what was said)',
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
                default: 'https://custom-db.yugioh.app/assets/thinkmech.png'
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
                default: 'https://custom-db.yugioh.app/assets/blue-eyes-background.jpg'
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
                default: 'https://custom-db.yugioh.app/assets/dragonmaid-chamber.png'
            },
            hideBackgroundBox: {
                label: 'Hide background box',
                type: 'checkbox',
                default: true
            },
            hideMenuChat: {
                label: 'Hide main menu feed',
                type: 'checkbox',
                default: false
            },
            mainPageMonsterUrl: {
                label: 'Main menu image url',
                type: 'text',
                size: 300,
                default: 'https://i.imgur.com/LWTLx2B.png'
            },
            okSoundUrl: {
                label: 'Ok sound url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/pollo.mp3'
            },
            okImageUrl: {
                label: 'Ok image url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/chicken-pollo.jpg'
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
                default: 'Hello | Hello ${topUsername}, good luck have fun.\n' +
                'CHAIN | I\'ll chain to that.\n' +
                'Nibiru :( | The total stats of all face up monsters on the field are ${atkAllFaceUpMonsters} ATK / ${defAllFaceUpMonsters} DEF | ${sendAllControllingMonstersFromFieldToGY(Both~FaceUp)} | ${specialSummonToken()}\n' +
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
            },
            hotkeyRulingPage: {
                label: 'Hotkey to open the ruling db link for the current card in the detail view',
                type: 'hotkey',
                default: ['F2']
            },
            fieldZoneImageUrl: {
                label: 'Field zone image url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/field_zones2.svg'
            },
            phaseButtonBackgroundImageUrl: {
                label: 'Phase Button Background Image Url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/button_bg.png'
            },
            phaseButtonRedImageUrl: {
                label: 'Phase Button Red Image Url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/button_red.png'
            },
            phaseButtonRedActiveImageUrl: {
                label: 'Phase Button Red Active Image Url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/button_red_lit.png'
            },
            phaseButtonBlueImageUrl: {
                label: 'Phase Button Blue Image Url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/button_blue.png'
            },
            phaseButtonBlueActiveImageUrl: {
                label: 'Phase Button Blue Active Image Url',
                type: 'text',
                size: 300,
                default: 'https://custom-db.yugioh.app/assets/button_blue_lit.png'
            }
        },
        types: {
            hotkey: {
                default: null,
                toNode: function() {
                    const configId = this.configId;
                    const field = this.settings;
                    const value = this.value;
                    const id = this.id;
                    const create = this.create;
                    const retNode = create('div', { className: 'config_var', id: `${configId}_${id}_var` });

                    retNode.appendChild(create('label', {
                        id: `${configId}_${id}_input_label`,
                        for: `${configId}_${id}_input`,
                        className: 'field_label',
                        innerHTML: field.label
                    }));

                    let currentValue = [];
                    if (value) {
                        currentValue = value;
                    } else if (field.default && value !== null) {
                        currentValue = field.default;
                    }

                    const keysDown = new Set();

                    const input = create('input', {
                        id: `${configId}_${id}_input`,
                        className: 'block',
                        value: currentValue.join(' + ').toUpperCase(),
                        onkeydown: function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            keysDown.add(e.key);

                            input.value = Array.from(keysDown).join(' + ').toUpperCase();
                            input.setAttribute('data-keys', JSON.stringify(Array.from(keysDown)));
                        },
                        onkeyup: function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            keysDown.clear();
                        }
                    });

                    input.setAttribute('data-keys', JSON.stringify(currentValue));

                    retNode.appendChild(input);

                    return retNode;
                },
                toValue: function() {
                    const configId = this.configId;
                    const id = this.id;
                    const wrapper = this.wrapper;
                    if (!wrapper) {
                        return;
                    }
                    const inputs = wrapper.getElementsByTagName('input');
                    if (inputs.length !== 1) {
                        return;
                    }
                    const keys = JSON.parse(inputs[0].getAttribute('data-keys'));
                    return keys;
                }
            }
        },
        events: {
            close: function () {
                init();
                applyChanges();
            }
        }
    });

    function getConfigEntry(key) {
        return GM_config.get(key);
    }

    function migrateNewUrl() {
        const migrations = [
            {
                key: 'thinkEmoteUrl',
                old: 'https://www.yugioh-api.com/thinkmech.png',
                new: 'https://custom-db.yugioh.app/assets/thinkmech.png'
            },
            {
                key: 'startPageMonsterUrl',
                old: 'https://www.yugioh-api.com/dragonmaid-chamber.png',
                new: 'https://custom-db.yugioh.app/assets/dragonmaid-chamber.png'
            },
            {
                key: 'backgroundUrl',
                old: 'https://wallpaperaccess.com/full/1429125.jpg',
                new: 'https://custom-db.yugioh.app/assets/blue-eyes-background.jpg'
            },
            {
                key: 'okSoundUrl',
                old: 'https://www.yugioh-api.com/pollo.mp3',
                new: 'https://custom-db.yugioh.app/assets/pollo.mp3'
            },
            {
                key: 'okImageUrl',
                old: 'https://ae01.alicdn.com/kf/Hc4e3b9a69e1e456cb88c9862edb86a92l/Thumbs-Up-Chicken-Arm-Toy-Chicken-Gag-Gift-Wearing-Artificial-Dinosaur-Arms-Pet-Themed-Party-Funny.jpg_220x220xz.jpg',
                new: 'https://custom-db.yugioh.app/assets/chicken-pollo.jpg'
            }
        ];
        for (const migration of migrations) {
            if (GM_config.get(migration.key) === migration.old) {
                GM_config.set(migration.key, migration.new);
            }
        }
    }

    migrateNewUrl();

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
            wrapper.style.height = '48px';
            wrapper.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg style="filter: drop-shadow(1px 1px 0px black); position: relative;" fill="white" enable-background="new 0 0 478.703 478.703" version="1.1" viewBox="0 0 478.7 478.7" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m454.2 189.1-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8 7.1-27.9-3.2-38.1l-29.8-29.8c-5.6-5.6-13-8.7-20.9-8.7-6.2 0-12.1 1.9-17.1 5.5l-27.8 19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5 0-26.8 10.4-29.2 24.7l-5.8 34c-11.2 3.5-22.1 8.1-32.5 13.7l-27.5-19.8c-5-3.6-11-5.5-17.2-5.5-7.9 0-15.4 3.1-20.9 8.7l-29.9 29.8c-10.2 10.2-11.6 26.3-3.2 38.1l20 28.1c-5.5 10.5-9.9 21.4-13.3 32.7l-33.2 5.6c-14.3 2.4-24.7 14.7-24.7 29.2v42.1c0 14.5 10.4 26.8 24.7 29.2l34 5.8c3.5 11.2 8.1 22.1 13.7 32.5l-19.7 27.4c-8.4 11.8-7.1 27.9 3.2 38.1l29.8 29.8c5.6 5.6 13 8.7 20.9 8.7 6.2 0 12.1-1.9 17.1-5.5l28.1-20c10.1 5.3 20.7 9.6 31.6 13l5.6 33.6c2.4 14.3 14.7 24.7 29.2 24.7h42.2c14.5 0 26.8-10.4 29.2-24.7l5.7-33.6c11.3-3.5 22.2-8 32.6-13.5l27.7 19.8c5 3.6 11 5.5 17.2 5.5 7.9 0 15.3-3.1 20.9-8.7l29.8-29.8c10.2-10.2 11.6-26.3 3.2-38.1l-19.8-27.8c5.5-10.5 10.1-21.4 13.5-32.6l33.6-5.6c14.3-2.4 24.7-14.7 24.7-29.2v-42.1c0.2-14.5-10.2-26.8-24.5-29.2zm-2.3 71.3c0 1.3-0.9 2.4-2.2 2.6l-42 7c-5.3 0.9-9.5 4.8-10.8 9.9-3.8 14.7-9.6 28.8-17.4 41.9-2.7 4.6-2.5 10.3 0.6 14.7l24.7 34.8c0.7 1 0.6 2.5-0.3 3.4l-29.8 29.8c-0.7 0.7-1.4 0.8-1.9 0.8-0.6 0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6-13.1 7.8-27.2 13.6-41.9 17.4-5.2 1.3-9.1 5.6-9.9 10.8l-7.1 42c-0.2 1.3-1.3 2.2-2.6 2.2h-42.1c-1.3 0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8-14.3-3.7-28.1-9.4-41-16.8-2.1-1.2-4.5-1.8-6.8-1.8-2.7 0-5.5 0.8-7.8 2.5l-35 24.9c-0.5 0.3-1 0.5-1.5 0.5-0.4 0-1.2-0.1-1.9-0.8l-29.8-29.8c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4 3.3-10.2 0.6-14.8-7.8-13-13.8-27.1-17.6-41.8-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3 0.9-2.4 2.2-2.6l41.7-7c5.3-0.9 9.6-4.8 10.9-10 3.7-14.7 9.4-28.9 17.1-42 2.7-4.6 2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5 0.3-3.4l29.8-29.8c0.7-0.7 1.4-0.8 1.9-0.8 0.6 0 1.1 0.2 1.5 0.5l34.5 24.6c4.4 3.1 10.2 3.3 14.8 0.6 13-7.8 27.1-13.8 41.8-17.6 5.1-1.4 9-5.6 9.9-10.8l7.2-42.3c0.2-1.3 1.3-2.2 2.6-2.2h42.1c1.3 0 2.4 0.9 2.6 2.2l7 41.7c0.9 5.3 4.8 9.6 10 10.9 15.1 3.8 29.5 9.7 42.9 17.6 4.6 2.7 10.3 2.5 14.7-0.6l34.5-24.8c0.5-0.3 1-0.5 1.5-0.5 0.4 0 1.2 0.1 1.9 0.8l29.8 29.8c0.9 0.9 1 2.3 0.3 3.4l-24.7 34.7c-3.1 4.3-3.3 10.1-0.6 14.7 7.8 13.1 13.6 27.2 17.4 41.9 1.3 5.2 5.6 9.1 10.8 9.9l42 7.1c1.3 0.2 2.2 1.3 2.2 2.6v42.1h-0.1z"/><path d="m239.4 136c-57 0-103.3 46.3-103.3 103.3s46.3 103.3 103.3 103.3 103.3-46.3 103.3-103.3-46.3-103.3-103.3-103.3zm0 179.6c-42.1 0-76.3-34.2-76.3-76.3s34.2-76.3 76.3-76.3 76.3 34.2 76.3 76.3-34.2 76.3-76.3 76.3z"/></svg><span style="color: white; position: relative;">v' + GM_info.script.version + '</span>';
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

        const macroTexts = getConfigEntry('macroTexts');
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
        console.log('execute command', cmd);
        if (cmd) {
            switch (cmd.command) {
                case 'addFromDeckToHand':
                    if (cmd.param) {
                        await addToHandFromDeck(cmd.param);
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
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await specialSummonFromDeckToZone(params.shift(), 'SS ATK', params);
                        }
                    }
                    break;
                case 'specialFromDeckInDefToZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
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
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await specialSummonFromExtraDeckToZone(params.shift(), 'SS ATK', params);
                        }
                    }
                    break;
                case 'specialFromExtraDeckInDefToZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
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
                    await specialSummonTokenZoneSelect();
                    break;
                case 'specialSummonTokenToZone':
                    if (cmd.param) {
                        await specialSummonTokenToZone(splitArguments(cmd.param));
                    }
                    break;
                case 'specialSummonMultipleTokens':
                    if (cmd.param) {
                        await specialSummonMultipleTokens(cmd.param);
                    }
                    break;
                case 'sendAllControllingMonstersFromFieldToGY':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length == 2) {
                            await sendOwnMonstersFromFieldToGY(params[0], params[1]);
                        } else if (params.length === 1) {
                            await sendOwnMonstersFromFieldToGY(params[0]);
                        }
                    } else {
                        await sendOwnMonstersFromFieldToGY();
                    }
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
                        await banishCardsFromGY(cmd.param);
                    }
                    break;
                case 'banishFromHand':
                    if (cmd.param) {
                        await banishCardsFromHand(cmd.param);
                    }
                    break;
                case 'banishFromDeck':
                    if (cmd.param) {
                        await banishCardsFromDeck(cmd.param);
                    }
                    break;
                case 'activateSpellTrapFromDeck':
                    if (cmd.param) {
                        await activateSpellTrapFromDeck(cmd.param);
                    }
                    break;
                case 'activateSpellTrapFromDeckToZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await activateSpellTrapFromDeckToZone(params.shift(), params);
                        }
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
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await specialFromGYToZone(params.shift(), 'SS ATK', params);
                        }
                    }
                    break
                case 'specialFromGYInDefToZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
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
                case 'returnAllFromHandToTopOfDeck':
                    returnAllFromHandToTopOfDeck();
                    break;
                case 'shuffleDeck':
                    await shuffleDeck();
                    break;
                case 'moveZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await moveZone(params.shift(), params);
                        }
                    }
                    break;
                case 'overlayMonsters':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await overlayMonsters(params.shift(), params);
                        }
                    }
                    break;
                case 'flipDownMonsters':
                    if (cmd.param) {
                        await setMonstersOnField(cmd.param);
                    }
                    break;
                case 'flipUpMonsters':
                    if (cmd.param) {
                        await flipMonstersOnField(cmd.param);
                    }
                    break;
                case 'changeToAtk':
                    if (cmd.param) {
                        await changeMonstersOnFieldToAtk(cmd.param);
                    }
                    break;
                case 'changeToDef':
                    if (cmd.param) {
                        await changeMonstersOnFieldToDef(cmd.param);
                    }
                    break;
                case 'normalSetToRandomZone':
                    if (cmd.param) {
                        await setMonsterFromHand(cmd.param);
                    }
                    break;
                case 'normalSetToZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await setMonsterFromHandToZone(params.shift(), params);
                        }
                    }
                    break;
                case 'normalSummonToRandomZone':
                    if (cmd.param) {
                        await normalSummonMonsterFromHand(cmd.param);
                    }
                    break;
                case 'normalSummonToZone':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await normalSummonMonsterFromHandToZone(params.shift(), params);
                        }
                    }
                    break;
                case 'addCountersToCards':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await addCountersToCardsOnField(parseInt(params.shift()) || 1, params.join('~'));
                        }
                    }
                    break;
                case 'removeCountersFromCards':
                    if (cmd.param) {
                        const params = splitArguments(cmd.param);
                        if (params.length >= 2) {
                            await removeCountersFromCardsOnField(parseInt(params.shift()) || 1, params.join('~'));
                        }
                    }
                    break;
                case 'setCardsFromDeckToSpellTrapZone':
                    if (cmd.param) {
                        await setCardsFromDeckToSpellTrapZone(cmd.param);
                    }
                    break;
            }
        } else {
            await sendToDbSocket({action:'Duel', play:'Duel message', message:replaceVariablesInStr(message.trim()), html:0});
        }
        if (messages.length > 0) {
            await waitMs(timeToWait);
            sendDuelChatMessages(messages);
        }
    }

    function splitArguments(args) {
        return args.split('~').map(a => a.trim()).filter(a => a.length > 0);
    }

    function findCardByName(cardArr, name) {
        return cardArr.find(card => card.data('cardfront').data('name') === name);
    }

    async function doActionsOnMultipleCardNames(cardArr, name, cardCb) {
        const cardNames = splitArguments(name);
        const alreadyFoundCardIds = [];

        for (const cardName of cardNames) {
            const card = cardArr.find(card => {
                return card.data('cardfront').data('name').toLowerCase() === cardName.toLowerCase()
                && alreadyFoundCardIds.indexOf(card.data('id')) === -1
            });
            if (!card) {
                continue;
            }
            alreadyFoundCardIds.push(card.data('id'));
            await cardCb(card);
        }
    }

    async function sendToDbSocket(data) {
        (window.unsafeWindow || window).Send(data);
    }

    async function banishCard(card) {
        await sendToDbSocket({action:'Duel', play:'Banish', card:card.data('id')});
    }

    async function banishCardFaceDown(card) {
        await sendToDbSocket({action:'Duel', play:'Banish FD', card:card.data('id')});
    }

    async function addCardToHand(card) {
        await sendToDbSocket({action:'Duel', play:'To hand', card:card.data('id')});
    }

    async function returnCardToTopOfDeck(card) {
        await sendToDbSocket({action:'Duel', play:'To T Deck', card:card.data('id')});
    }

    async function sendCardToGY(card) {
        await sendToDbSocket({action:'Duel', play:'To GY', card:card.data('id')});
    }

    async function specialSummonCard(card, position, zone) {
        const data = {action:'Duel', play:position, card:card.data('id')};
        if (zone) {
            data.zone = zone;
        }
        await sendToDbSocket(data);
    }

    async function normalSummonMonster(card, zone) {
        const data = {action:'Duel', play:'Normal Summon', card:card.data('id')};
        if (zone) {
            data.zone = zone;
        }
        await sendToDbSocket(data);
    }

    async function setMonster(card, zone) {
        const data = {action:'Duel', play:'Set monster', card:card.data('id')};
        if (zone) {
            data.zone = zone;
        }
        await sendToDbSocket(data);
    }

    async function flipMonster(card) {
        await sendToDbSocket({action:'Duel', play:'Flip', card:card.data('id')});
    }

    async function changeMonsterToAtk(card) {
        await sendToDbSocket({action:'Duel', play:'To ATK', card:card.data('id')});
    }

    async function changeMonsterToDef(card) {
        await sendToDbSocket({action:'Duel', play:'To DEF', card:card.data('id')});
    }

    async function activateSpellTrap(card, zone) {
        const data = {action:'Duel', play:'To ST', card:card.data('id')};
        if (zone) {
            data.zone = zone;
        }
        await sendToDbSocket(data);
    }

    async function setSpellTrap(card, zone) {
        const data = {action:'Duel', play:'Set ST', card:card.data('id')};
        if (zone) {
            data.zone = zone;
        }
        await sendToDbSocket(data);
    }

    async function specialSummonToken(zone) {
        const data = {action:'Duel', play:'Summon token'};
        if (zone) {
            data.zone = zone;
        }
        await sendToDbSocket(data);
    }

    async function addCounterToCard(card) {
        await sendToDbSocket({action:'Duel', play:'Add counter', card:card.data('id')});
    }

    async function removeCounterFromCard(card) {
        await sendToDbSocket({action:'Duel', play:'Remove counter', card:card.data('id')});
    }

    async function banishCards(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => banishCard(card));
    }

    async function banishCardsFaceDown(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => banishCardFaceDown(card));
    }

    async function addCardsToHand(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => addCardToHand(card));
    }

    async function returnCardsToTopOfDeck(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => returnCardToTopOfDeck(card));
    }

    async function specialSummonCardToZone(cardArr, name, position, zones) {
        const card = findCardByName(cardArr, name);
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                await specialSummonCard(card, position, zone);
                break;
            }
        }
    }

    async function specialSummonCardsToRandomZone(cardArr, name, position) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => specialSummonCard(card, position));
    }

    async function sendCardsToGY(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => sendCardToGY(card));
    }

    async function setMonsters(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => setMonster(card));
    }

    async function flipMonsters(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => flipMonster(card));
    }

    async function changeMonstersToAtk(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => changeMonsterToAtk(card));
    }

    async function changeMonstersToDef(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => changeMonsterToDef(card));
    }

    async function activateCardInSpellTrapZone(cardArr, name, zones) {
        const card = findCardByName(cardArr, name);
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                await activateSpellTrap(card, zone);
                break;
            }
        }
    }

    async function activateCardsInSpellTraps(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => activateSpellTrap(card));
    }

    async function setCardsToSpellTrapZone(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => setSpellTrap(card));
    }

    async function addCounterToCards(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => addCounterToCard(card));
    }

    async function removeCounterFromCards(cardArr, name) {
        await doActionsOnMultipleCardNames(cardArr, name, async (card) => removeCounterFromCard(card));
    }

    async function banishCardsFromGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0) {
            return;
        }
        await banishCards(player.grave_arr, name);
    }

    async function banishCardsFromHand(name) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }
        await banishCards(player.hand_arr, name);
    }

    async function banishCardsFromDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }
        await doStuffInDeck(async () => banishCards(player.main_arr, name));
    }

    async function banishCardsFromExtraDeck(name, faceDown) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0) {
            return;
        }
        await doStuffInExtraDeck(async () => {
            if (faceDown) {
                await banishCardsFaceDown(player.extra_arr, name);
            } else {
                await banishCards(player.extra_arr, name);
            }
        });
    }

    async function shuffleDeck() {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }
        await sendToDbSocket({action:'Duel', play:'Shuffle deck', card:player.main_arr[0].data('id')});
    }

    async function addToHandFromGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0) {
            return;
        }

        await addCardsToHand(player.grave_arr, name);
    }

    async function addToHandFromDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        await doStuffInDeck(async () => addCardsToHand(player.main_arr, name));
    }

    async function setCardsFromDeckToSpellTrapZone(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        await doStuffInDeck(async () => setCardsToSpellTrapZone(player.main_arr, name));
    }

    async function addCountersToCardsOnField(count, name) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());
        for (let i = 0; i < count; i++) {
            await addCounterToCards(cardsOnField, name);
            await waitMs(500);
        }
    }

    async function removeCountersFromCardsOnField(count, name) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());
        for (let i = 0; i < count; i++) {
            await removeCounterFromCards(cardsOnField, name);
            await waitMs(500);
        }
    }

    async function moveZone(name, zones) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());

        const card = findCardByName(cardsOnField, name);
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                await sendToDbSocket({action:'Duel', play:'Move', card:card.data('id'), zone:zone});
                break;
            }
        }
    }

    async function overlayMonsters(name, materials) {
        const cardsOnField = getOwnControlledMonsters();

        const card = findCardByName(cardsOnField, name);
        if (card) {
            for (const material of materials) {
                const cardMaterial = findCardByName(cardsOnField, material);
                if (cardMaterial && cardMaterial.data('id') !== card.data('id')) {
                    await sendToDbSocket({action:'Duel', play:'Overlay', start_card:card.data('id'), end_card:cardMaterial.data('id')});
                }
            }
        }
    }

    async function setMonstersOnField(name) {
        const cardsOnField = getOwnControlledMonsters();
        await setMonsters(cardsOnField, name);
    }

    async function flipMonstersOnField(name) {
        const cardsOnField = getOwnControlledMonsters();
        await flipMonsters(cardsOnField, name);
    }

    async function setMonsterFromHand(name) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }

        const card = findCardByName(player.hand_arr, name);
        if (card) {
            await setMonster(card);
        }
    }

    async function setMonsterFromHandToZone(name, zones) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }
        const card = findCardByName(player.hand_arr, name);
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                await setMonster(card, zone);
                break;
            }
        }
    }

    async function normalSummonMonsterFromHand(name) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }

        const card = findCardByName(player.hand_arr, name);
        if (card) {
            await normalSummonMonster(card);
        }
    }

    async function normalSummonMonsterFromHandToZone(name, zones) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }
        const card = findCardByName(player.hand_arr, name);
        if (card) {
            for (const zone of normalizeZones(zones)) {
                if (!isZoneEmpty(zone)) {
                    continue;
                }
                await normalSummonMonster(card, zone);
                break;
            }
        }
    }

    async function changeMonstersOnFieldToAtk(name) {
        const cardsOnField = getOwnControlledMonsters();
        await changeMonstersToAtk(cardsOnField, name);
    }

    async function changeMonstersOnFieldToDef(name) {
        const cardsOnField = getOwnControlledMonsters();
        await changeMonstersToDef(cardsOnField, name);
    }

    async function fromFieldToTopOfDeck(name) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());
        await returnCardsToTopOfDeck(cardsOnField, name);
    }

    async function fromGYToTopOfDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0) {
            return;
        }

        await returnCardsToTopOfDeck(player.grave_arr, name);
    }

    async function fromBanishToTopOfDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.banished_arr.length === 0) {
            return;
        }

        await returnCardsToTopOfDeck(player.banished_arr, name);
    }

    async function returnAllFromHandToTopOfDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.hand_arr.length === 0) {
            return;
        }

        for (const card of player.hand_arr) {
            await returnCardToTopOfDeck(card);
        }
    }

    async function specialFromGY(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        const card = findCardByName(player.grave_arr, name);
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

        await specialSummonCardToZone(player.grave_arr, name, position, zones);
    }

    async function specialFromGYRandomZone(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.grave_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await specialSummonCardsToRandomZone(player.grave_arr, name, position);
    }

    function normalizeFaceUpDown(faceUpDown) {
        faceUpDown = faceUpDown ? faceUpDown.toLowerCase() : '';
        if (faceUpDown === 'faceup') {
            return 'face_up';
        }
        if (faceUpDown === 'facedown') {
            return 'face_down';
        }
        return null;
    }

    function getOwnControlledMonsters(faceUpDown) {
        faceUpDown = normalizeFaceUpDown(faceUpDown);
        const player = getCurrentPlayer();
        const zones = [player.m1, player.m2, player.m3, player.m4, player.m5, (window.unsafeWindow || window).linkLeft, (window.unsafeWindow || window).linkRight];
        return zones.filter((card) => card && card.data('controller').username === player.username && (!faceUpDown || card.data('face_down') === (faceUpDown === 'face_down')));
    }

    function getOpponentsControlledMonsters(faceUpDown) {
        faceUpDown = normalizeFaceUpDown(faceUpDown);
        const player = getCurrentPlayer();
        const opponent = player.opponent;
        const zones = [opponent.m1, opponent.m2, opponent.m3, opponent.m4, opponent.m5, (window.unsafeWindow || window).linkLeft, (window.unsafeWindow || window).linkRight];
        return zones.filter((card) => card && card.data('controller').username === opponent.username && (!faceUpDown || card.data('face_down') === (faceUpDown === 'face_down')));
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

        await sendCardsToGY(player.hand_arr, name);
    }

    async function sendOwnMonstersFromFieldToGY(position, faceUpDown) {
        const monstersOnField = getOwnControlledMonsters(faceUpDown);
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
            await sendCardToGY(card);
        }
        await waitMs(750);
    }

    async function sendOwnSpellTrapsFromFieldToGY() {
        const spellTraps = getOwnSpellsAndTrapsOnField();

        for (const card of spellTraps) {
            await sendCardToGY(card);
        }
        await waitMs(350);
    }

    async function sendFromFieldToGY(name) {
        const cardsOnField = getOwnControlledMonsters().concat(getOwnSpellsAndTrapsOnField());
        await sendCardsToGY(cardsOnField, name);
        await waitMs(250);
    }

    function calculateAtkAllMonstersOnField(faceUpDown) {
        const allMonsters = getOwnControlledMonsters(faceUpDown).concat(getOpponentsControlledMonsters(faceUpDown));
        return allMonsters.reduce((prev, cur) => prev + (parseInt(cur.data('cardfront').data('atk')) || 0), 0);
    }

    function calculateDefAllMonstersOnField(faceUpDown) {
        const allMonsters = getOwnControlledMonsters(faceUpDown).concat(getOpponentsControlledMonsters(faceUpDown));
        return allMonsters.reduce((prev, cur) => prev + (parseInt(cur.data('cardfront').data('def')) || 0), 0);
    }

    async function specialSummonTokenZoneSelect() {
        (window.unsafeWindow || window).tokenE();
    }

    async function specialSummonTokenToZone(zones) {
        for (const zone of normalizeZones(zones)) {
            if (!isZoneEmpty(zone)) {
                continue;
            }
            await specialSummonToken(zone);
            break;
        }
    }

    async function specialSummonMultipleTokens(count) {
        count = parseInt(count) || 0;
        for (let i = 0; i < count; i++) {
            await specialSummonToken();
            await waitMs(500);
        }
    }

    async function doStuffInDeck(cb, exit = false) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        (window.unsafeWindow || window).viewing = 'Deck';
        await sendToDbSocket({action:'Duel', play:'View deck', card:player.main_arr[0].data('id')});
        await waitMs(500);
        await cb();
        if (exit) {
            (window.unsafeWindow || window).exitViewing();
        }
        await waitMs(250);
    }

    async function doStuffInExtraDeck(cb, exit = false) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0) {
            return;
        }

        (window.unsafeWindow || window).viewing = 'Extra Deck';
        await sendToDbSocket({action:'Duel', play:'View ED', card:player.extra_arr[0].data('id')});
        await waitMs(500);
        await cb();
        if (exit) {
            (window.unsafeWindow || window).exitViewing();
        }
        await waitMs(250);
    }

    async function sendFromExtraDeckToGY(name) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0) {
            return;
        }

        await doStuffInExtraDeck(async () => sendCardsToGY(player.extra_arr, name));
    }

    async function specialSummonFromExtraDeckRandomZone(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInExtraDeck(async () => specialSummonCardsToRandomZone(player.extra_arr, name, position));
    }

    function normalizeZones(zones) {
        return zones.map((zone) => {
            zone = zone.toLowerCase();
            let matches = zone.match(/om([1-5]{1})/);
            if (matches) {
                return 'M2-' + matches[1];
            }
            matches = zone.match(/m([1-5]{1})/);
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
            case 'M2-1':
                return !player.opponent.m1;
            case 'M2-2':
                return !player.opponent.m2;
            case 'M2-3':
                return !player.opponent.m3;
            case 'M2-4':
                return !player.opponent.m4;
            case 'M2-5':
                return !player.opponent.m5;
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

        await doStuffInExtraDeck(async () => specialSummonCardToZone(player.extra_arr, name, position, zones));
    }

    async function specialSummonFromExtraDeck(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.extra_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInExtraDeck(async () => {
            const card = findCardByName(player.extra_arr, name);
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

        await doStuffInDeck(async () => sendCardsToGY(player.main_arr, name));
    }

    async function specialSummonFromDeckToZone(name, position, zones) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInDeck(async () => specialSummonCardToZone(player.main_arr, name, position, zones));
    }

    async function specialSummonFromDeckRandomZone(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInDeck(async () => specialSummonCardsToRandomZone(player.main_arr, name, position));
    }

    async function specialSummonFromDeck(name, position) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0 || !(window.unsafeWindow || window).hasAvailableMonsterZones(player)) {
            return;
        }

        await doStuffInDeck(async () => {
            const card = findCardByName(player.main_arr, name);
            if (card) {
                (window.unsafeWindow || window).menu_card = card;
                (window.unsafeWindow || window).cardMenuClicked(card, position);
                /*(window.unsafeWindow || window).summoning_card = card;
				(window.unsafeWindow || window).summoning_play = position;
				(window.unsafeWindow || window).startChooseMonsterZones();*/
            }
        }, false);
    }

    async function activateSpellTrapFromDeck(name) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        await doStuffInDeck(async () => {
            const card = findCardByName(player.main_arr, name);
            if (card) {
                (window.unsafeWindow || window).menu_card = card;
                (window.unsafeWindow || window).cardMenuClicked(card, 'To ST');
            }
        }, false);
    }

    async function activateSpellTrapFromDeckToZone(name, zones) {
        const player = getCurrentPlayer();
        if (!player || player.main_arr.length === 0) {
            return;
        }

        await doStuffInDeck(async () => activateCardInSpellTrapZone(player.main_arr, name, zones));
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
                case 'atkAllFaceUpMonsters':
                    return calculateAtkAllMonstersOnField('FaceUp');
                case 'defAllFaceUpMonsters':
                    return calculateDefAllMonstersOnField('FaceUp');
            }
            return '';
        });
    }

    function replaceThinkEmote() {
        const thinkEmoteUrl = getConfigEntry('thinkEmoteUrl');
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
        const pfpUrls = getConfigEntry('pfpUrls').split('\n').map(p => p.trim()).filter(p => !!p);
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

            const ownPfpUrl = getConfigEntry('ownPfpUrl');

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
        const backgroundUrl = getConfigEntry('backgroundUrl');
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
        const okSoundUrl = getConfigEntry('okSoundUrl');
        if (!okSoundUrl) {
            return;
        }
        (window.unsafeWindow || window).Ok = okSoundUrl;
    }
    function setOkImage() {
        const okImageUrl = getConfigEntry('okImageUrl');
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
        if (getConfigEntry('hideStartPageMonster')) {
            el.setAttribute('hidden', '');
            return;
        } else {
            el.removeAttribute('hidden');
        }
        const startPageMonsterUrl = getConfigEntry('startPageMonsterUrl');
        if (!startPageMonsterUrl) {
            return;
        }
        if (el.getAttribute('src') !== startPageMonsterUrl) {
            el.setAttribute('src', startPageMonsterUrl);
        }
    }
    function hideBackgroundBox() {
        const hideBackgroundBox = getConfigEntry('hideBackgroundBox');
        const el = document.getElementById('circuit_cover');
        if (el) {
            el.style.display = hideBackgroundBox ? 'none' : 'block';
        }
    }
    function hideMenuChat() {
        const mainPageMonsterUrl = getConfigEntry('mainPageMonsterUrl');

        const hideMenuChat = getConfigEntry('hideMenuChat');
        const el = document.getElementById('circle_content');
        if (el) {
            if (!mainPageMonsterUrl) {
                el.style.display = hideMenuChat ? 'none' : 'block';
            }
            else if(hideMenuChat == true){
                if (!document.querySelector('#circle_content .main-page-monster')) {
                    el.innerHTML = `<img style="max-height: 100%; max-width: 100%; " class="main-page-monster" src="${mainPageMonsterUrl}">`;
                }
            }
        }
        const en = document.getElementById('main_menu_circles');
        if (en) {
            en.style.display = hideMenuChat ? 'none' : 'block';
        }
        const ex = document.getElementById('status_cb');
        if (ex) {
            ex.style.display = hideMenuChat ? 'none' : 'block';
        }
        const ek = document.getElementById('post_status_btn');
        if (ek) {
            ek.style.display = hideMenuChat ? 'none' : 'block';
        }
    }
    function removeWatchersList() {
        const hideWatchersList = getConfigEntry('hideWatchersList');
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
        const hideDuelNotes = getConfigEntry('hideDuelNotes');
        if (!hideDuelNotes) {
            return;
        }
        for (const duelNote of document.querySelectorAll('.duelbutton .note_txt')) {
            duelNote.textContent = '';
        }
    }

    function getCensoredWord(word, showTitle = false) {
        const replaced = '*'.repeat(word.length);
        if (!showTitle) {
            return replaced;
        }
        return `<font title="${word}">${replaced}</font>`;
    }

    function censorText(str, showTitle = false) {
        return str.split(/\b/).map((word) => bannedWords.includes(word.toLowerCase()) ? getCensoredWord(word, showTitle) : word).join('');
    }

    const originalSleeveStart = (window.unsafeWindow || window).SLEEVE_START;

    function applyChanges() {
        if (!getConfigEntry('active') || !isOnDb()) {
            (window.unsafeWindow || window).SLEEVE_START = originalSleeveStart;
            return;
        }
        if (getConfigEntry('sleeveUrl')) {
            (window.unsafeWindow || window).SLEEVE_START = '';
        } else {
            (window.unsafeWindow || window).SLEEVE_START = originalSleeveStart;
        }
        hideProfilePictures();
        setBackgroundImage();
        setOkSound();
        setOkImage();
        setStartPageMonster();
        removeWatchersList();
        removeDuelNotes();
        hideBackgroundBox();
        hideMenuChat();
        replaceThinkEmote();
        setFieldZoneImageUrl();
        setPhaseButtons();
    }

    function sendThinkingText() {
        const thinkingText = getConfigEntry('thinkingText');
        if (!thinkingText || !((window.unsafeWindow || window).Send)) {
            return;
        }
        sendDuelChatMessages([thinkingText]);
        sendToDbSocket({action:'Duel', play:'Thinking'});
    }

    function sendOkText() {
        const okText = getConfigEntry('okText');
        if (!okText || !((window.unsafeWindow || window).Send)) {
            return;
        }
        sendDuelChatMessages([okText]);
    }

    function setFieldZoneImageUrl() {
        const el = document.getElementById('field_zones2');
        if (!el) {
            return;
        }
        const fieldZoneImageUrl = getConfigEntry('fieldZoneImageUrl');
        if (!fieldZoneImageUrl) {
            if (el.getAttribute('data-orig-image') && el.getAttribute('src') !== el.getAttribute('data-orig-image')) {
                el.setAttribute('src', el.getAttribute('data-orig-image'));
            }
            return;
        }
        if (el.getAttribute('src') !== fieldZoneImageUrl) {
            if (!el.getAttribute('data-orig-image')) {
                el.setAttribute('data-orig-image', el.getAttribute('src'));
            }
            el.setAttribute('src', fieldZoneImageUrl);
        }
    }

    function setPhaseButtons() {
        const phases = ['dp', 'sp', 'm1', 'bp', 'm2', 'ep'];
        const phaseButtonBackgroundImageUrl = getConfigEntry('phaseButtonBackgroundImageUrl');
        const phaseButtonRedImageUrl = getConfigEntry('phaseButtonRedImageUrl');
        const phaseButtonRedActiveImageUrl = getConfigEntry('phaseButtonRedActiveImageUrl');
        const phaseButtonBlueImageUrl = getConfigEntry('phaseButtonBlueImageUrl');
        const phaseButtonBlueActiveImageUrl = getConfigEntry('phaseButtonBlueActiveImageUrl');

        const updatePhaseButton = (id) => {
            if (phaseButtonBackgroundImageUrl) {
                $(`#${id} .background`).attr('src', phaseButtonBackgroundImageUrl);
            }
            if (phaseButtonBlueImageUrl) {
                $(`#${id} .phase_dark_blue`).attr('src', phaseButtonBlueImageUrl);
            }
            if (phaseButtonRedImageUrl) {
                $(`#${id} .phase_dark_red`).attr('src', phaseButtonRedImageUrl);
            }
            if (phaseButtonBlueActiveImageUrl) {
                $(`#${id} .phase_blue`).attr('src', phaseButtonBlueActiveImageUrl);
            }
            if (phaseButtonRedActiveImageUrl) {
                $(`#${id} .phase_red`).attr('src', phaseButtonRedActiveImageUrl);
            }
        };
        for (const phase of phases) {
            updatePhaseButton(phase);
        }
    }

    let initDone = false;

    function init() {
        if (!getConfigEntry('active') || !isOnDb()) {
            return;
        }
        addMacroButtons();
        if (initDone) {
            return;
        }
        initDone = true;

        (window.unsafeWindow || window).restoreDuelVSP = () => {
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

        document.addEventListener('click', (e) => {
            if (e.target.id === 'think_btn') {
                sendThinkingText();
            } else if (e.target.id === 'good_btn') {
                sendOkText();
            }
        }, false);

        const interval = setInterval(() => {
            if ((window.unsafeWindow || window).user_username) {
                clearInterval(interval);
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'https://cube.yugioh-api.com/api/customdb',
                    data: JSON.stringify({name: (window.unsafeWindow || window).user_username, version: GM_info.script.version}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }, 1000);

        const keysDown = new Set();
        document.onkeyup = (e) => {
            keysDown.clear();
        };
        document.onkeydown = (e) => {
            keysDown.add(e.key);
            const hotkey = getConfigEntry('hotkeyRulingPage');
            if (Array.isArray(hotkey) && hotkey.length > 0 && keysDown.size === hotkey.length) {
                const missingKeys = hotkey.filter(h => !keysDown.has(h));
                if (missingKeys.length === 0) {
                    e.preventDefault();
                    keysDown.clear();
                    if ((window.unsafeWindow || window).preview) {
                        GM_openInTab('https://db.ygorganization.com/search#quick:' + encodeURIComponent((window.unsafeWindow || window).preview.data('name')), {
                            active: true
                        });
                    }
                }
            }
        };

        const originalPrivateChatPrint = (window.unsafeWindow || window).privateChatPrint;
        (window.unsafeWindow || window).privateChatPrint = (data) => {
            if (getConfigEntry('active') && getConfigEntry('censorPrivateChat')) {
                data.message = censorText((window.unsafeWindow || window).escapeHTMLWithLinks(data.message), true);
                data.html = true;
            }
            originalPrivateChatPrint(data);
        };

        const originalDuelChatPrint = (window.unsafeWindow || window).duelChatPrint;
        (window.unsafeWindow || window).duelChatPrint = (data) => {
            if (getConfigEntry('active') && getConfigEntry('censorChat')) {
                data.message = censorText((window.unsafeWindow || window).escapeHTMLWithLinks(data.message));
                data.html = true;
            }
            originalDuelChatPrint(data);
        };

        const originalInitPlayers = (window.unsafeWindow || window).initPlayers;
        (window.unsafeWindow || window).initPlayers = (data) => {
            const sleeveUrl = getConfigEntry('sleeveUrl');
            if (getConfigEntry('active') && sleeveUrl) {
                data.player1.sleeve = sleeveUrl;
                data.player2.sleeve = sleeveUrl;
            }
            originalInitPlayers(data);
        };

        (window.unsafeWindow || window).exportDeckYDKE = () => {
            function arrayBufferToBase64(buffer) {
                let binary = '';
                const bytes = new Uint8Array(buffer);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            }

            function toYdkeURL(main, side, extra) {
                return "ydke://" +
                    arrayBufferToBase64(new Uint32Array(main).buffer) + "!" +
                    arrayBufferToBase64(new Uint32Array(extra).buffer) + "!" +
                    arrayBufferToBase64(new Uint32Array(side).buffer) + "!";
            }

            const main = [];
            const side = [];
            const extra = [];
            for (let i = 0; i < (window.unsafeWindow || window).deck_filled_arr.length; i++) {
                if (~~(window.unsafeWindow || window).deck_filled_arr[i].data("serial_number") > 0) {
                    main.push(~~(window.unsafeWindow || window).deck_filled_arr[i].data("serial_number"));
                }
            }
            for (let i = 0; i < (window.unsafeWindow || window).side_filled_arr.length; i++) {
                if (~~(window.unsafeWindow || window).side_filled_arr[i].data("serial_number") > 0) {
                    side.push(~~(window.unsafeWindow || window).side_filled_arr[i].data("serial_number"));
                }
            }
            for (let i = 0; i < (window.unsafeWindow || window).extra_filled_arr.length; i++) {
                if (~~(window.unsafeWindow || window).extra_filled_arr[i].data("serial_number") > 0) {
                    extra.push(~~(window.unsafeWindow || window).extra_filled_arr[i].data("serial_number"));
                }
            }

            navigator.clipboard.writeText(toYdkeURL(main, side, extra));
        };

        const originalExportDeckE = (window.unsafeWindow || window).exportDeckE;
        (window.unsafeWindow || window).exportDeckE = () => {
            const options = ["Download Link"];
            let custom = false;
            let rush = false;
            for (let i = 0; i < (window.unsafeWindow || window).deck_filled_arr.length; i++) {
                if ((window.unsafeWindow || window).deck_filled_arr[i].data("custom")) {
                    custom = true;
                }
                if ((window.unsafeWindow || window).deck_filled_arr[i].data("rush")) {
                    rush = true;
                }
            }
            for (let i = 0; i < (window.unsafeWindow || window).side_filled_arr.length; i++) {
                if ((window.unsafeWindow || window).side_filled_arr[i].data("custom")) {
                    custom = true;
                }
                if ((window.unsafeWindow || window).side_filled_arr[i].data("rush")) {
                    rush = true;
                }
            }
            for (let i = 0; i < (window.unsafeWindow || window).extra_filled_arr.length; i++) {
                if ((window.unsafeWindow || window).extra_filled_arr[i].data("custom")) {
                    custom = true;
                }
                if ((window.unsafeWindow || window).extra_filled_arr[i].data("rush")) {
                    rush = true;
                }
            }
            if (custom) {
                options.push("XML File (with custom cards)");
                options.push("YDK File (without custom cards)");
            }
            else if (rush) {
                options.push("XML File (with rush cards)");
                options.push("YDK File (without rush cards)");
            }
            else {
                options.push("YDK File");
            }
            options.push("YDK Code");
            options.push("KDE Decklist");
            (window.unsafeWindow || window).getComboBox("Export Deck", "Select which format to export to", options, 0, (window.unsafeWindow || window).exportDeck);
            (window.unsafeWindow || window).showDim();
        };
    }

    addSettingsButton();
    init();

    const bannedWordsList = getConfigEntry('bannedWordsList');
    if (bannedWordsList) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: getConfigEntry('bannedWordsList'),
            onload: (response) => {
                bannedWords = response.responseText.split('\n').filter((w) => !!w.trim());
                init();
            }
        });
    }
})();
