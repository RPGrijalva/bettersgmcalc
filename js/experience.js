const bronze = document.getElementById("fexp-bronze");
const silver = document.getElementById("fexp-silver");
const gold = document.getElementById("fexp-gold");
const diamond = document.getElementById("fexp-diamond");

let startexprng = document.getElementById('fighter-start-exp-range');
let startexpval = document.getElementById('fighter-start-exp-value');
let endexprng = document.getElementById('fighter-end-level-range');
let endexpval = document.getElementById('fighter-end-level-value');

let showExp = document.querySelector('.fighter-exp-button');


function calcEXP() {
    let rarity = document.querySelector("input[name='fighter-rarity-exp']:checked").value;
    const maxValue = eval(`${rarity}EXP[${rarity}EXP.length-1]`);
    const maxLevel = eval(`${rarity}EXP.length`);
    startexprng.max = maxValue;
    startexpval.max = maxValue;
    endexprng.max = maxLevel;
    endexpval.max = maxLevel;

    startexpval.value = Math.min(startexpval.value, startexpval.max);
    endexpval.value = Math.min(endexpval.value, endexpval.max);
    startexpval.value = Math.max(startexpval.value, startexpval.min);
    endexpval.value = Math.max(endexpval.value, endexpval.min);

    if (startexprng.value <= eval(`${rarity}EXP.length`) && startexprng.value != 0) {
        startexprng.value =  eval(`${rarity}EXP[${startexprng.value}]`);
        startexpval.value =  startexprng.value;
    }

    let goalEXP = eval(`${rarity}EXP[endexprng.value-1]`)

    if (eval(startexprng.value) >= goalEXP) {
        showExp.innerHTML = "This fighter has reached their goal";
    } else {
        showExp.innerHTML = `This fighter needs ${addCommas(goalEXP - startexprng.value)} more exp to reach their goal`
    }
}

const bronzeEXP = [
0,
100,
250,
409,
909,
1439,
2001,
2597,
3229,
3899,
5399,
6990,
8677,
10466,
12363,
14375,
16509,
18772,
21172,
23717,
26717,
29898,
33271,
36848,
40641,
44663,
48928,
53541,
58248,
63335,
]

const silverEXP = [
0,
500,
1250,
2061,
4561,
7265,
10189,
13351,
16771,
20470,
27970,
36081,
44853,
54340,
64600,
75696,
87696,
100674,
114710,
129890,
144890,
161112,
178656,
197630,
218150,
240342,
264343,
290300,
318372,
348732,
378732,
411177,
446266,
484215,
525257,
569644,
617649,
669566,
725714,
786438,
]

const goldEXP = [
0,
1000,
2500,
4154,
9154,
14666,
20743,
27443,
34830,
42974,
57974,
74511,
92743,
112844,
135005,
159437,
186373,
216070,
248811,
284908,
314908,
347983,
384448,
424651,
468975,
517842,
571718,
631116,
696602,
768800,
828800,
894950,
967880,
1048285,
1136932,
1234665,
1342416,
1461211,
1592182,
1736578,
1886578,
2051953,
2234279,
2435293,
2656911,
2901245,
3170623,
3467612,
3795042,
4156034,
]

const diamondEXP = [
0,
2000,
5000,
8370,
18370,
29605,
42228,
56410,
72343,
90244,
120244,
153949,
191817,
234362,
282161,
335863,
396197,
463982,
540138,
625699,
685699,
753109,
828844,
913932,
1009528,
1116930,
1237596,
1373164,
1525475,
1696596,
1816596,
1951416,
2102886,
2273063,
2464257,
2679063,
2920398,
3191538,
3496164,
3838411,
4138411,
4475461,
4854137,
5279579,
5757563,
6294578,
6897914,
7575762,
8337324,
9192939,
10154222,
11234224,
12447606,
13810841,
15342435,
17063181,
18996439,
21168454,
23608713,
26350344,
]