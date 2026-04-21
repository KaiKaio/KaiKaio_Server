module.exports = {
  apps: [
    {
      name: 'blogserver',
      script: 'app.js',
      instances: 1, // 单实例足够低频调用场景 无需 'max'
      exec_mode: 'fork', // 单进程模式，无需集群（cluster）
      max_memory_restart: '200M', // 内存超限自动重启保护
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
