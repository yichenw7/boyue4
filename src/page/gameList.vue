<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="gamelist-frame">
      <div class="sin-game">
        <div class="y-icon" style></div>
        <div class="info">
          <span class="y-gamename">游戏名称：格格归来</span>
          <span class="y-ganmeeappid">APPID:800000009</span>
          <span class="y-ganmeappkey">APPKEY:725c23d5f4d7517bcaf0dcabe573ed6d</span>
        </div>
        <a class="y-operation" href="javascrpt://">操作</a>
      </div>
      <div class="sin-game">
        <div class="y-icon"></div>
        <div class="info">
          <span class="y-gamename">游戏名称：99斗地主</span>
          <span class="y-ganmeeappid">APPID:800000007</span>
          <span class="y-ganmeappkey">APPKEY:c36e426eef9ea360c9bbd2d89b27bb09</span>
        </div>
        <a class="y-operation" href="javascrpt://">操作</a>
      </div>
      <div class="sin-game">
        <div class="y-icon"></div>
        <div class="info">
          <span class="y-gamename">游戏名称：乱斗英雄传</span>
          <span class="y-ganmeeappid">APPID:800000006</span>
          <span class="y-ganmeappkey">APPKEY:36552462b41f8ea2169bf1cbd68020df</span>
        </div>
        <a class="y-operation" href="javascrpt://">操作</a>
      </div>
      <div class="sin-game">
        <div class="y-icon"></div>
        <div class="info">
          <span class="y-gamename">游戏名称：悠悠恋物语</span>
          <span class="y-ganmeeappid">APPID:800000005</span>
          <span class="y-ganmeappkey">APPKEY:157fe52467166121c1cb9047a7ff9721</span>
        </div>
        <a class="y-operation" href="javascrpt://">操作</a>
      </div>
      <div class="sin-game">
        <div class="y-icon"></div>
        <div class="info">
          <span class="y-gamename">游戏名称：梦幻天团</span>
          <span class="y-ganmeeappid">APPID:800000003</span>
          <span class="y-ganmeappkey">APPKEY:fc3f96389388e8eb72fcf0bd028cc6c5</span>
        </div>
        <a class="y-operation" href="javascrpt://">操作</a>
      </div>
      <div class="sin-game">
        <div class="y-icon"></div>
        <div class="info">
          <span class="y-gamename">游戏名称：坦克雄心</span>
          <span class="y-ganmeeappid">APPID:800000002</span>
          <span class="y-ganmeappkey">APPKEY:201611221803b6218321a4d35e26b91e</span>
        </div>
        <a class="y-operation" href="javascrpt://">操作</a>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  cityGuess,
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant
} from "@/api/getData";
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    headTop
  },
  methods: {
    async initData() {
      try {
        this.city = await cityGuess();
        const countData = await getResturantsCount();
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getResturants();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getCategory() {
      try {
        const categories = await foodCategory();
        categories.forEach(item => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            };
            item.sub_categories.forEach((subitem, index) => {
              if (index == 0) {
                return;
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              });
            });
            this.categoryOptions.push(addnew);
          }
        });
      } catch (err) {
        console.log("获取商铺种类失败", err);
      }
    },
    async getResturants() {
      const { latitude, longitude } = this.city;
      const restaurants = await getResturants({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit
      });
      this.tableData = [];
      restaurants.forEach(item => {
        const tableData = {};
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.id = item.id;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.recent_order_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.tableData.push(tableData);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getResturants();
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.address.address = row.address;
      this.dialogFormVisible = true;
      this.selectedCategory = row.category.split("/");
      if (!this.categoryOptions.length) {
        this.getCategory();
      }
    },
    addFood(index, row) {
      this.$router.push({ path: "addGoods", query: { restaurant_id: row.id } });
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteResturant(row.id);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "删除店铺成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
        console.log("删除店铺失败");
      }
    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        try {
          const cityList = await searchplace(this.city.id, queryString);
          if (cityList instanceof Array) {
            cityList.map(item => {
              item.value = item.address;
              return item;
            });
            cb(cityList);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    addressSelect(vale) {
      const { address, latitude, longitude } = vale;
      this.address = { address, latitude, longitude };
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    async updateShop() {
      this.dialogFormVisible = false;
      try {
        Object.assign(this.selectTable, this.address);
        this.selectTable.category = this.selectedCategory.join("/");
        const res = await updateResturant(this.selectTable);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "更新店铺信息成功"
          });
          this.getResturants();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        console.log("更新餐馆信息失败", err);
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.gamelist-frame {
  padding: 30px;
}
.sin-game {
  float: left;
  border: 1px solid #c0c0c0;
  border-left: 20px solid #324057;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.1s linear;
  width: 42%;
  position: relative;
  @media screen and(max-width:1350px) {
    width: 90%;
  }
  &:nth-child(2n + 1) {
    margin-right: 30px;
    @media screen and(max-width:1350px) {
      margin-right: 0;
    }
  }
  &:before,
  &:after {
    content: " "; // 1
    display: table; // 2
  }

  &:after {
    clear: both;
  }
  &:hover {
    background-color: rgba(50, 64, 87, 0.1);
    //border-right: 60px solid #324057;
    .y-operation {
      display: block;
    }
  }
  &:nth-child(1) {
    .y-icon {
      background-image: url("../assets/img/icon_6.png");
    }
  }
  &:nth-child(2) {
    .y-icon {
      background-image: url("../assets/img/icon_4.png");
    }
  }
  &:nth-child(3) {
    .y-icon {
      background-image: url("../assets/img/icon_5.png");
    }
  }
  &:nth-child(4) {
    .y-icon {
      background-image: url("../assets/img/icon_1.jpg");
    }
  }
  &:nth-child(5) {
    .y-icon {
      background-image: url("../assets/img/icon_3.png");
    }
  }
  &:nth-child(6) {
    .y-icon {
      background-image: url("../assets/img/icon_2.png");
    }
  }
}
.y-icon {
  float: left;
  width: 120px;
  height: 120px;
  //background-color: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 25px;

  background-size: cover;
}
.sin-game .info {
  float: left;
  padding-left: 20px;
  width: 60%;
}
.y-operation {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 3px;
  float: right;
  height: 100%;
  line-height: 160px;
  transition: all 0.1s linear;
  background: #324057;
  border-radius: 0 10px 10px 0;
}
.y-gamename {
  display: inline-block;
  width: 100%;
  line-height: 40px;
  font-size: 16px;
}
.y-ganmeeappid {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  font-size: 14px;
}
.y-ganmeappkey {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  font-size: 14px;
}
</style>
