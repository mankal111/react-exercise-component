module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Exercise',
      externals: {
        react: 'React'
      }
    }
  }
}
