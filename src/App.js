import React, { useState, useEffect } from 'react'
import { SearchBar, VideoDetail, VideoList } from './components'
import { Grid } from '@material-ui/core'
import youtube from './api/youtube'


const App = () => {
    const [ videos, setVideos ] = useState([])
    const [ selectedVideo, setselectedVideo ] = useState(null)

    const onHandleSubmit = async (searchTerm) => {
        const { data } = await youtube({
            method: 'get',
            url: '/search',
            params: {
                part: 'snippet',
                key: process.env.REACT_APP_API_KEY,
                maxResults: 5,
                type: 'video',
                q: searchTerm
            }
        })
        setVideos( data.items )
        setselectedVideo(data.items[0])
    }

    useEffect(() => {
        onHandleSubmit('Elevation Worship')
    },[])

    return(
        <React.Fragment>
            <Grid item xs={12}>
                <SearchBar onHandleSubmit={onHandleSubmit}/>
            </Grid>
            <Grid container spacing={3} style={{ padding: '20px 40px' }}>
                <Grid item xs={8}>
                    <VideoDetail video={ selectedVideo } />
                </Grid>
                <Grid item xs={4}>
                    <VideoList videos={videos} onVideoSelect={setselectedVideo}/> 
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default App