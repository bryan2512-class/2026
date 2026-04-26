// data.js
// 这是你的数据库，以后加题目只改这里
const schoolData = [
    {
        name: "F4 ADDITIONAL MATHEMATICS",
        units: [
            {
                name: "BAB 1: FUNGSI",
                sections: [
                    {
                        name: "1.1 Fungsi (Chinese Version)",
                        points: [
                            {
                                name: "Lesson 1: Pengenalan Fungsi",
                                topics: [
                                    { 
                                        id: "f4_c1_q1", 
                                        title: "Apakah Fungsi ?", 
                                        quiz: "$$f\\colon x \\to y^2$$ <br> $$f(x) = y^2$$", 
                                        quizImageId: "", 
                                        driveId: ""
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

window.schoolData = schoolData;

