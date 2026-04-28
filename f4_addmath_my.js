/**
 * ============================================
 * [f4_addmath_ms.js] - 附加数学 (马来文内容包)
 * ============================================
 * 提示：修改或增加马来文的题目、内容，都在这里操作！
 */
window.f4_AddMath_MS = {

    "f4_am_c1_q1_rc": {
        title: "Fungsi",
        quiz: `
        &rarr; Hubungan antara <b> Set \\(X\\) </b> dengan <b> Set \\(Y\\) </b>.

        `
    },

    "f4_am_c1_q2_rc":{
        title: "Fungsi Gubahan",
        quiz: `
        &rarr; Hubungan antara fungsi \\(f\\) dan \\(g\\).
        `
    },
    
    "f4_am_c1_q1_comp": {
        title: "Apakah Fungsi Gubahan?",
        quiz: `
        <b>Fungsi Gubahan</b> berlaku apabila satu fungsi disubstitusikan ke dalam fungsi yang lain.<br><br>
        [MAPPING1]
        `,
        mappingData1: {
            type: "composite",
            curveLabel: "gf", 
            x: ["\\(x\\)"], y: ["\\(f(x)\\)"], z: ["\\(gf(x)\\)"],
            xLabel: "Set X", yLabel: "Set Y", zLabel: "Set Z",
            caption: "Pemetaan Fungsi Gubahan"
        }
    },

    "f4_am_c1_q2_inv": {
        title: "Apakah Fungsi Songsang?",
        quiz: `
        Graf fungsi songsang ialah pantulan pada garis lurus \\(y = x\\).<br><br>
        [MAPPING1]<br><br>
        [GRAF1]
        `,
        mappingData1: {
            type: "inverse",
            x: ["\\(x\\)"], y: ["\\(y\\)"],
            xLabel: "Domain", yLabel: "Kodomain",
            caption: "Pemetaan Fungsi Songsang"
        },
        grafData1: {
            type: "inverse",
            graphLabel: "f(x)",
            points: [[-2,-2], [0,2], [2,6]], 
            inversePoints: [[-2,-2], [2,0], [6,2]], 
            caption: "Pantulan pada garis y = x"
        }
    }

};
