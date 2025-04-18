import Redis from 'ioredis';

const redis = new Redis({
    host: 'redis',
    port: 6379,
    // password: process.env.REDIS_PASSWORD, // 필요 시
});

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err));

export default redis;