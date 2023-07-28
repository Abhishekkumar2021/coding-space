import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { tags as Tags, difficulty as Difficulty, status as Status } from '../Additional'
import { Add } from '@mui/icons-material'
import Notification from './Notification'
import useAuth from '../hooks/useAuth'
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@monaco-editor/react'

const AddProblem = () => {
    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [links, setLinks] = useState<string[]>([])
    const [code, setCode] = useState('')
    const [notes, setNotes] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const {user} = useAuth();
    const navigate = useNavigate();

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

    const handleTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const handleLinks = (e: any) => {
        const value = e.target.value
        setLinks(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }
    const handleDescription = (value: any) => {
        setDescription(value)
    }

    const handleCode = (value: any) => {
        setCode(value)
    }

    const handleNotes = (value: any) => {
        setNotes(value)
    }

    const handleSubmit = async () => {
        if(links === null || links.length === 0 && description === ''){
            setError('Please provide either description or links');
            setErrorOpen(true);
            return;
        }
        try {
            const problem = {
                title,
                difficulty,
                tags,
                links,
                code,
                notes,
                status,
                description
            }

            // Add problem to firestore
            const userRef = doc(db, `users/${user?.uid}`)
            const problemCollection = collection(userRef, 'problems')

            // Check before adding that problem with same title doesn't exist
            const querySnapshot = query(problemCollection, where('title', '==', title))
            const docs = await getDocs(querySnapshot)
            if(!docs.empty){
                setError('Problem with same title already exists');
                setErrorOpen(true);
                return;
            }

            await addDoc(problemCollection, problem)

            setSuccess('Problem added successfully');
            setSuccessOpen(true);

            // Redirect to all problems page after 1s
            setTimeout(() => {
                navigate('/problems');
            }
            , 1000);

        }
        catch (err: any) {
            setError(err.message || 'Something went wrong');
            setErrorOpen(true);
        }
    }

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', padding: '1rem'}}>
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
            <Stack maxWidth={700} sx={{ margin: 'auto' }} spacing={2}>
                {/* Title */}
                <TextField
                    id='title'
                    label='Title'
                    variant='outlined'
                    value={title}
                    fullWidth
                    onChange={handleTitle}
                    required
                />

                {/* Description */}
                <Editor 
                    height={300}
                    defaultLanguage="markdown"
                    defaultValue="<!-- Please enter description here in markdown format...  -->"
                    value={description}
                    onChange={handleDescription}
                    options={{
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        },
                        fontFamily: "'Roboto Mono', monospace"
                    }}
                    className='editor'
                />

                {/* Difficulty */}
                <TextField
                    id='difficulty'
                    label='Difficulty'
                    variant='outlined'
                    select
                    value={difficulty}
                    fullWidth
                    onChange={handleDifficulty}
                    required
                >
                    {Difficulty.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                {/* Status */}
                <TextField
                    id='status'
                    label='Status'
                    variant='outlined'
                    select
                    value={status}
                    fullWidth
                    onChange={handleStatus}
                    required
                >
                    {Status.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                {/* Tags */}
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
                    required    
                >
                    {Tags.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                {/* Links */}
                <TextField
                    id='links'
                    label='Links'
                    variant='outlined'
                    value={links.join(',')} 
                    fullWidth
                    onChange={handleLinks}
                    helperText='Enter comma separated links.'  
                />

                {/* Code */}
                <Editor 
                    height={300}
                    defaultLanguage="cpp"
                    defaultValue="// Start coding here..."
                    value={code}
                    onChange={handleCode}
                    options={{
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        },
                        fontFamily: "'Roboto Mono', monospace"
                    }}
                    className='editor'
                />

                {/* Notes */}
                <Editor 
                    height={300}
                    defaultLanguage="markdown"
                    defaultValue="<!-- Please enter notes here in markdown format...  -->"
                    value={notes}
                    onChange={handleNotes}
                    options={{
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        },
                        fontFamily: "'Roboto Mono', monospace"
                    }}
                    className='editor'
                />

                <Button variant='contained' color='primary' fullWidth startIcon={<Add />} onClick = {handleSubmit}>Add Problem</Button>

            </Stack>
        </Box>
    )
}

export default AddProblem