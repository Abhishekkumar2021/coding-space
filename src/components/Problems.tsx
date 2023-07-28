import { Autocomplete, Box, Chip, Fab, IconButton, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import { useState, useEffect } from 'react'
import { tags as Tags, difficulty as Difficulty, status as Status } from '../Additional'
import { Add } from '@mui/icons-material'
import { Problem } from '../Types'
import useAuth from '../hooks/useAuth'
import { db } from '../config/firebase'
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { SiLeetcode, SiCodingninjas, SiGeeksforgeeks } from 'react-icons/si'
import {AiOutlineLink} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Problems = () => {
  const { user } = useAuth()
  const [difficulty, setDifficulty] = useState('All')
  const [status, setStatus] = useState('All')
  const [tags, setTags] = useState<string[]>(['All'])
  const [search, setSearch] = useState('')
  const [problems, setProblems] = useState<Problem[]>([])
  const navigate = useNavigate()
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    const fetchProblems = async () => {
      const userRef = doc(db, `users/${user?.uid}`)
      const problemCollection = collection(userRef, 'problems')
      let conditions: any[] = []
      if (search) {
        conditions.push(where('title', '==', search))
      }
      else{
        if (difficulty !== 'All') {
          conditions.push(where('difficulty', '==', difficulty))
        }
        if (status !== 'All') {
          conditions.push(where('status', '==', status))
        }
        if (tags && tags.length && tags[0] !== 'All') {
          conditions.push(where('tags', 'array-contains-any', tags))
        }
      }
      const problemsQuery = query(
        problemCollection,
        ...conditions,
        orderBy('title')
      )

      const snapshot = await getDocs(problemsQuery)

      const problems: Problem[] = []
      const options: string[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        problems.push({
          id: doc.id,
          title: data.title,
          difficulty: data.difficulty,
          tags: data.tags,
          status: data.status,
          code: data.code,
          notes: data.notes,
          links: data.links,
          description: data.description,
        })
        options.push(data.title)
      })
      setProblems(problems)
      setOptions(options)
      console.log(problems)
    }
    fetchProblems()
  }, [user, difficulty, status, tags, search])

  const handleDifficulty = (e: any) => {
    setDifficulty(e.target.value)
  }

  const handleStatus = (e: any) => {
    setStatus(e.target.value)
  }

  const handleTags = (e: any) => {
    const value = e.target.value
    setTags(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleSearch = (e: any, newValue: any) => {
    setSearch(newValue)
  }

  const handleAddProblem = () => {
    navigate('/problems/add')
  }
  const getIcon = (link: string, idx: any) => {
    if (link.includes('leetcode')) {
      return (
        <IconButton key={idx} href={link} target='_blank' rel='noreferrer'>
          <SiLeetcode />
        </IconButton>
      )
    }
    if(link.includes('codingninjas')){
      return (
        <IconButton key={idx} href={link} target='_blank' rel='noreferrer'>
          <SiCodingninjas />
        </IconButton>
      )
    }
    if(link.includes('interviewbit')){
      return (
        <IconButton key={idx} href={link} target='_blank' rel='noreferrer'>
          <img src="https://img.icons8.com/?size=1x&id=BaooGqbWDceE&format=png" alt="interviewbit" width={40} height={40} />
        </IconButton>
      )
    }
    if(link.includes('geeksforgeeks')){
      return (
        <IconButton key={idx} href={link} target='_blank' rel='noreferrer'>
          <SiGeeksforgeeks/>
        </IconButton>
      )
    }

    return (
      <IconButton key={idx} href={link} target='_blank' rel='noreferrer'>
        <AiOutlineLink />
      </IconButton>
    )
  }
  return (
    <Box sx={{ width: '100%'}}>
      <Stack direction='row' spacing={2} sx={{ width: '100%', position: 'sticky', top: '4rem', zIndex: 1200, background:'white', padding: 3 }} justifyContent={'space-between'}>
        <TextField
          id='difficulty'
          label='Difficulty'
          variant='outlined'
          select
          value={difficulty}
          fullWidth
          onChange={handleDifficulty}
        >
          <MenuItem value='All'>All</MenuItem>
          {Difficulty.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </TextField>
        <TextField
          id='status'
          label='Status'
          variant='outlined'
          select
          value={status}
          fullWidth
          onChange={handleStatus}
        >
          <MenuItem value='All'>All</MenuItem>
          {Status.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </TextField>
        <TextField
          id='tags'
          label='Tags'
          variant='outlined'
          select
          value={tags}
          fullWidth
          onChange={handleTags}
          SelectProps={
            { multiple: true }
          }
        >
          <MenuItem value='All'>All</MenuItem>
          {Tags.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </TextField>
        <Autocomplete
          id='search'
          options={options}
          renderInput={(params) => <TextField {...params} label='Search by title' variant='outlined' />}
          fullWidth
          onChange={handleSearch}
        />
      </Stack>
      <Tooltip title="Add problem" arrow enterDelay={500} leaveDelay={200}>
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '2rem', right: '2rem' }} onClick={handleAddProblem}>
          <Add />
        </Fab>
      </Tooltip>
        <TableContainer sx={{ width: '100%', padding: 2 }} >
          <Table sx={{ width: '100%' }}>
            <TableHead >
              <TableRow>
              <TableCell width={100} align='center'>Status</TableCell>
              <TableCell width={450} align='center'>Title</TableCell>
              <TableCell width={100} align='center'>Difficulty</TableCell>
              <TableCell width={500} align='center'>Tags</TableCell>
              <TableCell width={200} align='center'>URLs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
            {problems.map((problem, index) => (
              <TableRow key={index}>
                {
                  problem.status === 'Solved' ?
                  <TableCell sx={{backgroundColor:'success.light', color:'white'}}>{problem.status}</TableCell>
                  : problem.status === 'To Do' ?
                  <TableCell sx={{backgroundColor:'error.light', color:'white'}}>{problem.status}</TableCell>
                  : <TableCell sx={{backgroundColor:'warning.light', color:'white'}}>{problem.status}</TableCell>
                }
                <TableCell>
                  <Link to={`/problems/${problem.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    {problem.title}
                  </Link>
                </TableCell>
                {
                  problem.difficulty === 'Easy' ?
                    <TableCell sx={{backgroundColor:'success.light', color:'white'}}>{problem.difficulty}</TableCell>
                    : problem.difficulty === 'Medium' ?
                    <TableCell sx={{backgroundColor:'warning.light', color:'white'}}>{problem.difficulty}</TableCell>
                    : <TableCell sx={{backgroundColor:'error.light', color:'white'}}>{problem.difficulty}</TableCell>
                }
                <TableCell>{
                  <Stack direction='row' spacing={1} justifyContent={'center'} paddingLeft={5} width={500} sx={{overflowX: 'auto'}}>
                    {problem.tags.map((tag, index) => (
                      <Chip key={index} label={tag} onClick={() => setTags([tag])} />
                    ))}
                  </Stack>
                }</TableCell>
                <TableCell>
                  <Stack direction='row' spacing={1}  justifyContent={'center'}  sx={{overflowX: 'auto'}}>
                    {problem.links.map((link, index) => (
                      getIcon(link, index)
                    ))}
                  </Stack>
                </TableCell>
                </TableRow> 
            ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  )
}

export default Problems