type Handle = {
    website: string;            // like codeforces, codechef, etc
    username: string;           // username on that website
    password: string;           // password on that website
}

type Problem = {
    name: string;               // name of the problem
    link: string;               // link to the problem
    platform: string;           // platform of the problem
    difficulty: string;         // difficulty of the problem
    tags: string[];             // tags of the problem
    status: string;             // status of the problem
    code: string;               // code of the problem
    notes: string;              // notes of the problem
}

type DailyTask = {
    date: string;               // date of the task
    problems: Problem[];        // problems of the task
    notes: string;              // notes of the task
}

type UserData = {
    id: string;                 // id of the user
    handles: Handle[];          // handles of the user
    problems: Problem[];        // problems of the user
    dailyTasks: DailyTask[];    // daily tasks of the user
}

export type { Handle, Problem, DailyTask, UserData };