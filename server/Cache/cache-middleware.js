import redis from 'redis';

const PORT = 6767
const cache = redis.createClient(PORT)

const CacheMiddleware = (req, res, next)=>{

}

export default CacheMiddleware
