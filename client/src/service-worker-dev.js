import dotenv from 'dotenv';
dotenv.config()

const LaunchServiceWorker = ()=>{
    if(navigator.serviceWorker){
        const url = process.env.PUBLIC_URL + '/service-worker.js'
        navigator.serviceWorker.register(url).then((response)=>{
        })
    }
}

export default LaunchServiceWorker