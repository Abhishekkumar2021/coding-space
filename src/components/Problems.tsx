import { Divider, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Battery1Bar, Battery2Bar, Battery3Bar, Battery4Bar, Battery5Bar, Battery6Bar, FormatListBulleted } from '@mui/icons-material'

const Problems = () => {
  const [difficulty, setDifficulty] = useState('All')
  const [status, setStatus] = useState('All')
  const [tags, setTags] = useState('All')
  const [search, setSearch] = useState('')

  return (
    // Desktop paper
    <Paper elevation={0} sx={{ width: '100%', minHeight: '100vh', padding: '1rem', paddingTop: 9 }}>
      <Divider />
      <Stack spacing={2} sx={{ width: '100%' }} padding={2}>
          {/* Difficulty */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Select
              label="Difficulty"
              id="difficulty"
              value={difficulty}
              onChange={(e: SelectChangeEvent) => setDifficulty(e.target.value)}
            >
              {/* Icon */}
              <MenuItem value="All">
                <Typography variant="body1">All</Typography>
              </MenuItem>
              <MenuItem value="Easy">
                <Battery2Bar />
                <Typography variant="body1">Easy</Typography>
              </MenuItem>
              <MenuItem value="Medium">
                <Battery4Bar />
                <Typography variant="body1">Medium</Typography>
              </MenuItem>
              <MenuItem value="Hard">
                <Battery6Bar />
                <Typography variant="body1">Hard</Typography>
              </MenuItem>
            </Select>
          </Stack>

              
          {/* Status */}
          {/* Tags */}
          {/* Search */}
          {/* All Filters Chips */}

      </Stack>

    </Paper>
  )
}

export default Problems