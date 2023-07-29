type Problem = {
    id: string;                 // id of the problem
    title: string;              // title of the problem
    description: string;        // description of the problem
    links: string[];            // links of the problem
    difficulty: string;         // difficulty of the problem
    tags: string[];             // tags of the problem
    status: string;             // status of the problem
    code: string;               // code of the problem
    notes: string;              // notes of the problem
}

type DailyTask = {
    status: string;             // status of the task
    problems: Problem[];        // problems of the task
}

export type { Problem, DailyTask };

/*
The firestore collection document structure for this project is as follows:

users (collection)
    user (document) // user is the id of the user
        dailyTasks (collection)
            dailyTask (document)
                date: string
                problems (collection)
                    problem (document)
        Problems (collection)
            problem (document)
*/
