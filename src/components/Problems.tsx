import { Button, MenuItem, Paper, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { tags as Tags, difficulty as Difficulty, status as Status } from '../Additional'
import { FilterAlt, Search } from '@mui/icons-material'

const Problems = () => {
  const [difficulty, setDifficulty] = useState('All')
  const [status, setStatus] = useState('All')
  const [tags, setTags] = useState<string[]>(['All'])
  const [search, setSearch] = useState('')

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

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }


  return (
    <Paper elevation={0} sx={{ width: '100%', minHeight: '100vh', padding: '1rem', paddingTop: 10 }}>
      <Stack direction='row' spacing={2} sx={{ marginBottom: '1rem', width: '100%' }} justifyContent={'space-between'}>
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
        <TextField
          id='search'
          label='Search the problem'
          variant='outlined'
          value={search}
          fullWidth
          onChange={handleSearch}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          disableElevation
          startIcon={
            <Search />
          }
          sx = {{maxWidth: '10rem'}}
        >
          Search
        </Button>

      </Stack>

    </Paper>
  )
}

export default Problems