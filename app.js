const
  Excel = require('exceljs'),
  fs = require('fs'),
  ejs = require('ejs')

let [filePath] = process.argv.splice(2)

async function generator () {
  let workbook = new Excel.Workbook()

  await workbook.xlsx.readFile(filePath)

  let worksheet = workbook.getWorksheet('test')

  let fieldIndex = {
    buttonId: 3,
    operation: 5,
    object: 6,
    roles: 7
  }
  let permissionInfos = []

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 2 && row.getCell(3).value) {
      let permissionInfo = {}

      for (let key in fieldIndex) {
        permissionInfo[key] = row.getCell(fieldIndex[key]).value
      }
      permissionInfos.push(permissionInfo)
    }
  })

  let serviceTemp = fs.readFileSync('./templetes/service-permission.ejs', 'utf8')

  serviceTemp = ejs.render(serviceTemp, {permissionInfos})
  fs.writeFileSync('./files/service-permission.js', serviceTemp)

  let frontTemp = fs.readFileSync('./templetes/front-permission.ejs', 'utf8')

  frontTemp = ejs.render(frontTemp, {permissionInfos})
  fs.writeFileSync('./files/front-permission.js', frontTemp)
}

generator().catch(err => console.error(err))
