/**
 * [data.js 数据库文件]
 * 所有的课程内容都存储在这里，index.html 会自动读取。
 * _my代表马来文，_ch代表华文
 */

const schoolData = [
    {
        name: "F4 ADDITIONAL MATHEMATICS", // 第一层：大科目名称  //F4 Add Math
        units: [
            {
                name: "BAB 1: FUNGSI", // 第二层：单元名称 //AM F4 B1
                sections: [
                    {//AM F4 1.1 (CHINESE VERSION)
                        name: "1.1 Fungsi (Chinese Version)", // 第三层：章节名称 //AM F4 B1.1
                        points: [
                            {
                                name: "Lesson 1: Pengenalan Fungsi", // 第四层：知识点名称
                                topics: [
                                    {   
                                        id: "f4_c1_q1_ch", // 唯一的 ID，不可重复（建议用小写字母+数字）
                                        title: "Apakah Fungsi ?", // 题目小标题
                                        /* 录入 LaTeX 公式金律：
                                           1. 公式包在 $$ $$ 之间
                                           2. 所有的反斜杠 \ 必须写成双斜杠 \\ 
                                        */
                                        quiz: `
                                        <b> Definasi Fungsi : </b> <br>
                                        <b> Fungsi </b> ialah hubungan antara <b> Set X </b> dengan <b> Set Y </b>.
                                        <br><br> 
                                        
                                        <b> Syarat : </b> <br> Satu objek (\\(x\\)) hanya ada satu imej (\\(y\\)) <br><br> 
                                        <div style="font-size: 12px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"

                                         <b> Tips: </b> <br>
                                         1. 其实就像一个人 (\\(x\\)) 只可以有一个亲生母亲 (\\(y\\))。<br> &rarr; <b> satu dengan satu </b> <br><br>
                                         2. 但是很多个孩子 (\\(x\\)) 可以有同一个母亲 (\\(y\\))。<br> &rarr; <b> banyak kepada satu </b>

                                        </div> <br>

                                        [MAPPING1] <br>
                                        [MAPPING2] <br>
                                        

                                       <hr style="border: 0.5px solid #000;"/> <br>

                                        <b> Tatatanda Fungsi </b>  <br><br> 
                                        
                                        $$f \\colon x \\to x^2 \\quad atau \\quad f(x)= x^2 $$<br><br> 
                                        <div style="font-size: 12px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">

                                         <b> Tips: </b> <br>
                                         1. 记得 \\(x\\) 是我们的objek，但是 \\(f(x)\\) 算到的结果是imej (\\(y\\))。 <br><br>
                                         2.其实 \\(f(x)\\) 代表着我的imej (\\(y\\)) 随着 \\(x\\) 在改变。

                                        </div><br>
                                        `,
                                        mappingData1: {
                                            x: ["\\(X_1\\)", "\\(X_2\\)"],
                                            y: ["\\(Y_1\\)","\\(Y_2\\)"],
                                            xLabel: "Set X",
                                            yLabel: "Set Y",
                                            caption: "Fungsi satu kepada satu"
                                        },

                                        mappingData2:  {
                                            type: "many-to-one",
                                            x: ["\\(X_1\\)", "\\(X_2\\)"],
                                            y: ["\\(Y_1\\)"],
                                            xLabel: "Set X",
                                            yLabel: "Set Y",
                                            caption: "Fungsi banyak kepada satu"
                                        },
                                        
                                        quizImageId: "", // 如果有 Google Drive 图片 ID 就写这，没有就留空 ""
                                        driveId: ""      // 如果有 Google Drive 视频 ID 就写这，没有就留空 ""
                                    } 
                                ]
                            }
                        ]
                    },

                    {//AM F4 1.1 (MALAY VERSSION)
                        name: "1.1 Fungsi (Malay Version)", //AM F4 B1.1
                        points: [
                            {
                                name: "Lesson 1: Pengenalan Fungsi", 
                                topics: [
                                    {   
                                        id: "f4_c1_q1_my", 
                                        title: "Apakah Fungsi ?", 
                                         
                                        quiz: `
                                        <b> Definasi Fungsi : </b> <br>
                                        <b> Fungsi </b> ialah hubungan antara <b> Set X </b> dengan <b> Set Y </b> .
                                        <br><br> 
                                        
                                        <b> Syarat : </b> <br> Satu objek (\\(x\\)) hanya ada satu imej (\\(y\\)) <br><br> 
                                        <div style="font-size: 12px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">

                                         <b> Tips: </b> <br>
                                         1. Macam seorang anak (\\(x\\)) hanya ada seorang ibu kandungnya (\\(y\\)) . <br> &rarr; <b> satu dengan satu </b> <br><br>
                                         2. Tetapi banyak anak (\\(x\\)) boleh mempunyai ibu kandung (\\(y\\)) yang sama. <br> &rarr; <b> banyak kepada satu </b>

                                        </div> <br>

                                        [MAPPING1]<br>
                                        [MAPPING2]<br>

                                        <hr style="border: 0.5px solid #000;"/> <br>

                                        <b> Tatatanda Fungsi </b>  <br><br> 
                                        
                                        $$f \\colon x \\to x^2 \\quad atau \\quad f(x)= x^2 $$<br><br> 
                                        <div style="font-size: 12px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"

                                         <b> Tips: </b> <br>
                                         1. Ingat, \\(x\\) ialah objek，tetapi hasil kira \\(f(x)\\) ialah imej (\\(y\\)). <br><br>
                                         2.Sebenarnya, \\(f(x)\\) bermaksud imej (\\(y\\)) berubah mengikut \\(x\\) .

                                        </div>
                                        `,

                                        mappingData1: {
                                            x: ["\\(X_1\\)","\\(X_2\\)"],
                                            y: ["\\(Y_1\\)","\\(Y_2\\)"],
                                            xLabel:  "Set X",
                                            yLabel: "Set Y",
                                            caption: "Fungsi satu kepada satu",
                                        },

                                        mappingData2: {
                                            type: "many-to-one",
                                            x: ["\\(X_1\\)","\\(X_1\\)"],
                                            y: ["\\(Y_1\\)"],
                                            xLabel: "Set X",
                                            yLabel: "Set Y",
                                            caption: "Fungsi banyak kepada satu"
                                        },
                                       
                                        quizImageId: "", // 如果有 Google Drive 图片 ID 就写这，没有就留空 ""
                                        driveId: ""      // 如果有 Google Drive 视频 ID 就写这，没有就留空 ""
                                    } 
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

// [核心步骤] 将数据挂载到全局 window 对象，确保 index.html 能够跨文件访问到它
window.schoolData = schoolData;
