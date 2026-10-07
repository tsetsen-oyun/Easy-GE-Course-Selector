const str1 = document.getElementById("#");
const str2 = document.getElementById("#");
let matrix = [];

if (str1 === str2) {
    return 0;
}

if (str1 === " " && str2 !== " ") {
    return str1.length;
}

if (str2 === " " && str1 !== " ") {
    return str1.length;
}

for (let i = 0; i <= str1.length; i++) {
    matrix[i]= [];
    for (let j = 0; j <= str2.length; j++) {
        matrix[i][j] = 
    }
}

const 
// for (let j = 1; j <= str2.length; j += 1) {
//     for (let i = 1; i <= str1.length; i += 1) {
//         const indicator = str1[i - 1] === str2[j - 1]? 0 : 1;
//         track[j][i] = Math.min(
//             track[j][i - 1] + 1,
//             track[j - 1][i] + 1,
//             track[j - 1][i - 1] + indicator,
//         );
//     }
// }