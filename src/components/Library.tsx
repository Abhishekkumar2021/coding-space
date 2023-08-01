import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Stack, Typography, TextField, DialogActions, LinearProgress, CircularProgress, InputAdornment, Button, Card, CardActions, CardMedia, Divider, MenuItem } from '@mui/material'
import { Add, CopyAll, Delete, LinkOutlined, UploadFile } from '@mui/icons-material'
import Notification from './Notification'
import { StorageReference, UploadTask, deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, storage } from '../config/firebase'
import useAuth from '../hooks/useAuth'


const Library = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<any>(null)
  const [success, setSuccess] = useState<any>(null)
  const [errorOpen, setErrorOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [file, setFile] = useState<any>(null)
  const [link, setLink] = useState<any>('')
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [title, setTitle] = useState('')
  const [processing, setProcessing] = useState(false)

  const [audio, setAudio] = useState<any>([])
  const [video, setVideo] = useState<any>([])
  const [images, setImages] = useState<any>([])
  const [pdfs, setPdfs] = useState<any>([])
  const [others, setOthers] = useState<any>([])
  const [links, setLinks] = useState<any>([])

  const { user } = useAuth()

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0])
  }

  const getData = async (type?: string) => {
    setProcessing(true)
    if(type === 'audio'){
      const audios: any = []
      const audioRef = ref(storage, `users/${user?.uid}/audio`)
      const audioList = await listAll(audioRef)
    
      audioList.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        audios.push({ url, name: itemRef.name })
      })

      setAudio(audios)
    }else if(type === 'video'){
      const videos: any = []
      const videoRef = ref(storage, `users/${user?.uid}/video`)
      const videoList = await listAll(videoRef)

      videoList.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        videos.push({ url, name: itemRef.name })
      })

      setVideo(videos)
    }else if(type === 'image'){
      const images: any = []
      const imageRef = ref(storage, `users/${user?.uid}/image`)
      const imageList = await listAll(imageRef)

      imageList.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        images.push({ url, name: itemRef.name })
      })

      setImages(images)
    }else if(type === 'pdf'){
      const pdfs: any = []
      const pdfRef = ref(storage, `users/${user?.uid}/pdf`)
      const pdfList = await listAll(pdfRef)

      pdfList.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        pdfs.push({ url, name: itemRef.name })
      })

      setPdfs(pdfs)
    }else if(type === 'others'){
      const others: any = []
      const otherRef = ref(storage, `users/${user?.uid}/others`)
      const otherList = await listAll(otherRef)

      otherList.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        others.push({ url, name: itemRef.name })
      })

      setOthers(others)
    }else if(type === 'links'){
      // get links
      try {
        const userRef = doc(db, `users/${user?.uid}`)
        const linksCollection = collection(userRef, 'links')
        const linksSnapshot = await getDocs(linksCollection)
        const linkList: any = []
        linksSnapshot.forEach((doc) => {
          linkList.push({ title, link , id: doc.id})
        })
        setLinks(linkList)
      }
      catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }
    }

    setProcessing(false)
  }

  const handleUpload = async () => {
    try {
      if(isLink){
        const userRef = doc(db, `users/${user?.uid}`)
        const problemCollection = collection(userRef, 'links')
        await addDoc(problemCollection, {
          link,
          title
        })
        setOpen(false)
        await getData()
        setSuccess('Link added successfully')
        setSuccessOpen(true)
        return
      }
      if (!file) {
        setError('Please select a file')
        setErrorOpen(true)
        return
      }
      let type = 'others'
      if (file.type.includes('audio')) type = 'audio'
      else if (file.type.includes('video')) type = 'video'
      else if (file.type.includes('image')) type = 'image'
      else if (file.type.includes('pdf')) type = 'pdf'
      setLoading(true)

      const storageRef: StorageReference = ref(storage, `users/${user?.uid}/${type}/${file.name}`);
      // Check if already exists
      if(!storageRef){
        setError('File already exists')
        setErrorOpen(true)
        return
      }
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
      });
      await uploadTask;
      setLoading(false)
      setOpen(false)
      await getData(type)
      setSuccess('File uploaded successfully')
      setSuccessOpen(true)
    }
    catch (err: any) {
      setError(err.message || 'Something went wrong')
      setErrorOpen(true);
    }

  }

  useEffect(() => {
    const getData = async () => {
      setProcessing(true)
      // get links
      try {
        const userRef = doc(db, `users/${user?.uid}`)
        const linksCollection = collection(userRef, 'links')
        const linksSnapshot = await getDocs(linksCollection)
        const links: any = []
        linksSnapshot.forEach((doc) => {
          links.push({ title, link , id: doc.id})
        })
        setLinks(links)
      }
      catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }
      // get audios
      try {
        const audios: any = []
        const audioRef = ref(storage, `users/${user?.uid}/audio`)
        const audioList = await listAll(audioRef)
  
        audioList.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          audios.push({ url, name: itemRef.name })
        })
  
        setAudio(audios)
      }
      catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }
  
      // get video
      try {
        const videos: any = []
        const videoRef = ref(storage, `users/${user?.uid}/video`)
        const videoList = await listAll(videoRef)
  
        videoList.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          videos.push({ url, name: itemRef.name })
        })
  
        setVideo(videos)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }
      // get images 
      try {
        const images: any = []
        const imageRef = ref(storage, `users/${user?.uid}/image`)
        const imageList = await listAll(imageRef)
  
        imageList.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          images.push({ url, name: itemRef.name })
        })
  
        setImages(images)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }
      // get pdfs
      try {
        const pdfs: any = []
        const pdfRef = ref(storage, `users/${user?.uid}/pdf`)
        const pdfList = await listAll(pdfRef)
  
        pdfList.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          pdfs.push({ url, name: itemRef.name })
        })
  
        setPdfs(pdfs)
      }
      catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }
      // get others
      try {
        const others: any = []
        const otherRef = ref(storage, `users/${user?.uid}/others`)
        const otherList = await listAll(otherRef)
  
        otherList.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          others.push({ url, name: itemRef.name })
        })
  
        setOthers(others)
      }
      catch (err: any) {
        setError(err.message || 'Something went wrong')
        setErrorOpen(true)
      }

      setProcessing(false)
    }
    getData()
  }, [user, link, title])

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setSuccess('URL copied to clipboard')
    setSuccessOpen(true)
  }

  const deleteLink = async (id: string) => {
    setProcessing(true)
    const userRef = doc(db, `users/${user?.uid}`)
    const linkRef = doc(userRef, `links/${id}`)
    await deleteDoc(linkRef)
    await getData('links')
    setProcessing(false)
    setSuccess('Link deleted successfully')
    setSuccessOpen(true)
  }

  const deletFile = async (type: string, name: string) => {
    setProcessing(true)
    const storageRef: StorageReference = ref(storage, `users/${user?.uid}/${type}/${name}`);
    await deleteObject(storageRef)
    await getData(type)
    setProcessing(false)
    setSuccess('File deleted successfully')
    setSuccessOpen(true)
  }

  return (
    <Stack width="100%" direction="column" position={"relative"} gap={2} padding={2}>
      <Dialog open={processing} maxWidth='sm' fullWidth>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <CircularProgress />
          <Typography variant="h6">Please wait...</Typography>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Upload to your library</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            defaultValue="file"
            select
            id="type"
            label="What you want to add ?"
            variant="outlined"
            onChange={(e) => setIsLink(e.target.value === 'link')}
            >
              <MenuItem value="link">Link</MenuItem>
              <MenuItem value="file">File</MenuItem>
            </TextField>
          {
            isLink ?(
              <>
              <TextField
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                id="link"
                label="Link"
                variant="outlined"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              </>
              ): <TextField
                margin="normal"
                type="file"
                fullWidth
                id="file"
                label="File"
                variant="outlined"
                onChange={handleFileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UploadFile />
                    </InputAdornment>
                  ),
                }}
              />
          }
          {loading && <LinearProgress variant="determinate" value={progress} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
      {/* Error */}
      <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
      {/* Success */}
      <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
      <Button onClick={() => setOpen(true)} startIcon={<Add />}>Add to library</Button>
      {/* Audio clips */}
      <Divider sx={{ marginBottom: '1rem' }} />
      <Stack width="100%" direction="column" position={"relative"}>
        <Typography variant="h6">Audio Notes</Typography>
        <Stack width="100%" direction="row" flexWrap="wrap" spacing={2} padding={1}>
          {
            audio.map((audio: any, idx: any) => (
              <Card sx={{ width: 300}} key={idx} >
                <CardMedia
                  component="video"
                  src={audio.url}
                  controls
                  sx={{
                    padding: 2,
                    height: 80
                  }}
                />
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleCopy(audio.url)} startIcon={<CopyAll />}>Copy URL</Button>
                  <Button onClick={() => deletFile('audio', audio.name)}  size="small" color="error" startIcon={<Delete />}>Delete</Button>
                </CardActions>
              </Card>
            ))
          }
        </Stack>
      </Stack>
      <Divider sx={{ marginBottom: '1rem' }} />
      {/* Videos */}
      <Stack width="100%" direction="column" position={"relative"}>
        <Typography variant="h6">Video Notes</Typography>
        <Stack width="100%" direction="row" flexWrap="wrap" spacing={2} padding={1}>
          {
            video.map((video: any, idx: any) => (
              <Card sx={{ width: 300}} key={idx} >
                <CardMedia
                  component="video"
                  src={video.url}
                  controls
                  height="140"
                />
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleCopy(video.url)} startIcon={<CopyAll />}>Copy URL</Button>
                  <Button onClick={() => deletFile('video', video.name)}  size="small" color="error" startIcon={<Delete />}>Delete</Button>
                </CardActions>
              </Card>
            ))

          }
        </Stack>
      </Stack>
      {/* Images */}
      
      <Divider sx={{ marginBottom: '1rem' }} />
      <Stack width="100%" direction="column" position={"relative"}>
        <Typography variant="h6">Image Notes</Typography>
        <Stack width="100%" direction="row" flexWrap="wrap" spacing={2} padding={1}>
          {
            images.map((image: any, idx: any) => (
              <Card sx={{ width: 300}} key={idx} >
                <CardMedia
                  component="img"
                  height="140"
                  image={image.url}
                  alt={image.name}
                />
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleCopy(image.url)} startIcon={<CopyAll />}
                  >Copy URL</Button>
                  <Button onClick={() => deletFile('image', image.name)}  size="small" color="error" startIcon={<Delete />}>Delete</Button>
                </CardActions>
              </Card>
            ))
          }
        </Stack>
      </Stack>
      {/* PDFs */}
      <Divider sx={{ marginBottom: '1rem' }} />
      <Stack width="100%" direction="column" position={"relative"}>
        <Typography variant="h6">PDFs Notes</Typography>
        <Stack width="100%" direction="row" flexWrap="wrap" spacing={2} padding={1}>
          {
            pdfs.map((pdf: any, idx: any) => (
              <Card sx={{ width: 300}} key={idx} >
                <iframe 
                  src={pdf.url}
                  height="140"
                  width="100%"
                  title={pdf.name}
                />
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleCopy(pdf.url)} startIcon={<CopyAll />}
                  >Copy URL</Button>
                  <Button onClick={() => deletFile('pdf', pdf.name)}  size="small" color="error" startIcon={<Delete />}>Delete</Button>
                </CardActions>
              </Card>
            ))
          }
        </Stack>
      </Stack>
      {/* Links */}
      <Divider sx={{ marginBottom: '1rem' }} />
      <Stack width="100%" direction="column" position={"relative"}>
        <Typography variant="h6">Links</Typography>
        <Stack width="100%" direction="row" flexWrap="wrap" spacing={2} padding={1}>
          {
            links.map((link: any, idx: any) => (
              <Card sx={{ width: 300}} key={idx} >
                <Typography variant="h6" sx={{ padding: 2 }} >{link.title}</Typography>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleCopy(link.link)} startIcon={<CopyAll />}
                  >Copy URL</Button>
                  <Button onClick={() => deleteLink(link.id)}  size="small" color="error" startIcon={<Delete />}>Delete</Button>
                </CardActions>
              </Card>
            ))

          }
        </Stack>
      </Stack>
      {/* Other */}
      <Divider sx={{ marginBottom: '1rem' }} />
      <Stack width="100%" direction="column" position={"relative"}>
        <Typography variant="h6">Others</Typography>
        <Stack width="100%" direction="row" flexWrap="wrap" spacing={2} padding={1}>
          {
            others.map((other: any, idx: any) => (
              <Card sx={{ width: 300}} key={idx} >
                <CardActions>
                  <Typography variant="h6" sx={{ padding: 2 }} >{other.name}</Typography>
                  <Button size="small" color="primary" onClick={() => handleCopy(other.url)} startIcon={<CopyAll />}
                  >Copy URL</Button>
                  <Button onClick={() => deletFile('others', other.name)}  size="small" color="error" startIcon={<Delete />}>Delete</Button>
                </CardActions>
              </Card>
            ))
          }
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Library