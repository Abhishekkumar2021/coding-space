import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { DailyTask } from '../Types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Daily = () => {
    const { user } = useAuth();
    const [date, setDate] = useState<string | null>(new Date().toLocaleDateString());
    const [tasks, setTasks] = useState<DailyTask[]>([]);

    useEffect(() => {
        // Get tasks from database
        const getTasks = async () => {
            const userRef = doc(db, `users/${user?.uid}`)
            const taskRef = doc(userRef, `daily/${date}`)
            const tasksSnapshot = await getDoc(taskRef)
            const tasks = tasksSnapshot.data()
            if (!tasks) {
                // No tasks for this date
                setTasks([])
            }
            else {
                // Tasks found
                console.log(tasks)
            }
        }

        getTasks()
    }, [date])



    return (
        <Stack direction="row" justifyContent="center" spacing={5} alignItems="center" width={'100%'} minHeight={'90vh'} >
            <Box>
                <Typography variant="h4" color="primary.main" >Hi, </Typography>
                <Typography variant="h1" color="secondary.main" >{user?.displayName || user?.email}</Typography>
                <Typography variant="h4" color="primary.main" >Your Task for </Typography>
                <Typography variant="h1" color="success.main" >{date === new Date().toLocaleDateString() ? 'Today' : date}</Typography>
                <Typography variant="h4" color="primary.main" >are here.</Typography>
            </Box>
            <Box>

            </Box>
        </Stack>
    )
}

export default Daily