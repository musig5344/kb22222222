const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@security': path.resolve(__dirname, 'src/security'),
      '@keyboard': path.resolve(__dirname, 'src/keyboard'),
      '@accessibility': path.resolve(__dirname, 'src/accessibility')
    },
    
    // APK 크기 30% 감소를 위한 웹팩 최적화
    configure: (webpackConfig, { env, paths }) => {
      // 프로덕션에서만 최적화 적용
      if (env === 'production') {
        
        // 1. Source maps 완전 제거 (1-2MB 절약)
        webpackConfig.devtool = false;
        
        // 2. 최적화 설정 강화
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          
          // 더 공격적인 코드 분할
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                priority: 10
              },
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                enforce: true,
                priority: 5
              }
            }
          },
          
          // 사용하지 않는 코드 제거 강화
          usedExports: true,
          sideEffects: false,
          
          // Terser 최적화 설정
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                  drop_console: true,      // console.* 제거
                  drop_debugger: true,     // debugger 제거
                  pure_funcs: ['console.log', 'console.info', 'console.debug'] // 특정 함수 제거
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,         // 주석 제거
                  ascii_only: true,
                },
              },
              parallel: true,
            }),
          ],
        };
        
        // 3. 성능 힌트 설정
        webpackConfig.performance = {
          maxAssetSize: 500000,      // 500KB
          maxEntrypointSize: 500000, // 500KB
          hints: 'warning'
        };
        
        // 4. 압축 플러그인 제거 (Android APK 자체 압축과 충돌 방지)
        // CompressionPlugin을 제거하여 중복 리소스 오류 해결
      }
      
      return webpackConfig;
    }
  }
};