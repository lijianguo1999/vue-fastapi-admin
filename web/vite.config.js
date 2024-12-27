import { defineConfig, loadEnv } from 'vite'

import { convertEnv, getSrcPath, getRootPath } from './build/utils'
import { viteDefine } from './build/config'
import { createVitePlugins } from './build/plugin'
import { OUTPUT_DIR, PROXY_CONFIG } from './build/constant'

export default defineConfig(({ command, mode }) => {
  const srcPath = getSrcPath()
  const rootPath = getRootPath()
  const isBuild = command === 'build'

  const env = loadEnv(mode, process.cwd())
  const viteEnv = convertEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_USE_PROXY, VITE_BASE_API } = viteEnv

  return {
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    define: viteDefine,
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: true,
      proxy: VITE_USE_PROXY
        ? {
          [VITE_BASE_API]: PROXY_CONFIG[VITE_BASE_API],
        }
        : undefined,
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR || 'dist',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
  }
})

// host: '0.0.0.0'：允许从任何 IP 地址访问开发服务器。
// port: VITE_PORT：指定服务器监听的端口，通过环境变量 VITE_PORT 设置。
// open: true：在启动开发服务器时自动打开浏览器。
// proxy：如果 VITE_USE_PROXY 为真，则配置 API 请求的代理，VITE_BASE_API 作为代理的基础路径，代理目标从 PROXY_CONFIG 获取。
// target: 'es2015'：指定构建的 JavaScript 目标版本，使用 ES2015 作为目标。
// outDir: OUTPUT_DIR || 'dist'：指定构建输出的目录，如果 OUTPUT_DIR 没有定义，则默认为 dist。
// reportCompressedSize: false：禁用显示压缩大小的报告。
// chunkSizeWarningLimit: 1024：当 chunk 大小超过 1024KB 时，Vite 会发出警告。
