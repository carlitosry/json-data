'use strict'

module.exports = (req, res, next) => {
  const _send = res.send
  res.send = function (body) {
  }
  next()
}