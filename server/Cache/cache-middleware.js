import redis from 'redis';

const PORT = 8080
const cache = redis.createClient(PORT)

const CacheMiddleware = (req, res)=>{
    
}

export default CacheMiddleware
