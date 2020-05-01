import React from 'react'
import { SearchBar, VideoDetail, VideoList } from './components'
import { Grid } from '@material-ui/core'
import youtube from './api/youtube'

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }
    onHandleSubmit = async (searchTerm) => {
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
        console.log(data.items,'---------------------------')
        this.setState({ videos: data.items, selectedVideo: data.items[0] })
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }
    componentDidMount() {
        this.onHandleSubmit('fantastic duo')
    }

    render() {
        const { selectedVideo, videos } = this.state
        // if (selectedVideo)
        return(
            <React.Fragment>
                <Grid xs={12}>
                    <SearchBar onHandleSubmit={this.onHandleSubmit}></SearchBar>
                </Grid>
                <Grid container spacing={3} style={{ padding: '20px 40px' }}>
                    <Grid item xs={8}>
                        <VideoDetail video={ selectedVideo } />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/> 
                    </Grid>
                </Grid>
            </React.Fragment>

        )
    }
}

export default App