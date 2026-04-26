/**
 * [data.js 数据库文件]
 * 所有的课程内容都存储在这里，index.html 会自动读取。
 */

const schoolData = [
    {
        name: "F4 ADDITIONAL MATHEMATICS", // 第一层：大科目名称
        units: [
            {
                name: "BAB 1: FUNGSI", // 第二层：单元名称
                sections: [
                    {
                        name: "1.1 Fungsi (Chinese Version)", // 第三层：章节名称
                        points: [
                            {
                                name: "Lesson 1: Pengenalan Fungsi", // 第四层：知识点名称
                                topics: [
                                    { 
                                        id: "f4_c1_q1", // 唯一的 ID，不可重复（建议用小写字母+数字）
                                        title: "Apakah Fungsi ?", // 题目小标题
                                        /* 录入 LaTeX 公式金律：
                                           1. 公式包在 $$ $$ 之间
                                           2. 所有的反斜杠 \ 必须写成双斜杠 \\ 
                                        */
                                        quiz: "$$f\\colon x \\to y^2$$ <br>",
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
