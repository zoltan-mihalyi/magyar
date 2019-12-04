var fs = require('fs');

const N = 6;
const minN = 2;

// const PATH ='csunyaszavak.txt';
//const PATH = 'szavak.txt';
// const PATH = 'nnevek.txt';
const PATH = 'fnevek.txt';


var szavak = fs.readFileSync(PATH, 'utf-8').split('\n')
    .filter(szo => szo.indexOf(' ') === -1)
    .map(szo => szo + '$');

var stats = {};
for (let i = minN; i <= N; i++) {
    stats[i] = makeStat(i);
}


function makeStat(n) {
    const stat = {};

    for (const szo of szavak) {
        for (let i = 0; i < szo.length; i++) {
            const b = szo[i];

            const pre = szo.substring(i - n, i);

            if (!stat[pre]) {
                stat[pre] = {};
            }
            const st = stat[pre];

            st[b] = (st[b] || 0) + 1;
        }
    }
    return stat;
}

for (let i = 0; i < 200; i++) {
    generate(108 + Math.floor(Math.random() * 15));
}


function generate(len) {
    let gen = '';
    let n = randomN();

    for (let i = 0; i < len; i++) {
        n = move(n, randomN());

        const pre = gen.substring(gen.length - n, gen.length);

        const st = stats[n][pre];
        gen += st ? random(st) : '';
    }
    if (szavak.indexOf(gen) !== -1) {
        //console.log('       ' + gen);
    } else {
        gen = gen.substring(0, gen.length - 1);
        console.log(gen);
    }
}

function randomN() {
    return minN + Math.floor(Math.random() * (N - minN));
}

function random(st) {
    let sum = 0;
    for (const key of Object.keys(st)) {
        sum += st[key];
    }
    const r = Math.floor(Math.random() * sum);

    let c = r;
    for (const key of Object.keys(st)) {
        c -= st[key];
        if (c <= 0) {
            return key;
        }
    }
}

function move(a, b) {
    if (b > a) {
        return a + 1;
    } else if (b < a) {
        return a - 1;
    } else {
        return a;
    }
}