// time O(m·n), space O(m·n)
// minimum single-character edits to turn a into b

export const levenshtein = (str1 = "", str2 = "") => {
    const track = [];

    for (let i = 0; i <= str2.length; i++) {
        track[i] = [];

        for (let j = 0; j <= str1.length; j++) {
            track[i][j] = null;
        }
    }

    for (let i = 0; i <= str1.length; i ++) {
        track[0][i] = i;
    }

    for (let  j = 0; j <= str2.length; j ++) {
        track[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            let indicator = 0; 
            if (str1[i - 1] !== str2[j - 1]) {
                indicator = 1;
            } 
            
            track[j][i] = Math.min(
                track[j][i - 1] + 1, //deletion
                track[j - 1][i] + 1, //insertion
                track[j - 1][i - 1] + indicator //substitution
            );
        }
    }

    return track[str2.length][str1.length];
};