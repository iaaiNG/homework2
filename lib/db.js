// const Tapable = require('tapable')

// class DB extends Tapable {
//   constructor(options) {
//     // TODO
//     super(options)
//     this.options = options || {}
//     console.log(this)
//   }
//   plugin(name, fn) {
//     if (name === "options") {
//       fn(this.options)
//       return
//     }
//     if (!this[name]) {
//       this[name] = []
//     }
//     this[name].push(fn)
//   }
//   request(typeObj) {
//     // TODO
//     if (typeObj) {
//       for (let key in typeObj) {
//         !this.options[key] && Object.assign(this.options, typeObj)
//         key === "type"  && Object.assign(this.options, typeObj)
//       }

//     }
//     return new Promise((resolve, reject) => {
//       for (let fn of this.endpoint) {
//         if (fn(this.options) instanceof Promise) {
//           fn(this.options).then((res) => {
//             resolve(res)
//           })
//         }
//       }
//     })
//   }
// }

// module.exports = DB


const Tapable = require('tapable')

class DB extends Tapable {
  constructor(options) {
    // TODO
    super()
    this.options = options || {}
  }

  request(params = {}) {
    // TODO
    let options = this.applyPluginsWaterfall('options', this.options)
    Object.assign(params, options)
    return new Promise((resolve, reject) => {
      this.applyPluginsBailResult('endpoint', params).then(res => {
        this.applyPluginsBailResult('judge', res) && reject(res)
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}

module.exports = DB