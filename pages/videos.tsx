import { useState, useEffect } from "react"
import { generateApiUrl } from "../util/generateApiUrl";

//const { VERK3: url } = process.env;
//const URL = url + '/departments';
//const url = process.env.REACT_APP_API_URL;
//const URL = `${url}/departments`;

interface Video {
    id: number;
    title: string;
    description: string;
    url: string;
    created: string;
    updated: string;
  }

export default function Videos () {
    var err = '';
    //console.log("url:", url);
    //console.log("URL:", URL);
    const URL = 'https://vef2-2023-h1-production-e699.up.railway.app/videos';
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('empty')
  const [videos, setVideos] = useState<Video[]>([]);


    useEffect(() => {
        async function fetchData() {
            await fetchVideos();
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchVideos() {
        setState('loading')
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('not ok');
            }
            const json = await response.json();
            //console.log(json)
            var rows = json.videos.rows;
            /*rows.forEach(element => {
                console.log(element.title);
            });*/
            setVideos(rows)
            setState('data')
        } catch (e) {
            setState('error')
            console.log(e);
        }
    }
    /*
    if (state === 'data') {
        return (
            <ul>
                {videos.map(vid => <li>{vid.title}</li>)}
                
            </ul>
        )
        
    }
    */

    return (
        <section>
          <h2>Myndbönd</h2>
          {state === 'empty' && (<p>engin Myndbönd</p>)}
          {state === 'error' && (<p>villa við að sækja Myndbönd</p>)}
          {state === 'loading' && (<p>sæki myndbönd...</p>)}
          <ul>
            {state === 'data' && videos.map((video, i) => {
              return (
                <li key={i}>{video.title}</li>
              )
            })}
          </ul>
          <button><a href="/">Til baka</a></button>
        </section>
      )
    }
