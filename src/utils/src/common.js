
  //初始化省市区
  export  const initProvinces = function (arrData, provinceCode, provinceName, provinceChildren, cityCode, cityName, cityChildren, areaCode, areaName ){
    /**
     * 省市排序--排序规则
     */
    function sortCompare(a, b) {
      a = parseInt(a.id)
      b = parseInt(b.id)
      return a - b
    }
    /**
     * 省市排序
     */
    function sortArr(arr) {
      arr.sort(sortCompare)
      return arr
    }
    let arr = arrData.map(item => {
      let newProvinceNode = {}
      newProvinceNode.id = item[provinceCode]
      newProvinceNode.name = item[provinceName]
      if (item[provinceChildren].length) {
        newProvinceNode.children = item[provinceChildren].map(item => {
          let newCityNode = {}
          newCityNode.id = item[cityCode]
          newCityNode.name = item[cityName]
          if (item[cityChildren].length) {
            newCityNode.children = item[cityChildren].map(item => {
              let newAreaNode = {}
              newAreaNode.id = item[areaCode]
              newAreaNode.name = item[areaName]
              return newAreaNode
            })
          } else {
            newCityNode.children = []
          }
          return newCityNode
        })
      } else {
        newProvinceNode.children = []
      }
      return newProvinceNode
    })
    sortArr(arr)
    return arr
  }



