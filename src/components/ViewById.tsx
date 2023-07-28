import { Box, Chip, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Notification from './Notification'

const ViewById = () => {
  const [problem, setProblem] = useState<any>(null)
  const { id } = useParams()

  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProblem = async () => {
      try {
        const userRef = doc(db, `users/${user?.uid}`)
        const problemRef = doc(userRef, `problems/${id}`)
        const problemSnapshot = await getDoc(problemRef)
        const problem = problemSnapshot.data()
        if (!problem) {
          setError('Problem not found');
          setErrorOpen(true);
          return;
        }
        setProblem(problem)
      }
      catch (err: any) {
        setError(err.message || 'Something went wrong');
        setErrorOpen(true);
      }
    }
    getProblem()
  }, [id])
  return (
    <Box sx={{ width: '100%' }}>
      {/* Error */}
      <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
      {/* Success */}
      <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
      {
        problem && <Stack padding={2} direction={'column'} >
        {
          problem.difficulty === 'Easy' ?
          <Chip sx={{backgroundColor:'success.light', color:'white'}} label={problem.difficulty} />
          : problem.difficulty === 'Medium' ?
          <Chip sx={{backgroundColor:'warning.light', color:'white'}} label={problem.difficulty} />
          : <Chip sx={{backgroundColor:'error.light', color:'white'}} label={problem.difficulty} />
        }
        <Stack direction='row' spacing={1} >
          {problem.tags.map((tag: string, index: number) => (
            <Chip key={index} label={tag} />
          ))}
        </Stack>
          
        </Stack>
      }
      
    </Box>
  )
}

export default ViewById