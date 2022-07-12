import * as XLSX from 'xlsx'

// 目前支持一个sheet，之后再扩展
export function jsonToExcel ({
  json,
  opts = {},
  sheetName = 'default',
  fileName,
  retType
}) {
  return new Promise((resolve, reject) => {
    try {
      const ws = XLSX.utils.json_to_sheet(json)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      const defaultOpts = { bookType: 'xlsx', bookSST: false, type: 'binary' }
      const bs = XLSX.write(wb, Object.assign(defaultOpts, opts))
      if (retType === 'file') {
        XLSX.writeFile(wb, fileName)
        resolve()
      }
      const blob = new Blob([__s2ab(bs)], { type: '' }) // 构造blob
      if (retType === 'blob') {
        resolve(blob)
      }
      const fileObj = new File([blob], fileName) // 默认构造file对象返回
      resolve(fileObj)
    } catch (err) {
      console.log(err)
      this.$message.error(err.message)
      reject(err)
    }
  })
}

function __s2ab (s) {
  // 字符串转字符流
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
